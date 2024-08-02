<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    use HasFactory;


    protected $table = "artists";
    
    protected $fillable = [
        "name",
        "image",
        "hourly_rate",
        "availability",
        "biography",
        "experience",
        "contact_info",
        "type",
    ];
    protected $primaryKey = 'artists_id';

    public function bookings(){
        return $this->hasMany(Booking::class,'artists_id');
    }

}