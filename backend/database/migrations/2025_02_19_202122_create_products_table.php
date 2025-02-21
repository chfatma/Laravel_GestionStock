<?php





use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name'); // Product name
            $table->string('category'); // Product category
            $table->integer('quantity'); // Product quantity
            $table->decimal('price', 8, 2); // Product price (8 digits total, 2 decimal places)
            $table->integer('stock_alert'); // Stock alert threshold
            $table->timestamps(); // Created at and updated at timestamps
        });
    }
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
