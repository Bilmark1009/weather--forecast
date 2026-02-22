<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:150',
            'type' => 'required|in:feedback,bug_report',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|max:2000',
        ]);

        Feedback::create($validated);

        return response()->json(['message' => 'Thank you! Your feedback has been received.'], 201);
    }
}
