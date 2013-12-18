<?php
function writeJSLib($jspath){
	if($handle = opendir($jspath)){
		//echo "Directory handle: $handle\n";
		//echo "Entries:\n";
		    /* This is the correct way to loop over the directory. */
		    while (false !== ($entry = readdir($handle))) {
		        //echo "$entry\n";
				if ($entry != "." && $entry != "..") {
					echo '<script src="'.$jspath.$entry.'" type="text/javascript" charset="utf-8"></script>';
					echo "\n";
				}
		    }
		    closedir($handle);
	}
}
?>