<?php

/*
|--------------------------------------------------------------------------
| Index Controller Routes
|--------------------------------------------------------------------------
|
| Anything related to the Index Controller
|
*/


Route::get('/', array('as' => 'homepage', 'uses' => 'IndexController@index'));
