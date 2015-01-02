<?php

use Grouptopics\Repositories\Account\AccountInterface;

class AccountController extends \BaseController
{

    protected $accountInterface;

    public function __construct(AccountInterface $accountInterface)
    {
        $this->accountInterface = $accountInterface;
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
        return $this->accountInterface->createNewAccount();
    }

    public function store()
    {
        return $this->accountInterface->loginExistingAccount();
    }

    public function actionLogout()
    {
        return $this->accountInterface->logoutExistingAccount();
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
