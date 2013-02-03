<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Don't touch this file. Add routes to app/config/routes/foo.php
|
*/

foreach( glob( __DIR__ . '/config/routes/*.php' ) as $file ) {
    include( $file );
}