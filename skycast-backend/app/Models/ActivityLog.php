<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_email',
        'action',
        'resource_type',
        'resource_id',
        'changes',
        'ip_address'
    ];

    protected $casts = [
        'changes' => 'array',
    ];
}
