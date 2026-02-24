<?php

namespace App\Filament\Resources\ApiUsageStatResource\Pages;

use App\Filament\Resources\ApiUsageStatResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageApiUsageStats extends ManageRecords
{
    protected static string $resource = ApiUsageStatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Auto-generated, no create action
        ];
    }
}
