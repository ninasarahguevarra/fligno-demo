<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use DB;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        DB::table('users')->insert([
            'name' => 'sarah',
            'email' => 'sarah@gmail.com',
            'password' => Hash::make('123456'),
        ]);
        DB::table('users')->insert([
            'name' => 'pedro',
            'email' => 'pedro@gmail.com',
            'password' => Hash::make('123456'),
        ]);
    }
}
