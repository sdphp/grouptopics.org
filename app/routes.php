<?php

// GET requests
Route::get('/', 'ViewController@index');
Route::get('/login', 'AccountController@login');
Route::get('/signup', 'AccountController@signup');
Route::get('/my', 'AccountController@index')->before('Auth');

// JUNK - for testing specific functions as needed
Route::get('utils', function()
{
	// dd mysql configuration from database.php
	// dd(Config::get('database.connections.mysql'));

	$users = User::all();
	dd($users);

});



// POST requests

// Route::post('/signup', 'AccountController@register');

// DEV WORK

// Route::get('/signup', 'AccountController@signup');

Route::post('/signup', 'AccountController@store');