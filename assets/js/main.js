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
      heroSpinHint: "[data-spin-hint]",
      painSection: ".lp-section-pain",
      painTitle: ".lp-section-pain .section-title",
      painSubtitle: ".lp-section-pain .section-subtitle",
      painCards: ".lp-section-pain .pain-card",
      painProgress: ".lp-section-pain .pain-progress",
      painQuote: ".lp-section-pain .pain-quote",
      painCta: ".lp-section-pain .pain-cta",
      painProgressCurrent: "[data-pain-progress-current]",
      painProgressTotal: "[data-pain-progress-total]",
      promiseSection: ".lp-section-promise",
      promiseTitle: ".lp-section-promise .section-title",
      promiseSubtitle: ".lp-section-promise .section-subtitle",
      promiseGrid: ".lp-section-promise .promise-grid",
      promiseCards: ".lp-section-promise .promise-card",
      promiseHighlight: ".lp-section-promise .promise-highlight",
      promiseCta: ".lp-section-promise .promise-cta"
    };

    const heroSection = document.querySelector(selectors.heroSection);
    const heroTitle = document.querySelector(selectors.heroTitle);
    const heroLead = document.querySelector(selectors.heroLead);
    const heroCta = document.querySelector(selectors.heroCta);
    const heroSpinRoot = document.querySelector(selectors.heroSpinRoot);
    const heroSpinFrame = document.querySelector(selectors.heroSpinFrame);
    const heroSpinHint = document.querySelector(selectors.heroSpinHint);
    const painSection = document.querySelector(selectors.painSection);
    const painTitle = document.querySelector(selectors.painTitle);
    const painSubtitle = document.querySelector(selectors.painSubtitle);
    const painCards = gsapLib.utils.toArray(selectors.painCards);
    const painProgress = document.querySelector(selectors.painProgress);
    const painQuote = document.querySelector(selectors.painQuote);
    const painCta = document.querySelector(selectors.painCta);
    const painProgressCurrent = document.querySelector(selectors.painProgressCurrent);
    const painProgressTotal = document.querySelector(selectors.painProgressTotal);
    const promiseSection = document.querySelector(selectors.promiseSection);
    const promiseTitle = document.querySelector(selectors.promiseTitle);
    const promiseSubtitle = document.querySelector(selectors.promiseSubtitle);
    const promiseGrid = document.querySelector(selectors.promiseGrid);
    const promiseCards = gsapLib.utils.toArray(selectors.promiseCards);
    const promiseHighlight = document.querySelector(selectors.promiseHighlight);
    const promiseCta = document.querySelector(selectors.promiseCta);
    const motionSections = gsapLib.utils.toArray(".motion-section");
    const genericSections = gsapLib.utils.toArray("[data-animate-section]").filter((section) => (
      section !== heroSection && section !== painSection && section !== promiseSection
    ));
    const isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (DEBUG) {
      const selectorCheck = {
        heroSection: Boolean(heroSection),
        heroTitle: Boolean(heroTitle),
        heroLead: Boolean(heroLead),
        heroCta: Boolean(heroCta),
        heroSpinRoot: Boolean(heroSpinRoot),
        heroSpinFrame: Boolean(heroSpinFrame),
        heroSpinHint: Boolean(heroSpinHint),
        painSection: Boolean(painSection),
        painTitle: Boolean(painTitle),
        painSubtitle: Boolean(painSubtitle),
        painCards: painCards.length,
        painProgress: Boolean(painProgress),
        painQuote: Boolean(painQuote),
        painCta: Boolean(painCta),
        painProgressCurrent: Boolean(painProgressCurrent),
        painProgressTotal: Boolean(painProgressTotal),
        promiseSection: Boolean(promiseSection),
        promiseTitle: Boolean(promiseTitle),
        promiseSubtitle: Boolean(promiseSubtitle),
        promiseGrid: Boolean(promiseGrid),
        promiseCards: promiseCards.length,
        promiseHighlight: Boolean(promiseHighlight),
        promiseCta: Boolean(promiseCta),
        motionSections: motionSections.length,
        genericSections: genericSections.length
      };
      log("info", "Diagnostico de seletores", selectorCheck);
    }

    if (!heroSection || !heroTitle || !heroLead || !heroCta) {
      ROOT.dataset.lpGsapStatus = "missing-selectors";
      ROOT.classList.remove("motion-pending");
      log("error", "Seletores obrigatorios nao encontrados.");
      return;
    }

    const updatePainProgress = (stepIndex) => {
      if (!painProgressCurrent) {
        return;
      }
      const maxStep = Math.max(painCards.length, 1);
      const safeStep = Math.min(Math.max(stepIndex, 1), maxStep);
      painProgressCurrent.textContent = String(safeStep);
    };

    const noopAnimationControl = {
      play: () => {},
      pause: () => {}
    };

    if (painProgressTotal) {
      painProgressTotal.textContent = String(Math.max(painCards.length, 1));
    }

    updatePainProgress(1);

    const setupPainCardInteraction = (cards) => {
      if (!cards.length) {
        return;
      }

      const clearActive = () => {
        cards.forEach((card) => card.classList.remove("is-active"));
      };

      cards.forEach((card, index) => {
        const step = index + 1;
        if (!isCoarsePointer) {
          card.addEventListener("mouseenter", () => updatePainProgress(step));
        }
        card.addEventListener("focusin", () => updatePainProgress(step));

        card.addEventListener("click", (event) => {
          updatePainProgress(step);

          if (isCoarsePointer) {
            event.stopPropagation();
            const shouldActivate = !card.classList.contains("is-active");
            clearActive();
            if (shouldActivate) {
              card.classList.add("is-active");
            }
          }
        });
      });

      if (isCoarsePointer) {
        document.addEventListener("click", clearActive, { passive: true });
      }
    };

    setupPainCardInteraction(painCards);

    const setupPromiseCardOrbit = ({ section, grid, cards }) => {
      const noopControl = {
        play: () => {},
        pause: () => {},
        relayout: () => {}
      };

      if (!section || !grid || cards.length !== 4) {
        ROOT.dataset.lpGsapPromiseOrbit = "disabled";
        return noopControl;
      }

      let orbitTimeline = null;
      let hasStarted = false;
      const orbitHoldDuration = 1.9;
      const orbitMoveDuration = 0.82;
      const orbitMedia = window.matchMedia("(min-width: 760px) and (hover: hover) and (pointer: fine)");

      const clearOrbitLayout = () => {
        if (orbitTimeline) {
          orbitTimeline.kill();
          orbitTimeline = null;
        }

        grid.classList.remove("is-orbit-ready");
        grid.style.height = "";
        cards.forEach((card) => {
          card.classList.remove("is-orbit-item");
          card.style.width = "";
          card.style.height = "";
          gsapLib.set(card, { clearProps: "x,y" });
        });
      };

      if (!orbitMedia.matches) {
        clearOrbitLayout();
        ROOT.dataset.lpGsapPromiseOrbit = "disabled-mobile";
        return noopControl;
      }

      const buildLayout = () => {
        grid.classList.add("is-orbit-ready");
        cards.forEach((card) => {
          card.classList.add("is-orbit-item");
          card.style.height = "";
        });

        const gridWidth = Math.max(grid.clientWidth, 320);
        const gap = Math.round(Math.max(12, Math.min(22, gridWidth * 0.03)));
        const cardWidth = Math.max(150, Math.floor((gridWidth - gap) / 2));

        cards.forEach((card) => {
          card.style.width = `${cardWidth}px`;
        });

        const maxCardHeight = cards.reduce((maxHeight, card) => Math.max(maxHeight, card.offsetHeight), 0);
        const cardHeight = Math.max(maxCardHeight, 126);

        cards.forEach((card) => {
          card.style.height = `${cardHeight}px`;
        });

        grid.style.height = `${(cardHeight * 2) + gap}px`;

        return [
          { x: 0, y: 0 },
          { x: cardWidth + gap, y: 0 },
          { x: cardWidth + gap, y: cardHeight + gap },
          { x: 0, y: cardHeight + gap }
        ];
      };

      const rebuildTimeline = () => {
        if (orbitTimeline) {
          orbitTimeline.kill();
          orbitTimeline = null;
        }

        const positions = buildLayout();
        cards.forEach((card, index) => {
          gsapLib.set(card, {
            x: positions[index].x,
            y: positions[index].y
          });
        });

        orbitTimeline = gsapLib.timeline({
          paused: true,
          repeat: -1
        });

        for (let step = 1; step <= 4; step += 1) {
          orbitTimeline.to({}, {
            duration: orbitHoldDuration,
            ease: "none"
          });

          orbitTimeline.to(cards, {
            x: (index) => positions[(index + step) % 4].x,
            y: (index) => positions[(index + step) % 4].y,
            stagger: 0,
            duration: orbitMoveDuration,
            ease: "sine.inOut"
          });
        }

        if (hasStarted) {
          orbitTimeline.play();
          ROOT.dataset.lpGsapPromiseOrbit = "playing";
        } else {
          ROOT.dataset.lpGsapPromiseOrbit = "ready";
        }
      };

      rebuildTimeline();

      return {
        play: () => {
          if (!orbitMedia.matches) {
            clearOrbitLayout();
            ROOT.dataset.lpGsapPromiseOrbit = "disabled-mobile";
            return;
          }

          if (orbitTimeline) {
            hasStarted = true;
            orbitTimeline.play();
            ROOT.dataset.lpGsapPromiseOrbit = "playing";
          }
        },
        pause: () => {
          if (orbitTimeline) {
            orbitTimeline.pause();
            ROOT.dataset.lpGsapPromiseOrbit = "paused";
          }
        },
        relayout: () => {
          if (!orbitMedia.matches) {
            clearOrbitLayout();
            ROOT.dataset.lpGsapPromiseOrbit = "disabled-mobile";
            return;
          }

          rebuildTimeline();
        }
      };
    };

    const initHeroSpin = (spinRoot, imageEl, hintEl) => {
      const noopControl = {
        play: () => {},
        pause: () => {}
      };

      if (!spinRoot || !imageEl) {
        log("warn", "Frame 360 da hero nao encontrado.");
        return noopControl;
      }

      const currentSrc = imageEl.getAttribute("src") || "";
      const sourceMatch = currentSrc.match(/^(.*frame)(\d{3})(\.webp)(\?.*)?$/i);

      if (!sourceMatch) {
        log("warn", "Padrao de source do frame 360 invalido.", currentSrc);
        return noopControl;
      }

      imageEl.decoding = "sync";

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const hasFinePointer = window.matchMedia("(any-pointer: fine)").matches
        || window.matchMedia("(pointer: fine)").matches;
      const connectionInfo = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const effectiveConnection = connectionInfo && typeof connectionInfo.effectiveType === "string"
        ? connectionInfo.effectiveType
        : "";
      const isSlowConnection = /(^|[^a-z])(?:2g|3g)([^a-z]|$)/i.test(effectiveConnection);
      const prefix = sourceMatch[1];
      const suffix = sourceMatch[3] + (sourceMatch[4] || "");
      const frameCount = 240;
      const fps = prefersReducedMotion
        ? (isCoarsePointer ? 8 : 10)
        : (isCoarsePointer ? (isSlowConnection ? 10 : 12) : 14);
      const frameDuration = fps > 0 ? 1000 / fps : Number.POSITIVE_INFINITY;
      const dragSensitivityPx = isCoarsePointer ? 5 : 3;
      const startupFrameCount = isCoarsePointer ? (isSlowConnection ? 5 : 8) : 14;
      const warmupFrameCount = isCoarsePointer ? (isSlowConnection ? 20 : 28) : 36;
      const lookAheadFrames = isCoarsePointer ? (isSlowConnection ? 8 : 7) : 10;
      const allowPointerDrag = hasFinePointer;
      const canBackgroundPreloadAll = !isCoarsePointer && !prefersReducedMotion && !isSlowConnection;
      let frameIndex = 0;
      let autoplayDirection = 1;
      let rafId = 0;
      let lastTick = 0;
      let frameAccumulator = 0;
      let isDragging = false;
      let isInView = true;
      let isDocumentVisible = !document.hidden;
      let isReady = false;
      let lastPointerX = 0;
      let hasUserInteracted = false;
      let fullPreloadStarted = false;
      let isSuspended = false;
      let lastLookAheadCenter = -1;
      let lastLookAheadDirection = 0;

      const frameCache = new Array(frameCount);
      const framePromises = new Array(frameCount);
      const frameSrc = (index) => `${prefix}${String(index).padStart(3, "0")}${suffix}`;
      const wrapFrame = (index) => (index + frameCount) % frameCount;

      const preloadFrame = (index) => {
        const safeIndex = wrapFrame(index);

        if (frameCache[safeIndex]) {
          return Promise.resolve(true);
        }

        if (framePromises[safeIndex]) {
          return framePromises[safeIndex];
        }

        framePromises[safeIndex] = new Promise((resolve) => {
          const frame = new Image();
          frame.decoding = "async";
          frame.src = frameSrc(safeIndex);
          frame.onload = () => {
            // Keep only the resolved URL to reduce memory pressure on mobile.
            frameCache[safeIndex] = frame.src;
            framePromises[safeIndex] = null;
            resolve(true);
          };
          frame.onerror = () => {
            framePromises[safeIndex] = null;
            resolve(false);
          };
        });

        return framePromises[safeIndex];
      };

      const preloadRange = async (startIndex, endIndex) => {
        const chunkSize = isCoarsePointer ? 8 : 20;

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

      const preloadLookAhead = (centerIndex, direction) => {
        for (let step = 1; step <= lookAheadFrames; step += 1) {
          preloadFrame(centerIndex + (direction * step));
        }
      };

      const findLoadedNeighbor = (centerIndex, direction) => {
        for (let step = 1; step <= lookAheadFrames; step += 1) {
          const forwardIndex = wrapFrame(centerIndex + (direction * step));
          if (frameCache[forwardIndex]) {
            return forwardIndex;
          }
          preloadFrame(forwardIndex);
        }

        return null;
      };

      const renderFrame = (nextIndex, { force = false } = {}) => {
        const targetIndex = wrapFrame(nextIndex);
        let resolvedIndex = targetIndex;
        let cachedSrc = frameCache[resolvedIndex];

        if (!cachedSrc) {
          preloadFrame(targetIndex);
          const fallbackIndex = findLoadedNeighbor(targetIndex, autoplayDirection);
          if (fallbackIndex === null) {
            return false;
          }
          resolvedIndex = fallbackIndex;
          cachedSrc = frameCache[resolvedIndex];
          if (!cachedSrc) {
            return false;
          }
        }

        if (!force && resolvedIndex === frameIndex) {
          return true;
        }

        frameIndex = resolvedIndex;
        const frameLabel = String(frameIndex);
        if (imageEl.dataset.frame !== frameLabel || force) {
          imageEl.dataset.frame = frameLabel;
          if (imageEl.src !== cachedSrc) {
            imageEl.src = cachedSrc;
          }
        }

        if (frameIndex !== lastLookAheadCenter || autoplayDirection !== lastLookAheadDirection) {
          preloadLookAhead(frameIndex, autoplayDirection);
          lastLookAheadCenter = frameIndex;
          lastLookAheadDirection = autoplayDirection;
        }
        return true;
      };

      const markInteracted = () => {
        if (hasUserInteracted) {
          return;
        }
        hasUserInteracted = true;
        if (spinRoot) {
          spinRoot.classList.add("is-interacted");
        }
      };

      const startFullPreload = () => {
        if (!canBackgroundPreloadAll || fullPreloadStarted || warmupFrameCount >= frameCount) {
          return;
        }
        fullPreloadStarted = true;
        preloadRange(warmupFrameCount, frameCount - 1);
      };

      const tick = (timestamp) => {
        if (!lastTick) {
          lastTick = timestamp;
        }

        const elapsed = timestamp - lastTick;

        if (!isDragging && isInView && isReady && fps > 0) {
          frameAccumulator += elapsed;
          let safetySteps = 0;

          while (frameAccumulator >= frameDuration) {
            const advanced = renderFrame(frameIndex + autoplayDirection);
            if (!advanced) {
              // Prevent flicker while waiting for a frame to finish loading.
              frameAccumulator = Math.min(frameAccumulator, frameDuration);
              break;
            }
            frameAccumulator -= frameDuration;
            safetySteps += 1;
            if (safetySteps >= 2) {
              break;
            }
          }
        }

        lastTick = timestamp;
        rafId = window.requestAnimationFrame(tick);
      };

      const canRun = () => isReady && isInView && isDocumentVisible && !isDragging && !isSuspended;

      const start = () => {
        if (!canRun()) {
          return;
        }

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
        if (!allowPointerDrag) {
          return;
        }

        if (event.button !== undefined && event.button !== 0) {
          return;
        }

        isDragging = true;
        markInteracted();
        startFullPreload();
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
        if (steps < 1) {
          return;
        }

        const direction = deltaX > 0 ? -1 : 1;
        autoplayDirection = direction;
        for (let step = 0; step < steps; step += 1) {
          renderFrame(frameIndex + direction);
        }
        lastPointerX = event.clientX;
      };

      const onKeyDown = (event) => {
        if (!isReady) {
          return;
        }

        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
          return;
        }

        event.preventDefault();
        markInteracted();
        startFullPreload();

        const direction = event.key === "ArrowLeft" ? -1 : 1;
        autoplayDirection = direction;
        renderFrame(frameIndex + direction, { force: true });
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

        if (canRun()) {
          start();
        }
      };

      if (allowPointerDrag) {
        spinRoot.addEventListener("pointerdown", onPointerDown);
        spinRoot.addEventListener("pointermove", onPointerMove, { passive: true });
        spinRoot.addEventListener("pointerup", endDrag);
        spinRoot.addEventListener("pointercancel", endDrag);
        spinRoot.addEventListener("lostpointercapture", () => endDrag());
        window.addEventListener("mouseup", endDrag);
      }

      spinRoot.addEventListener("keydown", onKeyDown);

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            isInView = Boolean(entries[0] && entries[0].isIntersecting);
            if (!isInView || !isDocumentVisible) {
              stop();
              return;
            }

            if (canRun()) {
              start();
            }
          },
          { threshold: 0.12 }
        );
        observer.observe(spinRoot);
      }

      document.addEventListener("visibilitychange", () => {
        isDocumentVisible = !document.hidden;
        if (!isDocumentVisible) {
          stop();
          return;
        }

        if (canRun()) {
          start();
        }
      });

      const bootSpin = async () => {
        const firstFrameLoaded = await preloadFrame(0);
        if (!firstFrameLoaded) {
          ROOT.dataset.lpGsapHeroSpin = "first-frame-error";
          log("error", "Falha ao carregar o primeiro frame da animacao 360.");
          return;
        }

        renderFrame(0, { force: true });
        const startupEnd = Math.min(frameCount - 1, startupFrameCount);
        await preloadRange(1, startupEnd);

        isReady = true;
        renderFrame(0, { force: true });

        if (canRun()) {
          start();
        }

        if (warmupFrameCount > startupEnd + 1) {
          preloadRange(startupEnd + 1, warmupFrameCount - 1);
        }

        preloadLookAhead(0, autoplayDirection);

        if (hintEl) {
          hintEl.textContent = isCoarsePointer ? "Deslize para explorar" : "Arraste para girar";
          window.setTimeout(() => {
            if (!hasUserInteracted) {
              hintEl.textContent = prefersReducedMotion
                ? "Use as setas para explorar"
                : (isCoarsePointer ? "Animacao 360 automatica" : "Use as setas para explorar");
            }
          }, 3800);
        }

        ROOT.dataset.lpGsapHeroSpin = prefersReducedMotion ? "running-soft" : "running";
        log("info", "Animacao 360 da hero iniciada.");
      };

      bootSpin();

      return {
        play: () => {
          isSuspended = false;
          if (canRun()) {
            start();
          }
          ROOT.dataset.lpGsapHeroSpinState = "running";
        },
        pause: () => {
          isSuspended = true;
          stop();
          ROOT.dataset.lpGsapHeroSpinState = "paused";
        }
      };
    };

    const heroSpinControl = initHeroSpin(heroSpinRoot, heroSpinFrame, heroSpinHint) || noopAnimationControl;

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
    let promiseOrbitControl = null;
    let activeSectionId = "";
    const media = gsapLib.matchMedia();

    const setActiveSection = (section) => {
      if (!section) {
        return;
      }

      const nextSectionId = section.dataset.section || "";
      if (nextSectionId !== activeSectionId) {
        activeSectionId = nextSectionId;
        ROOT.dataset.lpActiveSection = nextSectionId;
      }

      motionSections.forEach((item) => {
        item.classList.toggle("is-scene-active", item === section);
      });

      if (section === heroSection) {
        heroSpinControl.play();
      } else {
        heroSpinControl.pause();
      }
    };

    const buildSectionFocus = (isDesktop) => {
      if (!motionSections.length) {
        return;
      }

      const start = isDesktop ? "top 56%" : "top 58%";
      const end = isDesktop ? "bottom 44%" : "bottom 42%";

      motionSections.forEach((section) => {
        scrollTriggerLib.create({
          trigger: section,
          start,
          end,
          onEnter: () => setActiveSection(section),
          onEnterBack: () => setActiveSection(section),
          invalidateOnRefresh: true
        });
      });

      const viewportCenter = window.innerHeight * 0.5;
      const initialSection = motionSections.reduce((closest, section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs((rect.top + (rect.height * 0.5)) - viewportCenter);
        if (!closest || distance < closest.distance) {
          return { section, distance };
        }
        return closest;
      }, null);

      if (initialSection && initialSection.section) {
        setActiveSection(initialSection.section);
      }
    };

    const buildSectionSceneFlow = (isDesktop) => {
      if (motionSections.length < 2) {
        ROOT.dataset.lpGsapSceneFlow = "insufficient-sections";
        return;
      }

      const incomingOffset = isDesktop ? 26 : 18;
      const outgoingOffset = isDesktop ? -22 : -14;
      const inactiveOpacity = isDesktop ? 0.64 : 0.7;
      const inactiveScale = isDesktop ? 0.986 : 0.99;

      motionSections.forEach((section) => {
        gsapLib.set(section, {
          transformOrigin: "50% 50%",
          force3D: true
        });
      });

      for (let index = 0; index < motionSections.length - 1; index += 1) {
        const currentSection = motionSections[index];
        const nextSection = motionSections[index + 1];

        gsapLib.timeline({
          defaults: {
            ease: "none"
          },
          scrollTrigger: {
            trigger: nextSection,
            start: isDesktop ? "top 90%" : "top 92%",
            end: isDesktop ? "top 42%" : "top 50%",
            scrub: 0.7,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onToggle: (self) => {
              currentSection.classList.toggle("is-scene-near", self.isActive);
              nextSection.classList.toggle("is-scene-near", self.isActive);
            }
          }
        })
          .to(currentSection, {
            autoAlpha: inactiveOpacity,
            y: outgoingOffset,
            scale: inactiveScale
          }, 0)
          .fromTo(nextSection, {
            autoAlpha: inactiveOpacity,
            y: incomingOffset,
            scale: inactiveScale,
            immediateRender: false
          }, {
            autoAlpha: 1,
            y: 0,
            scale: 1
          }, 0);
      }

      ROOT.dataset.lpGsapSceneFlow = "scroll-ready";
    };

    media.add(
      {
        desktop: "(min-width: 901px)",
        mobile: "(max-width: 900px)"
      },
      (context) => {
        if (context.conditions.desktop) {
          buildSectionSceneFlow(true);
        } else {
          ROOT.dataset.lpGsapSceneFlow = "mobile-static";
        }
        buildSectionFocus(Boolean(context.conditions.desktop));

        return () => {
          motionSections.forEach((section) => {
            section.classList.remove("is-scene-near");
          });
        };
      }
    );

    // Secoes seguintes: animacao por scroll (segunda secao).
    if (painSection && painTitle && painSubtitle && painCards.length && painQuote && painCta) {
      gsapLib.set(painTitle, { autoAlpha: 0, y: 40 });
      gsapLib.set(painSubtitle, { autoAlpha: 0, y: 32 });
      gsapLib.set(painCards, {
        autoAlpha: 0,
        y: 18
      });
      if (painProgress) {
        gsapLib.set(painProgress, { autoAlpha: 0, y: 14 });
      }
      gsapLib.set(painQuote, { autoAlpha: 0, y: 24 });
      gsapLib.set(painCta, { autoAlpha: 0, y: 26, scale: 0.96, transformOrigin: "50% 50%" });

      // Entrada principal da secao (sem pin/scrub longo para manter fluidez
      // e garantir que o CTA final apareca sempre).
      const buildPainTimeline = (isDesktop) => {
        const painTimeline = gsapLib.timeline({
          defaults: {
            ease: "power2.out"
          },
          scrollTrigger: {
            trigger: painSection,
            start: isDesktop ? "top 80%" : "top 88%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true
          }
        });

        painTimeline
          .to(painTitle, {
            autoAlpha: 1,
            y: 0,
            duration: 0.56
          }, 0)
          .to(painSubtitle, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5
          }, 0.18);

        let cursor = 0.36;
        painCards.forEach((card, index) => {
          painTimeline
            .to(card, {
              autoAlpha: 1,
              y: 0,
              duration: 0.38,
              onStart: () => updatePainProgress(index + 1)
            }, cursor);

          cursor += 0.14;
        });

        painTimeline
          .to(painQuote, {
            autoAlpha: 1,
            y: 0,
            duration: 0.42
          }, cursor + 0.02)
          .to(painCta, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.46,
            ease: "back.out(1.1)"
          }, cursor + 0.1);

        if (painProgress) {
          painTimeline.to(painProgress, {
            autoAlpha: 1,
            y: 0,
            duration: 0.36
          }, cursor - 0.02);
        }
      };

      media.add(
        {
          desktop: "(min-width: 901px)",
          mobile: "(max-width: 900px)"
        },
        (context) => {
          buildPainTimeline(Boolean(context.conditions.desktop));
        }
      );

      ROOT.dataset.lpGsapPain = "scroll-ready";
      log("info", "Segunda secao configurada com ScrollTrigger.");
    } else {
      ROOT.dataset.lpGsapPain = "missing-selectors";
      log("warn", "Segunda secao sem seletores completos para ScrollTrigger.");
    }

    if (promiseSection && promiseTitle && promiseSubtitle && promiseGrid && promiseCards.length && promiseHighlight && promiseCta) {
      promiseOrbitControl = setupPromiseCardOrbit({
        section: promiseSection,
        grid: promiseGrid,
        cards: promiseCards
      });

      scrollTriggerLib.create({
        trigger: promiseSection,
        start: "top 95%",
        end: "bottom 5%",
        onEnter: () => promiseOrbitControl.play(),
        onEnterBack: () => promiseOrbitControl.play(),
        onLeave: () => promiseOrbitControl.pause(),
        onLeaveBack: () => promiseOrbitControl.pause()
      });

      const promiseRect = promiseSection.getBoundingClientRect();
      if (promiseRect.top <= (window.innerHeight * 0.92) && promiseRect.bottom >= 0) {
        promiseOrbitControl.play();
      }

      document.addEventListener("visibilitychange", () => {
        if (!promiseOrbitControl) {
          return;
        }

        if (document.hidden) {
          promiseOrbitControl.pause();
          return;
        }

        const rect = promiseSection.getBoundingClientRect();
        const isVisible = rect.top <= (window.innerHeight * 0.95) && rect.bottom >= (window.innerHeight * 0.05);
        if (isVisible) {
          promiseOrbitControl.play();
        }
      });

      gsapLib.set(promiseTitle, { autoAlpha: 0, y: 34 });
      gsapLib.set(promiseSubtitle, { autoAlpha: 0, y: 24 });
      gsapLib.set(promiseCards, { autoAlpha: 0, scale: 0.98, transformOrigin: "50% 50%" });
      gsapLib.set(promiseHighlight, { autoAlpha: 0, y: 24, scale: 0.985, transformOrigin: "50% 50%" });
      gsapLib.set(promiseCta, { autoAlpha: 0, y: 24, scale: 0.96, transformOrigin: "50% 50%" });

      const buildPromiseTimeline = (isDesktop) => {
        const promiseTimeline = gsapLib.timeline({
          defaults: {
            ease: "power2.out"
          },
          scrollTrigger: {
            trigger: promiseSection,
            start: isDesktop ? "top 82%" : "top 90%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true
          }
        });

        promiseTimeline
          .to(promiseTitle, {
            autoAlpha: 1,
            y: 0,
            duration: 0.62
          }, 0)
          .to(promiseSubtitle, {
            autoAlpha: 1,
            y: 0,
            duration: 0.56
          }, 0.2)
          .to(promiseCards, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.48,
            stagger: { each: 0.16, from: "start" }
          }, 0.34)
          .to(promiseHighlight, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.52
          }, 0.88)
          .to(promiseCta, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.48,
            ease: "back.out(1.08)"
          }, 1.02)
          .add(() => {
            if (promiseOrbitControl) {
              promiseOrbitControl.play();
            }
          }, 0.92);
      };

      media.add(
        {
          desktop: "(min-width: 901px)",
          mobile: "(max-width: 900px)"
        },
        (context) => {
          buildPromiseTimeline(Boolean(context.conditions.desktop));
        }
      );

      ROOT.dataset.lpGsapPromise = "scroll-ready";
      log("info", "Terceira secao configurada com ScrollTrigger.");
    } else {
      ROOT.dataset.lpGsapPromise = "missing-selectors";
      log("warn", "Terceira secao sem seletores completos para ScrollTrigger.");
    }

    const setupGenericSectionAnimation = (section) => {
      const title = section.querySelector(":scope .section-title");
      const subtitle = section.querySelector(":scope .section-subtitle");
      const revealItems = gsapLib.utils.toArray(section.querySelectorAll(":scope [data-reveal]"));

      if (!title && !subtitle && !revealItems.length) {
        return false;
      }

      if (title) {
        gsapLib.set(title, { autoAlpha: 0, y: 34 });
      }

      if (subtitle) {
        gsapLib.set(subtitle, { autoAlpha: 0, y: 24 });
      }

      if (revealItems.length) {
        gsapLib.set(revealItems, {
          autoAlpha: 0,
          y: 24,
          scale: 0.985,
          transformOrigin: "50% 50%"
        });
      }

      const buildTimeline = (isDesktop) => {
        const timeline = gsapLib.timeline({
          defaults: {
            ease: "power2.out"
          },
          scrollTrigger: {
            trigger: section,
            start: isDesktop ? "top 82%" : "top 90%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true
          }
        });

        let cursor = 0;

        if (title) {
          timeline.to(title, {
            autoAlpha: 1,
            y: 0,
            duration: 0.62
          }, cursor);
          cursor += 0.18;
        }

        if (subtitle) {
          timeline.to(subtitle, {
            autoAlpha: 1,
            y: 0,
            duration: 0.52
          }, cursor);
          cursor += 0.16;
        }

        if (revealItems.length) {
          timeline.to(revealItems, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: {
              each: isDesktop ? 0.12 : 0.09,
              from: "start"
            }
          }, Math.max(cursor, 0.34));
        }
      };

      media.add(
        {
          desktop: "(min-width: 901px)",
          mobile: "(max-width: 900px)"
        },
        (context) => {
          buildTimeline(Boolean(context.conditions.desktop));
        }
      );

      return true;
    };

    const animatedGenericSections = genericSections.filter(setupGenericSectionAnimation);
    ROOT.dataset.lpGsapGeneric = animatedGenericSections.length ? "scroll-ready" : "no-sections";
    log("info", "Secoes genericas configuradas com ScrollTrigger.", {
      count: animatedGenericSections.length
    });

    const refreshAll = () => {
      if (promiseOrbitControl) {
        promiseOrbitControl.relayout();
      }
      scrollTriggerLib.refresh();
      log("info", "ScrollTrigger.refresh()");
    };

    window.addEventListener("resize", debounce(refreshAll, 180));
    if (document.readyState === "complete") {
      refreshAll();
    } else {
      window.addEventListener("load", refreshAll, { once: true });
    }
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
