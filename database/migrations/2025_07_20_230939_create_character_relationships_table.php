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
        Schema::create('character_relationships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('character_a_id')->constrained('characters')->cascadeOnDelete();
            $table->foreignId('character_b_id')->constrained('characters')->cascadeOnDelete();
            $table->string('type');
            $table->text('notes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('character_relationships');
    }
};
