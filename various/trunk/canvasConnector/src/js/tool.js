// General purpose browser functionality - GBS-AS Learning Technologies IBM BLS-2C2

// shorter version of document.getElementById
var docId = function(x){return document.getElementById(x);}

// get vars from document.location
var getVars = function(){
	var gets = new Object();
	try{ var arr = window.location.href.split('?')[1].split('&'); } catch(e){ return false };
	for(var t=0; t<arr.length; t++){
		var itm = arr[t].split('=');
		gets[itm[0]] = itm[1];
	}
	return gets;
}

// vars and values to get variables
var setGetVars = function(url, array, slot){
	for(var t in array) url += ((url.indexOf("?")>-1)?"&":"?") + t + "=" + array[t];
	if(slot==true) url += ((url.indexOf("?")>-1)?"&slot=":"?slot=") + new Date().getTime().toString().substr(6);
	return url;
}

// check if path is absolute
var isAbsolutePath = function(path){ return (/:/.test(path)) }

// alternate XMLSerializer
if(!window.XMLSerializer){
	XMLSerializer = function(){}; XMLSerializer.prototype.serializeToString = function(oNode){ return oNode.xml; }
}

//xml to string translator using XMLSerializer
var xml2str = function(src){
	if(src.nodeType >= 2 && src.nodeType <= 4) return src.nodeValue;
	else return new XMLSerializer().serializeToString(src);
}

// get direct node childs by tagname
var getChildElementsByTagName = function(src, tagName){
	var collection = new Array();
	var childs = src.childNodes;
	for(var xl=0; xl<childs.length; xl++) if(childs[xl].nodeName == tagName) collection.push(childs[xl]);
	return collection;
}

// direct node childs by classname
var getChildsByClassName = function(src, className){
	var collection = new Array();
	var childs = src.childNodes;
	for(var xl=0; xl<childs.length; xl++) if(childs[xl].className == className) collection.push(childs[xl]);
	return collection;
}

// elements by attribute name
var getElementsByAttribute = function(src, attName){
	var collection = new Array(); var tgs = src.getElementsByTagName('*');
	for(var t=0; t<tgs.length; t++) if(tgs[t].getAttribute(attName)) collection.push(tgs[t]);
	return collection;
}

//gets elements by classname
function getByClassname(needle){
	var nodes = document.getElementsByTagName('*');
	var res = new Array();
	for(var i = 0, j = 0; i < nodes.length; i++){
		var c = ' ' + nodes[i].className + ' ';
		if(c.indexOf(' ' + needle + ' ') != -1) res[j++] = nodes[i];
	}
	return res;
}

// url encoding
var URLEncode = function(clearString){
	var output = '';
	var x = 0;
	clearString = clearString.toString();
	var regex = /(^[a-zA-Z0-9_.]*)/;
	while (x < clearString.length) {
		var match = regex.exec(clearString.substr(x));
		if (match != null && match.length > 1 && match[1] != ''){
			output += match[1];
			x += match[1].length;
		} else {
			if (clearString[x] == ' ') output += '+';
			else {
				var charCode = clearString.charCodeAt(x);
				var hexVal = charCode.toString(16);
				output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
			}
			x++;
		}
	}
	return output;
}

