<?php

use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;

Route::get('/', function () {
    return Inertia::render('board_view');
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
        // $token = User::find(auth()->id())->createToken('storybuilder')->plainTextToken;
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
