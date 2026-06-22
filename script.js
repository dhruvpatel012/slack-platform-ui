// ------- Helper functions to handle Modal & Megamenu states -------

// Time formatter for video player (hoisted to module scope for performance)
function formatTime(time) {
  const m = Math.floor(time / 60);
  const s = time % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

const featuresTrigger = document.getElementById('trigger-features');
const solutionsTrigger = document.getElementById('trigger-solutions');
const resourcesTrigger = document.getElementById('trigger-resources');

const featuresMenu = document.getElementById('menu-features');
const solutionsMenu = document.getElementById('menu-solutions');
const resourcesMenu = document.getElementById('menu-resources');

const allTriggers = [featuresTrigger, solutionsTrigger, resourcesTrigger];
const allMenus = [featuresMenu, solutionsMenu, resourcesMenu];

function closeAllMegamenus() {
  allMenus.forEach(menu => {
    if (menu) {
      menu.classList.remove('active');
    }
  });
  allTriggers.forEach(trig => {
    if (trig) {
      trig.classList.remove('active');
      trig.setAttribute('aria-expanded', 'false');
    }
  });
}

// ------- Toggle dropdown views -------
function setupDropdownToggle(trigger, menu) {
  if (trigger && menu) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = menu.classList.contains('active');
      closeAllMegamenus();
      if (!isActive) {
        menu.classList.add('active');
        trigger.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  }
}

setupDropdownToggle(featuresTrigger, featuresMenu);
setupDropdownToggle(solutionsTrigger, solutionsMenu);
setupDropdownToggle(resourcesTrigger, resourcesMenu);

// ------- Close dropdowns on clicking outside -------
document.addEventListener('click', (e) => {
  let clickedInsideMenu = false;
  allMenus.forEach(menu => {
    if (menu && menu.contains(e.target)) clickedInsideMenu = true;
  });
  let clickedTrigger = false;
  allTriggers.forEach(trig => {
    if (trig && trig.contains(e.target)) clickedTrigger = true;
  });

  if (!clickedInsideMenu && !clickedTrigger) {
    closeAllMegamenus();
  }
});

// ------- Mobile Hamburger menu drawer slide action -------
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenuPanel = document.getElementById('mobile-panel');
const mobileMenuCloseBtn = document.getElementById('mobile-close-btn');

if (hamburgerBtn && mobileMenuPanel) {
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuPanel.classList.add('active');
  });
}

if (mobileMenuCloseBtn && mobileMenuPanel) {
  mobileMenuCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuPanel.classList.remove('active');
  });
}

// Close mobile drawer on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (mobileMenuPanel && mobileMenuPanel.classList.contains('active')) {
      mobileMenuPanel.classList.remove('active');
    }
  }
});

// ------- Bind mobile drawer megamenu triggers -------
const mobileFeaturesTrigger = document.getElementById('mobile-trigger-features');
const mobileSolutionsTrigger = document.getElementById('mobile-trigger-solutions');
const mobileResourcesTrigger = document.getElementById('mobile-trigger-resources');

function setupMobileDropdownToggle(trigger, menu) {
  if (trigger && menu) {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // Stop propagation to prevent document handler from closing immediately
      // Hide mobile panel so megamenu overlay (child of header) is fully visible
      if (mobileMenuPanel) {
        mobileMenuPanel.classList.remove('active');
      }
      menu.classList.add('active');
    });
  }
}

setupMobileDropdownToggle(mobileFeaturesTrigger, featuresMenu);
setupMobileDropdownToggle(mobileSolutionsTrigger, solutionsMenu);
setupMobileDropdownToggle(mobileResourcesTrigger, resourcesMenu);

// ------- Bind mobile megamenu Back & Close actions -------
const backButtons = document.querySelectorAll('.megamenu-back-btn');
const closeButtons = document.querySelectorAll('.megamenu-close-btn');

backButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = btn.closest('.megamenu-overlay');
    if (menu) {
      menu.classList.remove('active');
    }
    // Re-open mobile panel
    if (mobileMenuPanel) {
      mobileMenuPanel.classList.add('active');
    }
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = btn.closest('.megamenu-overlay');
    if (menu) {
      menu.classList.remove('active');
    }
    // Ensure mobile panel is also closed
    if (mobileMenuPanel) {
      mobileMenuPanel.classList.remove('active');
    }
  });
});

