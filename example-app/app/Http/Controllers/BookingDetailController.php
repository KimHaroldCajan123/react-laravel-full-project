<?php

namespace App\Http\Controllers;

use App\Models\Booking_detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class BookingDetailController extends Controller
{
    public function showBookingDetails($id){
        $bookingDetail = Booking_detail::with(['bookings','tattoos','guestcustomers'])
        ->whereHas('bookings',function($query) use ($id){
            $query->where('booking_id',$id);
        })
        ->get();
        return response()->json([
            'bookings'=>$bookingDetail,
        ],200);
    }

    public function cancelBooking($id){
        $cancel = Booking_detail::find($id);

        $cancel->status = "cancelled";
        $cancel->save();
        return response()->json([
            'message'=>'cancelled Booking',
        ],200);
        
    }
    
    public function index($id){
        $details = Booking_detail::with(['bookings','tattoos','guestcustomers'])
            ->whereHas('bookings', function ($query) use ($id) {
                $query->where('customer_id', $id);
            })
            ->get();
                    $details->each(function ($detail) {
            if (isset($detail->bookings->time)) {
                $detail->bookings->time = Carbon::createFromFormat('H:i:s', $detail->bookings->time)->format('g:i A');
            }
        });

    
        return response()->json([
            'booking_details' => $details,
        ], 200);
    }
    public function storeDetails(Request $request){
            $validator = Validator::make($request->all(),[
            'booking_id' =>'exists:bookings,booking_id',
             'payment_methods'=>'required',
             'tattoo_id' =>'exists:tattoos,tattoo_id',
             'guestcustomer_id'=>'exists:guestcustomers,guestcustomer_id',             
             'amount' => 'required|numeric|min:0',
        ]);
        if($validator->fails()){
            return response()->json([
                'error'=>$validator->errors(),
            ],400);
        }else{
            $details = Booking_detail::create([
                'booking_id'=> $request->booking_id,
                'payment_methods' => $request->payment_methods,
                'tattoo_id'=> $request->tattoo_id,
                'guestcustomer_id'=>$request->guestcustomer_id,
                'amount' =>$request->amount,
            ]);
            $details->save();

            return response()->json([
                'message' => 'booking created successfully!',
            ],200);
        }
    }
}