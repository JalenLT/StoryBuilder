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
        Schema::create('edges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('source')->constrained('nodes')->cascadeOnDelete();
            $table->foreignId('target')->constrained('nodes')->cascadeOnDelete();
            $table->string('type');
            $table->string('label')->nullable();
            $table->foreignId('story_id')->constrained('stories')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('edges');
    }
};
