<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApiSetting;
use App\Models\ApiUsageStat;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherController extends Controller
{
    private function getApiConfig(): array
    {
        return [
            'key' => ApiSetting::get('owm_api_key', env('OWM_API_KEY', '')),
            'baseUrl' => ApiSetting::get('owm_base_url', env('OWM_BASE_URL', 'https://api.openweathermap.org/data/2.5')),
            'units' => ApiSetting::get('owm_units', env('OWM_UNITS', 'metric')),
        ];
    }

    public function current(Request $request): JsonResponse
    {
        $city = $request->query('city');

        if (!$city) {
            return response()->json(['error' => 'City parameter is required.'], 422);
        }

        $config = $this->getApiConfig();

        try {
            $response = Http::timeout(10)->get("{$config['baseUrl']}/weather", [
                'q' => $city,
                'appid' => $config['key'],
                'units' => $config['units'],
                'uvi' => '1', // Include UV index data
            ]);

            $isError = $response->failed();
            ApiUsageStat::recordUsage('current', $isError);

            if ($response->status() === 404) {
                return response()->json(['error' => "City \"{$city}\" not found. Please check the spelling and try again."], 404);
            }

            if ($isError) {
                return response()->json(['error' => 'Weather service is unavailable. Please try again later.'], $response->status());
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            ApiUsageStat::recordUsage('current', true);
            Log::error('OWM current weather error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to connect to the weather service.'], 503);
        }
    }

    public function forecast(Request $request): JsonResponse
    {
        $city = $request->query('city');

        if (!$city) {
            return response()->json(['error' => 'City parameter is required.'], 422);
        }

        $config = $this->getApiConfig();

        try {
            $response = Http::timeout(10)->get("{$config['baseUrl']}/forecast", [
                'q' => $city,
                'appid' => $config['key'],
                'units' => $config['units'],
                'cnt' => 40, // 5 days × 8 three-hour slots
            ]);

            $isError = $response->failed();
            ApiUsageStat::recordUsage('forecast', $isError);

            if ($response->status() === 404) {
                return response()->json(['error' => "City \"{$city}\" not found."], 404);
            }

            if ($isError) {
                return response()->json(['error' => 'Weather service is unavailable.'], $response->status());
            }

            // Group forecast by day and return one entry per day
            $data = $response->json();
            $days = $this->groupForecastByDay($data['list'] ?? []);

            return response()->json([
                'city' => $data['city'] ?? null,
                'forecast' => $days,
            ]);
        } catch (\Exception $e) {
            ApiUsageStat::recordUsage('forecast', true);
            Log::error('OWM forecast error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to connect to the weather service.'], 503);
        }
    }

    private function groupForecastByDay(array $list): array
    {
        $days = [];
        foreach ($list as $item) {
            $date = date('Y-m-d', $item['dt']);
            if (!isset($days[$date])) {
                $days[$date] = [
                    'date' => $date,
                    'temp_min' => $item['main']['temp_min'],
                    'temp_max' => $item['main']['temp_max'],
                    'humidity' => $item['main']['humidity'],
                    'icon' => $item['weather'][0]['icon'] ?? '01d',
                    'description' => $item['weather'][0]['description'] ?? '',
                    'main' => $item['weather'][0]['main'] ?? '',
                    'wind_speed' => $item['wind']['speed'] ?? 0,
                    'dt' => $item['dt'],
                ];
            } else {
                $days[$date]['temp_min'] = min($days[$date]['temp_min'], $item['main']['temp_min']);
                $days[$date]['temp_max'] = max($days[$date]['temp_max'], $item['main']['temp_max']);
            }
        }

        return array_values(array_slice($days, 0, 5));
    }
}
