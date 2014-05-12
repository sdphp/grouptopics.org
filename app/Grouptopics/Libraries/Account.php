<?php
namespace Grouptopics\Libraries;

use \Input as Input;
use \Auth as Auth;
use \User as User;
use \Validator as Validator;
use \Hash as Hash;
use \Redirect as Redirect;

class Account
{

    public function getAccountByUserId($id)
    {
        return User::find($id);
    }

    public function getAccountByUsername($username)
    {
        $username = DB::table('users')->where('username', '==', $username)->get();
        return $username;
    }

    public function createNewAccount()
    {
        $input = Input::all();

        $user = new User;

        $rules = array(
            'name'     => 'required|min:3|max:125',
            'username' => 'required|min:3|max:125|unique:users',
            'email'    => 'required|email|unique:users',
            'password' => 'required|alpha_num|confirmed|min:8'
        );

        $validator = Validator::make($input, $rules);

        if ($validator->passes()) {

            $user->name = Input::get('name');
            $user->username = Input::get('username');
            $user->email = Input::get('email');
            $user->password = Hash::make(Input::get('password'));

            $user->save();

            // log the user in
            $credentials = array(
                'email'    => Input::get('email'),
                'password' => Input::get('password')
            );

            if (Auth::attempt($credentials)) {
                return Redirect::route('auth.account');
            }
        }

        return Redirect::route('signup')
            ->withErrors($validator);
    }

    public function loginExistingAccount()
    {
        $input = Input::all();

        $attempt = Auth::attempt(
            [
                'email'    => $input['email'],
                'password' => $input['password']
            ]
        );

        if ($attempt) {
            return Redirect::intended('/account');
        }
    }

    public function logoutExistingAccount()
    {
        Auth::logout();
        return Redirect::route('home');
    }

    public function emailNewAccount()
    {
        // TODO - make this work!
    }
}
