<?php

/**
 * @author Martin Hrebeňár
 */

date_default_timezone_set('UTC');

session_start();

include_once('page.php');

Page::page_header('FAQ');
Page::page_navbar();

Page::info_card('Frequently asked questions', 'Ask one. :-)');

?>


<?php
Page::page_footer();
Page::page_foot();
?>
