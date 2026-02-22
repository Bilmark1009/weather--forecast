<?php

namespace Database\Seeders;

use App\Models\ApiSetting;
use App\Models\FeaturedCity;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User
        User::updateOrCreate(
            ['email' => 'admin@skycast.com'],
            [
                'name' => 'SkyCast Admin',
                'password' => Hash::make('password'),
            ]
        );

        // Default API Settings
        ApiSetting::set('owm_api_key', env('OWM_API_KEY', 'your_openweathermap_api_key_here'), 'OpenWeatherMap API Key');
        ApiSetting::set('owm_base_url', 'https://api.openweathermap.org/data/2.5', 'API Base URL');
        ApiSetting::set('owm_units', 'metric', 'Temperature units (metric, imperial, kelvin)');

        // Featured Cities
        $cities = [
            ['city' => 'London', 'country_code' => 'GB', 'country_name' => 'United Kingdom', 'display_order' => 1],
            ['city' => 'New York', 'country_code' => 'US', 'country_name' => 'United States', 'display_order' => 2],
            ['city' => 'Tokyo', 'country_code' => 'JP', 'country_name' => 'Japan', 'display_order' => 3],
            ['city' => 'Paris', 'country_code' => 'FR', 'country_name' => 'France', 'display_order' => 4],
            ['city' => 'Dubai', 'country_code' => 'AE', 'country_name' => 'United Arab Emirates', 'display_order' => 5],
        ];

        foreach ($cities as $city) {
            FeaturedCity::updateOrCreate(['city' => $city['city']], $city);
        }
    }
}
