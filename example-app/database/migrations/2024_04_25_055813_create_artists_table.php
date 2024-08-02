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
        Schema::create('artists', function (Blueprint $table) {
            $table->id('artists_id');
            $table->string("name");
            $table->string("image")->nullable();
            $table->decimal('hourly_rate',10,2);
            $table->string("availability");
            $table->string('biography');
            $table->string('experience')->nullable();
            $table->string('contact_info');
            $table->enum('type',['senior','junior']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artists');
    }
};