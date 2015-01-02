<?php
namespace Grouptopics\Repositories\Account;

use Grouptopics\Repositories\EloquentRepository;


class AccountEloquent extends EloquentRepository implements AccountInterface
{

    protected $model;

    public function __construct(\User $model)
    {
        $this->model = $model;
    }

    public function getAccountByUserId($id)
    {
        return \User::find($id);
    }

    public function getAccountByUsername($username)
    {
        $username = DB::table('users')->where('username', '==', $username)->get();
        return $username;
    }

    public function createNewAccount()
    {
        $input = \Input::all();

        $rules = array(
            'name'     => 'required|min:3|max:125',
            'email'    => 'required|email|unique:users',
            'password' => 'required|alpha_num|confirmed|min:8'
        );

        $validator = \Validator::make($input, $rules);

        if ($validator->passes()) {

            $this->model->name     = $input['name'];
            $this->model->email    = $input['email'];
            $this->model->password = \Hash::make($input['password']);

            $this->model->save();

            // log the user in
            $credentials = array(
                'email'    => $input['email'],
                'password' => $input['password']
            );

            if (\Auth::attempt($credentials)) {
                return \Redirect::route('auth.account');
            }
        }

        return \Redirect::route('signup')
            ->withErrors($validator);
    }

    public function loginExistingAccount()
    {
        $input = \Input::all();

        $attempt = \Auth::attempt(
            [
                'email'    => $input['email'],
                'password' => $input['password']
            ]
        );

        if ($attempt) {
            return \Redirect::intended('/account');
        }
    }

    public function logoutExistingAccount()
    {
        \Auth::logout();
        return \Redirect::route('home');
    }

    public function emailNewAccount()
    {
        // TODO - make this work!
    }
}
