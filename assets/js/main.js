/**
 * Real Battery Karur - Master Client Engine
 * Interactive Tools: Battery Finder, Scrap Calculator, WhatsApp API & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initFaqAccordion();
  initScrapCalculator();
  initBatteryFinder();
});

// Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu.classList.toggle('active');
    toggleBtn.innerHTML = isActive ? '✕' : '☰';
    toggleBtn.setAttribute('aria-expanded', isActive);
  });

  // Close menu on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleBtn.innerHTML = '☰';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('active');
      toggleBtn.innerHTML = '☰';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Header Shadow on Scroll
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isCurrentlyActive);
    });
  });
}

// Old Battery Scrap Value Calculator
function initScrapCalculator() {
  const optionBoxes = document.querySelectorAll('.calc-option-box');
  const resultDisplay = document.getElementById('scrapValDisplay');
  const scrapClaimBtn = document.getElementById('claimScrapBtn');

  if (!optionBoxes.length || !resultDisplay) return;

  let currentType = 'Car Battery (35Ah - 65Ah)';
  let currentValue = '₹1,000 - ₹1,400';

  optionBoxes.forEach(box => {
    box.addEventListener('click', () => {
      optionBoxes.forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');

      const value = box.getAttribute('data-value') || '₹1,000 - ₹1,400';
      const label = box.querySelector('strong')?.innerText || 'Battery';

      currentType = label;
      currentValue = value;

      // Animate update
      resultDisplay.style.opacity = '0';
      setTimeout(() => {
        resultDisplay.innerText = value;
        resultDisplay.style.opacity = '1';
      }, 150);

      // Update button action
      if (scrapClaimBtn) {
        scrapClaimBtn.onclick = () => {
          claimScrapWhatsApp(currentType, currentValue);
        };
      }
    });
  });
}

// Interactive Battery Finder Filter
function initBatteryFinder() {
  const tabBtns = document.querySelectorAll('.finder-tab-btn');
  const cards = document.querySelectorAll('.finder-card');

  if (!tabBtns.length || !cards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
        }
      });
    });
  });
}

// WhatsApp Booking & Inquiries
const BUSINESS_PHONE = "919524189367";

function openWhatsAppCustom(message) {
  const url = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function bookBatteryWhatsApp(batteryName, category = '') {
  const msg = `Hi Real Battery Karur! I am interested in purchasing ${batteryName} (${category}). Please provide the best price, exchange discount, and delivery time to my location in Karur.`;
  openWhatsAppCustom(msg);
}

function claimScrapWhatsApp(batteryType, estimatedVal) {
  const msg = `Hi Real Battery Karur! I want to exchange my old ${batteryType} (Estimated scrap value: ${estimatedVal}) for a new battery. Please share current buyback offers in Karur.`;
  openWhatsAppCustom(msg);
}

function emergencyBreakdownWhatsApp() {
  const msg = `🚨 EMERGENCY BREAKDOWN ASSISTANCE: Hi Real Battery Karur! My vehicle's battery is dead and I need immediate jumpstart / on-site replacement service in Karur. Please assist immediately!`;
  openWhatsAppCustom(msg);
}

function quickFinderSubmit() {
  const vehicleSelect = document.getElementById('heroVehicleSelect');
  const brandSelect = document.getElementById('heroBrandSelect');

  const vehicle = vehicleSelect ? vehicleSelect.value : 'Car';
  const brand = brandSelect ? brandSelect.value : 'Any Brand';

  const msg = `Hi Real Battery Karur! I need a battery recommendation for:
- Vehicle / Use: ${vehicle}
- Preferred Brand: ${brand}
Location: Karur. Please share available models and prices with free home delivery.`;

  openWhatsAppCustom(msg);
}
