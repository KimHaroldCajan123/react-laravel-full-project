<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GuestCustomer;
use Illuminate\Support\Facades\Validator;

class GuestCustomerController extends Controller

{ 

    public function countGuest(){
        $guest = GuestCustomer::all();
        return response()->json([
            'guestlist'=>$guest,
        ],200);
    }

    
    public function index(){
        $guest = GuestCustomer::with('customers')->get();

        return response()->json([
            'guest' =>$guest,
        ],200);
        
    }
    
    public function getQuestCustomer($id){
        $guest = GuestCustomer::with('customers')
        ->where('customer_id',$id)
        ->orderBy('created_at', 'desc')
        ->latest()->first();

        return response()->json(["guest" =>$guest],200);
    }

    
    
    public function storeGuestCustomer(Request $request){
        $validator = Validator::make($request->all(),[
            'Name'=>"required|string",
            'Email'=>'required|email|unique:guestcustomers,email',
            'phone'=> "required|numeric|min:11",
            'customer_id'=>"exists:customers,customer_id",
        ]);
        if($validator->fails()){
            return response()->json([
                'error'=>$validator->errors(),
            ],400);
        }else{
            $guest = GuestCustomer::create([
               'Name'=>$request->Name,
               'Email' =>$request->Email,
               'phone'=> $request->phone,
               'customer_id'=>$request->customer_id
            ]);
            
            $guest->save();
           return response()->json([
            'message'=>'guest successfully added',
           ],200);
        }
    }
}