<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectsController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/dashboard', '/about');

    Route::prefix('about')->controller(AboutController::class)->group(function () {
        Route::get('/', 'index')->name('about.index');
        Route::post('/', 'store')->name('about.store');
        Route::post('/{id}', 'update')->name('about.update');
        Route::delete('/{id}', 'destroy')->name('about.destroy');
        Route::patch('/{id}/activate', 'activate')->name('about.acivate');
    });

    Route::prefix('project')->controller(ProjectsController::class)->group(function () {
        Route::get('/', 'index')->name('project.index');
        Route::post('/', 'store')->name('project.store');
        Route::post('/{id}', 'update')->name('project.update');
        Route::delete('/{id}', 'destroy')->name('project.destroy');
    });
});

require __DIR__.'/settings.php';
