<?php if( Request::ajax() ) : ?>
	@yield('content')
<?php else: ?>
<html>
	<head>
		{{ Basset::show('website_css.css') }}
	</head>
	<body>
		@include('layout.menu')
		<div class="row-fluid">
			<div id="mainContent">
				<div class="mainContainer">
					@yield('content')
				</div>
			</div>
		</div>
		
		{{ Basset::show('website_js.js') }}

		<script type="text/javascript">
			$( function() {
				gt.runBinds();
			} );
		</script>
	</body>
</html>
<?php endif; ?>
