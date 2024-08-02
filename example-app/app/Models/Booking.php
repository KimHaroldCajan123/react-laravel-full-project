<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable= [
        'customer_id',
        'artists_id',
        'date',
        'time',
        'Quantity',
        'action',
    ];

    protected $primaryKey = 'booking_id';
    

    public function customers(){
        return $this->belongsTo(Customer::class,'customer_id');
        
    }

     public function artists(){
        return $this->belongsTo(Artist::class,'artists_id');
     }

     public function Bookingdetails(){
        return $this->hasOne(Booking_detail::class,'booking_id');
     }
     public function reviews(){
        return $this->hasMany(Reviews::class,"booking_id");
    }
}