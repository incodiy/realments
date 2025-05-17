<?php

namespace Incodiy\Realments\Facades;

use Illuminate\Support\Facades\Facade;

class Realments extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'realments';
    }
}
