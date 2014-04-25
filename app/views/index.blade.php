@extends('_layouts.default')

@section('content')

<h1>Welcome to Group Topics</h1>

<p class="lead">One of our goals is to build a recommendation engine so it's important to be able to identify and track groups that use the topics. Here is how the overall architecture looks in my mind. Need more content here to make it look professional, I almost added lorem ipsum copy just for space. Decided against that and just wrote this, now I can’t stop typing until I reach to copy size I am looking for. Ok, I think thats enough.</p>

<h2>Hot Topics for {{ date('F dS, Y') }}</h2>

<div class="row">

<div class="col-md-12">

<h3>Laravel RESTful API</h3>

<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, quisquam omnis cum placeat voluptates expedita quam. Voluptas, quisquam, voluptatum, maiores quo nemo placeat provident quia reiciendis accusantium dolore dolores sit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, repudiandae odit fugiat iusto quis aut voluptate blanditiis voluptatum! Pariatur, ullam quos vitae perspiciatis quo numquam repudiandae reprehenderit nobis recusandae tempore.</p>

</div>

</div>

<h2>Fresh Topics</h2>

@stop

@section('sidebar')

<h1 class="text-center">{{ date('F') }} Sponsor</h1>

<p class="text-center"><img src="/images/sd-php-logo-200px.png" alt=""></p>

<p class="lead">"Special thanks to <a href="www.sdphp.org">San Diego PHP</a> User Group for sponsoring Group Topics this month!"</p>

@stop
