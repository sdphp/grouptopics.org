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
        Schema::create( 'users', function ( $table ) {
                $table->increments( 'id' );
                $table->string( 'email', 128 )->unique();
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
