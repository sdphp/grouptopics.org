<?php

abstract class BaseController extends Controller {


	protected $layout = 'layout.master';

    /**
     * @var viewHelper
     */
    protected $view;

	public function __construct()
	{
		$this->view = new viewHelper();
	}

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}
	}

	protected function render( $view = '' )
	{
		if( empty( $view ) ) {
			$controller = strtolower( str_replace( 'Controller', '', get_class( $this ) ) );
	
			$action = $this->parseAction();
			$view = $controller . '.' . $action;
		}

		$this->layout->content = View::make( $view, $this->view->all() );

		return true;
	}

    protected function returnJsonResponse( array $data = array() )
    {
        $data = array_merge( $data, $this->view->all( ) );

        return Response::json( $data );
    }

	private function parseAction()
	{
		$trace = debug_backtrace();
		$action = $trace[ 2 ];
	
		return $action[ 'function' ];
	}

    protected function generateJavascriptRoute( $route )
    {
        return "window.location.href = '" . URL::route( $route ) . "';";
    }

}
