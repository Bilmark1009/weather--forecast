<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ActivityLogResource\Pages;
use App\Models\ActivityLog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ActivityLogResource extends Resource
{
    protected static ?string $model = ActivityLog::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';

    protected static ?string $navigationGroup = 'Monitoring';

    protected static ?string $navigationLabel = 'Activity Logs';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('admin_email')->disabled(),
            Forms\Components\TextInput::make('action')->disabled(),
            Forms\Components\TextInput::make('resource_type')->disabled(),
            Forms\Components\TextInput::make('resource_id')->disabled(),
            Forms\Components\Textarea::make('changes')->disabled()->columnSpanFull(),
            Forms\Components\TextInput::make('ip_address')->disabled(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Time')
                    ->dateTime()
                    ->sortable(),

                Tables\Columns\TextColumn::make('admin_email')
                    ->label('Admin')
                    ->searchable(),

                Tables\Columns\TextColumn::make('action')
                    ->badge()
                    ->color(fn($state) => match (true) {
                        str_contains($state, 'Created') => 'success',
                        str_contains($state, 'Updated') => 'info',
                        str_contains($state, 'Deleted') => 'danger',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('resource_type')
                    ->label('Resource')
                    ->searchable(),

                Tables\Columns\TextColumn::make('resource_id')
                    ->label('ID'),

                Tables\Columns\TextColumn::make('ip_address')
                    ->label('IP'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('from'),
                        Forms\Components\DatePicker::make('until'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['from'], fn($q) => $q->whereDate('created_at', '>=', $data['from']))
                            ->when($data['until'], fn($q) => $q->whereDate('created_at', '<=', $data['until']));
                    }),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
            ]);
    }

    public static function canCreate(): bool
    {
        return false; // Logs are written programmatically
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageActivityLogs::route('/'),
        ];
    }
}
