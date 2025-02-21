<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockEntry extends Model
{
    use HasFactory;

    // Attributs remplissables
    protected $fillable = [
        'product_id',
        'quantity_added',
        'entry_date',
    ];

    // Relation avec le modèle `Product`
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}