<?php

/*
|--------------------------------------------------------------------------
| Social Routes
|--------------------------------------------------------------------------
|
| Anything related to the Security Controller
|
*/


Route::get( 'social/auth', array( 'as' => 'hybridauthCallback', 'uses' => 'SocialController@process' ) );