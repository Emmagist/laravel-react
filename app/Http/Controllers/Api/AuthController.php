<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        $data = $request->validate();

        /** @var User  $user */

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request){
        $credentials = $request->validated();

        if (!Auth::user($credentials)){
            return response([
                'message' => 'Email or password not valid'
            ]);
        }

        /** @var User $user */

        $user = Auth::user();
        $token = $user->createToken()->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request){
        /** @var User $user */

        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 402);
    }
}