// document new node
var docNode = function(targetNode, element){
	var node = document.createElement(element);
	var insert = "after";
	for(var t=2; t<arguments.length; t=t+2){
		if(browser.isIE){
			arguments[t] = arguments[t].toLowerCase();
			switch(arguments[t]){
				case "class":
					node.setAttribute('className', arguments[t+1]);
					break;
				case "style":
					var styles = arguments[t+1].split(" ").join("").split(";");
					if(styles[styles.length - 1] == "") styles.pop();
					for(var s=0; s<styles.length; s++){
						var style = styles[s].split(":");
						node.style[style[0]] = style[1];
					}
					break;
				case "onclick":
					node[arguments[t]] = eval("new Function('" + arguments[t+1] + "')");
					break;
				case "onmouseover":
					node[arguments[t]] = eval("new Function('" + arguments[t+1] + "')");
					break;
				case "onmouseout":
					node[arguments[t]] = eval("new Function('" + arguments[t+1] + "')");
					break;
				case "onchange":
					node[arguments[t]] = eval("new Function('" + arguments[t+1] + "')");
					break;
				case "insert":
					insert = arguments[t+1];
					break;
				default:
					node.setAttribute(arguments[t], arguments[t+1]);
					break;
			}
		}
		else if(arguments[t] == "insert") insert = arguments[t+1];
		else node.setAttribute(arguments[t], arguments[t+1]);
	}
	if(typeof(targetNode) == "string") targetNode = docId(targetNode);
	if(insert == "before") targetNode.insertBefore(node, targetNode.firstChild);
	else if(!isNaN(insert)) targetNode.insertBefore(node, targetNode.childNodes[parseInt(insert)]);
	else targetNode.appendChild(node);
	return node;
}

// insert html with whitespace:
var xtml = function(tg, str, replace, preserveWhitespace){
	if(typeof(tg) == "string") tg = docId(tg);
	if(typeof(tg) == "object"){
		if(preserveWhitespace == true){
			// preserve whitespace but still wrap text
			if(browser.isIE){
				tg.style.wordWrap = "break-word";
				tg.style.whiteSpace = "pre";
			} else tg.style.whiteSpace = "-moz-pre-wrap";
		}
		if(replace == true) tg.innerHTML = str;
		else tg.innerHTML += str;
		return true;
	} else return false;
}

// change css attributes
var changecss = function(theClass, element, value){
	var cssRules;
 	if(document.all) cssRules = 'rules';
	else if(document.getElementById) cssRules = 'cssRules';
	for(var S = 0; S < document.styleSheets.length; S++){
		for(var R = 0; R < document.styleSheets[S][cssRules].length; R++) if(document.styleSheets[S][cssRules][R].selectorText == theClass) document.styleSheets[S][cssRules][R].style[element] = value;
	}	
}

// dynamic load css and js file with callback on load
var loadScript = function(path, callBack){
	var fileType = path.split('.').pop();
	if(fileType == 'css'){
		var nNode = document.createElement('link');
		nNode.type = 'text/css';
		nNode.rel = 'stylesheet';
		nNode.href = path;
	} else if(fileType == 'js'){
		var nNode = document.createElement('script');
		nNode.type = 'text/javascript';
		nNode.language = 'JavaScript';
		nNode.src = path;
	}
	document.getElementsByTagName("head")[0].appendChild(nNode);
	var ready = function(){
		var callType = typeof(callBack);
		if(callType == "string") eval(callBack)(nNode);
		else if(callType == "function") callBack(nNode);
	}
	nNode.onload = function(){ ready(); }
	nNode.onreadystatechange = function(){ if(nNode.readyState == "loaded") ready(); }
}

// deselect txt
var deselect = function(){
	if(browser.isIE) document.selection.empty();
	else window.getSelection().removeAllRanges();
}

// get flash object
function getFlashMovieObject(movieName){
	if(window.document[movieName]){
		return window.document[movieName];
	}
	if (navigator.appName.indexOf("Microsoft Internet") == -1){
		if(document.embeds && document.embeds[movieName]) return document.embeds[movieName];
	} else{ // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
		return document.getElementById(movieName);
	}
}

var sendDataToFlashMovie = function(swfName, rootVar, newValue){
	getFlashMovieObject(swfName).SetVariable("/:" + rootVar, newValue);
}

var receiveDataFromFlashMovie = function(swfName, rootVar){
	return getFlashMovieObject(swfName).GetVariable("/:" + rootVar);
}

var flashMovieResponse = function(movieName){
	var flashMovie = getFlashMovieObject(movieName);
	if(typeof(flashMovie.GetVariable) != 'function') return false;
	else return true;
}

