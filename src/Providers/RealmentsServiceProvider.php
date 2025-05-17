<?php

namespace Incodiy\Realments\Providers;

use Illuminate\Support\ServiceProvider;
use Incodiy\Realments\Services\FormBuilder;

class RealmentsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton('realments', function ($app) {
            return new FormBuilder();
        });

        $this->mergeConfigFrom(
            __DIR__ . '/../config/realments.php', 'realments'
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Publish configuration
        $this->publishes([
            __DIR__ . '/../config/realments.php' => config_path('realments.php'),
        ], 'realments-config');

        // Publish assets
        $this->publishes([
            __DIR__ . '/../Resources/js' => resource_path('js/vendor/incodiy/realments'),
            __DIR__ . '/../Resources/css' => resource_path('css/vendor/incodiy/realments'),
        ], 'realments-assets');

        // Publish language files
        $this->publishes([
            __DIR__ . '/../Resources/lang' => resource_path('lang/vendor/incodiy/realments'),
        ], 'realments-lang');

        // Load views
        $this->loadViewsFrom(__DIR__ . '/../Views', 'realments');

        // Publish views
        $this->publishes([
            __DIR__ . '/../Views' => resource_path('views/vendor/incodiy/realments'),
        ], 'realments-views');

        // Load routes
        $this->loadRoutesFrom(__DIR__ . '/../routes/web.php');

        // Load translations
        $this->loadTranslationsFrom(__DIR__ . '/../Resources/lang', 'realments');

        // Register commands
        if ($this->app->runningInConsole()) {
            $this->commands([
                // Register console commands here
            ]);
        }
    }
}
