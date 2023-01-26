<?php

namespace App\Http\Controllers\Api;

use App\Models\Favorites;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FavoritesController extends Controller
{
    public function addToFavorites(Request $request)
    {
        try {
            $favorites = Favorites::create([
                'recipe_id' => $request->recipe_id,
                'user_id' => $request->user_id,
            ]);

            if ($favorites) {
                return response()->json([
                    'status' => true,
                    'message' => 'Successfully added to favorites',
                ], 200);
            }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }

    }

    public function removeFromFavorites(Request $request)
    {
        try {
            $res=Favorites::where('id',$request->id)->delete();

            if ($res) {
                return response()->json([
                    'status' => true,
                    'message' => 'Successfully removed from favorites',
                ], 200);
            }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }

    }

    public function showFavorites(Request $request)
    {
        try {
            $faveList=Favorites::where('user_id',$request-> input('user_id'))->get();
            if ($faveList) {
                return response()->json([
                    'success' => true,
                    'data' => $faveList,
                ], 200);
            }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}