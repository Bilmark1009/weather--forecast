<?php

namespace App\Filament\Widgets;

use App\Models\ApiUsageStat;
use App\Models\FeaturedCity;
use App\Models\Feedback;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $todayCalls = ApiUsageStat::whereDate('date', now()->toDateString())->sum('call_count');
        $todayErrors = ApiUsageStat::whereDate('date', now()->toDateString())->sum('error_count');
        $openFeedback = Feedback::where('status', 'open')->count();
        $featuredCities = FeaturedCity::where('is_active', true)->count();

        return [
            Stat::make('API Calls Today', $todayCalls)
                ->description($todayErrors . ' errors today')
                ->descriptionIcon($todayErrors > 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-check-circle')
                ->color($todayErrors > 0 ? 'danger' : 'success'),
            Stat::make('Open Feedback', $openFeedback)
                ->description('Pending reviews')
                ->descriptionIcon('heroicon-m-chat-bubble-left-right')
                ->color('warning'),
            Stat::make('Featured Cities', $featuredCities)
                ->description('Active cities on homepage')
                ->descriptionIcon('heroicon-m-map-pin')
                ->color('info'),
        ];
    }
}
