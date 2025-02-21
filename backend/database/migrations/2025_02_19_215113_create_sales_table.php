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
        Schema::create('sales', function (Blueprint $table) {
            $table->id(); // Colonne `id` (clé primaire)
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Clé étrangère vers la table `products`
            $table->integer('quantity_sold'); // Nombre d'unités vendues
            $table->decimal('total_price', 8, 2); // Prix total de la vente (8 chiffres au total, 2 décimales)
            $table->timestamp('sold_at')->useCurrent(); // Date de la vente (par défaut, la date actuelle)
            $table->timestamps(); // Colonnes `created_at` et `updated_at`
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
