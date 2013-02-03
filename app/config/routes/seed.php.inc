<?php

/*
|--------------------------------------------------------------------------
| Seed Controller Routes
|--------------------------------------------------------------------------
|
| Anything related to the Seed Controller
|
| Go to /seed in the browser to run this. Make sure you truncate your database first
|
| ```mysql
| SET FOREIGN_KEY_CHECKS = 0;
| TRUNCATE users;
| TRUNCATE ideas;
| // Truncate other tables you want
| SET FOREIGN_KEY_CHECKS = 1;
| ```
*/


Route::group(array('as' => 'seedRoutes'), function () {
    Route::get('seed', array('as' => 'seed', function () {

        DB::table('users')->insert(
            array(
                'email' => '',
                'nickname' => '',
                'password' => Hash::make(''),
                'created_at' => new DateTime(),
                'updated_at' => new DateTime()
            )
        );

        return 'Seeding ran';
    }));
});
