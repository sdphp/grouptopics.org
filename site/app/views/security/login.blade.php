@section('content')
<div id="login" class='container'>
    <form action="/login/" method="post" class="ajax">
        <div id="form">
            <h2>Please Sign In</h2>
            <div class="ajaxErrors"></div>
            <input type="text" name="email" placeholder="E-mail Address"/>
            <input type="password" name="password" placeholder="Password"/>
            <a href="<?=URL::route( 'providerLogin', array( 'provider' => 'google' ), false );?>" class="zocial google" >Sign in with Google</a>
            <a href="<?=URL::route( 'providerLogin', array( 'provider' => 'facebook' ), false );?>" class="zocial facebook" >Sign in with Facebook</a>
            <a href="<?=URL::route( 'providerLogin', array( 'provider' => 'twitter' ), false );?>" class="zocial twitter" >Sign in with Twitter</a>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Sign In</button>
        </div>
    </form>
</div>
@stop
