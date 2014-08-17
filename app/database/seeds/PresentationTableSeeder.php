<?php

// Composer: "fzaninotto/faker": "v1.4.0"
use Faker\Factory as Faker;

class PresentationTableSeeder extends Seeder
{

    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            Presentation::create(
                [
                    'user_id' => $faker->randomNumber(6),
                    'topic'   => $faker->sentence(5)
                ]
            );
        }
    }

}
