<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;


class BookingController extends Controller
{

 

    public function actionBooking(Request $request,$id){
        $booking = Booking::find($id);
        
        if (!$booking) {
            return response()->json(['error' => 'Booking not found'], 400);
        }
        
           $booking->action = $request->action;
           $booking->save();
           
           if ($booking->action === "done") {
            return response()->json(['message' => 'Booking Done successfully'], 200);

           }elseif ($booking->action === "cancel") {
            return response()->json(['message' => 'Booking cancel successfully'], 200);
           }

        
    }
    public function countBooking(){
        $booking = Booking::all();
        
        return response()->json([
            'count'=>$booking,
        ],200);
    }
     public function allBookings(){
        $bookings = Booking::with(['customers','artists'])->get();
        $bookings->each(function ($booking) {
            $booking->time = Carbon::createFromFormat('H:i:s', $booking->time)->format('g:i A');
        });
        return response()->json([
            'booking'=> $bookings,
        ],200);
     }


    
    public function show($customerId)
    {
        $bookings = Booking::with(['customers','artists'])->where('customer_id', $customerId)
        ->orderBy('created_at', 'desc')
        ->latest()
        ->first();
        if ($bookings) {
            $bookings->time = Carbon::createFromFormat('H:i:s', $bookings->time)->format('g:i A');
        }
        return response()->json([
            'booking' => $bookings,
        ], 200);
    }

    
        
       public function storeBooking( Request $request){
        $validator = Validator::make($request->all(),[
            'customer_id' =>'exists:customers,customer_id',
            'artists_id' => 'required|exists:artists,artists_id',
            'date'=> 'required|date',
            'time' => ['required', 'regex:/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/'],          
            'Quantity'=>'required|numeric',
            

        ]);
        if($validator->fails()){
            return response()->json([
                'error'=>$validator->errors(),
            ],400);
        }else{
            $booking = Booking::create([
                'customer_id' => $request->customer_id,
                'artists_id' =>$request->artists_id,
                'date'=> $request->date,
                'time'=> $request->time,
                'Quantity'=>$request->Quantity,
                
            ]);
            $booking->save();
            return response()->json([
                'message' => 'booking created',
                
            ],200);
        }
    }
}