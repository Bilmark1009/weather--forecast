<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ApiUsageStatResource\Pages;
use App\Models\ApiUsageStat;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ApiUsageStatResource extends Resource
{
    protected static ?string $model = ApiUsageStat::class;

    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';

    protected static ?string $navigationGroup = 'Monitoring';

    protected static ?string $navigationLabel = 'API Usage Stats';

    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\DatePicker::make('date')->disabled(),
            Forms\Components\TextInput::make('endpoint')->disabled(),
            Forms\Components\TextInput::make('call_count')->disabled()->numeric(),
            Forms\Components\TextInput::make('error_count')->disabled()->numeric(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('date')
                    ->date()
                    ->sortable(),

                Tables\Columns\TextColumn::make('endpoint')
                    ->badge()
                    ->color('primary'),

                Tables\Columns\TextColumn::make('call_count')
                    ->label('Total Calls')
                    ->sortable()
                    ->numeric(),

                Tables\Columns\TextColumn::make('error_count')
                    ->label('Errors')
                    ->sortable()
                    ->numeric()
                    ->color(fn($state) => $state > 0 ? 'danger' : 'success'),
            ])
            ->defaultSort('date', 'desc')
            ->filters([
                Tables\Filters\Filter::make('date')
                    ->form([
                        Forms\Components\DatePicker::make('from'),
                        Forms\Components\DatePicker::make('until'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['from'], fn($q) => $q->whereDate('date', '>=', $data['from']))
                            ->when($data['until'], fn($q) => $q->whereDate('date', '<=', $data['until']));
                    }),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
            ]);
    }

    public static function canCreate(): bool
    {
        return false; // Stats are auto-generated
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageApiUsageStats::route('/'),
        ];
    }
}
