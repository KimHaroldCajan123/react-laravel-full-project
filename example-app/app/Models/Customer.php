<?php

namespace App\Models;

use App\Http\Middleware\Authenticate;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

use Laravel\Sanctum\HasApiTokens;

class Customer extends Model
{
    use HasFactory,HasApiTokens;
    protected $fillable = [
        "name",
        "email",
        "address",
        "phone",
        "password",
    ] ;

    protected $primaryKey = "customer_id";

    protected $hidden = [
        "password",
    ];

    public function reviews(){
        return $this->hasMany(Reviews::class,"reviews_id");
    }
    public function bookings(){
        return $this->hasMany(Booking::class, 'customer_id');
    }
    
}