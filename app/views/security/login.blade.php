@section('content')
<div id="login" class='container'>
    <form action="/login/" method="post" class="ajax">
        <div id="form">
            <h2>Please Sign In</h2>
            <div class="ajaxErrors"></div>
            <input type="text" name="email" placeholder="E-mail Address"/>
            <input type="password" name="password" placeholder="Password"/>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Sign In</button>
        </div>
    </form>
</div>
@stop
