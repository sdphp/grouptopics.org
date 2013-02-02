<?php

class viewHelper
{
	const GET_DEFAULT = 'DEFAULTGETFORVIEW';

	/**
	 * @var array
	 */
	private $_data = array();

	/**
	 * @param $key
	 *
	 * @return mixed
	 */
	public function __get( $key )
	{
		return $this->get( $key );
	}

	/**
	 * @param $key
	 * @param $value
	 */
	public function __set( $key, $value )
	{
		$this->set( $key, $value );
	}

	/**
	 * @param array $array
	 * @param bool  $truncate
	 *
	 * @return array
	 */
	public function setItems( array $array = array(), $truncate = false )
	{
		if ($truncate) {
			return $this->_data = $array;
		}

		foreach ( $array as $k => $v ) {
			$this->set( $k, $v );
		}
	}

	public function get( $key, $default = self::GET_DEFAULT )
	{
		if (array_key_exists( $key, $this->_data )) {
			return $this->_data[ $key ];
		} else {
			if ($default != self::GET_DEFAULT) {
				return $default;
			} else {
				throw new \Exception( sprintf( "The key `%s` does not exist in the view. ", $key ) );
			}
		}
	}

	/**
	 * @return array
	 */
	public function all()
	{
		return $this->_data;
	}

	public function add( $key, $value )
	{
		if (array_key_exists( $key, $this->_data )) {
			throw new \Exception( sprintf( "The key `%s` is already in the view. ", $key ) );
		}
		$this->_data[ $key ] = $value;

		return $this;
	}

	public function replace( $key, $value )
	{
		return $this->remove( $key )
			->add( $key, $value );
	}

	public function set( $key, $value )
	{
		if (!array_key_exists( $key, $this->_data )) {
			return $this->add( $key, $value );
		}

		return $this->replace( $key, $value );
	}

	public function remove( $key )
	{
		unset( $this->_data[$key] );
		return $this;
	}
}
