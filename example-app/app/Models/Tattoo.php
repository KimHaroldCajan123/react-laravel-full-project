<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tattoo extends Model
{
    use HasFactory;

    protected $table = "tattoos";
    protected $fillable = [
        "name",
        "description",
        "image",
        "price",
        "category_id",
    ];
    
    protected $primaryKey = "tattoo_id";
    
    public function category(){
        return $this->belongsTo(Category::class,"category_id");
    }
    
    public function bookings(){
        return $this->hasMany(Booking_detail::class,'tattoo_id');
    }
}