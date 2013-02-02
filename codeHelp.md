---
Rendering Views
---

In your controller, to add items to the view just use this (as long as you are extending the base controller)
```php
$this->view->set( 'key', 'value' );
// or
$this->view->setItems( array(
	'item1' => 'value1',
	'foo'   => 'bar',
	'test'  => 'baz'
) );
```

To render the view
```php
// Defaults to controler.function
$this->render( 'optional.view.name' );
```

To build a template, make sure there is a directory for the controller you are using. For example:
If you are working on the fooController, make a `foo` directory in `app/views/`.

Then, for each functon you make, create a function.blade.php file (e.g. index.blade.php);

inside the file, you need to specify that you are extending a layout, and specify the content block:

```php
@extends('layout.master');

@section('content')
	<p>Welcome to our index page {{ $name }}!</p>
@stop
```
