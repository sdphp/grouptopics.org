<?php

use Illuminate\Database\Migrations\Migration;

class IdeaTags extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
        Schema::create('idea_tags', function ($table)
		{
			$table->increments('id');
            $table->integer('idea_id')->unsigned();
			$table->foreign('idea_id')->references('id')->on('ideas');
            $table->integer('tag_id')->unsigned();
			$table->foreign('tag_id')->references('id')->on('tags');
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
        Schema::drop('idea_tags');
	}

}