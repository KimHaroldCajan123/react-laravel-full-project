<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id('booking_id');
            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')->references('customer_id')->on('customers');
            $table->unsignedBigInteger('artists_id');
            $table->foreign('artists_id')->references('artists_id')->on('artists');
            $table->date('date')->nullable(false);
            $table->time('time')->nullable(false);
            $table->integer('Quantity');
            $table->enum('action',['done','cancel'])->nullable();
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};