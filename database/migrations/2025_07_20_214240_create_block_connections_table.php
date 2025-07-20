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
        Schema::create('block_connections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('block_a_id')->constrained('blocks')->cascadeOnDelete();
            $table->foreignId('block_b_id')->constrained('blocks')->cascadeOnDelete();
            $table->text('notes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('block_connections');
    }
};
