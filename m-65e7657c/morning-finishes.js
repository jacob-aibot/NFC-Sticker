/* One light direction across the collection, applied to actual SVG pigments. */
(function(){
  'use strict';
  var play=window.playBotanicalHero;
  function mix(hex,tint,amount){
    var value=parseInt(hex.slice(1),16),other=parseInt(tint.slice(1),16);
    return '#'+[16,8,0].map(function(shift){return Math.round(((value>>shift)&255)*(1-amount)+((other>>shift)&255)*amount).toString(16).padStart(2,'0');}).join('');
  }
  function finish(timeline){
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
    if(!REDUCE_MOTION){
      var requested=new URLSearchParams(location.search).get('frame');
      if(requested!==null){timeline.pause();timeline.seek(Math.max(0,+requested||0));}
      else{timeline.seek(0);timeline.play();}
    }
  }
  // The peony and the orchid each grade their own pigment inside their own
  // script (peony-illustration.js and morning-orchid.js), rewriting every
  // stop-color before this pass could see it. Applying finish() on top of
  // them is a no-op at best and a double-grade at worst, so both are left
  // to their own light and only the shared botanicals are finished here.
  window.playBotanicalHero=function(hero){play(hero);if(hero.slug!=='orchid')finish(window.__flowerTl);};
}());
