function needSplinting()
{
 if (Math.sqrt(Math.pow((Lx-xx),2)+Math.pow((Ly-yy),2)) > 8)
 {return true;}
else {return false;}
	
}

function DRW()
{draw.viewbox(ESX-kf*wTH/2,ESY-kf*hTH/2,wTH*kf, hTH*kf);}

img_a=new Array();   // the array for "tool's pictures"
img_a[0]=new Image();
img_a[1]=new Image();
img_a[2]=new Image();
img_a[3]=new Image();
img_a[4]=new Image();
img_a[5]=new Image();

img_a[0].src="imgs/topleft_0.gif"; // 
img_a[1].src="imgs/topleft_1.gif"; // 

var draw;
var polyline;
var Lx, Ly, xx, yy, LUx, LUy, pressed = 1;
var wT, hT, wTH, hTH;
var ESX, ESY, kf;
var Lkf=1;

function clcX(x){return Math.round(ESX+(x-wTH/2)*kf);}
function clcY(y){return Math.round(ESY+(y-hTH/2)*kf);}



$( document ).ready(function() {
	wT = $( document ).width();	
	hT = $( document ).height();
	
	wTH=wT-110;
	hTH=hT-110;

	ESX=wTH/2;
	ESY=hTH/2;
	kf=1;
	
$('#pandle').draggable();
$("#pandle").hide();
$('#zoomdle').draggable();
$("#zoomdle").hide();

$('#draggable').draggable();
$("#draggable").css({top:hTH/4,left:wTH/4});
Lx = wTH/4;
Ly = hTH/4;
$('#xandle').draggable();
$("#xandle").css({top:100,left:100});	
LUx=100; LUy=100;

  $('#draggable').attr("src",img_a[pressed].src);
/*img_a[2].src="imgs/122.jpg"; // 
img_a[3].src="imgs/123.jpg"; 
img_a[4].src="imgs/124.jpg"; 
img_a[5].src="imgs/125.jpg"; */


$('#drawing').css({width:wTH,height:hTH});
 draw = SVG('drawing').size(wTH, hTH);
 DRW();
 //draw.viewbox(0,0,wTH,hTH);
//var rect = draw.rect(wTH-10, hTH-100).attr({ fill: '#f06' });
w23 = wTH-210; h23 = hTH-310;
	//var polygon = draw.polygon('100,100 '+wTH+',0 '+w23+','+h23+' 0,'+hTH).fill('#77F').stroke({ width: 1 });

// - - - - - - - - - - - - - - - - - - - - - - - - -
	$( "#draggable" ).on( "drag", function( event, ui ) {
		var pos = $('#draggable').position();
		xx = clcX(pos.left); 
		yy = clcY(pos.top);
		if (pressed == 1) { 
			if (needSplinting())
			{polyline = 0; Lx=xx; Ly=yy;}
		else {
				if(polyline){polyline.remove();}
				polyline = draw.line(Lx, Ly, xx, yy).fill('none').stroke({ width: 1 });	
			}
		}
	//	Lx=xx; Ly=yy;
		} );
// - - - - - - - - - - - - - - - - - - - - - - - - - 	
	$( "#draggable" ).on( "dragstop", function( event, ui ) {
		xx = $('#draggable').position().left;
		yy = $('#draggable').position().top;
				var x23 = wTH/4*3 - 100;
				var y23 = hTH/4*3 - 100;
				if (xx > wTH/2) {x23 = wTH/4;}
				if (yy > hTH/2) {y23 = hTH/4;}
				$("#xandle").css({top:y23,left:x23});	
		LUx=xx+110; LUy=yy+110;
		} );
// - - - - - - - - - - - - - - - - - - - - - - - - - 

$('#draggable').on( "mouseup", function(e, ui){ 
	
	if (pressed == 1)
{polyline = 0;}
//console.log("VVV");
	pressed ++;
	if (pressed > 1) {pressed=0;}
  $('#draggable').attr("src",img_a[pressed].src);
	}) 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
$('#xandle').on( "mouseup", function(e, ui){ 
	
$("#pandle").show();
$("#zoomdle").show();
	$("#pandle").css({left:(wTH)/2,top:(hTH)/2});
	$("#zoomdle").css({left:(wTH)/4,top:(hTH)/2});
	$("#dragable").css({left:((wTH)/4)*3,top:(hTH)/2});
	$("#xandle").css({left:((wTH)/4)*3,top:((hTH)/4)*3});
	}) 
// - - - - - - - - - - - - - - - - - - - - - - - - - 

$('#draggable').on( "mousedown", function(e, ui){ 
				$("#pandle").hide();
				$("#zoomdle").hide();
if (pressed == 1)
{
		var pos = $('#draggable').position();
		xx = Math.floor(pos.left); 
		yy = Math.floor(pos.top);
		Lx=xx; Ly=yy;
}
	}) 
// - - - - - - - - - - - - - - - - - - - - - - - - - 
$('#pandle').on( "dragstop", function(e, ui){ 
	//console.log('DRAGGGG');
	var pos = $('#pandle').position();
	xx = Math.floor(pos.left); 
	yy = Math.floor(pos.top);
	
	ESX=clcX(xx); //ESX=clcX(xx);
	ESY=clcY(yy); //ESY=clcY(yy);
	DRW(); //draw.viewbox(ESX,ESY,(wTH)*kf, (hTH)*kf);
	$("#pandle").css({top:(hTH)/2,left:(wTH)/2});
	}) ;
// - - - - - - - - - - - - - - - - - - - - - - - - - 

$('#zoomdle').on( "dragstart", function(e, ui){ 

	var pos = $('#zoomdle').position();
	var xx = Math.floor(pos.left); 
	Lkf=kf;
	Lx=xx;

	}) ;
// - - - - - - - - - - - - - - - - - - - - - - - - - 

$('#zoomdle').on( "dragstop", function(e, ui){ 

	var pos = $('#zoomdle').position();
	var xx = Math.floor(pos.left); 
	var yy = Math.floor(pos.top);
	
	kf+=kf*((xx-Lx)*0.001);
DRW();
	$("#zoomdle").css({left:(wTH)/4,top:(hTH)/2});
	}) ;
// - - - - - - - - - - - - - - - - - - - - - - - - - 


// - - - - - - - - - - - - - - - - - - - - - - - - - 
	 
	 });
	 
		function myFunction() {

var polyline2 = draw.polyline('0,0 100,50 50,100').fill('none').stroke({ width: 1 });
kf=2;
draw.viewbox(ESX,ESY,(wTH-110)*kf, (hTH-210)*kf);
}

		function myFunction2() {

kf=0.5;
draw.viewbox(ESX,ESY,(wTH-110)*kf, (hTH-210)*kf);
		}
		
				function myFunction3() {

kf=1;
ESX = 300;
ESY = 300;
draw.viewbox(ESX,ESY,(wTH-110)*kf, (hTH-210)*kf);
		}
		
				function myFunction4() {

kf=1;
ESX = -300;
ESY = -300;
draw.viewbox(ESX,ESY,(wTH-110)*kf, (hTH-210)*kf);
		}