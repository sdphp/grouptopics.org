<?php

use Illuminate\Database\Migrations\Migration;

class RenameIdeasToTopics extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// ideas -> topics
		Schema::rename('ideas', 'topics');
		Schema::table('topics', function($table) {
			$table->string('topic'); 
		});
		DB::table('topics')->update(array('topic' => DB::raw('idea')));
		Schema::table('topics', function($table){
			$table->dropColumn('idea');
		});

		// idea_threads -> topic_thread
		Schema::table('idea_threads', function($table){
			$table->dropForeign('idea_threads_idea_id_foreign');
			$table->dropForeign('idea_threads_user_id_foreign');
			$table->unsignedInteger('topic_id');
		});
		Schema::rename('idea_threads', 'topic_thread');
		DB::table('topic_thread')->update(array('topic_id' => DB::raw('idea_id')));
		Schema::table('topic_thread', function($table){
			$table->foreign('topic_id')->references('id')->on('topics');
			$table->foreign('user_id')->references('id')->on('users');
			$table->dropColumn('idea_id'); 
		});

		// idea_tags -> topic_tag
		Schema::table('idea_tags', function($table){
			$table->dropForeign('idea_tags_idea_id_foreign');
			$table->dropForeign('idea_tags_tag_id_foreign');
			$table->unsignedInteger('topic_id');
		});
		Schema::rename('idea_tags', 'topic_tag');
		DB::table('topic_tag')->update(array('topic_id' => DB::raw('idea_id')));
		Schema::table('topic_tag', function($table){
			$table->foreign('topic_id')->references('id')->on('topics');
			$table->foreign('tag_id')->references('id')->on('tags');
			$table->dropColumn('idea_id'); 
		});

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		// topics -> ideas
		Schema::rename('topics', 'ideas');
		Schema::table('ideas', function($table){
			$table->string('idea');
		});
		DB::table('ideas')->update(array('idea' => DB::raw('topic')));
		Schema::table('ideas', function($table) {
			$table->dropColumn('topic'); 
		});

		// topic_thread -> idea_threads
		Schema::table('topic_thread', function($table){
			$table->dropForeign('topic_thread_topic_id_foreign');
			$table->dropForeign('topic_thread_user_id_foreign');
			$table->unsignedInteger('idea_id');
		});
		Schema::rename('topic_thread', 'idea_threads');
		DB::table('idea_threads')->update(array('idea_id' => DB::raw('topic_id')));
		Schema::table('idea_threads', function($table){
			$table->foreign('idea_id')->references('id')->on('ideas');
			$table->foreign('user_id')->references('id')->on('users');
			$table->dropColumn('topic_id'); 
		});

		// topic_tag -> idea_tags
		Schema::table('topic_tag', function($table){
			$table->dropForeign('topic_tag_topic_id_foreign');
			$table->dropForeign('topic_tag_tag_id_foreign');
			$table->unsignedInteger('idea_id');
		});
		Schema::rename('topic_tag', 'idea_tags');
		DB::table('idea_tags')->update(array('idea_id' => DB::raw('topic_id')));
		Schema::table('idea_tags', function($table){
			$table->foreign('idea_id')->references('id')->on('ideas');
			$table->foreign('tag_id')->references('id')->on('tags');
			$table->dropColumn('topic_id'); 
		});
	}

}