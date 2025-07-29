<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\SettingController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::prefix('stories')->name('stories.')->controller(StoryController::class)->group(function () {
        Route::post('store', 'store')->name('store');
        Route::post('genres/update', 'updateGenres')->name('genres.update');
        Route::post('tags/update', 'updateTags')->name('tags.update');

        Route::get('{id}', 'getStory')->name('get');
        Route::get('get-all', 'getCurrentUserStories')->name('get-all');
    });

    Route::prefix('settings')->name('settings.')->controller(SettingController::class)->group(function () {
        Route::get('{id}', 'get')->name('get');
        Route::get('get-all-per-story/{id}', 'getAllPerStory')->name('get-all-per-story');
        Route::post('store', 'store')->name('store');
    });
});
