/**
 * Smokehut | Premium Charcoal Grills & Burger Bar
 * Core Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Custom Toast Notification
       ========================================================================== */
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');

    function showToast(title, message) {
        const toastTitle = toast.querySelector('h5');
        if (toastTitle) toastTitle.textContent = title;
        toastMsg.textContent = message;
        
        toast.classList.remove('translate-x-[150%]');
        
        setTimeout(() => {
            toast.classList.add('translate-x-[150%]');
        }, 4000);
    }


    /* ==========================================================================
       2. Sticky Navigation Bar Scroll Effects
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    function checkScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check on load


    /* ==========================================================================
       3. Mobile Slide-in Drawer Menu Navigation
       ========================================================================== */
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBackdrop = document.getElementById('menu-backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        mobileMenu.classList.remove('translate-x-full');
        menuBackdrop.classList.remove('hidden');
        setTimeout(() => {
            menuBackdrop.classList.add('opacity-100');
        }, 10);
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('translate-x-full');
        menuBackdrop.classList.remove('opacity-100');
        setTimeout(() => {
            menuBackdrop.classList.add('hidden');
        }, 500);
        document.body.style.overflow = '';
    }

    menuToggleBtn?.addEventListener('click', openMobileMenu);
    menuCloseBtn?.addEventListener('click', closeMobileMenu);
    menuBackdrop?.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });


    /* ==========================================================================
       4. Interactive Food Menu Live Filter System
       ========================================================================== */
    const menuTabs = document.querySelectorAll('.menu-tab-btn');
    const menuItems = document.querySelectorAll('.menu-item-card');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Toggle active state styling on tabs
            menuTabs.forEach(t => {
                t.classList.remove('active', 'bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/10');
                t.classList.add('bg-charcoal', 'text-gray-400', 'border-white/5');
            });
            tab.classList.add('active', 'bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/10');
            tab.classList.remove('bg-charcoal', 'text-gray-400', 'border-white/5');

            const category = tab.getAttribute('data-category');

            menuItems.forEach(item => {
                const itemCat = item.getAttribute('data-item-cat');

                if (category === 'all' || itemCat === category) {
                    // Transition item fade-in
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                } else {
                    // Transition item fade-out
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95) translateY(12px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 350);
                }
            });
        });
    });


    /* ==========================================================================
       5. Media Gallery Lightbox modal with zoom effect
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                if (lightboxCaption) {
                    lightboxCaption.textContent = img.alt || 'Gourmet Presentation';
                }
                
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex');
                setTimeout(() => {
                    lightbox.classList.add('opacity-100');
                }, 10);
            }
        });
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('opacity-100');
            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
            }, 300);
        }
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxImg.parentElement) {
            closeLightbox();
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeMobileMenu();
        }
    });


    /* ==========================================================================
       6. Dynamic Review Submission System
       ========================================================================== */
    const starContainer = document.getElementById('form-stars');
    const stars = document.querySelectorAll('.star-rating');
    const reviewForm = document.getElementById('review-form');
    const reviewsRow = document.getElementById('reviews-row');
    let currentRating = 5; // Default

    // Star selection click handler
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const selectedStarVal = parseInt(star.getAttribute('data-star'));
            currentRating = selectedStarVal;

            stars.forEach(s => {
                const sVal = parseInt(s.getAttribute('data-star'));
                if (sVal <= selectedStarVal) {
                    s.classList.add('text-primary', 'fill-primary');
                } else {
                    s.classList.remove('text-primary', 'fill-primary');
                }
            });
        });
    });

    // Handle posting form submissions dynamically
    reviewForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('rev-name');
        const taglineInput = document.getElementById('rev-title');
        const textInput = document.getElementById('rev-text');

        if (!nameInput || !taglineInput || !textInput) return;

        // Generate initials
        const name = nameInput.value;
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

        // Build HTML content for the card
        const card = document.createElement('div');
        card.className = "bg-charcoal/80 border border-primary/20 p-8 rounded-3xl flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-primary/40 transform scale-95 opacity-0";
        
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<i data-lucide="star" class="w-4 h-4 ${i <= currentRating ? 'text-primary fill-primary' : 'text-gray-600'}"></i>`;
        }

        card.innerHTML = `
            <div>
                <div class="flex gap-1 mb-6">
                    ${starsHtml}
                </div>
                <p class="text-gray-300 italic text-sm leading-relaxed mb-8">"${textInput.value}"</p>
            </div>
            <div class="flex items-center gap-4 border-t border-white/5 pt-6">
                <div class="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-outfit font-bold text-primary text-xs">${initials}</div>
                <div>
                    <h4 class="font-outfit font-bold text-sm">${name}</h4>
                    <p class="text-gray-500 text-[10px] uppercase tracking-wider">${taglineInput.value}</p>
                </div>
            </div>
        `;

        // Prepend card to target container row
        reviewsRow.prepend(card);
        lucide.createIcons(); // Initialize icons inside our newly appended node

        // Trigger smooth visual insertion transitions
        setTimeout(() => {
            card.classList.remove('scale-95', 'opacity-0');
            card.classList.add('scale-100', 'opacity-100');
        }, 100);

        // Success Toast Notification trigger
        showToast("Review Posted", "Thank you! Your feedback has been prepended successfully.");

        // Clear input form fields
        reviewForm.reset();
        stars.forEach(s => s.classList.remove('text-primary', 'fill-primary'));
        // Light up standard 5 stars
        stars.forEach(s => s.classList.add('text-primary', 'fill-primary'));
        currentRating = 5;
    });


    /* ==========================================================================
       7. Interactive Demo Action Sandboxes
       ========================================================================== */
    const demoButtons = document.querySelectorAll('.demo-btn, .add-to-cart-btn');

    demoButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const actionText = btn.getAttribute('data-action') || "Item added to secure sandbox shopping cart mockup.";
            showToast("Sandbox Action", actionText);
        });
    });


    /* ==========================================================================
       8. Scroll Reveal Engine
       ========================================================================== */
    const revealElements = document.querySelectorAll('section, .reveal-el');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.08
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'all 0.9s cubic-bezier(0.25, 1, 0.50, 1)';
        revealObserver.observe(el);
    });

    console.log('Smokehut Premium Engine Operational 🍔🔥');
});
