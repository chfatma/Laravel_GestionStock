<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'category', 'quantity', 'price', 'stock_alert'
    ];
    public function sales()
{
    return $this->hasMany(Sale::class);
}
public function stockEntries()
{
    return $this->hasMany(StockEntry::class);
}
}
