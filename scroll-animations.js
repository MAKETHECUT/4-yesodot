gsap.registerPlugin(ScrollTrigger);

const desktopAnimation = () => {
  gsap.to(".hero-texts", {
    yPercent: -40,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });

  gsap.to(".hero-image img", {
    yPercent: -10,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top 100vw",
      end: "bottom 0vw",
      scrub: true
    }
  });

  gsap.to(".hero-image", {
    scale: 1.5,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top 100vw",
      end: "bottom 0vw",
      scrub: true
    }
  });
};

const mobileAnimation = () => {
  gsap.to(".hero-texts", {
    yPercent: -30,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top 20%",
      end: "bottom 0%",
      scrub: true
    }
  });

  gsap.to(".hero-image img", {
    yPercent: -10,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top 50%",
      end: "bottom 0%",
      scrub: true
    }
  });

  gsap.to(".hero-image", {
    scale: 2,
    yPercent: 10,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top 50%",
      end: "bottom 0%",
      scrub: true
    }
  });
};

if (window.innerWidth >= 768) {
  desktopAnimation();
} else {
  mobileAnimation();
}

gsap.fromTo(".bullet img",
  {
    clipPath: 'circle(0% at 50% 50%)',
  },
  {
    clipPath: 'circle(70.7% at 50% 50%)',
    ease: "power1.out",
    stagger: 0.2,
    duration: 2,
    scrollTrigger: {
      trigger: ".highlights-bullets",
      start: "top 100%",
      end: "bottom 100%",
      scrub: 5
    }
  }
);

gsap.set(".about-visual img", {
  scale: 1
});

gsap.to(".about-visual img", {
  yPercent: -20,
  scale: 1.2,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".about-4",
    start: "top 100%",
    end: "bottom 0%",
    scrub: true
  }
});

const projectBoxes = document.querySelectorAll('.project-box');

projectBoxes.forEach((box) => {
  const img = box.querySelector('.project-box-image img');

  gsap.from(img, {
    scale: 1.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: box,
      start: "top 100%",
      end: "bottom 0%",
      scrub: 1
    }
  });
});

const projectBoxImages = document.querySelectorAll('.project-box-image');

projectBoxImages.forEach((element, index) => {
  const tl = gsap.timeline({ paused: true })
    .from(element, {
      clipPath: 'inset(0 0 0 100%)',
      ease: "power4.inOut",
      duration: 1.6
    });

  ScrollTrigger.create({
    trigger: element.closest('.project-box'),
    start: "top 100%",
    end: "bottom 0%",
    onEnter: () => {
      tl.play();
    },
  });
});

const divElements = document.querySelectorAll('.project-box-number');

divElements.forEach((divElement) => {
  gsap.to(divElement, {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: divElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

gsap.from(".history-grid img", {
  scrollTrigger: {
    trigger: ".history",
    start: "-=1500",
    end: "bottom 80%",
    scrub: 1
  },
  opacity: 0,
  yPercent: 200,
  duration: 200,
  stagger: 2,
});

const imgs = document.querySelectorAll(".history-grid img");

imgs.forEach((img) => {
  let isHovering = false;

  img.addEventListener("mouseover", function () {
    isHovering = true;

    gsap.to(img, {
      rotation: 15,
      scale: 1.5,
      duration: 1,
      ease: "expo.out"
    });

    this.addEventListener("mousemove", function (event) {
      if (isHovering) {
        const rect = img.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        gsap.to(img, {
          x: x / 1.4,
          y: y / 1.4,
          duration: 1.2,
          ease: "power1.out"
        });
      }
    });
  });

  img.addEventListener("mouseout", function () {
    isHovering = false;

    gsap.to(img, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 1.2,
      ease: "expo.out"
    });
  });
});

gsap.to(".circle-symbol img", {
  rotation: 360,
  duration: 15,
  repeat: -1,
  ease: "none"
});

const secondSymbol = document.querySelector('.two-symbols:nth-of-type(2)');

gsap.set(secondSymbol, { opacity: 0 });

secondSymbol.addEventListener('mouseover', function () {
  gsap.to(secondSymbol, { scale: 1, opacity: 1, duration: 0.5, ease: "power4.out" });
  gsap.to('.two-symbols:nth-of-type(1)', { scale: 2, opacity: 0, duration: 1, ease: "power4.out" });
});

secondSymbol.addEventListener('mouseout', function () {
  gsap.to(secondSymbol, { scale: 1, opacity: 0, duration: 0.5, ease: "power4.out" });
  gsap.to('.two-symbols:nth-of-type(1)', { scale: 1, opacity: 1, duration: 1, ease: "power4.out" });
});
