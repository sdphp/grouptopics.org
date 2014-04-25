@extends('_layouts.default')

@section('content')

<h1>Hola {{Auth::user()->name}}!</h1>

<p>Only authenticated users can view, yeah!</p>

@stop

@section('sidebar')

<img src="/images/homer.gif" alt="{{Auth::user()->name}}" class="img-circle img-responsive">

@stop