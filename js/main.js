// JavaScript principal du portfolio - version optimisée
(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        scrollOffset: 0,
        animationDuration: 300,
        debounceDelay: 16,
        projects: [
            {
                id: 1,
                title: "Application web pédagogique – Interfaces Homme-Machine",
                description: "Conception d'une interface interactive et responsive pour l'initiation aux IHM, avec tests utilisateurs.",
                category: "frontend",
                technologies: ["JavaScript", "HTML", "CSS", "UX/UI"],
                image: "fas fa-graduation-cap",
                links: {
                    demo: "https://hajar-bh.github.io/site-IHM-educatif/",
                    github: "https://github.com/Hajar-BH/site-IHM-educatif"
                },
                hasDemo: true
            },
            {
                id: 2,
                title: "Site web interactif pour robot éducatif QT",
                description: "Développement d'une interface narrative avec synthèse vocale et expressions pour enfants de 3 à 5 ans.",
                category: "frontend",
                technologies: ["JavaScript", "UX/UI", "Synthèse vocale"],
                image: "fas fa-robot",
                links: {
                    demo: "https://qty.onrender.com/",
                    github: "https://github.com/Hajar-BH/QTrobot"
                },
                hasDemo: true
            },
            {
                id: 3,
                title: "Chasse aux triangles",
                description: "Création d'un outil d'analyse lexicale via l'API JeuxDeMots : détection de triangles dans des graphes, export CSV et sauvegarde SQLite.",
                category: "ml",
                technologies: ["Python", "API", "CSV", "SQLite"],
                image: "fas fa-search",
                links: {
                    demo: "#",
                    github: "https://github.com/Hajar-BH/chasse-triangles-JDM-TER"
                },
                hasDemo: false
            },
            {
                id: 4,
                title: "Application web d'activités journalières",
                description: "Mise en place d'une plateforme de recherche et proposition d'activités avec base de données.",
                category: "frontend",
                technologies: ["PHP", "SQL", "HTML", "CSS"],
                image: "fas fa-calendar-day",
                links: {
                    demo: "https://gestion-activites.onrender.com",
                    github: "https://github.com/Hajar-BH/gestion-activites"
                },
                hasDemo: true
            },
            {
                id: 5,
                title: "Classification de tweets – Machine Learning",
                description: "Construction et évaluation d'un modèle de classification (SVM, Random Forest).",
                category: "ml",
                technologies: ["Python", "NLP", "Machine Learning", "SVM", "Random Forest"],
                image: "fas fa-brain",
                links: {
                    demo: "#",
                    github: "https://github.com/Hajar-BH/Machine-learning"
                },
                hasDemo: false
            },
            {
                id: 6,
                title: "Recolleur de fichiers CSV",
                description: "Réalisation d'un script automatisé de fusion de fichiers CSV selon des critères prédéfinis.",
                category: "distributed",
                technologies: ["Python", "Bash", "CSV", "Automatisation"],
                image: "fas fa-file-csv",
                links: {
                    demo: "#",
                    github: "https://github.com/Hajar-BH/recolleur-csv"
                },
                hasDemo: false
            },
            {
                id: 7,
                title: "Application de réservation d'hôtels – Architecture distribuée",
                description: "Implémentation d'un système distribué sous trois architectures différentes.",
                category: "distributed",
                technologies: ["Java", "RMI", "SOAP", "REST", "Architecture distribuée"],
                image: "fas fa-hotel",
                links: {
                    demo: "#",
                    github: "https://github.com/Hajar-BH/Architectures-Logicielles-Distribuees"
                },
                hasDemo: false
            },
            {
                id: 8,
                title: "Portfolio interactif responsive",
                description: "Création d'un site portfolio moderne avec animations CSS et JavaScript, design mobile-first.",
                category: "frontend",
                technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
                image: "fas fa-palette",
                links: {
                    demo: "#",
                    github: "#"
                },
                hasDemo: false
            }
        ]
    };

    // Fonctions utilitaires
    const utils = {
        // Fonction de temporisation (debounce) pour optimiser les performances
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Fonction de limitation (throttle) des événements de défilement
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Vérifie si l'élément est visible dans la fenêtre
        isInViewport: function(element, offset = 0) {
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= -offset &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Défilement fluide vers l'élément
        scrollToElement: function(target, offset = CONFIG.scrollOffset) {
            const element = document.querySelector(target);
            if (element) {
                let customOffset = offset;
                
                // Ajuster l'offset pour la section contact
                if (target === '#contact') {
                    customOffset = 80; // Offset plus petit pour la section contact
                }
                
                const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - customOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        },

        // Récupère la section courante visible
        getCurrentSection: function() {
            const sections = document.querySelectorAll('section[id]');
            let currentSection = 'accueil';
            
            for (const section of sections) {
                if (this.isInViewport(section, 200)) {
                    currentSection = section.id;
                    break;
                }
            }
            
            return currentSection;
        },

        // Valide l'adresse email
        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        // Afficher une notification
        showNotification: function(message, type = 'success', duration = 5000) {
            // Supprimer les notifications existantes
            const existing = document.querySelectorAll('.notification');
            existing.forEach(notif => notif.remove());

            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}" aria-hidden="true"></i>
                    <span>${message}</span>
                    <button class="notification-close" aria-label="Fermer la notification">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            `;

            // Ajouter les styles s'ils ne sont pas déjà présents
            if (!document.querySelector('#notification-styles')) {
                const style = document.createElement('style');
                style.id = 'notification-styles';
                style.textContent = `
                    .notification {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 10000;
                        max-width: 400px;
                        padding: 16px;
                        border-radius: 8px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                        transform: translateX(100%);
                        transition: transform 0.3s ease;
                    }
                    .notification-success {
                        background: #10b981;
                        color: white;
                    }
                    .notification-error {
                        background: #ef4444;
                        color: white;
                    }
                    .notification-content {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    .notification-close {
                        background: none;
                        border: none;
                        color: inherit;
                        cursor: pointer;
                        margin-left: auto;
                        padding: 4px;
                    }
                    .notification.show {
                        transform: translateX(0);
                    }
                `;
                document.head.appendChild(style);
            }

            document.body.appendChild(notification);

            // Afficher la notification
            setTimeout(() => notification.classList.add('show'), 100);

            // Masquage automatique
            const autoHide = setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, duration);

            // Fermeture manuelle
            notification.querySelector('.notification-close').addEventListener('click', () => {
                clearTimeout(autoHide);
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            });
        },

        // Nettoyer la saisie
        sanitizeInput: function(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }
    };

    // Effet de particules
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = window.innerWidth > 768 ? 50 : 25;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                animation: float ${3 + Math.random() * 4}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 3}s;
            `;
            particlesContainer.appendChild(particle);
        }

        // Ajouter le CSS de l'animation flottante
        if (!document.getElementById('particles-style')) {
            const style = document.createElement('style');
            style.id = 'particles-style';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
                    25% { transform: translateY(-20px) rotate(90deg); opacity: 1; }
                    50% { transform: translateY(0px) rotate(180deg); opacity: 0.5; }
                    75% { transform: translateY(-10px) rotate(270deg); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Gestionnaire de navigation
    const navigationManager = {
        init: function() {
            this.setupNavigation();
            this.setupMobileMenu();
            this.setupScrollSpy();
            this.setupSmoothScroll();
        },

        setupNavigation: function() {
            const navbar = document.getElementById('navbar');
            if (!navbar) return;
            
            // Ajouter un effet au défilement pour la barre de navigation
            const handleScroll = utils.throttle(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }, CONFIG.debounceDelay);

            window.addEventListener('scroll', handleScroll);
        },

        setupMobileMenu: function() {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (!hamburger || !navMenu) return;

            const toggleMenu = () => {
                const isOpen = navMenu.classList.contains('active');
                
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                hamburger.setAttribute('aria-expanded', !isOpen);
                
                // Empêcher le défilement du corps lorsque le menu est ouvert
                document.body.style.overflow = isOpen ? '' : 'hidden';
            };

            hamburger.addEventListener('click', toggleMenu);

            // Fermer le menu lors d'un clic sur un lien
            navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });

            // Fermer le menu lors d'un clic à l'extérieur
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });

            // Fermer le menu avec la touche Échap
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        },

        setupScrollSpy: function() {
            const navLinks = document.querySelectorAll('.nav-link');
            
            const updateActiveNav = utils.throttle(() => {
                const currentSection = utils.getCurrentSection();
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === currentSection) {
                        link.classList.add('active');
                    }
                });
            }, 100);

            window.addEventListener('scroll', updateActiveNav);
        },

        setupSmoothScroll: function() {
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[href^="#"]');
                if (!link) return;

                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;

                utils.scrollToElement(targetId);
            });
        }
    };

    // Gestionnaire des animations au défilement
    const scrollAnimationsManager = {
        init: function() {
            this.setupObserver();
            this.setupSkillBars();
        },

        setupObserver: function() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        
                        // Gérer les animations en décalage (stagger)
                        if (entry.target.classList.contains('stagger-item')) {
                            this.handleStaggeredAnimation(entry.target);
                        }
                    }
                });
            }, observerOptions);

            // Observer tous les éléments à animer au défilement
            document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach(el => {
                observer.observe(el);
            });
        },

        handleStaggeredAnimation: function(container) {
            const items = container.closest('.skills-container')?.querySelectorAll('.stagger-item') || [container];
            
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('stagger-animation');
                }, index * 100);
            });
        },

        setupSkillBars: function() {
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBar = entry.target.querySelector('.skill-progress');
                        const targetWidth = progressBar.getAttribute('data-width');
                        
                        setTimeout(() => {
                            progressBar.style.width = targetWidth + '%';
                            progressBar.classList.add('animate');
                        }, 300);
                        
                        skillObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            document.querySelectorAll('.skill-card').forEach(card => {
                skillObserver.observe(card);
            });
        }
    };

    // Gestionnaire du téléchargement du CV
    const cvDownloadManager = {
        init: function() {
            this.setupCVDownload();
        },

        setupCVDownload: function() {
            const cvDownloadBtn = document.getElementById('cv-download-btn');
            if (!cvDownloadBtn) return;

            cvDownloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadCV();
            });
        },

        downloadCV: function() {
            try {
                // Créer un lien temporaire pour le téléchargement
                const link = document.createElement('a');
                link.href = 'CV_Hajar_Boumezgane.pdf';
                link.download = 'CV_Hajar_Boumezgane.pdf';
                link.style.display = 'none';
                
                // Ajouter le lien au DOM
                document.body.appendChild(link);
                
                // Déclencher le téléchargement
                link.click();
                
                // Nettoyer le DOM
                document.body.removeChild(link);
                
                // Afficher une notification de succès
                utils.showNotification('CV téléchargé avec succès !', 'success');
                
            } catch (error) {
                console.error('Erreur lors du téléchargement du CV:', error);
                utils.showNotification('Erreur lors du téléchargement du CV', 'error');
            }
        }
    };

    // Gestionnaire des projets
    const projectsManager = {
        currentFilter: 'all',
        
        init: function() {
            this.renderProjects();
            this.setupFilters();
        },

        renderProjects: function() {
            const grid = document.getElementById('projects-grid');
            if (!grid) return;

            grid.innerHTML = '';

            const filteredProjects = this.currentFilter === 'all' 
                ? CONFIG.projects 
                : CONFIG.projects.filter(project => project.category === this.currentFilter);

            filteredProjects.forEach((project, index) => {
                const projectCard = this.createProjectCard(project, index);
                grid.appendChild(projectCard);
            });

            // Déclencher les animations
            setTimeout(() => {
                grid.querySelectorAll('.project-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 100);
        },

        createProjectCard: function(project, index) {
            const card = document.createElement('div');
            card.className = `project-card project-${project.category}`;
            card.style.setProperty('--project-index', index);
            
            // Ajouter un indicateur visuel pour les projets avec démo
            const demoBadge = project.hasDemo ? '<div class="demo-badge">Démo Live</div>' : '';
            
            card.innerHTML = `
                <div class="project-header">
                    <div class="project-icon">
                        <i class="${project.image}" aria-hidden="true"></i>
                    </div>
                    ${demoBadge}
                </div>
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.hasDemo ? `
                        <a href="${project.links.demo}" class="project-link demo-link" target="_blank" rel="noopener" aria-label="Voir la démo de ${project.title}">
                            <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                            Voir la Démo
                        </a>
                    ` : ''}
                    <a href="${project.links.github}" class="project-link github-link" target="_blank" rel="noopener" aria-label="Voir le code source de ${project.title}">
                        <i class="fab fa-github" aria-hidden="true"></i>
                        Code Source
                    </a>
                </div>
            `;
            return card;
        },

        setupFilters: function() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Mettre à jour le bouton actif
                    filterButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-pressed', 'false');
                    });
                    button.classList.add('active');
                    button.setAttribute('aria-pressed', 'true');

                    // Mettre à jour le filtre et réafficher
                    this.currentFilter = button.getAttribute('data-filter');
                    this.renderProjects();
                });
            });
        }
    };

    // Gestionnaire du formulaire de contact
    const contactFormManager = {
        init: function() {
            this.setupForm();
            this.setupValidation();
        },

        setupForm: function() {
            const form = document.getElementById('contact-form');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(form);
            });

            // Validation en temps réel
            const inputs = form.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        },

        setupValidation: function() {
            const form = document.getElementById('contact-form');
            if (!form) return;

            // Messages de validation personnalisés
            this.validationRules = {
                name: {
                    required: true,
                    minLength: 2,
                    pattern: /^[a-zA-ZÀ-ÿ\s-']+$/,
                    message: 'Veuillez entrer un nom valide (au moins 2 caractères, lettres uniquement)'
                },
                email: {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Veuillez entrer une adresse email valide'
                },
                subject: {
                    required: true,
                    message: 'Veuillez sélectionner un sujet'
                },
                message: {
                    required: true,
                    minLength: 10,
                    message: 'Votre message doit contenir au moins 10 caractères'
                },
                privacy: {
                    required: true,
                    message: 'Vous devez accepter la politique de confidentialité'
                }
            };
        },

        validateField: function(field) {
            const fieldName = field.name;
            const rules = this.validationRules[fieldName];
            const value = field.value.trim();
            const errorElement = document.getElementById(`${fieldName}-error`);

            if (!rules || !errorElement) return true;

            let isValid = true;
            let errorMessage = '';

            // Vérifier le caractère obligatoire
            if (rules.required && !value) {
                isValid = false;
                errorMessage = field.type === 'checkbox' ? rules.message : `Le champ "${field.previousElementSibling.textContent.replace(' *', '')}" est requis`;
            }

            // Vérifier la longueur minimale
            if (isValid && rules.minLength && value.length < rules.minLength) {
                isValid = false;
                errorMessage = `Ce champ doit contenir au moins ${rules.minLength} caractères`;
            }

            // Vérifier le motif
            if (isValid && rules.pattern && !rules.pattern.test(value)) {
                isValid = false;
                errorMessage = rules.message;
            }

            // Vérifier la case à cocher
            if (field.type === 'checkbox' && rules.required && !field.checked) {
                isValid = false;
                errorMessage = rules.message;
            }

            this.showFieldError(field, errorElement, isValid ? '' : errorMessage);
            return isValid;
        },

        showFieldError: function(field, errorElement, message) {
            if (message) {
                field.classList.add('error');
                errorElement.textContent = message;
                errorElement.classList.add('show');
                field.setAttribute('aria-invalid', 'true');
                field.setAttribute('aria-describedby', errorElement.id);
            } else {
                field.classList.remove('error');
                errorElement.textContent = '';
                errorElement.classList.remove('show');
                field.setAttribute('aria-invalid', 'false');
                field.removeAttribute('aria-describedby');
            }
        },

        clearError: function(field) {
            const errorElement = document.getElementById(`${field.name}-error`);
            if (errorElement && field.classList.contains('error')) {
                field.classList.remove('error');
                errorElement.classList.remove('show');
                field.setAttribute('aria-invalid', 'false');
            }
        },

        validateForm: function(form) {
            const inputs = form.querySelectorAll('.form-input');
            let isValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            return isValid;
        },

        handleSubmit: function(form) {
            if (!this.validateForm(form)) {
                utils.showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
                // Placer le focus sur la première erreur
                const firstError = form.querySelector('.form-input.error');
                if (firstError) {
                    firstError.focus();
                }
                return;
            }

            const submitBtn = document.getElementById('submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');

            // Afficher l'état de chargement
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';

            // Récupérer les données du formulaire
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Nettoyer les données
            Object.keys(data).forEach(key => {
                if (typeof data[key] === 'string') {
                    data[key] = utils.sanitizeInput(data[key]);
                }
            });

            // Simuler l'envoi du formulaire (à remplacer par une implémentation réelle)
            setTimeout(() => {
                // Réinitialiser l'état de chargement
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';

                // Afficher un message de succès
                utils.showNotification('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success', 8000);

                // Réinitialiser le formulaire
                form.reset();
                
                // Effacer les erreurs restantes
                form.querySelectorAll('.form-input').forEach(input => {
                    this.clearError(input);
                });

                // Journaliser les données pour la démonstration (à supprimer en production)
                console.log('Form data:', data);

            }, 2000);
        }
    };

    // Gestionnaire des performances
    const performanceManager = {
        init: function() {
            this.setupLazyLoading();
            this.setupPerformanceOptimizations();
        },

        setupLazyLoading: function() {
            // Intersection Observer pour le chargement différé
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            // Observer toutes les images avec data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        },

        setupPerformanceOptimizations: function() {
            // Désactiver les animations sur les appareils peu puissants
            if (navigator.deviceMemory && navigator.deviceMemory < 4) {
                document.documentElement.style.setProperty('--transition-base', '0s');
                document.documentElement.style.setProperty('--transition-fast', '0s');
                document.documentElement.style.setProperty('--transition-slow', '0s');
            }

            // Réduire le nombre de particules sur mobile
            if (window.innerWidth < 768) {
                const particles = document.getElementById('particles');
                if (particles) {
                    particles.style.display = 'none';
                }
            }
        }
    };

    // Gestionnaire d'accessibilité
    const accessibilityManager = {
        init: function() {
            this.setupKeyboardNavigation();
            this.setupFocusManagement();
            this.setupARIA();
        },

        setupKeyboardNavigation: function() {
            // Lien d'accès rapide au contenu principal
            this.createSkipLink();

            // Navigation au clavier pour les éléments personnalisés
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('using-keyboard');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('using-keyboard');
            });
        },

        createSkipLink: function() {
            const skipLink = document.createElement('a');
            skipLink.href = '#accueil';
            skipLink.textContent = 'Aller au contenu principal';
            skipLink.className = 'skip-link';
            
            const skipLinkStyle = document.createElement('style');
            skipLinkStyle.textContent = `
                .skip-link {
                    position: absolute;
                    top: -40px;
                    left: 6px;
                    background: var(--primary-color);
                    color: white;
                    padding: 8px;
                    text-decoration: none;
                    z-index: 10000;
                    border-radius: 4px;
                    transition: top 0.2s;
                }
                .skip-link:focus {
                    top: 6px;
                }
            `;
            
            document.head.appendChild(skipLinkStyle);
            document.body.insertBefore(skipLink, document.body.firstChild);
        },

        setupFocusManagement: function() {
            // Gérer le focus pour le menu mobile
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');

            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    if (navMenu.classList.contains('active')) {
                        const firstLink = navMenu.querySelector('.nav-link');
                        if (firstLink) {
                            setTimeout(() => firstLink.focus(), 100);
                        }
                    }
                });
            }
        },

        setupARIA: function() {
            // Ajouter des libellés ARIA aux éléments interactifs
            document.querySelectorAll('button:not([aria-label])').forEach(button => {
                if (!button.textContent.trim()) {
                    button.setAttribute('aria-label', 'Bouton');
                }
            });

            // Ajouter des libellés ARIA aux champs du formulaire
            document.querySelectorAll('input, select, textarea').forEach(input => {
                const label = document.querySelector(`label[for="${input.id}"]`);
                if (!label && !input.getAttribute('aria-label')) {
                    const placeholder = input.getAttribute('placeholder');
                    if (placeholder) {
                        input.setAttribute('aria-label', placeholder);
                    }
                }
            });
        }
    };

    // Initialiser tous les modules
    function init() {
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        try {
            // Initialiser les particules
            createParticles();

            // Initialiser les gestionnaires
            navigationManager.init();
            scrollAnimationsManager.init();
            projectsManager.init();
            cvDownloadManager.init();
            contactFormManager.init();
            performanceManager.init();
            accessibilityManager.init();

            // Ajouter la classe 'loaded' au body
            document.body.classList.add('loaded');

            console.log('Portfolio initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }

    // Gérer les changements de visibilité de la page
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Mettre en pause les animations lorsque la page est masquée
            document.body.classList.add('paused');
        } else {
            // Reprendre les animations lorsque la page est visible
            document.body.classList.remove('paused');
        }
    });

    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', utils.debounce(() => {
        // Recréer les particules au redimensionnement
        const particles = document.getElementById('particles');
        if (particles) {
            particles.innerHTML = '';
            createParticles();
        }
    }, 300));

    // Démarrer l'initialisation
    init();

})();
