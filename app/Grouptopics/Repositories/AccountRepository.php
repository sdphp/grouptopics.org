<?php namespace Grouptopics\Repositories;

class AccountRepository
{
	public function getAccountByUserId($id)
	{
		return \User::find($id);
	}

	public function createNewAccount()
	{

		$input = \Input::all();

		$user = new \User;

		$rules = array(
			'name'   	=> 'required|min:5|max:125',
			'email'     => 'required|email',
			'password' 	=> 'required|alpha_num|confirmed|min:8'
		);

	    $validator = \Validator::make($input, $rules);

	    if ($validator->passes()) {

	    	$user->name = \Input::get('name');
	        $user->email = \Input::get('email');
	        $user->password = \Hash::make(\Input::get('password'));

	    	$user->save();

	    	// log the user in

	    	// redirect to account
			return 'User created using the repo!';

		}

		return \Redirect::to('/signup')->withErrors($validator);

	}

	public function loginExistingAccount()
	{

		$input = \Input::all();

		$attempt = \Auth::attempt([
			'email' 	=> $input['email'],
			'password' 	=> $input['password']
		]);

		if ($attempt) return \Redirect::intended('/');


	}

	public function logoutExistingAccount()
	{
		\Auth::logout();
		return \Redirect::to('/');
	}


	public function emailNewAccount()
	{
		// TODO - make this work!
	}

	public function testMe()
	{
		return "I'm in the Grouptopics\Respositories\AccountRepository!";
	}

}