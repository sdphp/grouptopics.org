<?php

class SocialController extends BaseController
{
    public function process()
    {
        // Process Authentication

        try {
            Hybrid_Endpoint::process();
        } catch( Exception $e ) {
            return Redirect::route( 'hybridauth' );
        }

    }
}
