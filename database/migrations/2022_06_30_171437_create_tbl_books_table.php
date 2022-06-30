<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_books', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('image', 100)->nullable();
            $table->text('description')->nullable();
            $table->text('extra_info')->nullable();
            $table->unsignedBigInteger('category_id');
            $table->text('tags')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('category_id')->references('id')->on('tbl_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_books', function (Blueprint $table) {
            $table->dropForeign(['tbl_books_category_id_foreign']);
            $table->dropSoftDeletes();
        });
    }
}
