<?php

// GET requests
Route::get('/', 'ViewController@index');
Route::get('/about', array('as' => 'about', 'uses' => 'ViewController@about'));
Route::get('/login', array('as' => 'login', 'uses' => 'AccountController@login'));
Route::get('/signup', array('as' => 'signup', 'uses' => 'AccountController@signup'));
Route::get('/logout', 'AccountController@destroy');
// show the public profile, votes, topics, presentations and etc.
Route::get('/profile/{username}', 'AccountController@showPublicProfile');


// GROUPS requests requiring Auth
Route::group(array('before' => 'auth'), function()
{
	Route::get('/account', 'AccountController@account');
    Route::get('/account/settings', 'AccountController@accountSettings');
});

// POST requests
Route::post('/signup', 'AccountController@create');
Route::post('/login', 'AccountController@store');


// GROUPS request that require admin privileges
Route::group(array('prefix' => 'manage'), function()
{
    Route::get('manage', function()
    {
    	return "ADMIN!";
    });
});


// JUNK - for testing specific functions as needed
Route::get('utils', function()
{
    // dd mysql configuration from database.php
    // dd(Config::get('database.connections.mysql'));
    // dd(App::environment());

    // $users = User::all();
    // dd($users);
});