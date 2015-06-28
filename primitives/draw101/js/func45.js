function needSplinting(){
	if (Math.sqrt(Math.pow((Lx-xx),2)+Math.pow((Ly-yy),2)) > 16)
		{return true;}
	else 
		{return false;}
}

var draw;
var polyline;
var Lx, Ly, xx, yy;
var wTH, hTH;

$( document ).ready(function() {
	
	wTH=$( document ).width()-110;
	hTH=$( document ).height()-110;

	$('#draggable').draggable();
	$("#draggable").css({top:hTH/4,left:wTH/4});
	Lx = wTH/4;
	Ly = hTH/4;

	$('#drawing').css({width:wTH,height:hTH});
	draw = SVG('drawing').size(wTH, hTH);
 
// - - - - - - - - - - - - - - - - - - - - - - - - -
	$( "#draggable" ).on( "drag", function( event, ui ) {
		
		xx = $('#draggable').position().left; 
		yy = $('#draggable').position().top;
		
		if (needSplinting()){
			polyline = 0; Lx=xx; Ly=yy;}
		else {
			if(polyline){polyline.remove();}
			polyline = draw.line(Lx, Ly, xx, yy).fill('none').stroke({ width: 2 });	
			}
		} );
});
	 
