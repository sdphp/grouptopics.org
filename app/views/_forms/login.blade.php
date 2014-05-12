{{ Form::open(array('url' => 'login')) }}

<div class="form-group">

    {{ Form::label('email', 'E-Mail Address') }}
    {{ Form::text('email', null, array('class' => 'form-control')) }}
    {{ $errors->first('email', '<span class="error">:message</span>') }}

</div>

<div class="form-group">

    {{ Form::label('password', 'Password') }}
    {{ Form::password('password', array('class' => 'form-control')) }}
    {{ $errors->first('password', '<span class="error">:message</span>') }}

</div>

{{ Form::submit('Login', array('class' => 'btn btn-primary btn-lg pull-right col-md-6')) }}

</form>

{{ Form::close() }}