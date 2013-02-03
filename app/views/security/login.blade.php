@section('content')
<div class="login">
	<form action="/login/" method="post" class="ajax" >
		<div class="form-row">
			<label for="email">E-Mail Address: </label>
			<input type="text" name="email" />
		</div>
		<div class="form-row">
			<label for="password">Password: </label>
			<input type="password" name="password" />
		</div>
		<div class="form-row">
			<input type="submit" class="btn btn-primary" />
		</div>
	</form>
</div>
@stop
