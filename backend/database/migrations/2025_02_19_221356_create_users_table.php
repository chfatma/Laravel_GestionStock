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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Colonne `id` (clé primaire)
            $table->string('name'); // Nom de l'utilisateur
            $table->string('email')->unique(); // Email de l'utilisateur (unique)
            $table->string('password'); // Mot de passe (hashé)
            $table->enum('role', ['admin', 'employee'])->default('admin'); // Rôle de l'utilisateur (admin ou employee)
            $table->timestamps(); // Colonnes `created_at` et `updated_at`
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
