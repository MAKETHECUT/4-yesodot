document.addEventListener('DOMContentLoaded', function() {

  const cursor = document.querySelector('#cursor');
  const cursorCircle = cursor.querySelector('.cursor__circle');
  
  const mouse = { x: 0, y: 0 };
  const pos = { x: 0, y: 0 };
  const speed = 0.1;
  
  const updateCoordinates = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
  }
  
  window.addEventListener('mousemove', updateCoordinates);
  
  function getAngle(diffX, diffY) {
      return Math.atan2(diffY, diffX) * 180 / Math.PI;
  }
  
  function getSqueeze(diffX, diffY) {
      const distance = Math.sqrt(
          Math.pow(diffX, 2) + Math.pow(diffY, 2)
      );
      const maxSqueeze = 0.15;
      const accelerator = 1500;
      return Math.min(distance / accelerator, maxSqueeze);
  }
  
  const updateCursor = () => {
      const diffX = Math.round(mouse.x - pos.x);
      const diffY = Math.round(mouse.y - pos.y);
  
      pos.x += diffX * speed;
      pos.y += diffY * speed;
  
      const angle = getAngle(diffX, diffY);
      const squeeze = getSqueeze(diffX, diffY);
  
      const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
      const rotate = 'rotate(' + angle +'deg)';
  
      const translate = 'translate3d(' + (pos.x - cursorCircle.offsetWidth / 2) + 'px ,' + (pos.y - cursorCircle.offsetHeight / 2) + 'px, 0)';
  
      cursor.style.transform = translate;
      cursorCircle.style.transform = rotate + scale;
  };
  
  function loop() {
      updateCursor();
      requestAnimationFrame(loop);
  }
  
  requestAnimationFrame(loop);
  
  const cursorModifiers = document.querySelectorAll('[cursor-class]');
  
  cursorModifiers.forEach(cursorModifier => {
      cursorModifier.addEventListener('mouseenter', function() {
          const className = this.getAttribute('cursor-class');
          cursor.classList.add(className);
      });
  
      cursorModifier.addEventListener('mouseleave', function() {
          const className = this.getAttribute('cursor-class');
          cursor.classList.remove(className);
      });
  });
  
  const clickElements = document.querySelectorAll('[click-trigger]');
  clickElements.forEach(clickElement => {
      clickElement.addEventListener('click', function() {
          cursorCircle.style.transition = 'transform 0.3s';
          cursorCircle.style.transform = 'scale(0)';
      });
  });
    const cursorSlide = document.querySelector('.slide-cursor');
  
    function updateCursorSlide(event) {
      gsap.to(cursorSlide, {
        x: event.pageX,
        y: event.pageY,
        duration: 0.5,
      });
    }
  
    function toggleCursorSlide(isVisible) {
      gsap.to(cursorSlide, {
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0,
        duration: 0.5
      });
    }
  
    document.addEventListener('mousemove', updateCursorSlide);
  
    const sliders = document.querySelectorAll('.open');
  
    sliders.forEach(slider => {
      slider.addEventListener('mouseenter', () => toggleCursorSlide(true));
      slider.addEventListener('mouseleave', () => toggleCursorSlide(false));
    });

  
    let startX;
  
    document.addEventListener('touchstart', function(e) {
      startX = e.touches[0].pageX;
    });
  
    document.addEventListener('touchmove', function(e) {
      const moveX = e.touches[0].pageX;
      const diffX = startX - moveX;
  
      if (Math.abs(diffX) > 10) {
        e.preventDefault();
      }
    });
  });
  