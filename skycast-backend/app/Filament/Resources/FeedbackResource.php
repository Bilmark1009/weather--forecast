<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FeedbackResource\Pages;
use App\Models\Feedback;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class FeedbackResource extends Resource
{
    protected static ?string $model = Feedback::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationGroup = 'Community';

    protected static ?string $navigationLabel = 'Feedback & Reports';

    protected static ?int $navigationSort = 3;

    public static function getNavigationBadge(): ?string
    {
        return (string) static::getModel()::where('status', 'open')->count() ?: null;
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'warning';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Submission Details')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Submitter Name')
                            ->disabled(),

                        Forms\Components\TextInput::make('email')
                            ->label('Email')
                            ->disabled(),

                        Forms\Components\Select::make('type')
                            ->options(['feedback' => 'Feedback', 'bug_report' => 'Bug Report'])
                            ->disabled(),

                        Forms\Components\TextInput::make('subject')
                            ->disabled()
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('message')
                            ->disabled()
                            ->rows(5)
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Admin Response')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options([
                                'open' => 'Open',
                                'resolved' => 'Resolved',
                                'dismissed' => 'Dismissed',
                            ])
                            ->required(),

                        Forms\Components\Textarea::make('admin_notes')
                            ->label('Admin Notes')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime()
                    ->sortable(),

                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn($state) => match ($state) {
                        'bug_report' => 'danger',
                        default => 'info',
                    }),

                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->default('Anonymous'),

                Tables\Columns\TextColumn::make('subject')
                    ->limit(40)
                    ->searchable(),

                Tables\Columns\TextColumn::make('message')
                    ->limit(60)
                    ->searchable(),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn($state) => match ($state) {
                        'open' => 'warning',
                        'resolved' => 'success',
                        'dismissed' => 'gray',
                        default => 'gray',
                    }),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(['open' => 'Open', 'resolved' => 'Resolved', 'dismissed' => 'Dismissed']),

                Tables\Filters\SelectFilter::make('type')
                    ->options(['feedback' => 'Feedback', 'bug_report' => 'Bug Report']),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Review'),
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
            'index' => Pages\ManageFeedbacks::route('/'),
        ];
    }
}
