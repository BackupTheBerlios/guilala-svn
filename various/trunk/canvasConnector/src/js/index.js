window.onload = function(){
	setRctChilds(document.body);
	document.onmousedown = selectmouse;
	//window.onresize = resize;
	set();
}

var set = function(){
	//size = winSize();
	var cnvs = docPath(document.body, "div@gStart");
	for(var t=0; t<cnvs.length; t++){


		
		gConnect(cnvs[t].getAttribute("id"));
	}
}

var gConnect = function(canvasTg){
	var cnv = docId(canvasTg);
	var tgS = docId(cnv.getAttribute("gStart"));
	var tgE = docId(cnv.getAttribute("gEnd"));
	if(tgS && tgE){
		// set coordinates
		tgStart = findPos(tgS);
		tgEnd = findPos(tgE);
		// move and scale canvas div
		if(tgStart[0] < tgEnd[0]) var newLeft = tgStart[0];
		else var newLeft = tgEnd[0];
		if(tgStart[1] < tgEnd[1]) var newTop = tgStart[1];
		else var newTop = tgEnd[1];
		var newWidth = Math.abs(tgEnd[0] - tgStart[0]);
		var newHeight = Math.abs(tgEnd[1] - tgStart[1]);
		// move canvas div
		cnv.style.left = newLeft - 3 + "px";
		cnv.style.top = newTop - 3 + "px";
		cnv.style.width = newWidth + 6 + "px";
		cnv.style.height = newHeight + 6 + "px";
		var middleX = newWidth / 2;
		var middleY = newHeight / 2;
		// draw connection
		var c = docPath(cnv, "canvas")[0].getContext("2d");
		c.clearRect(0, 0, newWidth + 6, newHeight + 6);
		c.lineWidth = 1.2;
		c.strokeStyle = "#999";
		c.beginPath();
		
		if( (tgStart[0] < tgEnd[0] && tgStart[1] < tgEnd[1]) || (tgStart[0] > tgEnd[0] && tgStart[1] > tgEnd[1]) ){
			c.moveTo(3, 3);
			//c.bezierCurveTo(middleX, tgSXHeight, middleX, tgSXHeight, middleX, middleY);
			//c.bezierCurveTo(middleX, newHeight + tgEXHeight, middleX, newHeight + tgEXHeight, newWidth, newHeight + tgEXHeight);
			c.lineTo(newWidth + 3, newHeight + 3);
		} else{
			c.moveTo(newWidth + 3, 3);
			c.lineTo(3, newHeight + 3);
		}
		
		c.stroke();
	}
}
