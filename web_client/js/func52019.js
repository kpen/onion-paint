img_a=new Array();   // the array for "tool's pictures"
img_a[0]=new Image();
img_a[1]=new Image();
img_a[2]=new Image();
img_a[3]=new Image();
img_a[4]=new Image();

img_a[0].src="imgs/topleft_0.gif"; // 
img_a[1].src="imgs/topleft_1.gif"; // 
img_a[2].src="imgs/topleft_101.gif"; // 
img_a[3].src="imgs/topleftl_0.gif"; // topleftl_0.gif
img_a[4].src="imgs/topleftl_1.gif"; // 

var draw;
var polyline;
var wT, hT, wTH, hTH;
var ESX, ESY, kf;
var Lkf=1;

var EmptyPress = 0;

DowN = new Array();
var dwsc = 0;

var RGB = [15,15,7];
function TxtColor(){
	var Txt="#";
	for (var ii=0; ii<3; ii++){
		if (RGB[ii]<=15){Txt=Txt+'0'+RGB[ii].toString(16);}
		else {Txt=Txt+RGB[ii].toString(16);}
		}
		//console.log("COLOR= "+Txt)
	return Txt;
}
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
function pole(){
	this.may = "pole";
  this.id = "NoFilled";
  this.Lx=0; this.Ly=0; 
  this.x1=0; this.y1=0; this.wi=1; this.he=1;
  this.draG=false;
  this.A_down = function(x,y){;}
  this.A_up = function(x,y){;}
  this.A_move = function(x,y){;}
  this.G_down = function (x,y) {
    if ((x > this.x1) && (x < this.x1+this.wi) &&
	(y > this.y1) && (y < this.y1+this.he) ){
	    this.Lx=x;
	    this.Ly=y;
	    this.draG=true;
	    this.A_down(x,y);
	    return false;
	}  
	  else {return true;}
  
}  
  this.sho2 = function(){$(this.id).show(); this.draG=false;}
  this.hid2 = function(){$(this.id).hide();}
  this.G_move = function (x,y) {
	  if (this.draG){
		this.A_move(x,y);
		}
	  }
  this.G_up = function (x,y) {
	  if (this.draG){
	  this.draG=false;
	  this.A_up(x,y);
	  }
	}
}
var Jopa = new pole();
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
function btn(name){
  this.id = name;
}
   btn.prototype = Jopa;

// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

cl = new btn('#color');
sv = new btn('#save');
pk = new btn('#pick');
sv = new btn('#save');
crv = new btn('#crvdrw');
lndrw = new btn('#linedrw');
ok = new btn('#ok0');
 //-------------------------------------------------------------------
function sld(clor){
  this.id = "noID";
  this.clor = clor;
  
  this.sho2 = function(){;}
  this.hid2 = function(){;}

  this.G_move = function(x,y){
    if (this.draG) {
	RGB[this.clor]+=x-this.Lx;
	this.Lx=x;
	if (RGB[this.clor] > 255){RGB[this.clor]=255;}
	if (RGB[this.clor] < 0) {RGB[this.clor]=0;}
	rect23.fill(TxtColor()); 
	}
    }
}
sld.prototype=Jopa;
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

R_slide = new sld(0);
G_slide = new sld(1);
B_slide = new sld(2);

 //-------------------------------------------------------------------
function bcg( ){
  this.sho2 = function(){;}
  this.hid2 = function(){;}
  this.G_up = function (x,y) {
      if (this.draG) {
	  this.draG=false;
	  this.Lx-= x;
	  this.Ly-= y;
	  if ((this.Lx == 0)&&(this.Ly == 0)){
		 MenuMode();
		}
	  else {//if there was a sweep on  on empty_field - so do a PAN
		ESX+=this.Lx*kf;
		ESY+=this.Ly*kf;
		DRW();
		}		
	}
  }
}
bcg.prototype = Jopa;
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
var Bcg = new bcg();
 //-------------------------------------------------------------------
 //-------------------------------------------------------------------
