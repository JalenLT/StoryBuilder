<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\EdgeController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\PointController;
use App\Http\Controllers\SceneController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\NodeController;
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
        Route::post('update', 'update')->name('update');
        Route::post('connect-feature', 'connectFeature')->name('connect-feature');
    });

    Route::prefix('features')->name('features.')->controller(FeatureController::class)->group(function () {
        Route::get('{id}', 'get')->name('get');
        Route::get('get-all-per-story/{id}', 'getAllPerStory')->name('get-all-per-story');
        Route::post('store', 'store')->name('store');
        Route::post('update', 'update')->name('update');
    });

    Route::prefix('genres')->name('genres.')->controller(GenreController::class)->group(function () {
        Route::get('get-all', 'getAll')->name('get-all');
        Route::post('store', 'store')->name('store');
        Route::post('update', 'update')->name('update');
    });

    Route::prefix('tags')->name('tags.')->controller(TagController::class)->group(function () {
        Route::get('get-all', 'getAll')->name('get-all');
        Route::post('store', 'store')->name('store');
        Route::post('update', 'update')->name('update');
    });

    Route::prefix('points')->name('points.')->controller(PointController::class)->group(function(){
        Route::get('{id}', 'get')->name('get');
        Route::get('get-all-per-block/{block_id}', 'getAllPerBlock')->name('get-all-per-block');
        Route::get('get-all', 'getAll')->name('get-all');
        Route::post('store', 'store')->name('store');
        Route::post('update', 'update')->name('update');
    });

    Route::prefix('scenes')->name('scenes.')->controller(SceneController::class)->group(function () {
        Route::get('{id}', 'get')->name('get');
        Route::get('get-all-per-story/{id}', 'getAllPerStory')->name('get-all-per-story');
        Route::post('store', 'store')->name('store');
        Route::post('update', 'update')->name('update');
    });

    Route::prefix('characters')->name('characters.')->controller(CharacterController::class)->group(function () {
        Route::get('{id}', 'get')->name('get');
        Route::get('get-all-per-story/{id}', 'getAllPerStory')->name('get-all-per-story');
        Route::post('store', 'store')->name('store');
        Route::post('update', 'update')->name('update');
        Route::post('store-character-relationship', 'storeCharacterRelationship')->name('store-character-relationship');
        Route::post('store-character-involvement', 'storeCharacterInvolvement')->name('store-character-involvement');
    });

    Route::prefix('nodes')->name('nodes.')->controller(NodeController::class)->group(function () {
        Route::get('{id}', 'get')->name('get');
        Route::get('get-all/{story_id}', 'getAll')->name('get-all');
        Route::post('store', 'store')->name('store');
        Route::post('update', 'update')->name('update');
        Route::post('delete', 'delete')->name('delete');
    });

    Route::prefix('edges')->name('edges.')->controller(EdgeController::class)->group(function () {
        Route::get('{id}', 'get')->name('get');
        Route::post('store', 'store')->name('store');
        Route::post('update', 'update')->name('update');
        Route::post('delete', 'delete')->name('delete');
    });
});
