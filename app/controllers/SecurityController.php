<?php

class SecurityController extends BaseController
{
	public function login()
	{
		$this->render();
	}

	public function loginSubmit()
	{

		$credentials = array(
			'username' => Input::get( 'email' ),
			'password' => Input::get( 'password' )
		);	

	
		if( Auth::attempt( $credentials ) ) {
			return '{ "result": true }';
		} else {
			return '{ "result": false }';
		}
	}

	public function logout()
	{
		Auto::logout();
		return Redirect::to( '' );
	}
}
