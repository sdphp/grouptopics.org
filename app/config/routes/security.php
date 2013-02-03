<?php

/*
|--------------------------------------------------------------------------
| Security Controller Routes
|--------------------------------------------------------------------------
|
| Anything related to the Security Controller
|
*/


// Security Routes
Route::group(array('as' => 'securityRoutes'), function () {

// Login
    Route::group(array('as' => 'login'), function () {
        Route::get('login', array('as' => 'login', 'uses' => 'SecurityController@login'));
        Route::post('login', array('as' => 'login_post', 'uses' => 'SecurityController@loginSubmit'));
    });

// Logout
    Route::group(array('as' => 'logout'), function () {
        Route::get('logout', array('as' => 'logout', 'uses' => 'SecurityController@logout'));
    });
});