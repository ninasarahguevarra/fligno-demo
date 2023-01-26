<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FavoritesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('favorites:sanctum')->post('/favorites', function (Request $request) {
    return $request->favorites();
});
Route::middleware('favorites:sanctum')->get('/favorites', function (Request $request) {
    return $request->favorites();
});
Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);
Route::post('/favorites/add', [FavoritesController::class, 'addToFavorites']);
Route::post('/favorites/delete', [FavoritesController::class, 'removeFromFavorites']);
Route::get('/favorites/list', [FavoritesController::class, 'showFavorites']);