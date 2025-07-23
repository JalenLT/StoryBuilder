<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoryController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('stories')->name('stories.')->controller(StoryController::class)->group(function () {
        Route::post('/', 'store')->name('store');
        Route::post('genres/update', 'updateGenres')->name('genres.update');
        Route::post('tags/update', 'updateTags')->name('tags.update');
    });

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
