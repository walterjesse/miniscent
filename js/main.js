// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Animate hamburger
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
  
  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu?.querySelectorAll('a');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      const spans = mobileToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = window.scrollY;
});

// ===== SECTION CAMOUFLAGE FOR NAVBAR =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  // Check if we're on a light section
  const lightSections = ['collection', 'services', 'unboxing', 'testimonials'];
  if (lightSections.includes(current) && window.scrollY > 100) {
    navbar.classList.add('light');
  } else {
    navbar.classList.remove('light');
  }
  
  // Update active nav link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== FRAGRANCE JOURNEY =====
let currentStep = 1;
let selectedMood = '';
let selectedNotes = {
  top: [],
  heart: [],
  base: []
};
let customName = '';

const notes = {
  top: [
    { id: 'bergamot', name: 'Bergamot', icon: '🍊', desc: 'Fresh & Citrusy' },
    { id: 'lemon', name: 'Lemon', icon: '🍋', desc: 'Zesty & Bright' },
    { id: 'grapefruit', name: 'Grapefruit', icon: '🟡', desc: 'Sparkling & Fresh' },
    { id: 'lavender', name: 'Lavender', icon: '🪻', desc: 'Calm & Herbaceous' },
    { id: 'mint', name: 'Mint', icon: '🌿', desc: 'Cool & Crisp' },
    { id: 'basil', name: 'Basil', icon: '🍃', desc: 'Green & Peppery' },
    { id: 'ginger', name: 'Ginger', icon: '🫚', desc: 'Spicy & Warm' },
    { id: 'pinkpepper', name: 'Pink Pepper', icon: '🌶️', desc: 'Bright & Piquant' },
    { id: 'neroli', name: 'Neroli', icon: '🌸', desc: 'Sweet & Floral' },
    { id: 'mandarin', name: 'Mandarin', icon: '🍊', desc: 'Juicy & Sweet' }
  ],
  heart: [
    { id: 'rose', name: 'Rose', icon: '🌹', desc: 'Romantic & Classic' },
    { id: 'jasmine', name: 'Jasmine', icon: '🌼', desc: 'Exotic & Intoxicating' },
    { id: 'ylang', name: 'Ylang Ylang', icon: '🌺', desc: 'Rich & Floral' },
    { id: 'peony', name: 'Peony', icon: '🌷', desc: 'Soft & Rounded' },
    { id: 'iris', name: 'Iris', icon: '🪻', desc: 'Powdery & Elegant' },
    { id: 'lily', name: 'Lily of Valley', icon: '🌱', desc: 'Fresh & Delicate' },
    { id: 'cardamom', name: 'Cardamom', icon: '🟤', desc: 'Warm & Spicy' },
    { id: 'cinnamon', name: 'Cinnamon', icon: '🪵', desc: 'Sweet & Spiced' },
    { id: 'nutmeg', name: 'Nutmeg', icon: '🌰', desc: 'Warm & Woody' }
  ],
  base: [
    { id: 'sandalwood', name: 'Sandalwood', icon: '🪵', desc: 'Creamy & Woody' },
    { id: 'cedar', name: 'Cedarwood', icon: '🌲', desc: 'Dry & Masculine' },
    { id: 'vanilla', name: 'Vanilla', icon: '🍦', desc: 'Sweet & Cozy' },
    { id: 'amber', name: 'Amber', icon: '🟨', desc: 'Warm & Resinous' },
    { id: 'musk', name: 'Musk', icon: '🌫️', desc: 'Sensual & Skin-like' },
    { id: 'patchouli', name: 'Patchouli', icon: '🍂', desc: 'Earthy & Rich' },
    { id: 'vetiver', name: 'Vetiver', icon: '🌾', desc: 'Smoky & Woody' },
    { id: 'tonka', name: 'Tonka Bean', icon: '🫘', desc: 'Sweet & Almond' }
  ]
};

