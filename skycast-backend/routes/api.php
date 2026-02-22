<?php

use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\FeaturedCityController;
use App\Http\Controllers\Api\FeedbackController;
use App\Http\Controllers\Api\WeatherController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| SkyCast API Routes
|--------------------------------------------------------------------------
*/

// Weather (proxied from OpenWeatherMap)
Route::prefix('weather')->group(function () {
    Route::get('/current', [WeatherController::class, 'current']);
    Route::get('/forecast', [WeatherController::class, 'forecast']);
});

// Featured cities (admin-curated)
Route::get('/featured-cities', [FeaturedCityController::class, 'index']);

// User feedback / bug reports
Route::post('/feedback', [FeedbackController::class, 'store']);

// Favorites (keyed by browser token header)
Route::prefix('favorites')->group(function () {
    Route::get('/', [FavoriteController::class, 'index']);
    Route::post('/', [FavoriteController::class, 'store']);
    Route::delete('/{id}', [FavoriteController::class, 'destroy']);
});
