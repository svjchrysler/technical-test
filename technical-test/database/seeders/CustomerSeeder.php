<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        for ($i=0; $i < 1000; $i++) {
            \DB::table('customers')->insert(array(
                   'first_name' => $faker->name,
                   'last_name'  => $faker->lastName,
                   'email'  => $faker->unique()->safeEmail,
                   'phone_number'  => $faker->phoneNumber,
                   'birth_date'  => date('Y-m-d H:m:s'),
                   'created_at' => date('Y-m-d H:m:s'),
                   'updated_at' => date('Y-m-d H:m:s')
            ));
        }
    }
}
