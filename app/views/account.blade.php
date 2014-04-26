@extends('_layouts.account')

@section('content')

	<h1>Hola {{Auth::user()->name}}!</h1>

	<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>

	<h2>My popular topics <span class="pull-right"><a href="#">View all...</a></span></h2>
	<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>

	<h2>My popular presentations <span class="pull-right"><a href="#">View all...</a></span></h2>
	<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>

@stop

@section('sidebar')

	<img src="/images/homer.gif" alt="{{Auth::user()->name}}" class="img-circle img-responsive" style="height: 325px" class="text-centered">

	<div class="list-group">
		<a href="#" class="list-group-item active">
		Cras justo odio
		</a>
		<a href="#" class="list-group-item">Settings</a>
		<a href="#" class="list-group-item">My Profile</a>
		<a href="#" class="list-group-item">My Topics</a>
		<a href="#" class="list-group-item">My Presentations</a>
	</div>

@stop
