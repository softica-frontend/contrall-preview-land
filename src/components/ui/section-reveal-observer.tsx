/**
 * Plain inline script string for the layout's <script> tag.
 * Runs on every page load (including back navigation), sets up a
 * global IntersectionObserver + MutationObserver for `[data-visible]`.
 * Completely independent of React hydration and HMR.
 */
export const SECTION_REVEAL_SCRIPT = `
(function(){
  if(window.__sro) return;
  window.__sro=1;

  var isAutoScrolling=false;
  var activeTarget=null;

  function pause(target){
    isAutoScrolling=true;
    activeTarget=target||null;
  }

  function resume(){
    setTimeout(function(){
      isAutoScrolling=false;
      activeTarget=null;
    },150);
  }

  var observer=new IntersectionObserver(function(entries){
    for(var i=0;i<entries.length;i++){
      var entry=entries[i];
      if(isAutoScrolling&&activeTarget){
        if(!activeTarget.contains(entry.target)&&entry.target!==activeTarget) continue;
      }
      if(entry.isIntersecting){
        entry.target.dataset.visible="true";
        observer.unobserve(entry.target);
      }
    }
  },{threshold:0.15,rootMargin:"0px 0px -60px 0px"});

  function scan(){
    var els=document.querySelectorAll('[data-visible="false"]');
    for(var i=0;i<els.length;i++) observer.observe(els[i]);
  }

  scan();

  new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});

  document.addEventListener("click",function(e){
    var a=e.target.closest('a[href^="#"]');
    if(!a) return;
    var id=a.getAttribute("href").slice(1);
    var el=document.getElementById(id);
    if(!el) return;
    e.preventDefault();
    pause(el);
    el.dataset.visible="true";
    el.scrollIntoView({behavior:"smooth"});
    var timer;
    function onScroll(){
      clearTimeout(timer);
      timer=setTimeout(function(){
        window.removeEventListener("scroll",onScroll);
        isAutoScrolling=false;
        activeTarget=null;
      },150);
    }
    window.addEventListener("scroll",onScroll,{passive:true});
  });
})();
`;
