<?php

namespace Incodiy\Realments\routes;

use Illuminate\Support\Facades\Route;
use Incodiy\Realments\Http\Controllers\RealmentsController;

Route::group(['prefix' => 'api/realments', 'middleware' => ['web']], function () {
    Route::get('/css-frameworks', [RealmentsController::class, 'getCssFrameworks']);
    Route::get('/wysiwyg-editors', [RealmentsController::class, 'getWysiwygEditors']);
    Route::get('/locales', [RealmentsController::class, 'getLocales']);
    Route::get('/translations/{locale}', [RealmentsController::class, 'getTranslations']);
});
