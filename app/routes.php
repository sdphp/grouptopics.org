<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::group( array( 'as' => 'index' ), function() {
	Route::get( '/', array( 'as' => 'homepage', 'uses' => 'IndexController@index' ) );
} );

// Security Routes
Route::group( array( 'as' => 'security' ), function() {
	
	// Get
	Route::get('login', array( 'as' => 'login', 'uses' => 'SecurityController@login' ) );

	// Posts
	Route::post('login', array( 'as' => 'login_post', 'uses' => 'SecurityController@loginSubmit' ) );
} );
