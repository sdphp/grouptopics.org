<?php

/*
|===============================
| Hybrid Auth Config
|===============================
|
|
 */

return array(
    "base_url"  => "http://" . $_SERVER[ 'HTTP_HOST' ] . "/social/auth/",
    "providers"  => array (
        "Google"     => array (
            "enabled"    => false,
            "keys"       => array ( "id" => "ID", "secret" => "SECRET" ),
        ),
        "Facebook"   => array (
            "enabled"    => false,
            "keys"       => array ( "id" => "ID", "secret" => "SECRET" ),
        ),
        "Twitter"    => array (
            "enabled"    => false,
            "keys"       => array ( "key" => "ID", "secret" => "SECRET" )
        )
    ),
);