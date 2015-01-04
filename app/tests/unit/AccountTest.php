<?php

class AccountTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testSignUpPage()
    {
        $this->call('GET', '/signup');
        $this->assertResponseOk();
    }

}

