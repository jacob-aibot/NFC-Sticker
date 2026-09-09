/* One light direction across the collection, applied to actual SVG pigments. */
(function(){
  'use strict';
  var play=window.playBotanicalHero,peony=window.playGrowingPeony;
  function mix(hex,tint,amount){
    var value=parseInt(hex.slice(1),16),other=parseInt(tint.slice(1),16);
    return '#'+[16,8,0].map(function(shift){return Math.round(((value>>shift)&255)*(1-amount)+((other>>shift)&255)*amount).toString(16).padStart(2,'0');}).join('');
  }
  function finish(timeline,isPeony){
    var svg=document.getElementById('bloom');
    svg.querySelectorAll('linearGradient stop').forEach(function(stop){
      var color=stop.getAttribute('stop-color');
      if(!/^#[0-9a-f]{6}$/i.test(color||''))return;
      // Cream falls on the first-facing edges; the recesses retain depth.
      var offset=parseFloat(stop.getAttribute('offset')||0);
      var day=mix(color,'#f5ddbf',offset<.4?.24:.07);
      var night=mix(color,'#514656',.15);
      stop.setAttribute('data-morning-final',day);
      if(REDUCE_MOTION){stop.setAttribute('stop-color',day);return;}
      stop.setAttribute('stop-color',night);
      timeline.add({targets:stop,'stop-color':[night,day],duration:5200,easing:'easeInOutSine'},1800);
    });
    if(isPeony){
      var ns='http://www.w3.org/2000/svg',filter=document.createElementNS(ns,'filter');
      filter.id='peonyMorningPigment';
      var transfer=document.createElementNS(ns,'feComponentTransfer');
      ['R','G','B'].forEach(function(channel,i){var fn=document.createElementNS(ns,'feFunc'+channel);fn.setAttribute('type','linear');fn.setAttribute('slope',REDUCE_MOTION?[1.05,1.015,.94][i]:1);transfer.appendChild(fn);if(!REDUCE_MOTION)timeline.add({targets:fn,slope:[1,[1.05,1.015,.94][i]],duration:5400,easing:'easeInOutSine'},1800);});
      filter.appendChild(transfer);svg.querySelector('defs').appendChild(filter);
      svg.querySelector('.photo-bloom').setAttribute('filter','url(#peonyMorningPigment)');
    }
    if(!REDUCE_MOTION){
      var requested=new URLSearchParams(location.search).get('frame');
      if(requested!==null){timeline.pause();timeline.seek(Math.max(0,+requested||0));}
      else{timeline.seek(0);timeline.play();}
    }
  }
  window.playBotanicalHero=function(hero){play(hero);if(hero.slug!=='orchid')finish(window.__flowerTl,false);};
  window.playGrowingPeony=function(){peony();finish(window.__peonyTl,true);};
}());
