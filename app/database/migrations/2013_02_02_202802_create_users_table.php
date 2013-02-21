<?php

use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table(
            'users',
            function ( $table ) {
                $table->create();
                $table->increments( 'id' )->unsigned;
                $table->string( 'email', 256 )->unique();
                $table->string( 'nickname', 256 );
                $table->string( 'password', 256 );
                $table->string( 'first_name', 256 );
                $table->string( 'last_name', 256 );
                $table->string( 'hybridauth_provider_name', 256 )->nullable();
                $table->string( 'hybridauth_provider_uid', 256 )->nullable();
                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop( 'users' );
    }

}