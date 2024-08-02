<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'error' => $validate->errors(),
            ], 400);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $token = $user->createToken('user_token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'user' =>$user->email,
                'token'=>$token,
                'message' => 'Register successfully',
            ]);
        }
    }

     public function login(Request $request){
        $validate = Validator::make($request->all(), [
            'email'=> 'required|email',
            'password'=> 'required',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'errors'=> $validate->errors(),
            ],400);
        }else{
           
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'invalid'=>'Invalid Credentials',
            ],401);
        }else{
    
        $token = $user->createToken('user_token')->plainTextToken;        
         return response()->json([
            'token'=>$token,
            'user'=> $user->email,
            'message'=>'Successfully Login',
         ],200);
        }
    } 
    }
    

    


    public function logout(Request $request){
        auth()->user()->tokens()->delete();

        return response()->json([
          "message"=>"logged out"
        ]);
    }

    public function getUser(Request $request){
        return $request->user();
    }

    
}