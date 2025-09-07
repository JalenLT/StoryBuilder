<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scene_points', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scene_id')->constrained('scenes')->cascadeOnDelete();
            $table->foreignId('point_id')->constrained('points')->cascadeOnDelete();
            $table->integer('index');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scene_points');
    }
};
