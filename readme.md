## Grouptopics

Grouptopics is a Open Source Project started by the San Diego PHP (SDPHP) User group. It's designed to help other User Groups discover and manage presentation ideas.
This project is very early in development and not ready for prime time.

Grouptopics is built using **[Laravel](https://packagist.org/packages/laravel/framework)**. Documentation for the Laravel framework can be found on the [Laravel website](http://laravel.com/docs).

## Running and Contributing

### Contributing
* SDPHP Group is the maintainer of Grouptopics. If you wish to contribute to Grouptopics you should [fork](https://help.github.com/articles/fork-a-repo) the project from [SDPHP/Grouptopics](https://github.com/sdphp/grouptopics.org) Github Repo
* Make code modifcations and enhancments to your copy of the Grouptopics repo and submit a pull requet back to SDPHP Grouptopics to have your changes merged into the master branch.

### Running
* Change into your repos directory and run ```composer install```
* Copy ```app/config/database-template.php``` to ```app/config/database.php``` and modify to meet your needs
* Run application with your choice of Webserver / MySQL /  [MariaDB](https://mariadb.org/). You can use [MAMP](https://www.mamp.info/), [WAMP](http://www.wampserver.com/en/), [Vagrant](http://www.vagrantup.com), or the Laravel built in ```php artisian serve```
* Run ```php artisian migrate``` to create your tables
* Gulp configured to compile Twitter Bootstrap Less File to CSS and will run phpunit when PHP files are save. To enable simple install gulp ```npm install gulp``` and run ```gulp``` from the commandline

## License

Currently Grouptopics is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
