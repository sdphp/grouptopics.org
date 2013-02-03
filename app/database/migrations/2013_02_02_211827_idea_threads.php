<?php

use Illuminate\Database\Migrations\Migration;

class IdeaThreads extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
        Schema::table('idea_threads', function ($table)
		{
			$table->create();
            $table->increments('id');
            $table->integer('idea_id');
			$table->foreign('idea_id')->references('id')->on('ideas');
            $table->string('thread', 500);
            $table->integer('user_id');
			$table->foreign('user_id')->references('id')->on('users');
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
        Schema::drop('idea_threads');
	}

}