function fh (iconbias){

	this.tictac=0;
this.icon_bias=iconbias;
  this.x1=0; this.y1=0; this.wi=150; this.he=150; 
  this.pressed=0; this.Timerr = null; this.Track=0;
  this.Lmx=0; this.Lmy=0;
  this.L2x=0; this.L2y=0; this.id='#draggable';
  //  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
this.FollowMouse = function (x,y){

  if (this.pressed == 1){
    if (this.Track == 20){
	$('#draggable').attr("src",img_a[2].src).height(32).width(32);
    }
    else {this.Track ++;}
  }
 // console.log("T= "+this.Track);
  var x23 = this.L2x-this.Lx+x;
  var y23 = this.L2y-this.Ly+y;
    if ((this.x1!=x23) || (this.y1!=y23)) {
	$('#draggable').css({left:x23,top:y23});
	this.x1=x23; this.y1=y23; 
	 }
	 else {/*console.log("ZZZ");*/}

}
//  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
  this.A_down = function(x,y){

    this.Lmx=this.clcX(this.x1); this.Lmy=this.clcY(this.y1);
    this.L2x=this.x1; this.L2y=this.y1;
	this.tictak = Date.now();
    }
//  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -    
  this.A_move = function(x,y){
	
    var x23 = this.L2x-this.Lx+x;
    var y23 = this.L2y-this.Ly+y;
    switch (this.pressed){
      case 0: {
	var k23=RotorWatchDog(x,y);
	if (k23 == -1){	kf+=kf*((k23)*0.01);DRW();}
	if (k23 == 1){kf+=kf*((k23)*0.01);DRW();}
      } break;

      case 1: {
	var xx = this.clcX(x23); 
	var yy = this.clcY(y23);
	//console.log("LINE "+xx+" "+yy+" "+this.Lmx+" "+this.Lmy);
	if (this.needSplinting(xx,yy))
	  {polyline = 0; this.Lmx=xx; this.Lmy=yy;}
	else {
	  if(polyline){polyline.remove();}
	  polyline = draw.line(this.Lmx, this.Lmy, xx, yy).fill('none')
	  .stroke({ width: 2, 
	  color: (TxtColor())}); 
	}
      }	break;
      default:{;}      
    }
	var t23 = Date.now()-this.ticktak
	//console.log("tictak="+t23);
	if ((Date.now()-this.tictak) > 35){
		this.ticktak = Date.now();
		this.FollowMouse(x,y);
		
	}
  }  
//  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
 this.A_up = function(x,y){
   ResetRotor();
   if (this.pressed == 1){polyline = 0;}
   this.pressed ++;
   if (this.pressed > 1) {this.pressed=0;}
   this.Track=0;
   $('#draggable').attr("src",img_a[this.pressed+this.icon_bias].src).height(150).width(150);
   clearInterval(this.Timerr);
   this.FollowMouse(x,y);
   
}
//  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
this.needSplinting = function (xx,yy){
    if (Math.sqrt(Math.pow((this.Lmx-xx),2)+Math.pow((this.Lmy-yy),2)) > 8)
	{return true;}
	else {return false;}
}
//  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
this.clcX = function (x){return Math.round(ESX+(x-wTH/2)*kf);}
this.clcY = function (y){return Math.round(ESY+(y-hTH/2)*kf);}

//  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   - 
  this.sho2 = function(){
	   $('#draggable').attr("src",img_a[this.pressed+this.icon_bias].src).height(150).width(150);
	  $(this.id).show(); this.draG=false;}
} // fh function
fh.prototype = Jopa;
fr = new fh(0);
ln = new fh(3);
ln.needSplinting = function (xx,yy){return false;}
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
var Bcg = new bcg();
 //-------------------------------------------------------------------
function G_Down(x,y){
	for (var i=0; (i<dwsc)&&(DowN[i].G_down(x,y)); i++){
		//console.log("i="+i);
	}
}
 //-------------------------------------------------------------------
function G_move(x,y){
	for (var i=0; i<dwsc; i++){
		///MovE[i].G_move(x,y);
		DowN[i].G_move(x,y);
	}
} 
 //-------------------------------------------------------------------
