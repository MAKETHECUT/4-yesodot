document.addEventListener("DOMContentLoaded", function() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetElement,
                    offsetY: 0
                },
                ease: "power2.inOut"
            });
        });
    });

    function initializeSplitText() {
        const titles = document.querySelectorAll('h1,h2,h3,h4,h5,p,.cta,.qoute');
        titles.forEach((title) => {
            const split = new SplitText(title, { type: "lines", linesClass: "split-line" });
            split.lines.forEach((line) => {
                const wrapper = document.createElement('div');
                wrapper.style.overflow = 'hidden';
                line.parentNode.insertBefore(wrapper, line);
                wrapper.appendChild(line);
            });
            const tl = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: title,
                    start: "top 100%",
                    end: "bottom 0%",
                    onEnter: () => tl.play(),
                    onLeave: () => tl.reverse(),
                    onEnterBack: () => tl.play(),
                    onLeaveBack: () => tl.reverse()
                }
            });
            tl.from(split.lines, {
                duration: 1.5,
                yPercent: 150,
                ease: "power4.out",
                skewY: -3,
                stagger: 0.1,
            });
        });
    }

    window.onload = function() {
        initializeSplitText();
    }

    let canScroll = false;

    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.stop();

    setTimeout(function() {
        canScroll = true;
        lenis.start();
    }, 0);

    function raf(time) {
        if (canScroll) {
            lenis.raf(time);
        }
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', (e) => {
        if (!canScroll) {
            return;
        }
        console.log(e);
    });

    const tl = gsap.timeline();
    var split = new SplitText("h1,h3,h4,h5,h6", {
        type: "lines",
        wordsClass: "overflow-hidden-span"
    });
    let counter = { value: 1 };
    tl.set(".hero-image, .cta-btn, .contact", {
        autoAlpha: 0
    });

    tl.to(".logo", {
        delay: -1,
        duration: 0.5,
        opacity: 0,
        ease: "power1.out",
        onComplete: function() {
            document.querySelector('.logo').style.display = 'none';
        }
    });

    tl.to(".preloader-overlay", {
        delay: -0.5,
        duration: 1,
        opacity: 0,
        ease: "power1.out",
        onComplete: function() {
            document.querySelector('.logo').style.display = 'none';
        }
    });

    tl.from(split.lines, {
        delay: -0.3,
        opacity: 1,
        duration: 2,
        yPercent: 150,
        ease: "power4.out",
        skewY: -4,
        stagger: 0.1,
    });

    tl.from(".cta-btn", {
        delay: -4,
        opacity: 0,
        y: 50,
        duration: 1,
        autoAlpha: 1,
        ease: "power1",
    });

    tl.from(".hero-image", {
        delay: -3.5,
        duration: 1.8,
        autoAlpha: 1,
        clipPath: "inset(0 0 0 100%)",
        ease: "power3.inOut"
    });

    tl.from(".hero-image img", {
        delay: -3.5,
        duration: 2.5,
        scale: 1.2,
        ease: "power1.inOut"
    });

    tl.from(".site-logo, .hamburger, .contact", {
        delay: -2,
        duration: 1,
        autoAlpha: 0,
        y: 20,
        stagger: {
            each: 0.1,
            from: "end",
        },
        ease: "power1.out"
    }, 5);

    function handleMouseEnter() {
        const ctaImg = this.querySelector('.cta-img');
        gsap.to(ctaImg, {
            yPercent: -125,
            duration: 0.9,
            ease: 'expo.out'
        });
    }

    function handleMouseLeave() {
        const ctaImg = this.querySelector('.cta-img');
        gsap.to(ctaImg, {
            yPercent: 0,
            duration: 0.9,
            ease: 'expo.out'
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const ctaBtn = entry.target.querySelector('.cta-btn');
                if (ctaBtn) {
                    ctaBtn.addEventListener('mouseenter', handleMouseEnter.bind(entry.target));
                    ctaBtn.addEventListener('mouseleave', handleMouseLeave.bind(entry.target));
                }
            } else {
                const ctaBtn = entry.target.querySelector('.cta-btn');
                if (ctaBtn) {
                    ctaBtn.removeEventListener('mouseenter', handleMouseEnter);
                    ctaBtn.removeEventListener('mouseleave', handleMouseLeave);
                }
            }
        });
    });

    document.querySelectorAll('div').forEach((div) => {
        observer.observe(div);
    });
});