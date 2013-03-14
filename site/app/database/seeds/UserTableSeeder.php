<?php

class UserTableSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		User::create(array(
			'email' => 'user@grouptopics.org',
			'nickname' => 'User',
			'password' => Hash::make('sdphp'),
		));
	}

}