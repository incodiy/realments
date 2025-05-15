<?php
namespace Incodiy\Realments;

use Illuminate\Support\ServiceProvider;

class RealmentsServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Merge default config
        $this->mergeConfigFrom(__DIR__.'/../config/realments.php', 'realments');

        // Bind a singleton Realments instance
        $this->app->singleton('realments', function ($app) {
            return new Realments();
        });
    }

    public function boot()
    {
        // Publish configuration
        $this->publishes([
            __DIR__.'/../config/realments.php' => config_path('realments.php'),
        ], 'realments-config');

        // Publish compiled React assets
        $this->publishes([
            // __DIR__.'/../public/vendor/realments/js/realments.js' => public_path('vendor/realments/js/realments.js'),
            // __DIR__.'/../resources/js/realments/index.js' => resource_path('js/realments/index.js'),
            __DIR__.'/../resources/js/' => resource_path('js/'),
            __DIR__.'/../resources/views/' => resource_path('views/'),
        ], 'realments-assets');

        // Publish views
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'realments');
        
        // Blade directive custom
        \Blade::directive('realmentsForm', function () {
            return "<?php echo view('realments::index')->render(); ?>";
        });

        \Blade::directive('realmentsScripts', function () {
            return "<?php echo view('realments::scripts')->render(); ?>";
        });
    }
}
