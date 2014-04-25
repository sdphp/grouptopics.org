<?php namespace Grouptopics\Libraries;

use \Input as Input;
use \Auth as Auth;
use \User as User;
use \Validator as Validator;
use \Hash as Hash;
use \Redirect as Redirect;

class Account
{
    /**
     * @param $id
     * @return mixed
     */
    public function getAccountByUserId($id)
	{
		return User::find($id);
	}

	public function getAccountByUsername($username)
	{
		return $username;
	}

    /**
     * @return string
     */
    public function createNewAccount()
	{
		$input = Input::all();

		$user = new User;

		$rules = array(
			'name'   	=> 'required|min:5|max:125',
			'email'     => 'required|email',
			'password' 	=> 'required|alpha_num|confirmed|min:8'
		);

	    $validator = Validator::make($input, $rules);

	    if ($validator->passes()) {

	    	$user->name = Input::get('name');
	        $user->email = Input::get('email');
	        $user->password = Hash::make(Input::get('password'));

	    	$user->save();

	    	// log the user in
	    	$credentials = array(
				'email' => Input::get('email'),
				'password' => Input::get('password')
			);

			if (Auth::attempt($credentials)) {
				return Redirect::to('/account');
			}
		}

		return Redirect::to('/signup')->withErrors($validator);
	}

    /**
     * @return mixed
     */
    public function loginExistingAccount()
	{
		$input = Input::all();

		$attempt = Auth::attempt([
			'email' 	=> $input['email'],
			'password' 	=> $input['password']
		]);

		if ($attempt) return Redirect::intended('/account');
	}

    /**
     * @return mixed
     */
    public function logoutExistingAccount()
	{
		Auth::logout();
		return Redirect::to('/');
	}

    /**
     *
     */
    public function emailNewAccount()
	{
		// TODO - make this work!
	}
}