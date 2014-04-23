<?php

class ViewController extends BaseController
{

	public function index()
	{
		return View::make('index');
	}

	public function about()
	{
		return View::make('about');
	}
}
