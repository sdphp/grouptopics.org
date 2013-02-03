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
            'email' => Input::get('email'),
            'password' => Input::get('password')
        );

        if (!Auth::attempt($credentials)) {
            $credentials['nickname'] = Input::get('email');
            unset($credentials['email']);
            if (!Auth::attempt($credentials)) {
                $this->view->add('errors',
                    array(
                        array(
                            'field' => 'form',
                            'message' => 'Login failed. Check your credentials!'
                        )
                    )
                );
            }
        } else {
            $this->view->add('javascript', 'window.location.href = "' . URL::route('homepage') . '"');
        }

        return $this->returnJsonResponse();
    }

    public function logout()
    {
        Auth::logout();

        return $this->returnJsonResponse(array(
            'javascript' => $this->generateJavascriptRoute('homepage')
        ));
    }
}