// change location
var myLoc = function(url){window.location.href = url;}
var newLoc = function(url){window.open(url);}

// find real object position
var findPos = function(obj){
	var curleft = curtop = 0;
	if (obj.offsetParent){
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent){
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	return [curleft,curtop];
}

// get browser viewport size
var winSize = function(){
	var myWidth = 0, myHeight = 0;
	if(typeof(window.innerWidth) == 'number'){
		//Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if(document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} else if(document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	return new Object({'width':myWidth,'height':myHeight});
}

// set div opacity
var setOpacity = function(opacity, object){
	if(typeof(object) == 'object') object = object.style;
	else object = document.getElementById(object).style;
	// If it's 100, set it to 99 for Firefox.
	if(navigator.userAgent.indexOf("Firefox") != -1) if(opacity == 100) opacity = 99.999;
	// Multi-browser opacity setting
	// IE/Win
	object.filter = "alpha(opacity=" + opacity + ")";
	// Safari 1.1 or lower, Konqueror
	object.KhtmlOpacity = (opacity / 100);
	// Older Mozilla, Firefox
	object.MozOpacity = (opacity / 100);
	// Safari 1.2, Firefox, Mozilla
	object.opacity = (opacity / 100);
}

// in array
var inArray = function(arr, obj){
	for(var t  in arr) if(arr[t] == obj) return true;
	return false;
}

// make array unique
var arrayUnique = function(src){
	var uniqueArr = new Array();
	for(var origKey in src){
		valueExists = false;
		for(var uniqueKey in uniqueArr){
			if(uniqueArr[uniqueKey] == src[origKey]){
				valueExists = true;
			}
		}
		if(!valueExists){
			uniqueArr.push(src[origKey]);
		}
	}
	return uniqueArr;
}

// message pane
var msg = function(src){
	if(src == false) document.body.removeChild(docId('msgPane'));
	else{
		if(docId('msgPane')) document.body.removeChild(docId('msgPane'));
		document.body.innerHTML += "<div id='msgPane' onclick='msg(0)' style='position:absolute; border-style:solid; border-width:1px; border-color:#cdcdcd; background:#efefef; padding:3px; font-size:12px; color:#666;'> </div>";
		var pane = docId('msgPane');
		pane.innerHTML = src;
		var wSize = winSize();
		pane.style.left = (wSize.width - pane.offsetWidth) / 2 + 'px';
		pane.style.top = (wSize.height - pane.offsetHeight) / 2 + 'px';
		setOpacity(92, pane);
	}
}

// apply PNG background
var myOpacityObject = function (divTarget, strPath){
	this.path = strPath + ".png";
	this.layerObject = divTarget;
	this.setBackground = function(){ // AlphaImageLoader for IE5 and 6, css for others
		if(!this.layerObject.getAttribute('id')) this.layerObject.setAttribute('id', 'png' + pngCount); pngCount++; // give each png layer unique id
		if(pngAlphaFilter) this.layerObject.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.path + '", sizingMethod="scale")';
		else this.layerObject.style.backgroundImage = 'url(' + this.path + ')';
	}
}
// sets myOpacityObject right away
var alphaBg = function(tg, img){
	return new myOpacityObject(tg, img).setBackground();
}
// apply PNG background to all elements with bg attribute
var setBgChilds = function(tg){
	if(typeof(tg) == "string") tg = docId(tg);
	// set self
	if(typeof(tg.getAttribute("bg")) != "undefined") alphaBg(tg, tg.getAttribute("bg"));
	// set childs
	var nodes = getElementsByAttribute(tg, "bg");
	for(var t=0; t<nodes.length; t++){ alphaBg(nodes[t], nodes[t].getAttribute("bg")); };
}
// alpha background with docId
var get2SetBg = function(idName, bgUrl){
	var obj = docId(idName);
	var tmp = new myOpacityObject(obj, bgUrl).setBackground();
	return obj;
}

// map png images from images array
function updatePng(){
	for(var t in pngLib){
		var tgs = getByClassname(t);
		for(var y in tgs){
			var iAm = tgs[y];			
			var objMyImg = new myOpacityObject(iAm, pngLib[t]);
			objMyImg.setBackground();
		}
	}
}

// find all existing rct attributes in document
var setRctChilds = function(tg){
	if(typeof(tg) == "string") tg = docId(tg);
	// set self
	if(typeof(tg.getAttribute("rct")) != "undefined") setRct(tg, true);
	// set childs
	var nodes = getElementsByAttribute(tg, "rct");
	for(var t=0; t<nodes.length; t++){ setRct(nodes[t], true); };
}

var setRct = function(tg, centerBg){
	if(typeof(tg) == "string") tg = docId(tg);
	var rctPath = tg.getAttribute('rct');
	var rctStroke = tg.getAttribute('rctstroke');
	var oldPath = tg.getAttribute('rctprev');
	if(rctPath && rctStroke){
		var tW = tg.offsetWidth - 1; if(tW < 0) tW = 0;
		var tH = tg.offsetHeight;
		var rctStroke = rctStroke.split(',');
		var strokeL = rctStroke[0];
		var strokeR = rctStroke[1];
		var strokeT = rctStroke[2];
		var strokeB = rctStroke[3];
		// if new rct generate bg divs
		if(rctPath != oldPath){
			// first delete existing rcts
			var chds = docPath(tg, "div@rctype");
			for(var l in chds) tg.removeChild(chds[l]);
			// build bg divs
			var tl = docNode(tg, 'div', 'insert', 'before', 'rctype', 'tl', 'style', 'width:' + strokeL + 'px; height:' + strokeT + 'px; top:' + (0 - strokeT) + 'px; left:' + (0 - strokeL) + 'px; position:absolute');
			var tm = docNode(tg, 'div', 'insert', 'before', 'rctype', 'tm', 'style', 'width:' + tW + 'px; height:' + strokeT + 'px; top:' + (0 - strokeT) + 'px; left:' + 0 + 'px; position:absolute');
			var tr = docNode(tg, 'div', 'insert', 'before', 'rctype', 'tr', 'style', 'width:' + strokeR + 'px; height:' + strokeT + 'px; top:' + (0 - strokeT) + 'px; left:' + tW + 'px; position:absolute');
			var ml = docNode(tg, 'div', 'insert', 'before', 'rctype', 'ml', 'style', 'width:' + strokeL + 'px; height:' + tH + 'px; top:' + 0 + 'px; left:' + (0 - strokeL) + 'px; position:absolute');
			var mr = docNode(tg, 'div', 'insert', 'before', 'rctype', 'mr', 'style', 'width:' + strokeR + 'px; height:' + tH + 'px; top:' + 0 + 'px; left:' + tW + 'px; position:absolute');
			var bl = docNode(tg, 'div', 'insert', 'before', 'rctype', 'bl', 'style', 'width:' + strokeL + 'px; height:' + strokeB + 'px; top:' + tH + 'px; left:' + (0 - strokeL) + 'px; position:absolute');
			var bm = docNode(tg, 'div', 'insert', 'before', 'rctype', 'bm', 'style', 'width:' + tW + 'px; height:' + strokeB + 'px; top:' + tH + 'px; left:' + 0 + 'px; position:absolute');
			var br = docNode(tg, 'div', 'insert', 'before', 'rctype', 'br', 'style', 'width:' + strokeR + 'px; height:' + strokeB + 'px; top:' + tH + 'px; left:' + tW + 'px; position:absolute');
			// set background imgs
			var eml = docPath(tg, "div@rctype");
			for(var t in eml){
				eml[t].style.fontSize = "0px";
				alphaBg(eml[t], rctPath + '/' + eml[t].getAttribute('rctype'));
			}
			// set center background
			if(centerBg == true) tg.style.backgroundImage = "url(" + rctPath + "/mm.png)";
			// remember previous path
			tg.setAttribute('rctprev', rctPath);
		}
		// else justmove elements to new positions
		else{
			var eml = docPath(tg, "div@rctype");
			for(var t in eml){
				var em = eml[t];
				switch(em.getAttribute('rctype')){
					case 'tm': em.style.width = tW + 'px'; break;
					case 'tr': em.style.left = tW + 'px'; break;
					case 'ml': em.style.height = tH + 'px'; break;
					case 'mr': em.style.height = tH + 'px'; em.style.left = tW + 'px'; break;
					case 'bl': em.style.top = tH + 'px'; break;
					case 'bm': em.style.top = tH + 'px'; em.style.width = tW + 'px'; break;
					case 'br': em.style.top = tH + 'px'; em.style.left = tW + 'px'; break;
				}
			}
		}
	}
}

// place object 'next' to object by 'placer' attribute
var placer = function(tg){
	var task = tg.getAttribute("placer").split(":");
	if(task.length == 3){
		var obj = document.getElementById(task[0]);
		task[2] = parseInt(task[2]);
		switch(task[1]){
			case 'left':
				tg.style.left = obj.offsetLeft - tg.offsetWidth - task[2] + 'px';
				tg.style.top = obj.offsetTop + 'px';
				break;
			case 'right':
				tg.style.left = obj.offsetLeft + obj.offsetWidth + task[2] + 'px';
				tg.style.top = obj.offsetTop + 'px';
				break;
			case 'top':
				tg.style.left = obj.offsetLeft + 'px';
				tg.style.top = obj.offsetTop - tg.offsetHeight - task[2] + 'px';
				break;
			case 'bottom':
				tg.style.left = obj.offsetLeft + 'px';
				tg.style.top = obj.offsetTop + obj.offsetHeight + task[2] + 'px';
				break;
		}
	}
}

// cross browser xpath in xml files
var xPath = function(oNodes, sXPath){
	if(browser.isIE){
		try{
			if(oNodes.documentElement == null) var oSelectedNode = oNodes.selectNodes(sXPath);
			else{
				oNodes.setProperty("SelectionLanguage", "XPath");
				var oSelectedNode = oNodes.documentElement.selectNodes(sXPath);
			}
			if(oSelectedNode.length > 0) return oSelectedNode;
			else return false;
		}catch(e){ return false; }
	} else{
		try{
			var oXpe = new XPathEvaluator();
			var oNsResolver = oXpe.createNSResolver(oNodes.ownerDocument == null ? oNodes.documentElement : oNodes.ownerDocument.documentElement);
			var oResult = oXpe.evaluate(sXPath, oNodes, oNsResolver, 0, null);
			var aFound = []; var oRes;
			while(oRes = oResult.iterateNext()){ aFound.push(oRes); }
			if(aFound.length > 0) return aFound;
			else return false;
		}catch(e){ return false; }
	}
}

// cross browser xml xpath to serialized string
var xPath2s = function(src, path){
	var nds =  xPath(src, path); var res = new Array();
	if(nds.length > 0){
		for(var t=0; t<nds.length; t++) res.push( xml2str(nds[t]) );
		return res.join("");
	} else return false;
}

// cross browser xpath(ish) in html document
var docPath = function(startNode, action){
	if(typeof(startNode) == "string") startNode = docId(startNode);
	var docPathArray = function(node, pathLeft){
		var result = new Array();
		var pathStep = pathLeft.shift();
		var nodes = node.childNodes;
		for(var t=0; t<nodes.length; t++){
			if(nodes[t].nodeType == 1){
				// node path
				if( (nodes[t].tagName.toLowerCase() == pathStep || pathStep == '*') || (nodes[t].tagName.toLowerCase() == pathStep.split("@")[0] && nodes[t].attributes[pathStep.split("@")[1]]) ){
					// store for recursive call
					if(pathLeft.length > 0){
						var tmp = docPathArray(nodes[t], [].concat(pathLeft));
						// if found something
						if(tmp.length > 0) result.push(tmp);
					}
					// result
					else basket.push(nodes[t]);
				}
			}
		}
		return result;
	}
	var basket = new Array();
	docPathArray(startNode, action.toLowerCase().split('/'));
	return basket;
}

// browser detect
var miniBrowserDetect = function(){
	// user agent
	this.ua = navigator.userAgent.toLowerCase();
	// version
	this.isIE = ( (this.ua.indexOf("msie") != -1) && (this.ua.indexOf("opera") == -1) && (this.ua.indexOf("webtv") == -1) );
	this.isMozilla   = (this.isGecko && this.ua.indexOf("gecko/") + 14 == this.ua.length);
	// minor version
	this.versionMinor = parseFloat(navigator.appVersion);
	// correct version number for IE4+
	if(this.isIE && this.versionMinor >= 4){ this.versionMinor = parseFloat( this.ua.substring( this.ua.indexOf('msie ') + 5 ) ); }
	// platform
	this.isWin   = (this.ua.indexOf('win') != -1);
	this.isWin32 = (this.isWin && ( this.ua.indexOf('95') != -1 || this.ua.indexOf('98') != -1 || this.ua.indexOf('nt') != -1 || this.ua.indexOf('win32') != -1 || this.ua.indexOf('32bit') != -1) );
	this.isMac   = (this.ua.indexOf('mac') != -1);
	this.isUnix  = (this.ua.indexOf('unix') != -1 || this.ua.indexOf('linux') != -1 || this.ua.indexOf('sunos') != -1 || this.ua.indexOf('bsd') != -1 || this.ua.indexOf('x11') != -1)
}

// initiate browsercheck object
var browser = new miniBrowserDetect();
// Count loaded alpha png's
var pngCount = 0; 
// ie7 displays alpha without activeX
if(browser.isIE && browser.versionMinor < 7) var pngAlphaFilter = true;

// drag div with drag="true", to activate: document.onmousedown = selectmouse;
function selectmouse(e){
	var fobj = browser.isIE ? event.srcElement : e.target;
	if(fobj.tagName.toLowerCase() == 'div'){
		try{
			while(fobj.tagName != "body" && fobj.getAttribute('drag') != 'true') fobj = browser.isIE ? fobj.parentElement : fobj.parentNode;
			if(fobj.getAttribute('drag') == 'true'){
				var tx = parseInt(fobj.style.left + 0, 10);
				var ty = parseInt(fobj.style.top + 0, 10);
				var x = browser.isIE ? event.clientX : e.clientX;
				var y = browser.isIE ? event.clientY : e.clientY;
				onTop(fobj);
				document.onmouseup = function(){ document.onmousemove = null; document.onmouseup = null; }
				document.onmousemove = function(e){
					fobj.style.left = browser.isIE ? tx + event.clientX - x : tx + e.clientX - x;
					fobj.style.top = browser.isIE ? ty + event.clientY - y : ty + e.clientY - y;
					if(fobj.getAttribute('dragdo')) eval(fobj.getAttribute('dragdo'));
				}
			} else if(fobj.getAttribute('pressdo')) eval(fobj.getAttribute('pressdo'))(fobj, e);
		} catch(e){};
	}
}

// eval string on next time mouse button up
var mouseUpOnceMinimum = 200;
var mouseUpOnce = function(todo){
	mouseUpOnceAction = todo;
	mouseUpOnceStart = new Date().getTime();
	document.onmouseup = function(){
		var upTime = new Date().getTime();
		var duration = upTime - mouseUpOnceStart;
		document.onmouseup = null;
		if(duration < mouseUpOnceMinimum) setTimeout("if(typeof(mouseUpOnceAction) != 'undefined'){ eval(mouseUpOnceAction); delete mouseUpOnceAction;}", mouseUpOnceMinimum - duration);
		else{
			eval(mouseUpOnceAction);
			delete mouseUpOnceAction;
			delete mouseUpOnceStart;
		}
	}
}

// make node lastChild (in html visual on top :-)
var onTop = function(tg){
	var Parent = tg.parentNode;
	if(Parent.lastChild != tg) Parent.appendChild( Parent.removeChild(tg) );
}

// make node firstChild
var onBottom = function(tg){
	var Parent = tg.parentNode;
	if(Parent.firstChild != tg) Parent.appendChild( Parent.removeChild(tg) );
}

// Browser-neutral XMLHttpRequest object
var getHTTPObject = function(){
	var xmlhttp;
	if(browser.isWin && browser.isIE){
		try{ xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); } catch(e){
			try{ xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }catch(E){ xmlhttp = false; }
		}
	} else if(!xmlhttp && typeof XMLHttpRequest != 'undefined'){
		try{ xmlhttp = new XMLHttpRequest(); }catch(e){ xmlhttp = false; }
	}
	return xmlhttp;
}

// async load xml or text
var load = function(url, callBack, strict, posts){
	// cache slot
	url += ((url.indexOf("?")>-1)?"&slot=":"?slot=") + new Date().getTime().toString().substr(6);
	// http object
	var httpReq = getHTTPObject();
	httpReq.onreadystatechange = function(){
		if(httpReq.readyState == 4){
			// FF or IE
			if(httpReq.responseXML == null || httpReq.responseXML.firstChild == null){
				if(strict == "strictXml"){
					rec = false;
					if(browser.isIE){
						// for loading local files with IE
						rec = new ActiveXObject("Microsoft.XMLDOM");
						rec.loadXML(httpReq.responseText);
					}
				} else var rec = httpReq.responseText;
			} else var rec = httpReq.responseXML;
			(typeof(callBack) == "string") ? eval(callBack)(rec) : callBack(rec);
		}
	}
	// GET or POST
	if(typeof(posts) == "undefined"){
		httpReq.open("GET", url, true);
		httpReq.send(null);
	} else{
		var postData = "";
		for(var i in posts) postData += encodeURIComponent(i) + "=" + encodeURIComponent(posts[i]) + "&";
		if(postData.lengh > 0) postData = postData.slice(0, postData.length - 1);
		httpReq.open("POST", url, true);
		httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpReq.setRequestHeader("Content-length", postData.length);
		httpReq.setRequestHeader("Connection", "close");
		httpReq.send(postData);
	}
}

// embedding media player object
var multiMedia = function(tg, url, width, height, playOnLoad){
	if(typeof(tg) == "string"){tg = docId(tg);};
	// make unique id for object
	var objId = "media" + new Date().getTime().toString().substr(6);
	// prepare
	if(!width || width == '') var width = tg.offsetWidth;
	if(!height || height == '') var height = tg.offsetHeight;
	if(playOnLoad == true) playOnLoad = 1;
	else playOnLoad = 0;

	// remove previous media objects
	var childs = tg.childNodes;
	for(t=0; t<childs.length; t++){
		var nodeNm = childs[t].nodeName.toLowerCase();
		if(nodeNm == "object" || nodeNm == "applet"){
			childs[t].ctrl = undefined;
			childs[t].parentNode.removeChild(childs[t]);
		}
	}

	// according to media type
	var ext = url.substring(url.length -4);
	if(ext == ".m4x" || ext == ".mp4"){
		// ibm m4x player
		var javaErrorString = "Please enable Java (JRE) for this web browser...";
		var appletFile = "mp4Applet1.2.9";
		tg.innerHTML += '<applet id="' + objId + '" width="' + width + '" height="' + height + '" code="M4Applet.class" codebase="./java" id="m4player" name="m4player" alt="' + javaErrorString + '" archive="' + appletFile + '.jar"><param name="CABBASE" value="' + appletFile + '.cab"><param name="url" value="' + url + '"><param name="panel" value="none"><param name="atDuration" value="Stop"></applet>';
		var pObj = document.getElementById(objId);
		// controls
		var ctrl = new Object();
		ctrl.pause = function(){pObj.player_pause();};
		ctrl.resume = function(){pObj.player_resume();};
		ctrl.time = function(){return pObj.player_getTime();};
		ctrl.duration = function(){return pObj.player_getDuration();};
	} else{
			// windows mediaplayer object
			if(browser.isIE){
				tg.innerHTML += "<object id='" + objId + "' width='" + width + "' height='" + height + "' classid=clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6><param NAME='autostart' VALUE='0'><param name='showStatusbar' value='0'/><param name='showDisplay' value='0'/><param name='ShowControls' value='0'/><param name='uiMode' value='none'/><param name='stretchToFit' value='true'/><param name='url' value='" + url + "'/><param name='SendPlayStateChangeEvents' value='True'/></object><script FOR='" + objId + "' EVENT='ScriptCommand(bstrType, bstrParam)' LANGUAGE='Jscript'>wmevent(bstrType, bstrParam);</script><script for='" + objId + "' event='playStateChange(NewState)' language='jscript' type='text/jscript'>wmstate(NewState);</script>";
				// start playing
				if(playOnLoad != false) document[objId].controls.play();
			} else{
				tg.innerHTML += "<object id='" + objId + "' type='application/x-ms-wmp' data='" + url + "' width='" + width + "' height='" + height + "'></object><script FOR='" + objId + "' EVENT='ScriptCommand(bstrType, bstrParam)' LANGUAGE='Jscript'>wmevent(bstrType, bstrParam);</script><script for='" + objId + "' event='playStateChange(NewState)' language='jscript' type='text/jscript'>wmstate(NewState);</script>";

				var embd = document.createElement("embed");
				embd.setAttribute("width", width);
				embd.setAttribute("height", height);
				embd.setAttribute("autostart", playOnLoad);
				embd.setAttribute("showStatusbar", 0);
				embd.setAttribute("showDisplay", 0);
				embd.setAttribute("showControls", 0);
				embd.setAttribute("uiMode", "none");
				embd.setAttribute("src", url);
				// embd.setAttribute("type", "application/x-mplayer2");
				embd.setAttribute("SendPlayStateChangeEvents", "True");
				var wmpObj = document.getElementById(objId);
				wmpObj.appendChild(embd);
				// start playing
				try{wmpObj.controls.play();}catch(e){if(browser.isWin) setTimeout("infoPane('help', 'configure1')", 300);};
			}

			// controls
			var ctrl = new Object();
			ctrl.stop = function(){document[objId].controls.stop();};
			ctrl.pause = function(){document[objId].controls.pause();};
			ctrl.resume = function(){document[objId].controls.play();};
			ctrl.time = function(){return Math.round(document[objId].controls.currentPosition * 1000);};
			ctrl.setTime = function(to){document[objId].controls.currentPosition = Math.round(to / 1000);};
			ctrl.duration = function(){return Math.round(document[objId].currentMedia.duration * 1000);};
	}

	// reference to player by id
	ctrl.objectId = objId;
	return ctrl;
}

var embedFlash = function(flashWidth, flashHeight, flashMovie, target){
	var flashObject = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
	+ 'width='+flashWidth+' height='+flashHeight+' '
	+ 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">'
	+ '<param name="movie" value="'+flashMovie+'" /><param name="quality" value="high" /><param name="bgcolor" value="#eee" /><param name="wmode" value="transparent">'
	+ '<embed src="'+flashMovie+'" quality="high" bgcolor="#eee" '
	+ 'width="'+flashWidth+'" height="'+flashHeight+'" align="left" wmode="transparent"'
	+ 'play="true" quality="high" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"><\/embed><\/object>';
	target.innerHTML += flashObject;
}

var installPlugin = function(path){
	plugin_xpi = {'WMP ActiveX plugin': path};
	InstallTrigger.install(plugin_xpi);
}
