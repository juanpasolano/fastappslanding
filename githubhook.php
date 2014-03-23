<?php
echo '<pre>Running "git pull</pre>"'
$output = shell_exec('git pull');
echo "<pre>$output</pre>";