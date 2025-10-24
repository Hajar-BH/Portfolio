// JavaScript pour la page d'entrée créative
(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        typingSpeed: 100,
        typingDelay: 1000,
        particleCount: window.innerWidth > 768 ? 80 : 40,
        transitionDuration: 2000
    };

    // Messages à taper
    const messages = [
        "Bienvenue dans mon univers",
        "Portfolio Hajar Boumezgane",
        "Développeuse passionnée"
    ];
    let currentMessageIndex = 0;
    let isTyping = false;

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        createParticleField();
        startTypingAnimation();
        setupEntranceButton();
        createFloatingElements();
        addInteractiveEffects();
    });

    // Créer le champ de particules dynamique
    function createParticleField() {
        const container = document.getElementById('particles-container');
        if (!container) return;

        // Créer les particules flottantes
        for (let i = 0; i < CONFIG.particleCount; i++) {
            createParticle(container);
        }

        // Ajouter les particules qui bougent avec la souris
        document.addEventListener('mousemove', handleMouseMove);
        
        // Ajouter l'effet de parallaxe
        window.addEventListener('scroll', handleParallax);
    }

    // Créer une particule individuelle
    function createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.8 + 0.2;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            z-index: 1;
        `;
        
        container.appendChild(particle);

        // Ajouter l'animation CSS si elle n'existe pas déjà
        addParticleAnimation();
    }

    // Ajouter l'animation CSS pour les particules
    function addParticleAnimation() {
        if (document.getElementById('particle-animation-style')) return;
        
        const style = document.createElement('style');
        style.id = 'particle-animation-style';
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Gérer le mouvement de la souris pour les effets interactifs
    function handleMouseMove(e) {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) * 0.01;
        const moveY = (clientY - centerY) * 0.01;

        // Déplacer l'effet de lumière
        const lightEffect = document.querySelector('.light-effect');
        if (lightEffect) {
            lightEffect.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${Date.now() * 0.001}deg)`;
        }

        // Créer des particules interactives au survol
        createInteractiveParticle(clientX, clientY);
    }

    // Créer une particule interactive au clic/survol
    function createInteractiveParticle(x, y) {
        if (Math.random() > 0.98) { // Limiter la fréquence
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #00d4ff, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                animation: particleExpand 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Gérer l'effet de parallaxe
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const container = document.querySelector('.entrance-container');
        if (container) {
            container.style.transform = `translateY(${rate}px)`;
        }
    }

    // Animation de frappe
    function startTypingAnimation() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;

        setTimeout(() => {
            typeMessage(typingElement, messages[currentMessageIndex]);
        }, CONFIG.typingDelay);
    }

    // Taper un message
    function typeMessage(element, message) {
        if (isTyping) return;
        
        isTyping = true;
        element.innerHTML = '<span class="cursor">|</span>';
        
        let i = 0;
        const cursor = element.querySelector('.cursor');
        
        const typing = setInterval(() => {
            if (i < message.length) {
                const textBefore = message.substring(0, i);
                const textAfter = message.substring(i + 1);
                element.innerHTML = textBefore + message[i] + '<span class="cursor">|</span>';
                i++;
            } else {
                clearInterval(typing);
                
                // Attendre un peu puis passer au message suivant ou redémarrer
                setTimeout(() => {
                    eraseMessage(element, message);
                }, 3000);
            }
        }, CONFIG.typingSpeed);
    }

    // Effacer un message
    function eraseMessage(element, message) {
        let i = message.length;
        
        const erasing = setInterval(() => {
            if (i > 0) {
                const text = message.substring(0, i - 1);
                element.innerHTML = text + '<span class="cursor">|</span>';
                i--;
            } else {
                clearInterval(erasing);
                currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                
                setTimeout(() => {
                    isTyping = false;
                    typeMessage(element, messages[currentMessageIndex]);
                }, 500);
            }
        }, CONFIG.typingSpeed / 2);
    }

    // Configurer le bouton d'entrée
    function setupEntranceButton() {
        const btn = document.getElementById('entrance-btn');
        if (!btn) return;

        btn.addEventListener('click', function() {
            // Effet sonore visuel
            createRippleEffect(this);
            
            // Transition vers le portfolio
            setTimeout(() => {
                transitionToPortfolio();
            }, 300);
        });

        // Effet au survol
        btn.addEventListener('mouseenter', function() {
            createButtonParticles(this);
        });
    }

    // Créer l'effet de ripple sur le bouton
    function createRippleEffect(button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.6), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: rippleExpand 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // Créer des particules autour du bouton
    function createButtonParticles(button) {
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50;
            const x = rect.left + rect.width / 2 + Math.cos(angle) * distance;
            const y = rect.top + rect.height / 2 + Math.sin(angle) * distance;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 3px;
                height: 3px;
                background: #00d4ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                animation: buttonParticle 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Transition vers le portfolio
    function transitionToPortfolio() {
        const overlay = document.getElementById('transition-overlay');
        if (!overlay) return;
        
        overlay.classList.add('active');
        
        // Simuler le chargement puis rediriger
        setTimeout(() => {
            window.location.href = 'portfolio.html';
        }, CONFIG.transitionDuration);
    }

    // Créer des éléments flottants décoratifs
    function createFloatingElements() {
        const container = document.body;
        
        // Créer des formes géométriques flottantes
        for (let i = 0; i < 5; i++) {
            createFloatingShape(container, i);
        }
    }

    // Créer une forme flottante
    function createFloatingShape(container, index) {
        const shape = document.createElement('div');
        const shapes = ['circle', 'triangle', 'square'];
        const shapeType = shapes[index % shapes.length];
        const size = Math.random() * 30 + 20;
        const duration = Math.random() * 20 + 10;
        const delay = index * 2;
        
        let shapeStyles = '';
        switch(shapeType) {
            case 'circle':
                shapeStyles = `border-radius: 50%;`;
                break;
            case 'triangle':
                shapeStyles = `
                    width: 0;
                    height: 0;
                    border-left: ${size/2}px solid transparent;
                    border-right: ${size/2}px solid transparent;
                    border-bottom: ${size}px solid rgba(0, 212, 255, 0.3);
                    background: transparent;
                `;
                break;
            case 'square':
                shapeStyles = `border-radius: 10%;`;
                break;
        }
        
        shape.style.cssText = `
            position: fixed;
            width: ${shapeType === 'triangle' ? 'auto' : size + 'px'};
            height: ${shapeType === 'triangle' ? 'auto' : size + 'px'};
            background: ${shapeType !== 'triangle' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
            ${shapeStyles}
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: floatUp ${duration}s linear infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
            z-index: 2;
        `;
        
        container.appendChild(shape);
    }

    // Ajouter les effets interactifs
    function addInteractiveEffects() {
        // Ajouter les styles d'animation manquants
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleExpand {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(20);
                    opacity: 0;
                }
            }
            
            @keyframes rippleExpand {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(2);
                    opacity: 0;
                }
            }
            
            @keyframes buttonParticle {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0) translateY(-30px);
                    opacity: 0;
                }
            }
            
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Gestion de la performance et du responsive
    window.addEventListener('resize', debounce(function() {
        // Recalculer les particules pour la nouvelle taille d'écran
        const container = document.getElementById('particles-container');
        if (container) {
            container.innerHTML = '';
            CONFIG.particleCount = window.innerWidth > 768 ? 80 : 40;
            createParticleField();
        }
    }, 250));

    // Fonction de debounce pour optimiser les performances
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
})();