<?php

class ViewController extends BaseController
{

	public function pageAbout()
	{
		return View::make('about');
	}

	public function pageHome()
	{
		return View::make('index');
	}

	public function pageLogin()
	{
		return View::make('login');
	}

	public function pageSignup()
	{
		return View::make('signup');
	}
}
