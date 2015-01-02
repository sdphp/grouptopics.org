<?php

namespace Grouptopics\Repositories\Account;

interface AccountInterface {

    public function getAccountByUserId($id);
    public function getAccountByUsername($username);
    public function createNewAccount();
    public function loginExistingAccount();
    public function logoutExistingAccount();
    public function emailNewAccount();

}
