<?php

use App\Http\Controllers\ArtistController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\BookingDetailController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\GuestCustomerController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TattooController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

//! resgiter admin
    //!login
    Route::middleware('auth:sanctum')->group(function(){
        Route::post('logout',[AuthController::class,'logout']);
        Route::get('user',[AuthController::class,'getUser']);
        
    });
     
Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
   //!artist
   Route::post('add-artist',[ArtistController::class,'storeArtist']);
   Route::get('get-artist',[ArtistController::class,'index']);
   Route::get('edit-artist/{id}',[ArtistController::class,'editArtist']);
   Route::post('update-artist/{id}',[ArtistController::class,'updateArtist']);
   Route::delete('delete-artist/{id}',[ArtistController::class,'destroy']);

   //!category
    Route::post('add-category',[CategoryController::class,'store']);
    Route::get('show-category',[CategoryController::class,'index']);
    Route::get('edit-category/{id}',[CategoryController::class,'editCategory']);
    Route::put('update-category/{id}',[CategoryController::class,'updateCategory']);
    Route::delete('delete-category/{id}',[CategoryController::class,'deleteCategory']);
    //!tattoo 
    Route::post('store-tattoo',[TattooController::class,'store']);
    Route::get('view-tattoo',[TattooController::class,'index']);
    Route::get('edit-tattoo/{id}',[TattooController::class,'editTattoo']);
    Route::post('update-tattoo/{id}',[TattooController::class,'updateTattoo']);
    Route::delete('delete-tattoo/{id}',[TattooController::class,'deleteTattoo']);
    //! reviews 
    Route::post('add-reviews',[ReviewController::class,'storeReview']);
    Route::get('show-reviews/{id}',[ReviewController::class,'index']);
    Route::get('count-review',[ReviewController::class,'countReview']);
    Route::get('all-reviews',[ReviewController::class,'showReviews']);

    //! booking 
    Route::post('store-booking',[BookingController::class,'storeBooking']);
    Route::get('show-booking/{id}',[BookingController::class,'show']);
    Route::get('all-booking',[BookingController::class,'allBookings']);
    Route::get('count-booking',[BookingController::class,'countbooking']);
    Route::post('action-booking/{id}',[BookingController::class,'actionBooking']);

    //! guest customer 
    Route::post('store-guest',[GuestCustomerController::class,'storeGuestCustomer']);
    Route::get('get-guest/{id}',[GuestCustomerController::class,'getQuestCustomer']);
    Route::get('show-guest',[GuestCustomerController::class,'index']);
    Route::get('guestlist',[GuestCustomerController::class,'countGuest']);

    //! store details
    Route::post('store-details',[BookingDetailController::class,'storeDetails']);
    Route::get('show-details/{id}', [BookingDetailController::class, 'index']);
    Route::post('cancel-details/{id}',[BookingDetailController::class,'cancelBooking']);
    Route::get('booking/{id}',[BookingDetailController::class,'showBookingDetails']);
     
    //! reports 
   Route::get('revenue-reports/{timeframe}', [ReportsController::class, 'filterRevenue']);
   Route::get('report-status',[ReportsController::class,'countStatus']);
   Route::get('rating-reports',[ReportsController::class,'countRating']);
   Route::get('artist-revenue/{id}',[ReportsController::class,'getArtistRevenue']);
    
    Route::middleware('auth:sanctum')->group(function () {
    Route::get('customer',[CustomerController::class,'index']);
    Route::post('logout-customer',[CustomerController::class,'logout']);
});

//!customerlist 
Route::get('customerlist',[CustomerController::class,'countCustomer']);
Route::post('register-customer',[CustomerController::class,'registerCustomer']);
Route::post('login-customer',[CustomerController::class,'customerLogin']);