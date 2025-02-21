<?php


namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::create([
            'name' => 'Laptop',
            'category' => 'Electronics',
            'quantity' => 10,
            'price' => 1200.50,
            'stock_alert' => 5,
        ]);

        Product::create([
            'name' => 'Smartphone',
            'category' => 'Electronics',
            'quantity' => 20,
            'price' => 800.00,
            'stock_alert' => 10,
        ]);
    }
}