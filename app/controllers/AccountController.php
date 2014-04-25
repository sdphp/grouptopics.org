<?php

use Grouptopics\Libraries\Account;

/**
 * Class AccountController
 */
class AccountController extends BaseController
{
    /**
     * @var Grouptopics\Libraries\Account
     */
    protected $account;

    /**
     * @param AccountLibrary $account
     */
    public function __construct(Account $account)
	{
		$this->account = $account;
	}

    /**
     * @return \Illuminate\View\View
     */
    public function account()
	{
		return View::make('account');
	}

    public function accountSettings()
    {
        return View::make('account_settings');
    }

    /**
     * @return \Illuminate\View\View
     */
    public function signup()
	{
		return View::make('signup');
	}

    /**
     * @return \Illuminate\View\View
     */
    public function login()
	{
		return View::make('login');
	}

    /**
     * @return string
     */
    public function create()
	{
		return $this->account->createNewAccount();
	}

    /**
     * @return mixed
     */
    public function store()
	{
		return $this->account->loginExistingAccount();
	}

    /**
     * @return mixed
     */
    public function destroy()
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

}