// ------- Sign In/Sign Up Modal Triggers -------
const signinModal = document.getElementById('signin-modal-overlay');
const closeSigninBtn = document.getElementById('signin-modal-close');
const triggerButtons = [
  document.getElementById('trigger-signin'),
  document.getElementById('trigger-started'),
  document.getElementById('hero-started'),
  document.getElementById('hero-subscription'),
  document.getElementById('acc-started'),
  document.getElementById('mobile-signup'),
  document.getElementById('mobile-demo'),
  document.getElementById('trigger-demo'),
  document.getElementById('acc-demo')
];

triggerButtons.forEach(btn => {
  if (btn && signinModal) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      signinModal.classList.add('active');
      if (mobileMenuPanel) {
        mobileMenuPanel.classList.remove('active');
      }
      document.body.classList.add('no-scroll'); // Disable scroll
    });
  }
});

if (closeSigninBtn && signinModal) {
  closeSigninBtn.addEventListener('click', () => {
    signinModal.classList.remove('active');
    document.body.classList.remove('no-scroll'); // Enable scroll
  });
}

// Close sign-in modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (signinModal && signinModal.classList.contains('active')) {
      signinModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }
});

// ------- Hero Mockup Tab switching logic -------
const heroTabs = [
  { btn: document.getElementById('hero-tab-ask'), media: 'assets/Ask-Slackbot.mp4', title: 'Ask Slackbot 🤖' },
  { btn: document.getElementById('hero-tab-plan'), media: 'assets/plan-launches.mp4', title: 'Plan launches 🔀' },
  { btn: document.getElementById('hero-tab-run'), media: 'assets/run-project.mp4', title: 'Run projects 🗂️' },
  { btn: document.getElementById('hero-tab-chat'), media: 'assets/chat-with-clients.mp4', title: 'Chat with clients 🔗' },
  { btn: document.getElementById('hero-tab-automate'), media: 'assets/automate-task.mp4', title: 'Automate tasks 🪄' }
];

const heroMediaMockup = document.getElementById('hero-video-media');
const mobileHeroTitlePill = document.getElementById('mobile-hero-title-pill');
const heroDots = document.querySelectorAll('.hero-dot');

// Generic tab and media synchronizer helper function
function switchTabGeneric({ activeIndex, tabsArray, dotsArray, mediaMockup, mobileTitlePill, initialOpacity }) {
  tabsArray.forEach((tab, i) => {
    if (tab.btn) {
      if (i === activeIndex) {
        tab.btn.classList.add('active');
      } else {
        tab.btn.classList.remove('active');
      }
    }
  });

  dotsArray.forEach((dot, i) => {
    if (i === activeIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  const targetTab = tabsArray[activeIndex];
  if (targetTab && mediaMockup) {
    mediaMockup.style.opacity = initialOpacity;
    setTimeout(() => {
      mediaMockup.src = targetTab.media;
      mediaMockup.load();
      mediaMockup.play().catch(err => console.log("Media play interrupted/blocked: ", err));
      mediaMockup.style.opacity = 1;
    }, 150);
  }

  if (targetTab && mobileTitlePill) {
    mobileTitlePill.innerHTML = targetTab.title;
  }
}

function switchHeroTab(index) {
  switchTabGeneric({
    activeIndex: index,
    tabsArray: heroTabs,
    dotsArray: heroDots,
    mediaMockup: heroMediaMockup,
    mobileTitlePill: mobileHeroTitlePill,
    initialOpacity: 0
  });
}

// Bind clicks on desktop tabs
heroTabs.forEach((tab, index) => {
  if (tab.btn) {
    tab.btn.addEventListener('click', () => {
      switchHeroTab(index);
    });
  }
});

// Bind clicks on mobile dots
heroDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    switchHeroTab(index);
  });
});

// ------- AI Possibilities Switcher logic (Desktop Tabs + Mobile Dots) -------
const aiTabs = [
  { 
    btn: document.getElementById('ai-tab-deals'), 
    media: 'assets/Update-deals-just-by-asking-Slackbot.webm', 
    title: 'Update deals just by asking Slackbot <span class="ai-badge">New</span>' 
  },
  { 
    btn: document.getElementById('ai-tab-summarise'), 
    media: 'assets/Summarise-a-conversation-you-missed.webm', 
    title: 'Summarise a conversation you missed' 
  },
  { 
    btn: document.getElementById('ai-tab-claude'), 
    media: 'assets/Get-fast-answers-with-Claude.webm', 
    title: 'Get fast answers with Claude <span class="ai-badge">New</span>' 
  },
  { 
    btn: document.getElementById('ai-tab-note'), 
    media: 'assets/Turn-on-AI-note-taking-in-huddles.webm', 
    title: 'Turn on AI note-taking in huddles' 
  },
  { 
    btn: document.getElementById('ai-tab-copilot'), 
    media: 'assets/Review-code-with-GitHub-Copilot.webm', 
    title: 'Review code with GitHub Copilot' 
  },
  { 
    btn: document.getElementById('ai-tab-agentforce'), 
    media: 'assets/Look-up-customer-data-in-Agentforce.webm', 
    title: 'Look up customer data in Agentforce' 
  }
];

