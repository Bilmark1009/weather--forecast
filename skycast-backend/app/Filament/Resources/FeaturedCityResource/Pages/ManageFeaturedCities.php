<?php

namespace App\Filament\Resources\FeaturedCityResource\Pages;

use App\Filament\Resources\FeaturedCityResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageFeaturedCities extends ManageRecords
{
    protected static string $resource = FeaturedCityResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
