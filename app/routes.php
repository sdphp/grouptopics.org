<?php

// GET requests
Route::get('/', array(
		'as' => 'home',
		'uses' => 'ViewController@pageHome'
));

Route::get('/login', array(
	'as' => 'login',
	'uses' => 'ViewController@pageLogin'
));

Route::get('/about', array(
	'as' => 'about',
	'uses' => 'ViewController@pageAbout'
));

Route::get('/signup', array(
	'as'=> 'signup',
	'uses' => 'ViewController@pageSignup'
));

Route::get('/logout', array(
	'as' => 'action.logout',
	'uses' => 'AccountController@actionLogout'
));

Route::get('/profile/{username}', array(
	'as' => 'profile.view',
	'uses' =>'AccountController@showPublicProfile'
));

// GROUP requests requiring Auth
Route::group(array(
	'before' => 'auth'
), function()
{
	Route::get('/account', array(
		'as' => 'auth.account',
		'uses' => 'AccountController@account'
	));

    Route::get('/account/settings', array(
		'as' => 'auth.account.settings',
		'uses' => 'AccountController@accountSettings'
	));
});


// POST requests
Route::post('/signup', array(
	'as' => 'action.signup',
	'uses' => 'AccountController@create'
));

Route::post('/login', array(
	'as' => 'action.login',
	'uses' => 'AccountController@store'
));

// GROUP request that require admin privileges
Route::group(array(
	'prefix' => 'manage'
), function()
{
    Route::get('manage', function()
    {
    	return "ADMIN!";
    });
});
