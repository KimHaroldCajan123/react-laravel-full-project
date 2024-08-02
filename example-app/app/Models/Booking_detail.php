<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking_detail extends Model
{
    use HasFactory;
    
    protected $fillable =[
        "booking_id",
        'payment_methods',
        'tattoo_id',
        'status',
        'guestcustomer_id',
        'amount',
    ];
    
    protected $table = "bookingdetails";

    protected $primaryKey = "id";

    public function bookings(){
        return $this->belongsTo(Booking::class,'booking_id');
    }
  
    public function tattoos(){
        return $this->belongsTo(Tattoo::class,'tattoo_id');
    }

    public function guestcustomers(){
        return $this->belongsTo(GuestCustomer::class,'guestcustomer_id' );
    }
    
}