function G_up(x,y){
	for (var i=0; i<dwsc; i++){
		///U_P[i].G_up(x,y);
		DowN[i].G_up(x,y);
	}
}
 //-------------------------------------------------------------------
	
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
$( document ).ready(function() {

//-------------------------------------------------------------------
    document.body.addEventListener('touchmove', function(event) {
		G_move(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
        event.preventDefault();
    }, false);
//-------------------------------------------------------------------
	document.body.addEventListener('touchstart', function(event) {
		G_Down(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
		event.preventDefault();
    }, false);
 //-------------------------------------------------------------------
 	 document.body.addEventListener('touchend', function(event) {
		G_up(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
        event.preventDefault();
    }, false);
 //-------------------------------------------------------------------	
 	 document.body.addEventListener('mousedown', function(event) {
		G_Down(event.pageX,event.pageY);
        event.preventDefault();
    }, false);
 //-------------------------------------------------------------------	
	 document.body.addEventListener('mouseup', function(event) {
		 G_up(event.pageX,event.pageY);
        event.preventDefault();
    }, false);
 //-------------------------------------------------------------------	
	document.body.addEventListener('mousemove', function(event) {
		G_move(event.pageX,event.pageY);
		event.preventDefault();
    }, false);
 //------------------------------------------------------------------- 
    window.onresize = function() {
      $(document.body).width(window.innerWidth).height(window.innerHeight);
    }
 //-------------------------------------------------------------------
    $(function() {
      window.onresize();
    });
 //-------------------------------------------------------------------	
	wT = $( document ).width();	
	hT = $( document ).height();
	
	wTH=wT-110;
	hTH=hT-110;

	ESX=wTH/2;
	ESY=hTH/2;
	kf=1;

  $('#draggable').attr("src",img_a[fr.pressed].src);

$('#drawing').css({width:wTH,height:hTH});
 draw = SVG('drawing').size(wTH, hTH);
 draw2 = SVG('drawing2').size(wTH, hTH);
 DRW();
// - - - - - - - - - - - - - - - - - - - - - - - - - 
 
  ClearIarr();
  AddDown(fr, wTH/2,hTH/2, 150, 150);
  AddDown(Bcg,0,0,wTH,hTH);
  
	}) //document-ready

//----------------------------------------------------------------
function MenuMode(){
	console.log("ESX1="+ESX);
	var b23 = 75;
	var h23=hTH/4;
	var w23=wTH/4;
  ClearIarr();
  AddDown(cl,w23-b23,h23-b23,150,150);
  AddDown(sv,w23*3-b23,h23*3-b23,150,150); 
AddDown(crv,w23*3-b23,h23*2-b23,150,150); 
 
 // AddDown(zm,wTH/4,hTH/2,150,150); 
  AddDown(lndrw,w23*2-b23,h23-b23,150,150); 
}

//----------------------------------------------------------------
function AddDown(ob,x1,y1,wi,he){

  //console.log("ob="+ob.id);
  ob.sho2(); //$(ob.id).show();
  $(ob.id).css({left:x1,top:y1});
  $(ob.id).css({width:wi,height:he});
  DowN[dwsc]=ob;
  ob.x1=x1; ob.y1=y1; ob.wi=wi; ob.he=he;
  dwsc++;
}
//----------------------------------------------------------------

//----------------------------------------------------------------
function ClearIarr(){
 // console.log("///////////////////////"+dwsc);
  for (var ii=0; ii < dwsc; ii++) { DowN[ii].hid2(); }
dwsc=0;
}
//----------------------------------------------------------------
function DRW()
{draw.viewbox(ESX-kf*wTH/2,ESY-kf*hTH/2,wTH*kf, hTH*kf);}
//----------------------------------------------------------------
//----------------------------------------------------------------

////////////////RotorWatchDod//////////////////////////////////////////
arx = new Array();  // a rounded_array
ary = new Array();
var rd=0, wr=0, max = 30; ArrIsFull=false;// rounded_arrays - read_pointer write_pointer 
var sumx = 0, sumy=0;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function ResetRotor(){
	wr=0; rd=0; re=0; ArrIsFull = false;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function WriteInArr(qx,qy){
	var wr2=wr;
	wr2++; if (wr2 == max){wr2 = 0;}
	if (wr2 == rd){
		//arx[rd].remove(); //do something to clear the way for write_pointer in rounded_array
		////pline[rd].remove();
		rd++; if (rd == max){rd = 0;}
		}
	arx[wr]=qx;
	ary[wr]=qy;

	wr++; if (wr == max){wr = 0; ArrIsFull=true;}
	return ArrIsFull;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function IntegrArr(klv){
	var e23 = rd;
	var Lx=arx[e23];
	var Ly=ary[e23];
	e23++; if (e23 == max){e23=0;}
	sumx = 0, sumy=0;
	var nN=0;
	for (var i=0; i < max-1; i++)	{
		if (e23 != wr){
			nN++;
			sumx+=Lx-arx[e23];
			sumy+=Ly-ary[e23];
			Lx = arx[e23]; Ly = ary[e23];
			e23++; if (e23 == max){e23=0;}
		}
	}
	if (nN>1){sumx=sumx/nN; sumy=sumy/nN;}
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
var Lsumx, Lsumy, Langle, angle; var re = 0;
var rech = new Array(); 
var pnx = new Array();
var pny = new Array();
var Ix,Iy;
// - - - - - - - - - - - - - - - - - - - - - - - - -
function RotorWatchDog(x23,y23){
	if(!WriteInArr(x23,y23)){return 0;}
	IntegrArr();
	
	if ((sumx > 0) &&(sumy < 0)){
		if (sumx > (sumy*-1)) {angle = 22;} else {angle = 67;}//22+45=67,67,112,157,202,247,292,337
	}	
	if ((sumx > 0) &&(sumy > 0)){
		if (sumx > sumy) {angle = 337;} else {angle = 292;}
	}	
	if ((sumx < 0) &&(sumy > 0)){
		if (-1*sumx > sumy) {angle = 202;} 	else {angle = 247;}
	}
	if ((sumx < 0) &&(sumy < 0)){
		if (sumx > sumy) {angle = 112;}		
		else {angle = 157;}
	}
	
	if (Langle != angle){
		
		if (IsRepeat(angle)){
			if (re == 8){
				var x234 = RotorDirection();
				return x234;
			}
			else {re = 0;}
		}
		else {	rech[re] = angle;	
				pnx[re] = x23;
				pny[re] = y23;
				re++;
		//draw.text(re.toString()).move(PS,VK); VKPS();
		if (re > 8){re = 0;}}
		
	Langle = angle;
	} // if Langle!=angle;
	return 0;
}
// - - - - - - - - - - - - - - - - - - - - - - - - -
function IsRepeat(an23){
	for (var ii=0; ii<re; ii++){ if (an23 == rech[ii]) {return true;}}
	return false;
}
// - - - - - - - - - - - - - - - - - - - - - - - - -
function RotorDirection(){
	Ix=0; Iy=0;
	//calculate the center of the Rotor (the summ of 8 points)
	for (var ii=0; ii<8; ii++){
		Ix+=pnx[ii];
		Iy+=pny[ii];
	}
	Ix=Ix/8; Iy=Iy/8;	//The center of the point is in Ix,Iy
	//figure out the direction of the rotation (it can be -45 or +45 but can be 307 or -307 )
	for (var ii=0; ii<6; ii++){
		var t23 = rech[ii] - rech[ii+1];
		if (t23 == -45){return -1;}
		if (t23 == 45){return 1;}
		
	}
	return 0;
}
///////////////////////////END RotorWatchDog/////////////////
///////////////////////////////////////////////////////////////////
//----------------------------------------------------------------
var rect23;
cl.A_up = function (){
  ClearIarr();
  AddDown(ok,wTH/2,hTH/2,150,150);
  AddDown(R_slide,0,0,wTH,hTH/3);
  AddDown(G_slide,0,hTH/3,wTH,hTH/3);
  AddDown(B_slide,0,hTH/3*2,wTH,hTH/3);

  for (var ii=0; ii<16; ii++)
  {
   // console.log("COLOR=" + ii.toString(16));
    draw2.rect(wTH/16,hTH/3).move(wTH/16*ii,0).fill('#'+ii.toString(16)+'00');
    draw2.rect(wTH/16,hTH/3).move(wTH/16*ii,hTH/3).fill('#0'+ii.toString(16)+'0');
    draw2.rect(wTH/16,hTH/3).move(wTH/16*ii,hTH/3*2).fill('#00'+ii.toString(16));
  }
rect23=draw2.rect(50,50).fill('#eee');
 rect23.fill(TxtColor()); 
}
//----------------------------------------------------------------
ok.A_up = function(){
 // console.log("ok.A_up");
  draw2.clear();
  
    ClearIarr();
  AddDown(fr, wTH/2,hTH/2, 150, 150);
  AddDown(Bcg,0,0,wTH,hTH);
  DRW();
}
//----------------------------------------------------------------
lndrw.A_up = function(){
 // console.log("ok.A_up");
  draw2.clear();
  
    ClearIarr();
  AddDown(ln, wTH/2,hTH/2, 150, 150);
  AddDown(Bcg,0,0,wTH,hTH);
  DRW();
}
//----------------------------------------------------------------
sv.A_up = function(){
 ClearIarr();
  AddDown(fr, wTH/2,hTH/2, 150, 150);
    AddDown(Bcg,0,0,wTH,hTH);
    //console.log("ESX2="+ESX);
 // DRW();
 // console.log("ESX3="+ESX);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
