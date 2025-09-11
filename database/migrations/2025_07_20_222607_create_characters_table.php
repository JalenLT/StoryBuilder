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
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('alias')->nullable();
            $table->text('description')->nullable();
            $table->text('background')->nullable();
            $table->integer('age')->nullable();
            $table->string('gender')->nullable();
            $table->text('motivation')->nullable();
            $table->foreignId('story_id')->nullable()->constrained('stories')->cascadeOnDelete();
            $table->foreignId('creator_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->foreignId('setting_id')->nullable()->constrained('settings')->nullOnDelete();
            $table->foreignId('node_id')->nullable()->constrained('nodes')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
