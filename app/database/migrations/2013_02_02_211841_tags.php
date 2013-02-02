<?php

use Illuminate\Database\Migrations\Migration;

class Tags extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
        Schema::table('tags', function ($table)
		{
			$table->create();
            $table->increments('id');
            $table->string('tag');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
        Schema::drop('tags');
	}

}