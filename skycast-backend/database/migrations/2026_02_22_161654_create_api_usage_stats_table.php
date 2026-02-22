<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('api_usage_stats', function (Blueprint $table) {
            $table->id();
            $table->date('date')->index();
            $table->string('endpoint')->default('weather');
            $table->unsignedInteger('call_count')->default(0);
            $table->unsignedInteger('error_count')->default(0);
            $table->timestamps();

            $table->unique(['date', 'endpoint']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('api_usage_stats');
    }
};
