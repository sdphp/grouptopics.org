<?php

/*
|--------------------------------------------------------------------------
| Security Controller Routes
|--------------------------------------------------------------------------
|
| Anything related to the Security Controller
|
*/



Route::get( 'login', array( 'as' => 'login', 'uses' => 'SecurityController@login' ) );
Route::post( 'login', array( 'as' => 'login_post', 'uses' => 'SecurityController@loginSubmit' ) );

Route::get( 'login/provider/{provider}', array( 'as'   => 'providerLogin', 'uses' => 'SecurityController@provider' ) );

Route::get( 'logout', array( 'as' => 'logout', 'uses' => 'SecurityController@logout' ) );