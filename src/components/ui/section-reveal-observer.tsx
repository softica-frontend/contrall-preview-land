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
  var o=new IntersectionObserver(function(e){
    for(var i=0;i<e.length;i++)
      if(e[i].isIntersecting){
        e[i].target.dataset.visible="true";
        o.unobserve(e[i].target);
      }
  },{threshold:0.15,rootMargin:"0px 0px -60px 0px"});
  function s(){
    var a=document.querySelectorAll('[data-visible="false"]');
    for(var i=0;i<a.length;i++) o.observe(a[i]);
  }
  s();
  new MutationObserver(s).observe(document.body,{childList:true,subtree:true});
  window.addEventListener("pageshow",function(e){if(e.persisted){window.__sro=0;s();}});
})();
`;
