<?php

// GET requests
Route::get('/', 'ViewController@index');
Route::get('/login', 'AccountController@login');
Route::get('/signup', 'AccountController@signup');
Route::get('/account', 'AccountController@index')->before('auth');
Route::get('/logout', 'AccountController@destroy');

// JUNK - for testing specific functions as needed
Route::get('utils', function()
{
	// dd mysql configuration from database.php
	dd(Config::get('database.connections.mysql'));
	// dd(App::environment());

	// $users = User::all();
	// dd($users);

});

// POST requests
Route::post('/signup', 'AccountController@create');
Route::post('/login', 'AccountController@store');