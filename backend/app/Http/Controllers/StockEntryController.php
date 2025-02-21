<?php

namespace App\Http\Controllers;

use App\Models\StockEntry;
use App\Models\Product;
use Illuminate\Http\Request;

class StockEntryController extends Controller
{
    // Lister toutes les entrées de stock
    public function index()
    {
        $stockEntries = StockEntry::with('product')->get();
        return response()->json($stockEntries);
    }

    // Enregistrer une nouvelle entrée de stock
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity_added' => 'required|integer|min:1',
            'entry_date' => 'nullable|date',
        ]);
    
        // Créer l'entrée de stock
        $stockEntry = StockEntry::create([
            'product_id' => $request->product_id,
            'quantity_added' => $request->quantity_added,
            'entry_date' => $request->entry_date ?? now(),
        ]);
    
        // Mettre à jour la quantité du produit
        $product = Product::find($request->product_id);
        $product->quantity += $request->quantity_added;
        $product->save();
    
        return response()->json($stockEntry, 201);
    }

    // Afficher une entrée de stock spécifique
    public function show($id)
    {
        $stockEntry = StockEntry::with('product')->findOrFail($id);
        return response()->json($stockEntry);
    }

    // Mettre à jour une entrée de stock
    public function update(Request $request, $id)
    {
        $request->validate([
            'product_id' => 'exists:products,id',
            'quantity_added' => 'integer|min:1',
            'entry_date' => 'nullable|date',
        ]);

        $stockEntry = StockEntry::findOrFail($id);
        $stockEntry->update($request->all());

        return response()->json($stockEntry);
    }

    // Supprimer une entrée de stock
    public function destroy($id)
    {
        $stockEntry = StockEntry::findOrFail($id);
        $stockEntry->delete();

        return response()->json(null, 204);
    }
}