<?php
	$dataContainer = "../data/";
	$action = $_POST["action"];
	$slot = $_GET["slot"];
	if(isset($action) && isset($slot)){
		$file = $_POST["file"];
		if( isset($file) ){
			if( is_file($dataContainer . $file) ){
				// load xml document
				$doc = new DOMDocument();
				// $doc->preserveWhiteSpace = false;
				$doc->load( $dataContainer . $file );
				switch($action){
					case "open":
						// sent xml file
						header('Content-Type: text/xml');
						echo $doc->saveXML();
						break;
					case "save":
						$newXml = stripslashes( urldecode($_POST["data"]) );
						if( isset($newXml) ){
							$newDoc = new DOMDocument();
							$newDoc->loadXML( $newXml );
							$newDoc->save( $dataContainer . $file );
							echo "sent";
						}
						break;
					default:
						echo "Don't understand";
						break;
				}
			} else echo $file . " is not a file";
		} else echo "Don't get what<br/>";
	} else{
		if(!isset($action)) echo "Nothing to do<br/>";
		if(!isset($slot)) echo "Use a slot<br/>";
	}
?>