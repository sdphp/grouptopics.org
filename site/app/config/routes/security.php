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
Route::group(
    array( 'as' => 'securityRoutes' ),
    function () {

        // Login
        Route::group(
            array( 'as' => 'loginGroup' ),
            function () {
                Route::get( 'login', array( 'as' => 'login', 'uses' => 'SecurityController@login' ) );
                Route::post( 'login', array( 'as' => 'login_post', 'uses' => 'SecurityController@loginSubmit' ) );
            }
        );

        Route::group(
            array( 'as' => 'providerGroup' ),
            function () {
                Route::get( 'login/provider/{provider}', array( 'as'   => 'providerLogin', 'uses' => 'SecurityController@provider' ) );
            }
        );

        // Logout
        Route::group(
            array( 'as' => 'logoutGroup' ),
            function () {
                Route::get( 'logout', array( 'as' => 'logout', 'uses' => 'SecurityController@logout' ) );
            }
        );
    }
);