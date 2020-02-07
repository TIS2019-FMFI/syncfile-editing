<?php

/**
 * @author Martin Hrebeňár
 */

date_default_timezone_set('UTC');

session_start();

include_once('page.php');

Page::page_header('Contact');
Page::page_navbar();

Page::info_card('Contact', 'This application has been designed and developed by groups of students ' .
                           'in the \'Development of information systems\' course at Faculty of Mathematics, ' .
                           'Physics and Informatics at Comenius University, Bratislava in 2019 and 2020 ' .
                           'on behalf of RNDr. Ján Krajčík, krajcik@hipa.sk.<br><br> ' .
                           'The latest version can be found in the github repository:<br>' .
                           '  <a href="https://github.com/TIS2019-FMFI/syncfile-editing">https://github.com/TIS2019-FMFI/syncfile-editing</a>'  );

?>



<?php
Page::page_footer();
Page::page_foot();
?>
