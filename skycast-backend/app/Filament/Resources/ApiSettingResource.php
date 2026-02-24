<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ApiSettingResource\Pages;
use App\Models\ApiSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ApiSettingResource extends Resource
{
    protected static ?string $model = ApiSetting::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationGroup = 'Configuration';

    protected static ?string $navigationLabel = 'API Settings';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('key')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(100)
                    ->columnSpan(1),

                Forms\Components\TextInput::make('value')
                    ->required()
                    ->maxLength(500)
                    ->password(fn($record) => $record?->key === 'owm_api_key')
                    ->columnSpan(1),

                Forms\Components\TextInput::make('description')
                    ->maxLength(255)
                    ->columnSpanFull(),
            ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('key')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('primary'),

                Tables\Columns\TextColumn::make('value')
                    ->limit(60)
                    ->formatStateUsing(
                        fn($state, $record) =>
                        $record->key === 'owm_api_key'
                        ? str_repeat('•', min(strlen($state), 20))
                        : $state
                    ),

                Tables\Columns\TextColumn::make('description')
                    ->limit(60)
                    ->color('gray'),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Last Updated'),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageApiSettings::route('/'),
        ];
    }
}
