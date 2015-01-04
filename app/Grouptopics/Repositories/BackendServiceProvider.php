<?php

namespace Grouptopics\Repositories;

use Illuminate\Support\ServiceProvider;

class BackendServiceProvider extends ServiceProvider
{
    public function register() {

        $this->app->bind(
            'Grouptopics\Repositories\Account\AccountInterface',
            'Grouptopics\Repositories\Account\AccountRepository'
        );


    }
}
