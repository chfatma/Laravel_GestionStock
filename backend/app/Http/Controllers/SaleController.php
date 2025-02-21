<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class SaleController extends Controller
{
    // Lister toutes les ventes
    public function index()
    {
        $sales = Sale::with('product')->get();
        return response()->json($sales);
    }

    // Enregistrer une nouvelle vente
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity_sold' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
            'sold_at' => 'nullable|date',
        ]);
    
        // Vérifier si la quantité en stock est suffisante
        $product = Product::find($request->product_id);
        if ($product->quantity < $request->quantity_sold) {
            return response()->json(['message' => 'Stock insuffisant'], 400);
        }
    
        // Créer la vente
        $sale = Sale::create([
            'product_id' => $request->product_id,
            'quantity_sold' => $request->quantity_sold,
            'total_price' => $request->total_price,
            'sold_at' => $request->sold_at ?? now(),
        ]);
    
        // Réduire la quantité du produit
        $product->quantity -= $request->quantity_sold;
        $product->save();
    
        return response()->json($sale, 201);
    }

    // Afficher une vente spécifique
    public function show($id)
    {
        $sale = Sale::with('product')->findOrFail($id);
        return response()->json($sale);
    }

    // Mettre à jour une vente
// Mettre à jour une vente
public function update(Request $request, $id)
{
    $request->validate([
        'product_id' => 'exists:products,id',
        'quantity_sold' => 'integer|min:1',
        'total_price' => 'numeric|min:0',
        'sold_at' => 'nullable|date',
    ]);

    $sale = Sale::findOrFail($id);

    // Check if the product ID is being changed
    $product = Product::find($request->product_id);

    if ($request->has('quantity_sold') && $sale->quantity_sold !== $request->quantity_sold) {
        // If quantity is changed, update product stock
        $originalQuantitySold = $sale->quantity_sold;
        $newQuantitySold = $request->quantity_sold;

        // Adjust the product stock accordingly
        $product->quantity += $originalQuantitySold; // Restore the original quantity sold
        if ($product->quantity < $newQuantitySold) {
            return response()->json(['message' => 'Insufficient stock'], 400);
        }
        $product->quantity -= $newQuantitySold; // Deduct the new quantity sold
        $product->save();
    }

    // Update the sale record
    $sale->update($request->all());

    return response()->json($sale);
}

    // Supprimer une vente
    public function destroy($id)
    {
        $sale = Sale::findOrFail($id);
        $sale->delete();

        return response()->json(null, 204);
    }


public function mostSoldProducts()
{
    // Query to get the top 4 most sold products
    $mostSoldProducts = Sale::select('product_id', DB::raw('SUM(quantity_sold) as total_sold'))
        ->groupBy('product_id')
        ->orderBy('total_sold', 'DESC')
        ->with('product') // Eager load the product details
        ->limit(4) // Limit to top 4 most sold products
        ->get();

    // Format the data for the frontend
    $formattedData = $mostSoldProducts->map(function ($sale) {
        return [
            'name' => $sale->product->name, // Product name
            'sales' => $sale->total_sold,   // Total quantity sold
        ];
    });
    

    return response()->json($formattedData);
}
}