const aiMediaMockup = document.getElementById('ai-mockup-media');
const mobileAiTitlePill = document.getElementById('mobile-ai-title-pill');
const aiDots = document.querySelectorAll('.ai-dot');

function switchAiTab(index) {
  switchTabGeneric({
    activeIndex: index,
    tabsArray: aiTabs,
    dotsArray: aiDots,
    mediaMockup: aiMediaMockup,
    mobileTitlePill: mobileAiTitlePill,
    initialOpacity: 0.5
  });
}

// Bind clicks on desktop tabs
aiTabs.forEach((tab, index) => {
  if (tab.btn) {
    tab.btn.addEventListener('click', () => {
      switchAiTab(index);
    });
  }
});

// Bind clicks on mobile dots
aiDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    switchAiTab(index);
  });
});

// ------- What's new Carousel buttons logic -------
const carouselViewport = document.getElementById('carousel-view');
const carouselPrev = document.getElementById('carousel-prev-btn');
const carouselNext = document.getElementById('carousel-next-btn');

if (carouselViewport && carouselPrev && carouselNext) {
  carouselPrev.addEventListener('click', () => {
    carouselViewport.scrollBy({ left: -340, behavior: 'smooth' });
  });
  carouselNext.addEventListener('click', () => {
    carouselViewport.scrollBy({ left: 340, behavior: 'smooth' });
  });
}

// ------- Deep Dive core capability hub switcher -------
const capabilityTabs = [
  { btn: document.getElementById('hub-tab-knowledge'), sec: document.getElementById('hub-sec-knowledge') },
  { btn: document.getElementById('hub-tab-people'), sec: document.getElementById('hub-sec-people') },
  { btn: document.getElementById('hub-tab-process'), sec: document.getElementById('hub-sec-process') },
  { btn: document.getElementById('hub-tab-platform'), sec: document.getElementById('hub-sec-platform') }
];

capabilityTabs.forEach(tab => {
  if (tab.btn && tab.sec) {
    tab.btn.addEventListener('click', () => {
      capabilityTabs.forEach(t => {
        if (t.btn && t.sec) {
          t.btn.classList.remove('active');
          t.sec.classList.remove('active');
        }
      });
      tab.btn.classList.add('active');
      tab.sec.classList.add('active');
    });
  }
});

// ------- Submenu bullets selector inside Capability tabs -------
const bulletSubsections = document.querySelectorAll('.hub-menu-item');
bulletSubsections.forEach(bullet => {
  bullet.addEventListener('click', () => {
    const parentList = bullet.parentElement;
    if (parentList) {
      const siblings = parentList.querySelectorAll('.hub-menu-item');
      siblings.forEach(sib => sib.classList.remove('active'));
      bullet.classList.add('active');
    }
  });
});

// ------- Video mockup player play/pause and timeupdate actions -------
const playPauseBtn = document.getElementById('video-play-btn');
const progressText = document.getElementById('video-time-label');
const muteBtn = document.getElementById('video-mute-btn');
const fullscreenBtn = document.getElementById('video-fullscreen-btn');

if (heroMediaMockup) {
  heroMediaMockup.addEventListener('play', () => {
    if (playPauseBtn) {
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
  });
  
  heroMediaMockup.addEventListener('pause', () => {
    if (playPauseBtn) {
      playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
  });

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (heroMediaMockup.paused) {
        heroMediaMockup.play().catch(err => console.log(err));
      } else {
        heroMediaMockup.pause();
      }
    });
  }

  heroMediaMockup.addEventListener('timeupdate', () => {
    if (progressText) {
      const cur = Math.floor(heroMediaMockup.currentTime);
      const dur = Math.floor(heroMediaMockup.duration) || 0;
      progressText.innerText = `${formatTime(cur)} / ${formatTime(dur)}`;
    }
  });

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      heroMediaMockup.muted = !heroMediaMockup.muted;
      if (heroMediaMockup.muted) {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      } else {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (heroMediaMockup.requestFullscreen) {
        heroMediaMockup.requestFullscreen();
      } else if (heroMediaMockup.webkitRequestFullscreen) {
        heroMediaMockup.webkitRequestFullscreen();
      } else if (heroMediaMockup.msRequestFullscreen) {
        heroMediaMockup.msRequestFullscreen();
      }
    });
  }
}
