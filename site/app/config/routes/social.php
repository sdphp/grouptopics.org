<?php

/*
|--------------------------------------------------------------------------
| Social Routes
|--------------------------------------------------------------------------
|
| Anything related to the Security Controller
|
*/


// Security Routes
Route::group(array('as' => 'socialRoutes'), function () {
    Route::get( 'social/auth', array( 'as' => 'hybridauthCallback', 'uses' => 'SocialController@process' ) );
});