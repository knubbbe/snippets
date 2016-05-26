### PUT THIS IN functions.php

```php
add_filter( 'acf/load_value/type=gallery', 'my_acf_load_translated_attachment', 10, 3 );
add_filter( 'acf/load_value/type=image', 'my_acf_load_translated_attachment', 10, 3 );

function my_acf_load_translated_attachment($value, $post_id, $field) {
	$newValue = $value;

	// Make sure we are using WPML
	if (function_exists('icl_object_id')) {
		// Galleries come in arrays
		if (is_array($value)) {
			$newValue = array();
			foreach($value as $key => $id) {
				$newValue[$key] = icl_object_id($id, 'attachment');
			}
		} else {
			$newValue = icl_object_id($value, 'attachment');
		}
	}

	return $newValue;
}
```
