<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{

    public function countCustomer(){
        $customer = Customer::all();
        
        return response()->json([
            'customerlist'=>$customer,
        ],200);
    }
    public function index(Request $request){
        return $request->user();
    }

    public function registerCustomer( Request $request){
        $validator = Validator::make($request->all(),[
            "name"=>"required|string|unique:customers,name",
            "email" =>"required|email|unique:customers,email",
            "address"=>"required|string",
            "phone"=> "required|numeric",
            "password"=>"required|min:10",
        ]);
        if($validator->fails()){
            return response()->json([
                "errors"=>$validator->errors(),
            ],400);
        }else{
            
            $customer = Customer::create([
                "name"=>$request->name,
                "email"=>$request->email,
                "address"=>$request->address,
                "phone"=>$request->phone,
                "password"=> Hash::make($request->password),
            ]);

            $token = $customer->createToken('UserAccess')->plainTextToken;
            return response()->json([
                
                'message'=>"Register Successfully",
                "token"=>$token,
                "customer"=>$customer->name,
            ],200);
        }
    }
    
    public function customerLogin(Request $request){
        $validate = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required",
        ]);
    
        if ($validate->fails()) {
            return response()->json([
                "error" => $validate->errors(),
            ], 400);
        }
    
        
        $customer = Customer::where('email', $request->email)->first();
        if (!$customer) {
            return response()->json([
                "message" => "Invalid credentials",
            ], 401);
        }
    
        if (!Hash::check($request->password, $customer->password)) {
            return response()->json([
                "message" => "Invalid credentials",
            ], 401);
        }
    
        $token = $customer->createToken('customer_token')->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => $customer->email,
            'message' => 'Successfully Login',
        ], 200);
    }
    public function logout(Request $request){
        auth()->user()->tokens()->delete();

        return response()->json([
          "message"=>"logged out"
        ]);
    }
}