@extends('_layouts.default')

@section('content')

<h1>Settings for {{Auth::user()->name}}!</h1>

@stop

@section('sidebar')

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
