<?php

$factory('Account', [
    'name'      => 'Tommy Tester',
    'password'  => 'password',
    'email'     => 'fake@email.com'
]);

$factory('Topic', [
    'topic'     => $faker->sentence()
]);


