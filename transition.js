document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add('body-loaded');

    // GSAP Animation
  });

  document.querySelectorAll('a.link').forEach(function(link) {
    link.addEventListener('click', function(event) {
      var url = this.getAttribute('href');
      event.preventDefault();
      document.body.classList.add('body-loader');

      // Create and append overlay
      var overlay = document.createElement('div');
      overlay.classList.add('overlay');
      document.body.appendChild(overlay);

      // GSAP Animation
      gsap.to('.overlay', {opacity: 0.5, duration: 1, ease: "power2.inOut"});
      gsap.to('.section', {yPercent:-10,duration: 1, ease: "power2.inOut"});

      setTimeout(function() { 
        window.location.href = url;
      }, 1100);
    });
  });