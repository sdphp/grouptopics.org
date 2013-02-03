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
        Schema::table('idea_tags', function ($table)
		{
			$table->create();
            $table->integer('idea_id');
			$table->foreign('idea_id')->references('id')->on('ideas');
            $table->integer('tag_id');
			$table->foreign('tag_id')->references('id')->on('tags');
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