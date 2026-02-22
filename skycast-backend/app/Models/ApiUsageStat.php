<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiUsageStat extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'endpoint', 'call_count', 'error_count'];

    protected $casts = [
        'date' => 'date',
        'call_count' => 'integer',
        'error_count' => 'integer',
    ];

    /**
     * Record a call for today.
     */
    /**
     * Record a call for today.
     */
    public static function recordUsage(string $endpoint = 'weather', bool $isError = false): void
    {
        $today = now()->toDateString();

        try {
            $stat = static::firstOrCreate(
                ['date' => $today, 'endpoint' => $endpoint],
                ['call_count' => 0, 'error_count' => 0]
            );
        } catch (\Illuminate\Database\QueryException $e) {
            // Race condition: another request created it between our check and insert
            $stat = static::where('date', $today)->where('endpoint', $endpoint)->first();
        }

        if ($stat) {
            $stat->increment('call_count');
            if ($isError) {
                $stat->increment('error_count');
            }
        }
    }
}
