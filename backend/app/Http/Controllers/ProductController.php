<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Get all products
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    // Create a new product
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'category' => 'required|string|max:255',
                'quantity' => 'required|integer|min:0',
                'price' => 'required|numeric|min:0',
                'stock_alert' => 'required|integer|min:0',
            ]);
    
            $product = Product::create($validatedData);
            return response()->json($product, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            \Log::error('Product Store Error: ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
    
    
    
    

    // Get a single product
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    // Update a product
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'string',
            'category' => 'string',
            'quantity' => 'integer',
            'price' => 'numeric',
            'stock_alert' => 'integer',
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product);
    }

    // Delete a product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(null, 204);
    }


public function stockByCategory()
{
    $stockData = Product::selectRaw('category, SUM(quantity) as total_quantity')
        ->groupBy('category')
        ->get();

    return response()->json($stockData);
}


}