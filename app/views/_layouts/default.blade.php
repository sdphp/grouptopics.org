<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Group Topics{{ title is defined ? ' - '~title }}</title>

    <link rel="stylesheet" href="/css/bootstrap.css">

    <link rel="stylesheet" href="/css/custom.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

<div id="navigation" class="container-fluid">

<div class="container">

<div class="col-md-12">

    <div id="search" class="col-md-7">

        <input type="search" class="form-control col-md-12" id="search" placeholder="Search topics...">

    </div>

    <div class="col-md-5">

        <p class="navbar-text pull-right">

        <a href="/" class="navbar-link">Home</a>

            {{ include('_includes/public_navigation') }}

        </p>

    </div>

</div>

</div>

</div>



<div class="row">

<div class="container">

    <div class="col-md-8">

    {% block content %}

        <h1>Welcome to Group Topics</h1>

        <p class="lead">One of our goals is to build a recommendation engine so it's important to be able to identify and track groups that use the topics. Here is how the overall architecture looks in my mind. Need more content here to make it look professional, I almost added lorem ipsum copy just for space. Decided against that and just wrote this, now I can’t stop typing until I reach to copy size I am looking for. Ok, I think thats enough.</p>

        <h2>Hot Topics for </h2>

        <div class="row">

        <div class="col-md-12">

        <h3>Laravel RESTful API</h3>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, quisquam omnis cum placeat voluptates expedita quam. Voluptas, quisquam, voluptatum, maiores quo nemo placeat provident quia reiciendis accusantium dolore dolores sit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, repudiandae odit fugiat iusto quis aut voluptate blanditiis voluptatum! Pariatur, ullam quos vitae perspiciatis quo numquam repudiandae reprehenderit nobis recusandae tempore.</p>

        </div>

        </div>

        <h2>Fresh Topics</h2>

    {% endblock %}

    </div>

    <div id="sidebar" class="col-md-4">

    {% block sidebar %}

        <h1 class="text-center">Sponsor</h1>

        <p class="text-center"><img src="/images/sd-php-logo-200px.png" alt=""></p>

        <p class="lead">"Special thanks to <a href="www.sdphp.org">San Diego PHP</a> User Group for sponsoring Group Topics this month!"</p>

    {% endblock %}

    </div>

  </div>

</div>



<div id="footer" class="container-fluid">

<div class="container">

<div class="row">

  <footer class="footer">Group Topics built by members of User Groups for User Groups.</footer>

</div>

</div>

</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>

</body>

</html>
