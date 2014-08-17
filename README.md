## Grouptopics

Grouptopics is a Open Source Project started by the San Diego PHP (SDPHP) User group. It's designed to help other User Groups discover and manage presentation ideas.
This project is very early in development and not ready for prime time.

Grouptopics is built using **[Laravel](https://packagist.org/packages/laravel/framework)**. Documentation for the Laravel framework can be found on the [Laravel website](http://laravel.com/docs).

## Running and Contributing

### Contributing
* SDPHP Group is the maintainer of Grouptopics. If you wish to contribute to Grouptopics you should [fork](https://help.github.com/articles/fork-a-repo) the project from [SDPHP/Grouptopics](https://github.com/sdphp/grouptopics.org) Github Repo
* Read [CONTRIBUTING.md](CONTRIBUTING.md) for more information

### Running

* Change into your repos directory and run ```composer install```

* Create ```app/config/development/database.php``` and enter your credentials for your local environment. See below:

```php
<?php

return [

	'connections' => array(

		'mysql' => array(
			'driver'    => 'mysql',
			'host'      => '<YOUR DB HOSTNAME>',
			'database'  => '<YOUR DB NAME>',
			'username'  => '<YOUR DB USERNAME>',
			'password'  => '<YOUR DB PASSWORD>',
			'charset'   => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'    => 'gt_',
		),

	)

];
```

* Run the application with your choice of Webserver / MySQL /  [MariaDB](https://mariadb.org/). You can use [MAMP](https://www.mamp.info/), [WAMP](http://www.wampserver.com/en/), [Vagrant](http://www.vagrantup.com), or the Laravel built in ```php artisan serve```

* Run ```php artisan migrate``` to create your tables

* Gulp configured to compile Twitter Bootstrap Less File to CSS and will run phpunit when PHP files are save. To enable simple install gulp and the gulp components 
```npm install gulp gulp-util gulp-notify gulp-ruby-sass gulp-less gulp-autoprefixer gulp-coffee``` 
and run ```gulp``` from the commandline


## License

Currently Grouptopics is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