const personalities = {
  romantic: {
    name: 'The Romantic Dreamer',
    desc: 'Soft, sensual florals with warm, comforting bases. You wear your heart on your sleeve and leave a trail of elegance wherever you go.',
    notes: ['rose', 'jasmine', 'vanilla', 'musk']
  },
  power: {
    name: 'The Bold Leader',
    desc: 'Commanding woods and spices that announce your presence before you speak. Confidence bottled.',
    notes: ['sandalwood', 'cardamom', 'amber', 'cedar']
  },
  brunch: {
    name: 'The Effortless Optimist',
    desc: 'Bright, sparkling citrus meets soft florals. Fresh, approachable, and always in good taste.',
    notes: ['bergamot', 'neroli', 'peony', 'musk']
  },
  datenight: {
    name: 'The Magnetic Enigma',
    desc: 'Warm, spicy, and utterly captivating. A scent that invites closeness and leaves them wanting more.',
    notes: ['ylang', 'ginger', 'vanilla', 'patchouli']
  },
  selfcare: {
    name: 'The Mindful Soul',
    desc: 'Gentle, grounding notes that center your spirit. Your fragrance is your sanctuary.',
    notes: ['lavender', 'sandalwood', 'tonka', 'musk']
  },
  girlsnight: {
    name: 'The Sparkling Spirit',
    desc: 'Playful fruits and florals that dance with joy. Life of the party, bottled.',
    notes: ['grapefruit', 'rose', 'vanilla', 'pinkpepper']
  }
};

// Initialize journey
function initJourney() {
  // Ensure first step is visible
  document.querySelectorAll('.journey-step').forEach((step, i) => {
    step.classList.toggle('active', i === 0);
  });
  
  // Render initial notes for step 2
  renderNotes('top');
  updateProgressSteps();
}

// Render notes grid
function renderNotes(type) {
  const grid = document.getElementById('notesGrid');
  if (!grid) return;
  
  const limit = type === 'base' ? 2 : 3;
  const atMax = selectedNotes[type].length >= limit;
  
  grid.innerHTML = notes[type].map(note => {
    const isSelected = selectedNotes[type].includes(note.id);
    const isDisabled = atMax && !isSelected;
    
    return `
    <button class="note-btn ${isSelected ? 'selected' : ''} ${isDisabled ? 'max-reached' : ''}" 
            data-note="${note.id}" 
            data-type="${type}"
            onclick="${isDisabled ? '' : `toggleNote('${type}', '${note.id}')`}">
      <span class="icon">${note.icon}</span>
      <span class="name">${note.name}</span>
    </button>
  `}).join('');
}

// Toggle note selection
function toggleNote(type, noteId) {
  const index = selectedNotes[type].indexOf(noteId);
  const limit = type === 'base' ? 2 : 3;
  
  if (index > -1) {
    selectedNotes[type].splice(index, 1);
  } else if (selectedNotes[type].length < limit) {
    selectedNotes[type].push(noteId);
  }
  
  renderNotes(type);
}

// Tab switching
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderNotes(tab.dataset.tab);
    });
  });
}

// Mood selection
function initMoods() {
  const moodCards = document.querySelectorAll('.mood-card');
  moodCards.forEach(card => {
    card.addEventListener('click', () => {
      moodCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedMood = card.dataset.mood;
    });
  });
}

// Step navigation
function nextStep() {
  // Validate current step
  if (currentStep === 1 && !selectedMood) {
    alert('Please select a mood first!');
    return;
  }
  if (currentStep === 2) {
    const totalNotes = selectedNotes.top.length + selectedNotes.heart.length + selectedNotes.base.length;
    if (totalNotes === 0) {
      alert('Please select at least one note!');
      return;
    }
  }
  if (currentStep === 3) {
    const nameInput = document.getElementById('perfumeName');
    customName = nameInput.value.trim();
    if (!customName) {
      alert('Please name your creation!');
      return;
    }
    // Update reveal
    updateReveal();
  }
  
  if (currentStep < 4) {
    currentStep++;
    showStep(currentStep);
    updateProgressSteps();
    updateNavButtons();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
    updateProgressSteps();
    updateNavButtons();
  }
}

