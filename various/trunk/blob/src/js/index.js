window.onload = function(){
	flex = new Object();
	flex.root = docId("pixRoot");
	load("./lib.xml", findFlex, true);
}

var findFlex = function(src){
	var flexs = xPath(src, "/lib/flex/div");
	emergeFlex(flexs);
	renderFlex();
	window.onresize = renderFlex;
}

var emergeFlex = function(flexs){
	for(var t=0; t<flexs.length; t++) flex.root.appendChild(flexs[t].cloneNode(true));
}

var renderFlex = function(){
	var flexs = document.getElementsByTagName("flex");
	for(var f=0; f<flexs.length; f++){
		var tg = flexs[f].parentNode;
		alert(tg.nodeName);
		tg.style.background = "#900";
		var flxs = flexs[f].childNodes;
		for(var t=0; t<flxs.length; t++){
			var flx = flxs[t];
			switch(flx.tagName){
				case "rct":
					setRct(tg, flx.getAttribute("type"), flx.getAttribute("stroke"));
					break;
			}
		}
	}
}

/*

var jar = new Object();





var libLoad = function(src){
	jar.lib = src;
	// load objects
	load("./data/pix.xml", objLoad, true);
}

var objLoad = function(src){
	jar.obj = src;
	jar.centerObjects = new Object();
	var objects = xPath(jar.obj, "/webapp/objects/*");
	var intervalIndex = 0;
	var intervalAction = function(){
		if(intervalIndex < objects.length){
			eval(objects[intervalIndex].nodeName)(objects[intervalIndex], "_" + intervalIndex);
			intervalIndex++;
		} else clearInterval(interval);
	}
	var interval = setInterval(intervalAction, 150);
}

var pix = function(obj, id){
	// render pix object
	var src = xPath(jar.lib, "/lib/pix/default-face/div")[0].cloneNode(true);
	var tg = xPath2s(obj, "target/text()");
	if(docId(tg)){
		src.setAttribute("id", id);
		docId(tg).innerHTML += xml2str(src);
		var size = xPath2s(obj, "size/text()").split(",");
		nTg = docId(id);
		nTg.style.width = size[0];
		nTg.style.height = size[1];
		setPosition(id, xPath2s(obj, "position/text()").split(","));
		setTimeout("setBgChilds('" + id + "'); setRctChilds('" + id + "'); docId('" + id + "').style.borderStyle = 'none';", 150);
	} else alert("html target not found");
}

// pix events
pe = function(tg, state){
	switch(state){
		case "over":
			docPath(tg, "div/div@pixtools")[0].style.visibility = "visible";
			break;
		case "out":
			docPath(tg, "div/div@pixtools")[0].style.visibility = "hidden";
			break;
		case "expand":
			toolExpand(tg);
			break;
	}	
}

var toolExpand = function(tg){
	
}

var setPosition = function(id, pos){
	var tg = docId(id);
	if(pos == "middle"){
		pos = new Array();
		pos[0] = Math.round( (winSize().width / 2) - (tg.offsetWidth / 2) );
		pos[1] = Math.round( (winSize().height / 2) - (tg.offsetHeight / 2) );
		if(typeof(jar.centerObjects[id]) == "undefined") jar.centerObjects[id] = true;
	}
	tg.style.left = pos[0];
	tg.style.top = pos[1];
}




			var phpLoadXml = function(){
				var myPost = new Object;
				myPost.action = "open";
				myPost.file = "pics.xml";
				load("./php/xmlPort.php", res, true, myPost);
			}
			
			var res = function(src){
				
				//changes = src;
				//xPath(src, "/webapp/objects/pix/default/size/text()")[0].nodeValue = "aap was here";
			}
			
			var sendBack = function(){
				var myPost = new Object;
				myPost.action = "save";
				myPost.file = "pics.xml";
				myPost.data = xml2str(changes);
				load("./php/xmlPort.php", sent, true, myPost);
			}
			
			var sent = function(src){
				alert(src);
			}
*/