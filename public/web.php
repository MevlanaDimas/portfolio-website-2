<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use App\Models\About;
use App\Models\Project;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'viewHome'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'abouts' => About::all(),
            'projects' => Project::all(),
        ]);
    })->name('dashboard');

    // About Resource Routes
    Route::resource('about', AboutController::class)->except(['show']);
    Route::patch('/about/{id}/activating', [AboutController::class, 'activatingAbout'])->name('about.activating');

    // Project Resource Routes
    Route::resource('project', ProjectController::class)->except(['show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
