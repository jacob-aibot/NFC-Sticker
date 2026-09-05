/* Each organ has its own geometry and attachment point. Petals morph from
   folded shapes; stems extend along their paths. No painted-image reveals. */
(function () {
  'use strict';
  var parts, serial;
  var defs = '<defs>' +
    '<linearGradient id="leafFace" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b6bd77"/><stop offset=".42" stop-color="#72864d"/><stop offset="1" stop-color="#354b32"/></linearGradient>' +
    '<linearGradient id="roseFace" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#ffe1cc"/><stop offset=".38" stop-color="#ed9d9e"/><stop offset="1" stop-color="#a93d62"/></linearGradient>' +
    '<linearGradient id="creamFace" x1="0" y1="0" x2=".65" y2="1"><stop stop-color="#fff0de"/><stop offset=".6" stop-color="#efc3c4"/><stop offset="1" stop-color="#bb718c"/></linearGradient>' +
    '<linearGradient id="violetFace" x1="0" y1="0" x2=".6" y2="1"><stop stop-color="#e6d1f0"/><stop offset=".45" stop-color="#ab8cc5"/><stop offset="1" stop-color="#665084"/></linearGradient>' +
    '<linearGradient id="blueFace" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#e5d9ed"/><stop offset=".4" stop-color="#a7bfe1"/><stop offset="1" stop-color="#607dad"/></linearGradient>' +
    '</defs>';
  function stem(d, width, at, duration, color) {
    parts.push('<path class="grow-stem" d="'+d+'" fill="none" stroke="'+(color||'#738350')+'" stroke-width="'+width+'" stroke-linecap="round" data-at="'+at+'" data-duration="'+(duration||2400)+'"/>');
  }
  function organ(d, x, y, angle, scale, fill, at, duration, fold) {
    // Matching path commands make interpolation stable, including in Safari.
    var n=0;
    var closed=d.replace(/-?\d*\.?\d+/g,function(){return '0';});
    var folded=d.replace(/-?\d*\.?\d+/g,function(v){var horizontal=(n++%2===0);return +(Number(v)*(horizontal ? (fold||.12) : .62)).toFixed(3);});
    parts.push('<g transform="translate('+x+' '+y+') rotate('+angle+') scale('+scale+')"><path class="grow-organ" d="'+d+'" data-closed="'+closed+'" data-folded="'+folded+'" data-open="'+d+'" data-at="'+at+'" data-duration="'+(duration||2400)+'" fill="'+fill+'" stroke="#fff0dc" stroke-opacity=".2" stroke-width=".65" stroke-linejoin="round"/>');
    if(fill==='url(#leafFace)' && d!==slim){
      parts.push('<g opacity=".38">');
      stem('M 0 0 Q -3 -49 0 -103',.9,at+700,1700,'#d6d3a0');
      [-1,1].forEach(function(side){[28,47,65].forEach(function(h){stem('M 0 -'+h+' Q '+(side*11)+' -'+(h+9)+' '+(side*19)+' -'+(h+24),.55,at+1000,1400,'#c5ca91');});});
      parts.push('</g>');
    }
    parts.push('</g>');
    serial++;
  }
  var leaf='M 0 0 C -18 -19 -37 -45 -30 -80 C -25 -98 -10 -115 1 -135 C 10 -111 35 -84 30 -56 C 26 -30 10 -10 0 0 Z';
  var slim='M 0 0 C -8 -35 -22 -67 -13 -104 C -9 -121 -3 -135 0 -150 C 13 -104 18 -58 0 0 Z';
  var broad='M 0 0 C -23 -17 -47 -33 -48 -65 C -49 -87 -25 -104 -7 -121 C 1 -113 9 -115 12 -104 C 24 -102 24 -92 34 -85 C 35 -75 46 -69 39 -55 C 38 -26 12 -8 0 0 Z';
  var petal='M 0 0 C -24 -9 -47 -33 -43 -65 C -42 -77 -35 -91 -25 -96 C -17 -103 -7 -98 0 -104 C 10 -98 20 -106 28 -96 C 47 -88 50 -59 37 -36 C 27 -17 11 -4 0 0 Z';
  function foliage(x,y,a,s,at,shape) {
    organ(shape||leaf,x,y,a,s,'url(#leafFace)',at,2300);
  }
  function bloomPetal(x,y,a,s,fill,at,d) { organ(d||petal,x,y,a,s,fill,at,2900); }
  function tulip(x,y,s,at,tilt) {
    parts.push('<g transform="translate('+x+' '+y+') rotate('+tilt+') scale('+s+')">');
    var rear='M 0 0 C -31 -18 -45 -76 -31 -126 C -14 -117 -9 -145 3 -148 C 19 -132 40 -135 39 -108 C 44 -57 27 -16 0 0 Z';
    bloomPetal(0,0,-26,.9,'url(#roseFace)',at,rear);
    bloomPetal(0,0,29,.88,'url(#roseFace)',at+180,rear);
    bloomPetal(0,0,1,.91,'url(#creamFace)',at+320,rear);
    for(var i=0;i<5;i++) stem('M '+(i*5-10)+' -12 Q '+(i*7-14)+' -40 '+(i*8-16)+' -64',2,at+1200+i*80,1700,'#a58b48');
    bloomPetal(0,0,-43,.83,'url(#roseFace)',at+540);
    bloomPetal(0,0,39,.86,'url(#roseFace)',at+760);
    bloomPetal(0,3,-3,.79,'url(#roseFace)',at+1000);
    parts.push('</g>');
  }
  function orchid(x,y,s,at,tilt) {
    parts.push('<g transform="translate('+x+' '+y+') rotate('+tilt+') scale('+s+')">');
    var sepal='M 0 0 C -15 -15 -24 -47 -12 -71 C -5 -84 2 -94 5 -101 C 21 -75 29 -36 0 0 Z';
    [-8,126,232].forEach(function(a,i){bloomPetal(0,0,a,.86,'url(#creamFace)',at+i*110,sepal);});
    bloomPetal(0,0,-76,1.02,'url(#creamFace)',at+320);
    bloomPetal(0,0,76,1.06,'url(#creamFace)',at+480);
    bloomPetal(0,2,179,.41,'#b95783',at+750,'M 0 0 C -23 -3 -42 -35 -30 -50 C -22 -53 -17 -34 -6 -35 C 2 -52 14 -49 19 -36 C 39 -41 45 -21 28 -10 C 15 3 7 -3 0 0 Z');
    bloomPetal(0,0,4,.2,'#e6c47b',at+980);
    parts.push('</g>');
  }
  function floret(x,y,s,at,shade,rotation) {
    parts.push('<g transform="translate('+x+' '+y+') rotate('+rotation+') scale('+s+')">');
    var p='M 0 0 C -14 -5 -23 -17 -19 -30 C -17 -37 -10 -38 -4 -34 C 4 -43 14 -38 18 -30 C 26 -17 14 -4 0 0 Z';
    [0,88,181,269].forEach(function(a,i){organ(p,0,0,a,1,shade,at+i*95,2200);});
    organ(p,0,0,12,.14,'#e7cc9c',at+500,1600);
    parts.push('</g>');
  }
  window.renderBotanicalHero=function(hero){
    parts=[defs];serial=0;
    if(hero.slug==='tulip') {
      stem('M 176 690 C 151 570 183 421 210 277',7,200,3000);
      stem('M 174 582 C 117 506 89 431 80 356',5,850,2700);
      stem('M 167 618 C 225 553 280 454 299 385',4,1200,2700);
      foliage(166,619,-44,1.65,1300,slim);foliage(172,595,48,1.6,1700,slim);
      foliage(171,534,-35,1.28,2050,slim);foliage(195,396,36,1.05,2350,slim);
      tulip(211,287,1.02,3200,8);tulip(80,366,.68,3750,-20);tulip(299,394,.6,4100,22);
    } else if(hero.slug==='orchid') {
      stem('M 164 693 C 186 551 149 373 219 229 C 248 170 304 155 326 144',6,200,3400);
      foliage(165,664,-64,1.4,1200,broad);foliage(166,657,67,1.42,1550,broad);foliage(171,620,-26,1.02,1900,broad);
      stem('M 177 426 Q 131 362 99 345',3,1900,1300);stem('M 194 313 Q 254 311 281 286',3,2200,1500);
      orchid(99,342,.72,3000,-18);orchid(204,233,.88,3300,9);orchid(280,285,.69,3900,16);orchid(157,426,.65,4300,-8);
      bloomPetal(326,145,25,.22,'url(#roseFace)',3600);
    } else if(hero.slug==='hydrangea') {
      stem('M 185 691 C 218 590 159 514 186 400',7,200,2900);
      foliage(189,570,55,1.5,1450,broad);foliage(182,503,-69,1.4,1800,broad);foliage(187,438,29,1.05,2200,broad);
      // A staggered domed inflorescence, with smaller flowers around the rim.
      var rows=[[-2,3],[-1,5],[0,6],[1,5],[2,4]];
      rows.forEach(function(row,r){for(var c=0;c<row[1];c++){
        var x=195+(c-(row[1]-1)/2)*46+(r%2?7:-4),y=277+row[0]*42+(c%2?7:-3);
        var size=.66+((c+r)%3)*.09;
        floret(x,y,size,3000+r*260+c*125,(c+r)%3===0?'url(#violetFace)':'url(#blueFace)',c*21+r*13);
      }});
    } else if(hero.slug==='lavender') {
      var spikes=[[91,314,-18],[154,216,-8],[205,168,5],[267,252,17],[302,344,25]];
      spikes.forEach(function(p,i){
        stem('M 191 692 Q '+(160+i*17)+' 477 '+p[0]+' '+p[1],3,200+i*200,3000);
        foliage(180+i*3,609-i*29,i%2?46:-46,.68,1400+i*180,slim);
        foliage(160+i*18,481-i*16,i%2?-39:37,.53,1900+i*160,slim);
        for(var k=0;k<7;k++){
          var yy=p[1]+k*19,xx=p[0]+(191-p[0])*(k/32);
          bloomPetal(xx,yy,-45,.17+(k<4?k:6-k)*.016,'url(#violetFace)',3200+i*210+(6-k)*170);
          bloomPetal(xx+3,yy+5,52,.19,'url(#violetFace)',3380+i*210+(6-k)*170);
        }
      });
    } else {
      stem('M 48 214 C 100 133 213 139 336 189',8,200,2900,'#827354');
      [[86,179,-39],[130,156,-13],[177,152,20],[223,159,48],[287,178,70]].forEach(function(p,i){foliage(p[0],p[1],p[2],.64,1200+i*220);});
      [[94,168,519],[180,154,637],[271,169,564]].forEach(function(p,i){
        stem('M '+p[0]+' '+p[1]+' Q '+(p[0]-22)+' '+(p[1]+140)+' '+(p[0]+10)+' '+p[2],2.5,1700+i*250,3000);
        var count=11;
        for(var k=0;k<count;k++){
          var y=p[1]+20+k*(p[2]-p[1]-30)/count,x=p[0]-Math.sin(k/count*Math.PI)*10;
          var size=.36-k*.019;
          bloomPetal(x,y,-125,size,'url(#violetFace)',3200+i*240+k*155);
          bloomPetal(x+3,y+9,132,size*.96,'url(#violetFace)',3370+i*240+k*155);
          bloomPetal(x,y+13,180,size*.69,'url(#creamFace)',3500+i*240+k*155);
        }
      });
    }
    return parts.join('');
  };
  window.playBotanicalHero=function(){
    var svg=document.getElementById('bloom'),light=document.getElementById('morningLight'),opener=document.querySelector('.opener');
    var letter=document.querySelector('.letter'),identity=document.querySelector('.flower-text'),again=document.getElementById('again');
    var stems=svg.querySelectorAll('.grow-stem'),organs=svg.querySelectorAll('.grow-organ');
    if(REDUCE_MOTION){
      svg.style.transform='translateY(-1.4vh) scale(.82)';light.style.opacity=1;document.body.style.backgroundColor='#654d46';opener.style.color='#72595a';
      letter.style.opacity=1;identity.style.opacity=1;again.style.opacity=.78;showNote(true);return;
    }
    var tl=anime.timeline({autoplay:false,easing:'easeInOutSine'});window.__flowerTl=tl;
    stems.forEach(function(el){var length=el.getTotalLength();el.style.opacity=0;el.setAttribute('stroke-dasharray',length);el.setAttribute('stroke-dashoffset',length);tl.add({targets:el,opacity:[0,1],duration:100},+el.dataset.at);tl.add({targets:el,strokeDashoffset:[length,0],duration:+el.dataset.duration,easing:'easeInOutSine'},+el.dataset.at);});
    organs.forEach(function(el){el.setAttribute('d',el.dataset.closed);tl.add({targets:el,d:[{value:el.dataset.folded,duration:+el.dataset.duration*.38},{value:el.dataset.open,duration:+el.dataset.duration*.62}],easing:'easeInOutSine'},+el.dataset.at);});
    tl.add({targets:light,opacity:[0,1],duration:6900},450);
    tl.add({targets:document.body,backgroundColor:['#20191f','#654d46'],duration:6900},350);
    tl.add({targets:opener,color:['#d8c9c6','#72595a'],duration:5600},750);
    tl.add({targets:svg,scale:[1.05,.82],translateY:['3.8vh','-1.4vh'],duration:1600},8500);
    tl.add({targets:letter,opacity:[0,1],translateY:[12,0],duration:1000},9400);
    tl.add({targets:identity,opacity:[0,1],translateY:[6,0],duration:700},9800);
    tl.add({targets:again,opacity:[0,.78],duration:400},10300);
    var frame=new URLSearchParams(location.search).get('frame');
    if(frame!==null){tl.seek(Math.max(0,+frame||0));}else{tl.play();}
    tl.finished.then(function(){showNote(true);});
  };
}());
