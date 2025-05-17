<?php

namespace Incodiy\Realments\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Incodiy\Realments\Services\FormBuilder;

class RealmentsController extends Controller
{
    /**
     * The form builder instance.
     *
     * @var \Incodiy\Realments\Services\FormBuilder
     */
    protected $formBuilder;

    /**
     * Create a new controller instance.
     *
     * @param  \Incodiy\Realments\Services\FormBuilder  $formBuilder
     * @return void
     */
    public function __construct(FormBuilder $formBuilder)
    {
        $this->formBuilder = $formBuilder;
    }

    /**
     * Get the available CSS frameworks.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCssFrameworks()
    {
        return response()->json(config('realments.css_frameworks'));
    }

    /**
     * Get the available WYSIWYG editors.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getWysiwygEditors()
    {
        return response()->json(config('realments.wysiwyg_editors'));
    }

    /**
     * Get the available locales.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLocales()
    {
        return response()->json(config('realments.i18n.available_locales'));
    }

    /**
     * Get translations for a specific locale.
     *
     * @param  string  $locale
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTranslations($locale)
    {
        $translations = [];
        
        // Load translations from the specified locale
        $path = __DIR__ . '/../Resources/lang/' . $locale;
        
        if (file_exists($path)) {
            foreach (glob($path . '/*.php') as $file) {
                $key = basename($file, '.php');
                $translations[$key] = require $file;
            }
        }
        
        return response()->json($translations);
    }
}
