<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reviews extends Model
{
    use HasFactory;

    protected $fillable = [
        "ratings",
        "comment",
        "customer_id",
        'booking_id'
    ];
    
    protected $primaryKey = 'reviews_id';
    


    public function customers(){
        return $this ->belongsTo(Customer::class,'customer_id');
    }
    
    public function bookings(){
        return $this ->belongsTo(Booking::class,'booking_id');
    }
    
}