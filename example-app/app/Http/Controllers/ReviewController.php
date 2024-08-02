<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reviews;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{


    public function countReview(){
        $review = Reviews::all();
        return response()->json([
            'reviews'=> $review,
        ],200);
    }
     
    public function showReviews(){
         $reviews = Reviews::with(['customers','bookings'])->get();
        return response()->json([
            'reviews'=>$reviews,
        ],200);
    }
    
    public function index($id){
        $review = Reviews::with(['customers','bookings'])
        ->where('customer_id', $id)->get();
        return response()->json([
            "reviews"=>$review,
        ],200);
    }

    public function storeReview( Request $request){
        $validate = Validator::make($request->all(),[
            'ratings'=>'required|numeric',
            'comment'=>'required|string|max:50',
            'customer_id'=>'exists:customers,customer_id',
            'booking_id'=>'exists:bookings,booking_id',
        ]);

        if($validate->fails()){
            return response()->json([
                'error'=>$validate->errors(),
            ],400);
        }else{
            $review = Reviews::create([
                'ratings' => $request->ratings,
                'comment'=>$request->comment,
                'customer_id'=>$request->customer_id, 
                'booking_id'=>$request->booking_id, 
            ]);
            $review->save();
            
            return response()->json([
                'message'=>'Thankyou For The reviews',
            ],200);
        }
    }
}