<?php

use Grouptopics\Repositories\AccountRepository;

class AccountController extends BaseController
{
	protected $account;

	public function __construct(AccountRepository $account)
	{
		$this->account = $account;
	}

	public function index()
	{
		return View::make('account');
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
	public function destroy()
	{
		return $this->account->logoutExistingAccount();
	}

	public function testMe()
	{
		return "Grouptopics\Repositories\AccountRepository";
	}

}