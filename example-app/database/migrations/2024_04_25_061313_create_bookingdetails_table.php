<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookingdetails', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('booking_id');
            $table->foreign('booking_id')->references('booking_id')->on('bookings');
            $table->enum('status',['confirmed','cancelled'])->default('confirmed');
            $table->enum('payment_methods',['cash','e_wallet','card']);
            $table->unsignedBigInteger('tattoo_id');
            $table->foreign('tattoo_id')->references('tattoo_id')->on('tattoos');
            $table->unsignedBigInteger('guestcustomer_id');
            $table->foreign('guestcustomer_id')->references('guestcustomer_id')->on('guestcustomers');
            $table->decimal('amount',10,2)->nullable(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookingdetails');
    }
};