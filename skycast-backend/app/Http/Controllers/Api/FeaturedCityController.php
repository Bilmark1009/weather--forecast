<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeaturedCity;
use Illuminate\Http\JsonResponse;

class FeaturedCityController extends Controller
{
    public function index(): JsonResponse
    {
        $cities = FeaturedCity::active()->get(['id', 'city', 'country_code', 'country_name', 'display_order']);
        return response()->json($cities);
    }
}
