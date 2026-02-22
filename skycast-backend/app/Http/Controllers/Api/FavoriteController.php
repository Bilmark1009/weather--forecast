<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FavoriteCity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $token = $request->header('X-Browser-Token');

        if (!$token) {
            return response()->json([]);
        }

        $favorites = FavoriteCity::where('browser_token', $token)
            ->orderBy('created_at', 'desc')
            ->get(['id', 'city', 'country_code', 'created_at']);

        return response()->json($favorites);
    }

    public function store(Request $request): JsonResponse
    {
        $token = $request->header('X-Browser-Token');

        $validated = $request->validate([
            'city' => 'required|string|max:100',
            'country_code' => 'nullable|string|max:10',
        ]);

        if (!$token) {
            return response()->json(['error' => 'Browser token is required.'], 422);
        }

        // Prevent duplicates
        $exists = FavoriteCity::where('browser_token', $token)
            ->whereRaw('LOWER(city) = ?', [strtolower($validated['city'])])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'City is already in favorites.'], 200);
        }

        $favorite = FavoriteCity::create([
            'browser_token' => $token,
            'city' => $validated['city'],
            'country_code' => $validated['country_code'] ?? null,
        ]);

        return response()->json($favorite, 201);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $token = $request->header('X-Browser-Token');

        $favorite = FavoriteCity::where('id', $id)
            ->where('browser_token', $token)
            ->firstOrFail();

        $favorite->delete();

        return response()->json(['message' => 'Removed from favorites.']);
    }
}
