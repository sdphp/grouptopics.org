<?php

/*
|--------------------------------------------------------------------------
| Index Controller Routes
|--------------------------------------------------------------------------
|
| Anything related to the Index Controller
|
*/


Route::group(array('as' => 'indexRoutes'), function () {
    Route::get('/', array('as' => 'homepage', 'uses' => 'IndexController@index'));
});