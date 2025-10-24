# Aperçu

Bienvenue sur mon portfolio ! https://hajar-bh.github.io/Portfolio/

Il s’agit d’un site moderne et interactif que j’ai conçu pour présenter mon parcours, mes compétences et mes projets. Développé comme une application monopage (SPA), il intègre des animations fluides, un design responsive et des fonctionnalités d’accessibilité.

Mon objectif est de partager mon travail à travers une interface professionnelle et épurée, avec des dégradés de couleurs, une typographie moderne et une expérience utilisateur agréable. Ce portfolio est aussi une façon pour moi de me préparer au monde professionnel et de saisir de nouvelles opportunités.

# Préférences Utilisateur
Style de communication préféré : Langage simple et courant.

# Architecture du Système

## Architecture Frontend
- **Application Monopage (SPA)** : Construite avec HTML, CSS et JavaScript vanille, sans frameworks
- **Structure CSS Modulaire** : Séparée en `main.css` pour les styles principaux et `animations.css` pour les effets interactifs
- **Design basé sur les composants** : Sections incluant la navigation, le héros, à propos, projets, compétences et contact
- **Variables CSS personnalisées** : Utilisation étendue de variables CSS pour une thématisation cohérente et une maintenance facilitée
- **Design Responsive** : Approche mobile-first avec navigation hamburger pour les petits écrans

## Architecture du Style
- **Système de Design** : Palette de couleurs complète avec dégradés principaux (#667eea à #764ba2) et couleurs secondaires
- **Échelle Typographique** : Utilisation de la police Poppins avec des variables de taille et de poids prédéfinies
- **Système d'Animation** : Animations déclenchées au scroll avec effets d'opacité et de transformation pour une meilleure expérience utilisateur
- **CSS Grid/Flexbox** : Techniques de mise en page modernes pour des designs responsives

## Architecture JavaScript
- **Patron IIFE** : Fonction auto-exécutée pour éviter la pollution de l'espace global
- **Objet de Configuration** : Paramètres centralisés pour les offsets de scroll, timings d'animation et données des projets
- **Événementiel** : Utilisation de listeners de scroll et d'observateurs d'intersection pour déclencher les animations
- **Fonctions Modulaires** : Séparation des responsabilités pour la navigation, les animations et les éléments interactifs

## Fonctionnalités d'Accessibilité
- **Labels ARIA** : Attributs de rôle et sémantique de navigation appropriés
- **Navigation au Clavier** : Prise en charge de la navigation par tabulation
- **Support Lecteur d'Écran** : Structure HTML sémantique avec titres et repères adaptés
- **Gestion du Focus** : Indicateurs visuels de focus pour les éléments interactifs

## Optimisations de Performance
- **Événements de Scroll Débouncés** : Listeners de scroll optimisés avec un délai de 16ms
- **Animations CSS** : Transforms accélérés matériellement pour des performances fluides
- **Chargement Paresseux** : API Intersection Observer pour déclencher les animations uniquement lorsque les éléments sont visibles

# Dépendances Externes

## Ressources CDN
- **Font Awesome 6.4.0** : Bibliothèque d'icônes pour les éléments UI et la représentation des projets
- **Google Fonts (Poppins)** : Typographie principale avec plusieurs graisses (300-700)
- **Préconnexion des Polices** : Préchargement DNS pour améliorer la performance de chargement des polices

## APIs Navigateur
- **Intersection Observer** : Pour les animations déclenchées au scroll et la détection de visibilité des éléments
- **Variables CSS personnalisées** : Support moderne des navigateurs pour la thématisation dynamique
- **Fonctionnalités ES6+** : Syntaxe JavaScript moderne incluant les fonctions fléchées et les littéraux de gabarit

## Outils de Développement
- **Variables CSS** : Pour une gestion cohérente des tokens de design
- **CSS Grid & Flexbox** : Systèmes de mise en page modernes pour le responsive
- **Animations CSS** : Capacités natives du navigateur pour des interactions fluides