function showStep(stepNum) {
  document.querySelectorAll('.journey-step').forEach(step => {
    step.classList.remove('active');
  });
  document.getElementById(`step${stepNum}`).classList.add('active');
  
  // If going to step 2, ensure notes are rendered
  if (stepNum === 2) {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
      renderNotes(activeTab.dataset.tab);
    }
  }
}

function updateProgressSteps() {
  document.querySelectorAll('.step').forEach((step, i) => {
    step.classList.toggle('active', i + 1 === currentStep);
    step.classList.toggle('completed', i + 1 < currentStep);
    if (i + 1 < currentStep) {
      step.querySelector('.step-number').innerHTML = '✓';
    } else {
      step.querySelector('.step-number').innerHTML = i + 1;
    }
  });
}

function updateNavButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
  nextBtn.innerHTML = currentStep === 4 ? 'Add to Bag' : 'Continue';
}

function updateReveal() {
  const personality = personalities[selectedMood];
  document.getElementById('revealName').textContent = customName;
  document.getElementById('revealDesc').textContent = personality?.desc || 'A unique blend crafted just for you';
  
  const allNotes = [...selectedNotes.top, ...selectedNotes.heart, ...selectedNotes.base];
  const notesContainer = document.getElementById('revealNotes');
  
  notesContainer.innerHTML = allNotes.map(noteId => {
    const note = [...notes.top, ...notes.heart, ...notes.base].find(n => n.id === noteId);
    return note ? `<span class="note-tag">${note.icon} ${note.name}</span>` : '';
  }).join('');
}

// Name input character count
function initNameInput() {
  const nameInput = document.getElementById('perfumeName');
  const charCount = document.querySelector('.char-count');
  
  if (nameInput && charCount) {
    nameInput.addEventListener('input', () => {
      charCount.textContent = `${nameInput.value.length}/20`;
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initJourney();
  initTabs();
  initMoods();
  initNameInput();
  initStepClickHandlers();
  updateNavButtons();
});

// Allow clicking on progress steps to navigate
function initStepClickHandlers() {
  document.querySelectorAll('.step').forEach((step, i) => {
    step.addEventListener('click', () => {
      // Only allow going to previous steps or current step
      if (i + 1 <= currentStep) {
        currentStep = i + 1;
        showStep(currentStep);
        updateProgressSteps();
        updateNavButtons();
      }
    });
  });
}

// ===== ORDER FUNCTIONS =====
function orderPerfume(name) {
  const message = encodeURIComponent(`Hi! I'd like to order "${name}" from MiniScent-Bar 🌸`);
  window.open(`https://wa.me/254718810888?text=${message}`, '_blank');
}

function orderCustom() {
  const allNotes = [...selectedNotes.top, ...selectedNotes.heart, ...selectedNotes.base];
  const noteNames = allNotes.map(id => {
    const note = [...notes.top, ...notes.heart, ...notes.base].find(n => n.id === id);
    return note?.name;
  }).filter(Boolean).join(', ');
  
  const message = encodeURIComponent(
    `Hi! I'd like to order my custom fragrance "${customName}" from MiniScent-Bar 🌸\n\n` +
    `Mood: ${personalities[selectedMood]?.name || 'Custom'}\n` +
    `Notes: ${noteNames}\n\n` +
    `Price: Ksh 3,000 (30ml)`
  );
  window.open(`https://wa.me/254718810888?text=${message}`, '_blank');
}

function inquireService(service) {
  const message = encodeURIComponent(`Hi! I'm interested in your ${service} services. Can you provide more information?`);
  window.open(`https://wa.me/254718810888?text=${message}`, '_blank');
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.perfume-card, .service-card, .testimonial-card').forEach(el => {
  observer.observe(el);
});
