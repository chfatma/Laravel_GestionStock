<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('stock_entries', function (Blueprint $table) {
            $table->id(); // Colonne `id` (clé primaire)
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Clé étrangère vers la table `products`
            $table->integer('quantity_added'); // Nombre d'unités ajoutées
            $table->timestamp('entry_date')->useCurrent(); // Date de l'ajout (par défaut, la date actuelle)
            $table->timestamps(); // Colonnes `created_at` et `updated_at`
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_entries');
    }
};
