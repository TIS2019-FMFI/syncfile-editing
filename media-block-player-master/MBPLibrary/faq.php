<?php

/**
 * @author Martin Hrebeňár
 */

date_default_timezone_set('UTC');

session_start();

include_once('page.php');

Page::page_header('FAQ');
Page::page_navbar();

Page::info_card('Frequently asked questions', 'How can I download Article from Media Block-wise Player Library?<br> ' .
						   '================================================================<br> ' .
						   'Filter by Language, Difficulty (A-beginner, B-intermediate, C-advanced) > [APPLY FILTER] <br>' .
						   '> click on magnifier icon next to the Article > click on specific Article\'s file or [DOWNLOAD ALL] Article\'s files in .zip<br><br>' .
						   'How can I share my Article?<br>' .
						   '===========================<br>' .
						   'You need to be registered user - [REGISTER]<br>' .
						   '[LOGIN] > click on [+] in the lower right corner <br>' .
						   '> Edit Article title, Description (including source, maintain copyrights!), Difficulty level and Base (original) language<br>' .
						   '>Locate AUDIO, ORIGINAL SCRIPT and SYNC FILE files<br>' .
						   '>Optionally you may add one or more Parallel translations: click on [+] > Locate translation file and set the target language<br>' .
						   '> [SAVE ARTICLE] <br><br>' .
						   'How to name Article\'s files?<br>' .
						   '============================<br>' .
						   'Recommended file naming convenion - example:<br>' .
						   'FR_LaVoile.txt	    Article ‘La Voile’ in French language<br>' .
						   'FR_LaVoile_EN.txt	Parallel ‘block-wise’ translation into English<br>' .
						   'FR_LaVoile.mp3	    Audio recording  (16 bit)<br>' .
						   'FR_LaVoile.mbpsf	MediaBlockPlayer sync file to synchronize script and audio <br><br>'.
						   'How can I see and remove my Article?<br>' .
						   '====================================<br>' .
						   '[LOGIN] > [PROFILE] > find the Article > click on [X] next to it<br><br>' .
						   'How can I replace a file in Article or add Parallel translation?<br>' .
						   '================================================================<br>' .
						   '[LOGIN] > find your Article and click on magnifier icon next to it > Click on Edit icon (pen)<br>' .
						   '> you may replace Audio, Script, SyncFile or remove or add Parallel translation<br>' .
						   '[SAVE ARTICLE]<br><br>' .
						   'How to return to Media Block-wise Player?<br>' .
						   '=========================================<br>' .
						   'Click on [APPLICATION]<br>');


?>


<?php
Page::page_footer();
Page::page_foot();
?>
