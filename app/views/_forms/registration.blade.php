{{ Form::open(array('url' => 'signup')) }}

  <div class="form-group">

    {{ Form::label('name', 'Name') }}
    {{ Form::text('name') }}
    {{ $errors->first('name', '<span class="error">:message</span>') }}

  </div>

  <div class="form-group">

  	{{ Form::label('email', 'E-Mail Address') }}
    {{ Form::text('email'); }}
    {{ $errors->first('email', '<span class="error">:message</span>') }}

  </div>

  <div class="form-group">

  	{{ Form::label('password', 'Password') }}
    {{ Form::password('password') }}
    {{ $errors->first('password', '<span class="error">:message</span>') }}

  </div>

  <div class="form-group">

    {{ Form::label('password_confirmation', 'Password confirmation') }}
    {{ Form::password('password_confirmation') }}
    {{ $errors->first('password_confirmation', '<span class="error">:message</span>') }}

  </div>

  {{ Form::submit('Sign up!') }}

</form>

{{ Form::close() }}