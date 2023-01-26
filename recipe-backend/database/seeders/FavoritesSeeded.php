<?php

namespace Database\Seeders;
use DB;
use Illuminate\Database\Seeder;

class FavoritesSeeded extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('favorites')->insert([
            'recipe_id' => 'bbfc1a248bd6fe277e35fe01027de91f',
            'user_id' => 1,
        ]);
        DB::table('favorites')->insert([
            'recipe_id' => '067f0b7be628ae847366e4f3e614b319',
            'user_id' => 1,
        ]);
    }
}
