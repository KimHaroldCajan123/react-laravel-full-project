<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    
    protected $table = "tattoocategory";
   protected $fillable = [
    "categoryname",
   ];
   
   protected $primaryKey = "category_id";

   public function tattoos()
   {
       return $this->hasMany(Tattoo::class, 'category_id');
   }
}