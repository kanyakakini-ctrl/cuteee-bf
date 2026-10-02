/**
 * =========================================================================
 * BOYFRIEND'S DAY SURPRISE - INTERACTIVE LOGIC & ANIMATIONS
 * =========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Use user configuration or defaults
  const cfg = window.BOYFRIEND_CONFIG || {};

  // Audio Context for sweet synthesized sound effects
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtx = new AudioCtx();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // --- Sound Effects Synthesis ---
  const sfx = {
    pop() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch (e) {}
    },
    chime() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.06);
          osc.stop(ctx.currentTime + idx * 0.06 + 0.35);
        });
      } catch (e) {}
    },
    sadDrip() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } catch (e) {}
    },
    shutter() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const bufferSize = ctx.sampleRate * 0.08;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        noise.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } catch (e) {}
    }
  };

  // --- Particle Effects (Canvas Confetti) ---
  const canvas = document.getElementById("effectsCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animId = null;

  function resizeCanvas() {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function spawnConfetti(count = 60, originX, originY) {
    const w = canvas.width;
    const h = canvas.height;
    const colors = ["#ffffff", "#ffd166", "#84a7c8", "#ff4d6d", "#b8d4ee", "#8b1527"];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: originX !== undefined ? originX : w * 0.5,
        y: originY !== undefined ? originY : h * 0.45,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 1) * 10 - 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 15,
        gravity: 0.22,
        life: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }
    if (!animId) {
      animateParticles();
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    if (particles.length > 0) {
      animId = requestAnimationFrame(animateParticles);
    } else {
      animId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // --- Floating Hearts Spawner ---
  const heartsContainer = document.getElementById("heartsContainer");
  const heartIcons = ["❤️", "🤍", "💙", "💖", "✨", "🌸"];

  function spawnFloatingHeart() {
    if (!heartsContainer) return;
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = `${Math.random() * 90 + 5}%`;
    heart.style.animationDuration = `${Math.random() * 2 + 3.5}s`;
    heart.style.fontSize = `${Math.random() * 0.8 + 0.9}rem`;
    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4500);
  }

  // Periodic ambient hearts
  setInterval(spawnFloatingHeart, 1800);

  // --- Populate Configurations into DOM ---
  function applyConfig() {
    // Screen 1
    if (cfg.screen1) {
      if (cfg.screen1.line1) document.getElementById("txt-s1-line1").textContent = cfg.screen1.line1;
      if (cfg.screen1.line2) document.getElementById("txt-s1-line2").textContent = cfg.screen1.line2;
      if (cfg.screen1.line3) document.getElementById("txt-s1-line3").textContent = cfg.screen1.line3;
      if (cfg.screen1.continueButtonText) document.getElementById("txt-s1-btn").textContent = cfg.screen1.continueButtonText;
    }

    // Screen 2
    if (cfg.screen2) {
      if (cfg.screen2.title) document.getElementById("txt-s2-title").textContent = cfg.screen2.title;
      if (cfg.screen2.yesButtonText) document.getElementById("txt-s2-yes").textContent = cfg.screen2.yesButtonText;
      if (cfg.screen2.noButtonText) document.getElementById("txt-s2-no").textContent = cfg.screen2.noButtonText;
    }

    // Screen 3
    if (cfg.screen3) {
      if (cfg.screen3.title) document.getElementById("txt-s3-title").textContent = cfg.screen3.title;
      if (cfg.screen3.tryAgainButtonText) document.getElementById("txt-s3-btn").textContent = cfg.screen3.tryAgainButtonText;
    }

    // Screen 4
    if (cfg.screen4) {
      if (cfg.screen4.title) document.getElementById("txt-s4-title").textContent = cfg.screen4.title;
      if (cfg.screen4.openButtonText) document.getElementById("txt-s4-open").textContent = cfg.screen4.openButtonText;
    }

    // Screen 5
    if (cfg.screen5) {
      if (cfg.screen5.letter) {
        document.getElementById("txt-love-letter").textContent = cfg.screen5.letter;
      }
      if (cfg.screen5.continueButtonText) {
        document.getElementById("txt-s5-btn").textContent = cfg.screen5.continueButtonText;
      }
      if (cfg.screen5.photos && Array.isArray(cfg.screen5.photos)) {
        cfg.screen5.photos.forEach((photo, idx) => {
          const imgEl = document.getElementById(`img-photo-${idx + 1}`);
          const capEl = document.getElementById(`cap-photo-${idx + 1}`);
          if (imgEl && photo.url) imgEl.src = photo.url;
          if (capEl && photo.caption) capEl.textContent = photo.caption;
        });
      }
    }

    // Screen 6
    if (cfg.screen6) {
      if (cfg.screen6.handwrittenTitle) {
        document.getElementById("txt-handsome-title").innerHTML = cfg.screen6.handwrittenTitle.replace(/\n/g, "<br>");
      }
      if (cfg.screen6.flowerTag) {
        document.getElementById("txt-flower-tag").textContent = cfg.screen6.flowerTag;
      }
      if (cfg.screen6.continueButtonText) {
        document.getElementById("txt-s6-btn").textContent = cfg.screen6.continueButtonText;
      }
    }

    // Screen 7
    if (cfg.screen7) {
      if (cfg.screen7.recordQuote) {
        document.getElementById("txt-record-quote").innerHTML = cfg.screen7.recordQuote.replace(/\n/g, "<br>");
      }
      if (cfg.screen7.characterMessage) {
        document.getElementById("txt-long-love").innerHTML = cfg.screen7.characterMessage.replace(/\n/g, "<br>");
      }
      if (cfg.screen7.music) {
        if (cfg.screen7.music.songTitle) {
          document.getElementById("playerSongTitle").textContent = cfg.screen7.music.songTitle;
        }
        if (cfg.screen7.music.artistName) {
          document.getElementById("playerArtistName").textContent = cfg.screen7.music.artistName;
        }
        if (cfg.screen7.music.albumCover) {
          document.getElementById("playerCoverImg").src = cfg.screen7.music.albumCover;
        }
        if (cfg.screen7.music.audioSrc) {
          document.getElementById("bgAudio").src = cfg.screen7.music.audioSrc;
        }
      }
      if (cfg.screen7.continueButtonText) {
        document.getElementById("txt-s7-btn").textContent = cfg.screen7.continueButtonText;
      }
    }

    // Screen 8
    if (cfg.screen8) {
      if (cfg.screen8.finalMessage) {
        document.getElementById("txt-final-message").textContent = cfg.screen8.finalMessage;
      }
      if (cfg.screen8.replayButtonText) {
        document.getElementById("txt-s8-btn").textContent = cfg.screen8.replayButtonText;
      }
    }
  }
  applyConfig();

  // --- Screen Navigation Logic ---
  let currentScreen = 1;
  const totalScreens = 8;

  function goToScreen(targetScreenNum, direction = "forward") {
    const curEl = document.querySelector(`.scrapbook-screen[data-screen="${currentScreen}"]`);
    const nextEl = document.querySelector(`.scrapbook-screen[data-screen="${targetScreenNum}"]`);

    if (!nextEl) return;

    if (curEl) {
      curEl.classList.remove("active");
      if (direction === "forward") {
        curEl.classList.add("prev-screen");
      } else {
        curEl.classList.remove("prev-screen");
      }
    }

    nextEl.classList.remove("prev-screen");
    nextEl.classList.add("active");
    currentScreen = targetScreenNum;

    // Trigger on-enter screen specific celebrations
    if (targetScreenNum === 2) {
      spawnConfetti(25);
    } else if (targetScreenNum === 4) {
      spawnConfetti(35);
    } else if (targetScreenNum === 8) {
      spawnConfetti(70);
      for (let i = 0; i < 8; i++) {
        setTimeout(spawnFloatingHeart, i * 200);
      }
    }
  }

  // --- Screen 1 Events ---
  const btnScreen1Continue = document.getElementById("btn-screen1-continue");
  if (btnScreen1Continue) {
    btnScreen1Continue.addEventListener("click", () => {
      sfx.pop();
      goToScreen(2, "forward");
    });
  }

  // Camera sticker snap interaction
  const cameraBtn = document.getElementById("cameraStickerBtn");
  if (cameraBtn) {
    cameraBtn.addEventListener("click", () => {
      sfx.shutter();
      spawnConfetti(20, 80, canvas.height - 80);
      // Flash screen effect
      const flash = document.createElement("div");
      flash.style.position = "absolute";
      flash.style.inset = "0";
      flash.style.backgroundColor = "white";
      flash.style.opacity = "0.9";
      flash.style.zIndex = "999";
      flash.style.transition = "opacity 0.4s ease-out";
      flash.style.pointerEvents = "none";
      document.getElementById("phoneContainer").appendChild(flash);
      setTimeout(() => {
        flash.style.opacity = "0";
        setTimeout(() => flash.remove(), 400);
      }, 50);
    });
  }

  // --- Screen 2 Events (Accept Gift) ---
  const btnAcceptYes = document.getElementById("btn-accept-yes");
  const btnAcceptNo = document.getElementById("btn-accept-no");

  if (btnAcceptYes) {
    btnAcceptYes.addEventListener("click", () => {
      sfx.chime();
      spawnConfetti(45);
      goToScreen(4, "forward");
    });
  }

  if (btnAcceptNo) {
    btnAcceptNo.addEventListener("click", () => {
      sfx.sadDrip();
      goToScreen(3, "forward");
    });
  }

  // --- Screen 3 Events (Why did you click no) ---
  const btnTryAgain = document.getElementById("btn-try-again");
  if (btnTryAgain) {
    btnTryAgain.addEventListener("click", () => {
      sfx.pop();
      goToScreen(2, "backward");
    });
  }

  // --- Screen 4 Events (Gift Selection) ---
  const giftCards = document.querySelectorAll(".gift-card-item");
  const btnOpenGifts = document.getElementById("btn-open-gifts");
  const giftHint = document.getElementById("giftHint");
  const selectedGifts = new Set();

  giftCards.forEach((card) => {
    card.addEventListener("click", () => {
      sfx.chime();
      const giftId = card.dataset.giftId;
      if (selectedGifts.has(giftId)) {
        selectedGifts.delete(giftId);
        card.classList.remove("selected");
      } else {
        selectedGifts.add(giftId);
        card.classList.add("selected");
        const rect = card.getBoundingClientRect();
        const pRect = canvas.getBoundingClientRect();
        spawnConfetti(15, rect.left - pRect.left + rect.width / 2, rect.top - pRect.top + rect.height / 2);
      }

      if (selectedGifts.size > 0) {
        giftHint.textContent = `You picked ${selectedGifts.size} surprise${selectedGifts.size > 1 ? "s" : ""}! Click OPEN ♡`;
        btnOpenGifts.classList.add("pulse-glow");
      } else {
        giftHint.textContent = "Tap any gift to select your surprise ♡";
      }
    });
  });

  if (btnOpenGifts) {
    btnOpenGifts.addEventListener("click", () => {
      sfx.pop();
      spawnConfetti(40);
      goToScreen(5, "forward");
    });
  }

  // --- Screen 5 Events (Polaroid Zoom & Carousel) ---
  const polaroids = document.querySelectorAll(".polaroid-frame");
  const photoModal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const modalCounter = document.getElementById("modalCounter");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalPrevBtn = document.getElementById("modalPrevBtn");
  const modalNextBtn = document.getElementById("modalNextBtn");
  const modalBackdrop = document.getElementById("modalBackdrop");

  const photosList = (cfg.screen5 && cfg.screen5.photos) ? cfg.screen5.photos : [
    { url: "assets/photos/photo1.jpg", caption: "Heart full of you ♡" },
    { url: "assets/photos/photo2.jpg", caption: "My happiest place ♡" },
    { url: "assets/photos/photo3.jpg", caption: "Sweet moments ♡" },
    { url: "assets/photos/photo4.jpg", caption: "My handsome boy ♡" },
    { url: "assets/photos/photo5.jpg", caption: "Forever & always ♡" }
  ];

  let currentModalPhotoIdx = 0;

  function updateModalPhoto(idx) {
    if (idx < 0) idx = photosList.length - 1;
    if (idx >= photosList.length) idx = 0;
    currentModalPhotoIdx = idx;

    const p = photosList[idx];
    if (modalImg && p) {
      modalImg.src = p.url;
      modalCaption.textContent = p.caption || "My Love ♡";
      if (modalCounter) {
        modalCounter.textContent = `${idx + 1} / ${photosList.length}`;
      }
    }
  }

  polaroids.forEach((pol) => {
    pol.addEventListener("click", () => {
      sfx.pop();
      const idx = parseInt(pol.dataset.photoIdx, 10) || 0;
      updateModalPhoto(idx);
      if (photoModal) {
        photoModal.classList.add("active");
      }
    });
  });

  if (modalPrevBtn) {
    modalPrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sfx.pop();
      updateModalPhoto(currentModalPhotoIdx - 1);
    });
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sfx.pop();
      updateModalPhoto(currentModalPhotoIdx + 1);
    });
  }

  // Keyboard navigation for modal
  document.addEventListener("keydown", (e) => {
    if (!photoModal || !photoModal.classList.contains("active")) return;
    if (e.key === "ArrowLeft") updateModalPhoto(currentModalPhotoIdx - 1);
    if (e.key === "ArrowRight") updateModalPhoto(currentModalPhotoIdx + 1);
    if (e.key === "Escape") closeModal();
  });

  function closeModal() {
    if (photoModal) {
      photoModal.classList.remove("active");
    }
  }
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

  const btnScreen5Next = document.getElementById("btn-screen5-next");
  if (btnScreen5Next) {
    btnScreen5Next.addEventListener("click", () => {
      sfx.pop();
      goToScreen(6, "forward");
    });
  }

  // --- Screen 6 Events (Handsome Boyfriend) ---
  const btnScreen6Next = document.getElementById("btn-screen6-next");
  if (btnScreen6Next) {
    btnScreen6Next.addEventListener("click", () => {
      sfx.pop();
      goToScreen(7, "forward");
    });
  }

  // --- Screen 7 Events (Music Player & Vinyl Record) ---
  const bgAudio = document.getElementById("bgAudio");
  const btnPlayPause = document.getElementById("btnPlayPause");
  const playIcon = document.getElementById("playIcon");
  const vinylDisc = document.getElementById("vinylDisc");
  const toneArm = document.getElementById("toneArm");
  const soundWaves = document.getElementById("soundWaves");
  const progressBarFill = document.getElementById("progressBarFill");
  const progressScrubber = document.getElementById("progressScrubber");
  const progressContainer = document.getElementById("progressContainer");
  const playerTimeCurrent = document.getElementById("playerTimeCurrent");
  const playerTimeDuration = document.getElementById("playerTimeDuration");
  let isPlaying = false;

  function formatTime(secs) {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  function setPlayerPlayingState(playing) {
    isPlaying = playing;
    if (playing) {
      playIcon.textContent = "❚❚";
      vinylDisc.classList.add("spinning");
      toneArm.classList.add("playing");
      soundWaves.classList.add("active");
    } else {
      playIcon.textContent = "▶";
      vinylDisc.classList.remove("spinning");
      toneArm.classList.remove("playing");
      soundWaves.classList.remove("active");
    }
  }

  if (btnPlayPause && bgAudio) {
    btnPlayPause.addEventListener("click", () => {
      getAudioContext();
      if (bgAudio.paused) {
        bgAudio.play().then(() => {
          setPlayerPlayingState(true);
        }).catch(() => {
          // If browser policy or codec error, toggle fallback synthesized melody!
          playSynthMelody();
        });
      } else {
        bgAudio.pause();
        setPlayerPlayingState(false);
      }
    });

    bgAudio.addEventListener("timeupdate", () => {
      if (bgAudio.duration) {
        const pct = (bgAudio.currentTime / bgAudio.duration) * 100;
        progressBarFill.style.width = `${pct}%`;
        progressScrubber.style.left = `${pct}%`;
        playerTimeCurrent.textContent = formatTime(bgAudio.currentTime);
      }
    });

    bgAudio.addEventListener("loadedmetadata", () => {
      playerTimeDuration.textContent = formatTime(bgAudio.duration);
    });

    bgAudio.addEventListener("ended", () => {
      setPlayerPlayingState(false);
    });
  }

  // Interactive scrubber click
  if (progressContainer && bgAudio) {
    progressContainer.addEventListener("click", (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (bgAudio.duration) {
        bgAudio.currentTime = pos * bgAudio.duration;
      }
    });
  }

  // Synthesized Fallback Romantic Melody
  let synthMelodyTimer = null;
  function playSynthMelody() {
    const ctx = getAudioContext();
    if (!ctx) return;
    setPlayerPlayingState(true);

    const notes = [
      { f: 392.00, d: 0.4 }, // G4
      { f: 440.00, d: 0.4 }, // A4
      { f: 523.25, d: 0.6 }, // C5
      { f: 587.33, d: 0.4 }, // D5
      { f: 659.25, d: 0.8 }, // E5
      { f: 587.33, d: 0.4 }, // D5
      { f: 523.25, d: 0.8 }, // C5
      { f: 440.00, d: 0.6 }, // A4
    ];

    let noteIdx = 0;
    function playNext() {
      if (!isPlaying) return;
      const cur = notes[noteIdx % notes.length];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(cur.f, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + cur.d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + cur.d);
      noteIdx++;
      synthMelodyTimer = setTimeout(playNext, cur.d * 1000);
    }
    playNext();
  }

  const btnScreen7Next = document.getElementById("btn-screen7-next");
  if (btnScreen7Next) {
    btnScreen7Next.addEventListener("click", () => {
      sfx.pop();
      goToScreen(8, "forward");
    });
  }

  // --- Screen 8 Events (Replay / One More Time) ---
  const btnReplay = document.getElementById("btn-replay");
  if (btnReplay) {
    btnReplay.addEventListener("click", () => {
      sfx.pop();
      // Reset selected gifts
      selectedGifts.clear();
      giftCards.forEach((c) => c.classList.remove("selected"));
      giftHint.textContent = "Tap any gift to select your surprise ♡";
      // Return to screen 1
      goToScreen(1, "backward");
    });
  }
});
