<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Group Topics</title>
    <link rel="stylesheet" href="/css/grouptopics.css">
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
                    <a href="/about" class="navbar-link">About</a>
                    @if(Auth::check())
                    <a href="/account" class="navbar-link">{{Auth::user()->name}}</a>
                    <a href="/logout" class="navbar-link">Logout</a>
                    @else
                    <a href="/signup" class="navbar-link">Signup</a>
                    <a href="/login" class="navbar-link">Login</a>
                    @endif

                </p>

            </div>

        </div>

    </div>

</div>


<div class="row">

    <div class="container">

        <div class="col-md-8 pull-right">

            @yield('content')

        </div>

        <div id="sidebar" class="col-md-4 pull-left">

            @yield('sidebar')

        </div>

    </div>

</div>

<div id="footer" class="container-fluid">

    <div class="container">

        <div class="row">

            <footer class="footer"> Grouptopics built by members of User Groups for User Groups.</footer>

        </div>

    </div>

</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
</body>
</html>
