<?php

namespace Incodiy\Realments\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Incodiy\Realments\Services\FormBuilder;

class RealmentsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // Register the FormBuilder service
        $this->app->singleton('realments', function ($app) {
            return new FormBuilder();
        });
        
        // Merge config
        $this->mergeConfigFrom(
            __DIR__.'/../config/realments.php', 'realments'
        );
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // Load views
        $this->loadViewsFrom(__DIR__.'/../Views', 'realments');
        
        // Load routes
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
        
        // Load translations
        $this->loadTranslationsFrom(__DIR__.'/../Resources/lang', 'realments');
        
        // Publish config
        $this->publishes([
            __DIR__.'/../config/realments.php' => config_path('realments.php'),
        ], 'realments-config');
        
        // Publish views
        $this->publishes([
            __DIR__.'/../Views' => resource_path('views/vendor/realments'),
        ], 'realments-views');
        
        // Publish language files
        $this->publishes([
            __DIR__.'/../Resources/lang' => resource_path('lang/vendor/realments'),
        ], 'realments-lang');
        
        // Publish assets
        $this->publishes([
            __DIR__.'/../Resources/js' => resource_path('js/vendor/incodiy/realments'),
            __DIR__.'/../dist' => public_path('vendor/incodiy/realments'),
        ], 'realments-assets');
        
        // Register Blade components
        Blade::component('realments::partials.head', 'realments-head');
        Blade::component('realments::partials.scripts', 'realments-scripts');
    }
}
