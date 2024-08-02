<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class GuestCustomer extends Model
{
    use HasFactory;


    protected $table = 'guestcustomers';
    protected $fillable = [
        'Name',
        'Email',
        'phone',
        'customer_id',
    ];
    protected $primaryKey = 'guestcustomer_id';
    public function customers(){
        return $this->belongsTo(Customer::class,'customer_id');
    }

    public function bookingdetails(){
        return $this->hasMany(Booking_detail::class,'guestcustomer_id');
    }
}