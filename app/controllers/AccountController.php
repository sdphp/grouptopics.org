<?php

use Grouptopics\Libraries\Account;

/**
 * Class AccountController
 */
class AccountController extends BaseController
{

    protected $account;

    public function __construct(Account $account)
	{
		$this->account = $account;
	}

    public function account()
	{
		return View::make('account');
	}

    public function accountSettings()
    {
        return View::make('account_settings');
    }

    public function signup()
	{
		return View::make('signup');
	}

    public function login()
	{
		return View::make('login');
	}

    public function create()
	{
		return $this->account->createNewAccount();
	}

    public function store()
	{
		return $this->account->loginExistingAccount();
	}

    public function actionLogout()
	{
		return $this->account->logoutExistingAccount();
	}

    public function showAccountById($id)
    {
        $user = User::find($id);
        return $user->name;
    }

    public function showAccountByUsername($username)
    {
        $user = User::find($username);
        return $user->name;
    }

    public function profileView($username)
    {
        return $username;
    }

}
