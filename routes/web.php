<?php

use App\Models\User;
use Inertia\Inertia;
use App\Models\Story;
use Spatie\Permission\Models\Role;
use App\Http\Resources\StoryResource;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;

Route::get('/', function () {
    $stories = Story::where("creator_id", auth()->id())->get();
    return Inertia::render('dashboard', [
        'stories' => $stories
    ]);
})->name('home');

Route::get('/create-permissions', function() {
    $permissions = [
        'stories.create',
        'stories.update',
        'characters.update',
        'scenes.update',
        'points.update',
        'settings.update',
        'features.update',
        'points.create',
        'nodes.delete',
        'edges.delete',
        'stories.delete'
    ];

    foreach ($permissions as $permission) {
        $permission = Permission::firstOrCreate(['name' => $permission]);
        $writer = Role::firstOrCreate(['name' => 'writer']);
        $writer->permissions()->syncWithoutDetaching($permission->id);
    }

    $user = User::find(1);
    $user->assignRole('writer');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $stories = Story::where("creator_id", auth()->id())->get();
        return Inertia::render('dashboard', [
            'stories' => StoryResource::collection($stories)->resolve()
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
