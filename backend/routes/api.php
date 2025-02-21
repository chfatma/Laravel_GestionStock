<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StockEntryController;// Product Routes
Route::apiResource('products', ProductController::class)->middleware('auth');
Route::apiResource('sales', SaleController::class)->middleware('auth');
Route::apiResource('users', UserController::class)->middleware('auth');
Route::apiResource('stock-entries', StockEntryController::class)->middleware('auth');



// Product Routes
Route::apiResource('products', ProductController::class);
Route::apiResource('sales', SaleController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('stock-entries', StockEntryController::class);
Route::get('/most-sold-products', [SaleController::class, 'mostSoldProducts']);

Route::post('/login', [UserController::class, 'login']);