<?php

class SecurityController extends BaseController
{
    public function login()
    {
        $this->render();
    }

    public function loginSubmit()
    {

        $credentials = array(
            'email'    => Input::get( 'email' ),
            'password' => Input::get( 'password' )
        );



        if (!Auth::attempt( $credentials, false )) {
            $credentials[ 'nickname' ] = Input::get( 'email' );
            unset( $credentials[ 'email' ] );
            if (!Auth::attempt( $credentials, false )) {
                $this->view->add(
                    'errors',
                    array(
                        array(
                            'field'   => 'form',
                            'message' => 'Login failed. Check your credentials!'
                        )
                    )
                );
            }
        } else {
            $this->view->add( 'javascript', 'window.location.href = "' . URL::route( 'homepage' ) . '"' );
        }

        return $this->returnJsonResponse();
    }

    public function provider( $provider )
    {
        try {
            $config = __DIR__ . '/../config/';
            if( App::__get( 'env' ) != 'production' ) {
                $config .= App::__get( 'env' ) . '/';
            }
            $config .= 'hybridauth.php';

            $auth = new Hybrid_Auth( $config );
            $adapter = $auth->authenticate( $provider );

            $profile = $adapter->getUserProfile();
        } catch( Exception $e ) {
            // Display the recived error,
            // to know more please refer to Exceptions handling section on the userguide
            switch( $e->getCode() ){
                case 0 : echo "Unspecified error."; break;
                case 1 : echo "Hybriauth configuration error."; break;
                case 2 : echo "Provider not properly configured."; break;
                case 3 : echo "Unknown or disabled provider."; break;
                case 4 : echo "Missing provider application credentials."; break;
                case 5 : echo "Authentification failed. "
                    . "The user has canceled the authentication or the provider refused the connection.";
                    break;
                case 6 : echo "User profile request failed. Most likely the user is not connected "
                    . "to the provider and he should authenticate again.";
                    $profile->logout();
                    break;
                case 7 : echo "User not connected to the provider.";
                    $profile->logout();
                    break;
                case 8 : echo "Provider does not support this feature."; break;
            }

            // well, basically your should not display this to the end user, just give him a hint and move on..
            echo "<br /><br /><b>Original error message:</b> " . $e->getMessage();
            die();
        }

        $credentials = $this->getProviderCredentials( $provider, $profile );

        Auth::attempt( $credentials, false );
        return Redirect::to( '' );
    }

    public function logout()
    {
        Auth::logout();

        return $this->returnJsonResponse(
            array(
                'javascript' => $this->generateJavascriptRoute( 'homepage' )
            )
        );
    }

    private function getProviderCredentials( $provider, $profile )
    {
        $credentials = array();

        switch( $provider ) {
            case 'google':
            case 'facebook':
                $credentials = array(
                    'email' => $profile->emailVerified,
                    'password' => $profile->emailVerified . $profile->identifier
                );
                break;
            default:
                echo "<pre>";
                var_dump( $profile );
                throw new \Exception(
                    sprintf(
                        'Bad Provider `%s`',
                        $provider
                    )
                );
        }

        return Auth::validate( $credentials ) ?
            $credentials :
            $this->createUserFromProvider( $provider, $profile );
    }

    private function createUserFromProvider( $provider, $profile )
    {
        $user = array();
        $password = '';

        switch( $provider ) {
            case 'google':
            case 'facebook';
            case 'twitter';
                $password = $profile->emailVerified . $profile->identifier;
                $user = array(
                    'email' => $profile->emailVerified,
                    'nickname' => $profile->emailVerified,
                    'password' => Hash::make( $password ),
                    'first_name' => $profile->firstName,
                    'last_name'  => $profile->lastName,
                    'hybridauth_provider_name' => $provider,
                    'hybridauth_provider_uid' => $profile->identifier,
                    'created_at' => new DateTime(),
                    'updated_at' => new DateTime()
                );
                break;
            default:
                echo "<pre>";
                var_dump( $profile );
                throw new \Exception(
                    sprintf(
                        'Bad Provider `%s`',
                        $provider
                    )
                );
        }

        DB::table( 'users' )->insert( $user );

        return array(
            'email' => $user[ 'email' ],
            'hybridauth_provider_uid' => $user[ 'hybridauth_provider_uid' ],
            'password' => $password
        );
    }
}
