(() => {
  const ROOT = document.documentElement;
  const DEBUG = new URLSearchParams(window.location.search).has("debugMotion");
  ROOT.dataset.lpGsapScript = "loaded";

  const log = (level, message, data) => {
    if (!DEBUG) {
      return;
    }
    const payload = data ? [message, data] : [message];
    console[level]("[Landing-Page-GSAP]", ...payload);
  };

  const debounce = (fn, delay = 160) => {
    let timerId;
    return (...args) => {
      window.clearTimeout(timerId);
      timerId = window.setTimeout(() => fn(...args), delay);
    };
  };

  const setupMotion = (gsapLib, scrollTriggerLib) => {
    gsapLib.registerPlugin(scrollTriggerLib);
    ROOT.dataset.lpGsapStatus = "plugin-registered";

    const selectors = {
      heroSection: ".lp-hero",
      heroTitle: ".hero-title",
      heroLead: ".hero-lead",
      heroCta: ".hero-cta",
      heroSpinRoot: ".hero-visual",
      heroSpinFrame: "#hero-spin-frame",
      painSection: ".lp-section-pain",
      painTitle: ".lp-section-pain .section-title",
      painDivider: ".lp-section-pain .section-divider",
      painSubtitle: ".lp-section-pain .section-subtitle",
      painCards: ".lp-section-pain .pain-card",
      painQuote: ".lp-section-pain .pain-quote",
      painCta: ".lp-section-pain .pain-cta"
    };

    const heroSection = document.querySelector(selectors.heroSection);
    const heroTitle = document.querySelector(selectors.heroTitle);
    const heroLead = document.querySelector(selectors.heroLead);
    const heroCta = document.querySelector(selectors.heroCta);
    const heroSpinRoot = document.querySelector(selectors.heroSpinRoot);
    const heroSpinFrame = document.querySelector(selectors.heroSpinFrame);
    const painSection = document.querySelector(selectors.painSection);
    const painTitle = document.querySelector(selectors.painTitle);
    const painDivider = document.querySelector(selectors.painDivider);
    const painSubtitle = document.querySelector(selectors.painSubtitle);
    const painCards = gsapLib.utils.toArray(selectors.painCards);
    const painQuote = document.querySelector(selectors.painQuote);
    const painCta = document.querySelector(selectors.painCta);

    if (DEBUG) {
      const selectorCheck = {
        heroSection: Boolean(heroSection),
        heroTitle: Boolean(heroTitle),
        heroLead: Boolean(heroLead),
        heroCta: Boolean(heroCta),
        heroSpinRoot: Boolean(heroSpinRoot),
        heroSpinFrame: Boolean(heroSpinFrame),
        painSection: Boolean(painSection),
        painTitle: Boolean(painTitle),
        painDivider: Boolean(painDivider),
        painSubtitle: Boolean(painSubtitle),
        painCards: painCards.length,
        painQuote: Boolean(painQuote),
        painCta: Boolean(painCta)
      };
      log("info", "Diagnostico de seletores", selectorCheck);
    }

    if (!heroSection || !heroTitle || !heroLead || !heroCta) {
      ROOT.dataset.lpGsapStatus = "missing-selectors";
      ROOT.classList.remove("motion-pending");
      log("error", "Seletores obrigatorios nao encontrados.");
      return;
    }

    const initHeroSpin = (spinRoot, imageEl) => {
      if (!spinRoot || !imageEl) {
        log("warn", "Frame 360 da hero nao encontrado.");
        return;
      }

      const currentSrc = imageEl.getAttribute("src") || "";
      const sourceMatch = currentSrc.match(/^(.*frame)(\d{3})(\.webp)(\?.*)?$/i);

      if (!sourceMatch) {
        log("warn", "Padrao de source do frame 360 invalido.", currentSrc);
        return;
      }

      const prefix = sourceMatch[1];
      const suffix = sourceMatch[3] + (sourceMatch[4] || "");
      const frameCount = 240;
      const fps = 24;
      const frameDuration = 1000 / fps;
      const dragSensitivityPx = 3;
      const warmupFrameCount = 60;
      let frameIndex = 0;
      let autoplayDirection = 1;
      let rafId = 0;
      let lastTick = 0;
      let frameAccumulator = 0;
      let isDragging = false;
      let isInView = true;
      let isReady = false;
      let lastPointerX = 0;

      const frameCache = new Array(frameCount);
      const frameSrc = (index) => `${prefix}${String(index).padStart(3, "0")}${suffix}`;
      const wrapFrame = (index) => (index + frameCount) % frameCount;

      const preloadFrame = (index) => {
        if (frameCache[index]) {
          return Promise.resolve(true);
        }

        return new Promise((resolve) => {
          const frame = new Image();
          frame.decoding = "async";
          frame.src = frameSrc(index);
          frame.onload = () => {
            frameCache[index] = frame;
            resolve(true);
          };
          frame.onerror = () => resolve(false);
        });
      };

      const preloadRange = async (startIndex, endIndex) => {
        const chunkSize = 20;

        for (let i = startIndex; i <= endIndex; i += chunkSize) {
          const chunk = [];
          const chunkEnd = Math.min(i + chunkSize - 1, endIndex);

          for (let j = i; j <= chunkEnd; j += 1) {
            chunk.push(preloadFrame(j));
          }

          await Promise.all(chunk);
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
      };

      const renderFrame = (nextIndex) => {
        frameIndex = wrapFrame(nextIndex);
        const frameLabel = String(frameIndex);
        if (imageEl.dataset.frame === frameLabel) {
          return;
        }

        imageEl.dataset.frame = frameLabel;
        imageEl.src = frameCache[frameIndex]?.src || frameSrc(frameIndex);
      };

      const tick = (timestamp) => {
        if (!lastTick) {
          lastTick = timestamp;
        }

        const elapsed = timestamp - lastTick;

        if (!isDragging && isInView && isReady) {
          frameAccumulator += elapsed;

          while (frameAccumulator >= frameDuration) {
            renderFrame(frameIndex + autoplayDirection);
            frameAccumulator -= frameDuration;
          }
        }

        lastTick = timestamp;

        rafId = window.requestAnimationFrame(tick);
      };

      const start = () => {
        if (!rafId) {
          rafId = window.requestAnimationFrame(tick);
        }
      };

      const stop = () => {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
        lastTick = 0;
        frameAccumulator = 0;
      };

      const onPointerDown = (event) => {
        if (event.button !== undefined && event.button !== 0) {
          return;
        }

        isDragging = true;
        spinRoot.classList.add("dragging");
        lastPointerX = event.clientX;
        stop();

        if (spinRoot.setPointerCapture && typeof event.pointerId === "number") {
          spinRoot.setPointerCapture(event.pointerId);
        }
      };

      const onPointerMove = (event) => {
        if (!isDragging || !isReady) {
          return;
        }

        const deltaX = event.clientX - lastPointerX;
        if (Math.abs(deltaX) < dragSensitivityPx) {
          return;
        }

        const steps = Math.floor(Math.abs(deltaX) / dragSensitivityPx);
        const direction = deltaX > 0 ? -1 : 1;
        autoplayDirection = direction;
        renderFrame(frameIndex + (direction * steps));
        lastPointerX = event.clientX;
      };

      const endDrag = (event) => {
        if (!isDragging) {
          return;
        }

        isDragging = false;
        spinRoot.classList.remove("dragging");

        if (
          event &&
          typeof event.pointerId === "number" &&
          spinRoot.releasePointerCapture &&
          spinRoot.hasPointerCapture &&
          spinRoot.hasPointerCapture(event.pointerId)
        ) {
          spinRoot.releasePointerCapture(event.pointerId);
        }

        if (isReady && isInView) {
          start();
        }
      };

      spinRoot.addEventListener("pointerdown", onPointerDown);
      spinRoot.addEventListener("pointermove", onPointerMove);
      spinRoot.addEventListener("pointerup", endDrag);
      spinRoot.addEventListener("pointercancel", endDrag);
      spinRoot.addEventListener("lostpointercapture", () => endDrag());
      window.addEventListener("mouseup", endDrag);

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            isInView = Boolean(entries[0] && entries[0].isIntersecting);
            if (!isInView) {
              stop();
              return;
            }
            if (isReady && !isDragging) {
              start();
            }
          },
          { threshold: 0.15 }
        );
        observer.observe(spinRoot);
      }

      document.addEventListener("visibilitychange", () => {
        isInView = !document.hidden;
        if (!isInView) {
          stop();
          return;
        }
        if (isReady && !isDragging) {
          start();
        }
      });

      const bootSpin = async () => {
        renderFrame(0);

        await preloadRange(0, Math.min(frameCount - 1, warmupFrameCount - 1));
        isReady = true;
        renderFrame(0);
        start();

        if (warmupFrameCount < frameCount) {
          preloadRange(warmupFrameCount, frameCount - 1);
        }

        ROOT.dataset.lpGsapHeroSpin = "running";
        log("info", "Animacao 360 da hero iniciada.");
      };

      bootSpin();
    };

    initHeroSpin(heroSpinRoot, heroSpinFrame);

    // Estado inicial minimo obrigatorio.
    gsapLib.set(heroTitle, { autoAlpha: 0, y: 40 });
    gsapLib.set(heroLead, { autoAlpha: 0, y: 34 });
    gsapLib.set(heroCta, { autoAlpha: 0, y: 28, scale: 0.96, transformOrigin: "50% 50%" });

    // Hero: animacao automatica ao entrar na pagina (sem scroll).
    ROOT.classList.remove("motion-pending");
    gsapLib.timeline({
      defaults: {
        ease: "power2.out"
      }
    })
      .to(heroTitle, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9
      }, 0.03)
      .to(heroLead, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75
      }, 0.26)
      .to(heroCta, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.68,
        ease: "back.out(1.1)"
      }, 0.5);

    ROOT.dataset.lpGsapHero = "autoplay-ready";
    log("info", "Hero configurada com entrada automatica.");

    // Secoes seguintes: animacao por scroll (segunda secao).
    if (painSection && painTitle && painDivider && painSubtitle && painCards.length && painQuote && painCta) {
      gsapLib.set(painTitle, { autoAlpha: 0, y: 40 });
      gsapLib.set(painDivider, { autoAlpha: 0.25, scaleX: 0 });
      gsapLib.set(painSubtitle, { autoAlpha: 0, y: 32 });
      gsapLib.set(painCards, {
        autoAlpha: 1,
        y: 20,
        clipPath: "inset(0% 100% 0% 0% round 16px)"
      });
      gsapLib.set(painQuote, { autoAlpha: 0, y: 24 });
      gsapLib.set(painCta, { autoAlpha: 0, y: 26, scale: 0.96, transformOrigin: "50% 50%" });

      // Pre-resposta: faz o titulo reagir na aproximacao da secao (descendo),
      // sem alterar o ritmo interno da timeline principal pinada.
      gsapLib.timeline({
        defaults: {
          ease: "none"
        },
        scrollTrigger: {
          trigger: painSection,
          start: "top bottom",
          end: "top top",
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      })
        .to(painTitle, {
          autoAlpha: 0.48,
          y: 18,
          duration: 1
        }, 0)
        .to(painDivider, {
          autoAlpha: 0.4,
          scaleX: 0.22,
          duration: 1
        }, 0.08);

      const painTimeline = gsapLib.timeline({
        defaults: {
          ease: "power2.out"
        },
        scrollTrigger: {
          trigger: painSection,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 4.8, 3600)}`,
          scrub: 0.95,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: false
        }
      });

      painTimeline
        .to(painTitle, {
          autoAlpha: 1,
          y: 0,
          duration: 0.95
        }, 0)
        .to(painDivider, {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.52
        }, 0.58)
        .to(painSubtitle, {
          autoAlpha: 1,
          y: 0,
          duration: 0.72
        }, 0.88);

      let cursor = 1.36;
      painCards.forEach((card) => {
        painTimeline
          .to(card, {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            y: 0,
            duration: 0.72
          }, cursor);

        cursor += 0.74;
      });

      painTimeline
        .to(painQuote, {
          autoAlpha: 1,
          y: 0,
          duration: 0.62
        }, cursor + 0.08)
        .to(painCta, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.58,
          ease: "back.out(1.1)"
        }, cursor + 0.3);

      ROOT.dataset.lpGsapPain = "scroll-ready";
      log("info", "Segunda secao configurada com ScrollTrigger.");
    } else {
      ROOT.dataset.lpGsapPain = "missing-selectors";
      log("warn", "Segunda secao sem seletores completos para ScrollTrigger.");
    }

    const refreshAll = () => {
      scrollTriggerLib.refresh();
      log("info", "ScrollTrigger.refresh()");
    };

    window.addEventListener("load", refreshAll, { once: true });
    window.addEventListener("resize", debounce(refreshAll, 180));
    refreshAll();
  };

  const boot = (attempt = 0) => {
    const gsapLib = window.gsap;
    const scrollTriggerLib = window.ScrollTrigger;

    if (!gsapLib || !scrollTriggerLib) {
      if (attempt < 40) {
        ROOT.dataset.lpGsapStatus = "waiting-libs";
        return window.setTimeout(() => boot(attempt + 1), 50);
      }

      ROOT.dataset.lpGsapStatus = "missing-libs";
      ROOT.classList.remove("motion-pending");
      log("error", "GSAP/ScrollTrigger indisponiveis apos tentativas.");
      return;
    }

    setupMotion(gsapLib, scrollTriggerLib);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => boot(), { once: true });
    return;
  }

  boot();
})();
