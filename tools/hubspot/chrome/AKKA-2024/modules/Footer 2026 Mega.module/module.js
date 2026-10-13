(function(){
  var wrap = document.querySelector('.footer-2026-mega .footerContentWrapper');
  if(!wrap) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ wrap.classList.add('is-in'); io.disconnect(); }
    });
  }, {threshold:.08});
  io.observe(wrap);
})();