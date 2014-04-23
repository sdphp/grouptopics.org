<!DOCTYPE html>
<html lang="en">

  <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Group Topics</title>
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
<div class="row">
  <div class="container">
    <div class="col-md-12">
      <p class="navbar-text pull-right" style="margin-top:42px; font-size: 1.6rem">

        <a href="/" class="navbar-link" style="padding:42px">Home</a>
        <a href="/about" class="navbar-link" style="padding:42px">About</a>
         @if(Auth::check())
            @include('_includes.account_navigation')
         @else
            @include('_includes.public_navigation')
        @endif
      </p>
    </div>
  </div>
</div>

<div class="row">

  <div class="container">

    <div class="col-md-8 col-md-offset-2">

      @yield('content')

    </div>

  </div>

</div>
<footer class="footer"> Grouptopics built by members of User Groups for User Groups.</footer>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
</body>
</html>
