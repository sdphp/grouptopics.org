<?php
$leftMenu = array(
	'homepage' => array( 'label' => 'Home' )
);
$rightMenu = array(
	'login' => array( 'label' => 'Login', 'auth' => false ),
	'logout' => array( 'label' => 'Logout', 'auth' => true ),
);

$user = Auth::user();
?>

<div class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner">
		<a class="brand" href="#">Group Topics</a>
		<ul class="nav pull-left" id="leftMenu">
			<?php foreach( $leftMenu as $route => $info ) :
				if( isset( $info[ 'auth' ] ) ) {
					if( $info[ 'auth' ] === true && is_null( $user )
						|| $info[ 'auth' ] == false && !is_null( $user ) ) {
						continue;
					}
				}
				$url = URL::route( $route, array(), false );
				$class = Request::is( $url != '/' ? ltrim( $url, '/' ) : $url ) ? ' class="active"' : '';
			?>
				<li<?=$class?>>
					<a href="{{ $url }}">{{ $info[ 'label' ] }}</a>
				</li>
			<?php endforeach; ?>
			<li<?=Request::is( '/about' ) ? ' class="active"' : ''?>>
				<a href="/about">About</a>
			</li>
			<li<?=Request::is( '/contact' ) ? ' class="active"' : ''?>>
				<a href="/about">Contact</a>
			</li>
		</ul>
		<ul class="nav pull-right" id="rightMenu">
			<?php foreach( $rightMenu as $route => $info ) :
				if( isset( $info[ 'auth' ] ) ) {
					if( $info[ 'auth' ] === true && is_null( $user )
						|| $info[ 'auth' ] == false && !is_null( $user ) ) {
						continue;
					}
				}
				$url = URL::route( $route, array(), false );
				$class = Request::is( $url != '/' ? ltrim( $url, '/' ) : $url ) ? ' class="active"' : '';
			?>
				<li<?=$class?>>
					<a href="{{ $url }}">{{ $info[ 'label' ] }}</a>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</div>
