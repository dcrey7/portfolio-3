let isEnglish = true;
let currentView = 'tile'; // 'tile' or 'content'
let currentSection = '';

// Simple tile configuration that matches HTML
const tileConfig = {
    overview: 'medium',     // 3×2 = 6 spaces
    experience: 'medium',   // 3×2 = 6 spaces
    skills: 'large',        // 2×2 = 4 spaces
    education: 'large',     // 2×2 = 4 spaces
    certification: 'small', // 2×2 = 4 spaces
    extras: 'small'         // 2×2 = 4 spaces
    // Total: 6+6+4+4+4+4 = 28 spaces (7×4 grid)
};

const translations = {
    name: {
        en: "Abhishek Thomas",
        fr: "Abhishek Thomas"
    },
    title: {
        en: "Data Scientist",
        fr: "Scientifique des Données"
    },
    tiles: {
        overview: {
            title: { en: "Overview", fr: "Aperçu" },
            subtitle: { en: "About Me", fr: "À Propos" }
        },
        experience: {
            title: { en: "Experience", fr: "Expérience" },
            subtitle: { en: "Professional Journey", fr: "Parcours Professionnel" }
        },
        skills: {
            title: { en: "Skills", fr: "Compétences" },
            subtitle: { en: "Technical Expertise", fr: "Expertise Technique" }
        },
        education: {
            title: { en: "Education", fr: "Éducation" },
            subtitle: { en: "Academic Background", fr: "Formation Académique" }
        },
        certification: {
            title: { en: "Certifications", fr: "Certifications" },
            subtitle: { en: "Professional Development", fr: "Développement Professionnel" }
        },
        extras: {
            title: { en: "Achievements", fr: "Réalisations" },
            subtitle: { en: "Key Projects & Awards", fr: "Projets Clés et Récompenses" }
        }
    },
    content: {
        overview: {
            title: { en: "Overview", fr: "Aperçu" },
            text: { 
                en: "I am a Data Scientist with an engineering degree from NIT Surat, India. Currently, I am pursuing an MSc in Data Science & Artificial Intelligence at emlyon business school, Paris to further upskill myself. My expertise spans model development, optimization, and statistical analysis, with hands-on experience in Python, SQL, and data visualization tools. I am passionate about making data-driven decisions, running experiments, and contributing to frontier AI research.",
                fr: "Je suis un Data Scientist avec un diplôme d'ingénieur de NIT Surat, en Inde. Actuellement, je poursuis un MSc en Science des Données et Intelligence Artificielle à emlyon business school, Paris pour améliorer davantage mes compétences. Mon expertise couvre le développement de modèles, l'optimisation et l'analyse statistique, avec une expérience pratique en Python, SQL et outils de visualisation de données. Je suis passionné par la prise de décisions basées sur les données, la conduite d'expérimentations et la contribution à la recherche de pointe en IA."
            }
        },
        experience: {
            title: { en: "Experience", fr: "Expérience" }
        },
        skills: {
            title: { en: "Skills", fr: "Compétences" }
        },
        education: {
            title: { en: "Education", fr: "Éducation" }
        },
        certification: {
            title: { en: "Certifications", fr: "Certifications" }
        },
        extras: {
            title: { en: "Achievements", fr: "Réalisations" }
        }
    },
    buttons: {
        back: { en: "Back", fr: "Retour" },
        lightMode: { en: "Light mode", fr: "Mode clair" },
        darkMode: { en: "Dark mode", fr: "Mode sombre" },
        translateToFrench: { en: "Translate to French", fr: "Traduire en anglais" }
    }
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portfolio...');
    
    // Initialize tiles
    initializeTiles();
    
    // Set up all event listeners
    setupEventListeners();
    
    // Update content initially
    updateAllContent();
    
    // Ensure we start in tile view
    ensureTileView();
    
    console.log('Portfolio initialized successfully');
});

function initializeTiles() {
    console.log('Initializing tiles...');
    const tiles = document.querySelectorAll('.tile');
    console.log(`Found ${tiles.length} tiles`);
    
    tiles.forEach((tile, index) => {
        const section = tile.getAttribute('data-section');
        console.log(`Initializing tile: ${section}`);
        
        // Set size from config
        const size = tileConfig[section] || 'small';
        tile.setAttribute('data-size', size);
        
        // Add click handler
        tile.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Tile clicked: ${section}`);
            handleTileClick(section);
        });
        
        // Entrance animation
        tile.style.opacity = '0';
        tile.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            tile.style.transition = 'var(--tile-transition)';
            tile.style.opacity = '1';
            tile.style.transform = 'scale(1)';
        }, index * 100 + 300);
    });
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Language toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Language toggle clicked');
            toggleLanguage();
        });
        console.log('Language toggle listener attached');
    } else {
        console.error('Language toggle not found!');
    }
    
    // Mode toggle with enhanced debugging
    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
        // Remove any existing listeners
        modeToggle.replaceWith(modeToggle.cloneNode(true));
        const newModeToggle = document.getElementById('mode-toggle');
        
        newModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mode toggle clicked - starting toggle process');
            toggleMode();
        });
        console.log('Mode toggle listener attached');
    } else {
        console.error('Mode toggle not found!');
    }
    
    // Back button
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Back button clicked');
            switchToTileView();
        });
        console.log('Back button listener attached');
    } else {
        console.error('Back button not found!');
    }
    
    // Email and phone copy
    const emailInfo = document.getElementById('email-info');
    const phoneInfo = document.getElementById('phone-info');
    
    if (emailInfo) {
        emailInfo.addEventListener('click', function() {
            copyToClipboard(this.textContent);
        });
    }
    
    if (phoneInfo) {
        phoneInfo.addEventListener('click', function() {
            copyToClipboard(this.textContent);
        });
    }
}

function handleTileClick(section) {
    console.log(`Handling tile click for: ${section}`);
    if (currentView === 'tile') {
        currentSection = section;
        switchToContentView(section);
    }
}

function switchToContentView(section) {
    console.log(`Switching to content view for: ${section}`);
    currentView = 'content';
    
    const tileView = document.getElementById('tile-view');
    const contentView = document.getElementById('content-view');
    
    if (tileView && contentView) {
        tileView.classList.remove('active');
        contentView.classList.add('active');
        
        // Show the specific section content
        showSectionContent(section);
        
        // Scroll to top
        contentView.scrollTop = 0;
        
        console.log(`Switched to content view for: ${section}`);
    } else {
        console.error('Could not find tile-view or content-view elements');
    }
}

function switchToTileView() {
    console.log('Switching to tile view');
    currentView = 'tile';
    
    const tileView = document.getElementById('tile-view');
    const contentView = document.getElementById('content-view');
    
    if (tileView && contentView) {
        contentView.classList.remove('active');
        tileView.classList.add('active');
        
        // Hide all content sections
        const sections = document.querySelectorAll('.section-content');
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        console.log('Switched to tile view');
    } else {
        console.error('Could not find view elements');
    }
}

function showSectionContent(sectionId) {
    console.log(`Showing content for: ${sectionId}`);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the target section
    const targetSection = document.getElementById(`${sectionId}-content`);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log(`Content shown for: ${sectionId}`);
    } else {
        console.error(`Could not find content section: ${sectionId}-content`);
    }
}

function ensureTileView() {
    const tileView = document.getElementById('tile-view');
    const contentView = document.getElementById('content-view');
    
    if (tileView) tileView.classList.add('active');
    if (contentView) contentView.classList.remove('active');
    
    currentView = 'tile';
}

function toggleLanguage() {
    console.log('Toggling language from', isEnglish ? 'English' : 'French');
    isEnglish = !isEnglish;
    updateAllContent();
    console.log('Language toggled to', isEnglish ? 'English' : 'French');
}

function toggleMode() {
    console.log('Toggling mode');
    const body = document.body;
    body.classList.toggle('light-mode');
    
    // Force update all content including button text
    updateAllContent();
    
    // Ensure text color is updated
    const isLightMode = body.classList.contains('light-mode');
    body.style.color = isLightMode ? 'var(--text-color-light)' : 'var(--text-color-dark)';
    
    // Update WebGL background
    if (typeof updateBackgroundMode === 'function') {
        updateBackgroundMode(isLightMode);
    }
    
    console.log('Mode toggled to:', isLightMode ? 'Light' : 'Dark');
}

function updateAllContent() {
    console.log('Updating all content...');
    updateTileContent();
    updateContentSections();
    updateButtons();
}

function updateTileContent() {
    const lang = isEnglish ? 'en' : 'fr';
    
    Object.keys(translations.tiles).forEach(section => {
        const tile = document.querySelector(`[data-section="${section}"]`);
        if (tile) {
            const titleElement = tile.querySelector('.tile-title');
            const subtitleElement = tile.querySelector('.tile-subtitle');
            
            if (titleElement && translations.tiles[section].title[lang]) {
                titleElement.textContent = translations.tiles[section].title[lang];
            }
            if (subtitleElement && translations.tiles[section].subtitle[lang]) {
                subtitleElement.textContent = translations.tiles[section].subtitle[lang];
            }
        }
    });
}

function updateContentSections() {
    const lang = isEnglish ? 'en' : 'fr';
    
    // Update profile name and title
    const nameElement = document.getElementById('name');
    const titleElement = document.getElementById('title');
    
    if (nameElement) nameElement.textContent = translations.name[lang];
    if (titleElement) titleElement.textContent = translations.title[lang];
    
    // Update content section titles
    Object.keys(translations.content).forEach(section => {
        const contentElement = document.getElementById(`${section}-content`);
        if (contentElement) {
            const h3Element = contentElement.querySelector('h3');
            if (h3Element && translations.content[section].title[lang]) {
                h3Element.textContent = translations.content[section].title[lang];
            }
            
            // Update overview text specifically
            if (section === 'overview' && translations.content[section].text) {
                const pElement = contentElement.querySelector('p');
                if (pElement && translations.content[section].text[lang]) {
                    pElement.textContent = translations.content[section].text[lang];
                }
            }
        }
    });
}

function updateButtons() {
    const lang = isEnglish ? 'en' : 'fr';
    
    // Update back button
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.innerHTML = `<span class="back-icon">←</span> ${translations.buttons.back[lang]}`;
    }
    
    // Update language toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.innerHTML = `<span class="button-icon">🌐</span> ${translations.buttons.translateToFrench[lang]}`;
    }
    
    // Update mode toggle with debugging
    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
        const body = document.body;
        const isLightMode = body.classList.contains('light-mode');
        
        console.log('Updating mode button - isLightMode:', isLightMode, 'lang:', lang);
        
        if (isLightMode) {
            const darkModeText = translations.buttons.darkMode[lang];
            modeToggle.innerHTML = `<span class="button-icon">🌑</span> ${darkModeText}`;
            console.log('Set to dark mode button:', darkModeText);
        } else {
            const lightModeText = translations.buttons.lightMode[lang];
            modeToggle.innerHTML = `<span class="button-icon">☀️</span> ${lightModeText}`;
            console.log('Set to light mode button:', lightModeText);
        }
    } else {
        console.error('Mode toggle button not found!');
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard: ' + text);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Utility functions for tile reconfiguration
function reconfigureTiles(newConfig) {
    Object.assign(tileConfig, newConfig);
    
    Object.keys(newConfig).forEach(section => {
        const tile = document.querySelector(`[data-section="${section}"]`);
        if (tile) {
            tile.setAttribute('data-size', newConfig[section]);
        }
    });
}

// Debug function
function debugPortfolio() {
    console.log('=== Portfolio Debug Info ===');
    console.log('Current view:', currentView);
    console.log('Current section:', currentSection);
    console.log('Language (isEnglish):', isEnglish);
    console.log('Body classes:', document.body.className);
    console.log('Tile config:', tileConfig);
    
    // Check elements
    const elements = {
        'tile-view': document.getElementById('tile-view'),
        'content-view': document.getElementById('content-view'),
        'back-button': document.getElementById('back-button'),
        'lang-toggle': document.getElementById('lang-toggle'),
        'mode-toggle': document.getElementById('mode-toggle')
    };
    
    Object.keys(elements).forEach(id => {
        console.log(`${id}:`, elements[id] ? 'Found' : 'Missing');
        if (elements[id] && id === 'mode-toggle') {
            console.log('Mode toggle innerHTML:', elements[id].innerHTML);
        }
    });
    
    const tiles = document.querySelectorAll('.tile');
    const sections = document.querySelectorAll('.section-content');
    console.log(`Tiles found: ${tiles.length}`);
    console.log(`Content sections found: ${sections.length}`);
    
    console.log('=== End Debug Info ===');
}

// Simple test function for mode toggle
function testModeToggle() {
    console.log('Testing mode toggle manually...');
    const body = document.body;
    const wasLight = body.classList.contains('light-mode');
    console.log('Was light mode:', wasLight);
    
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    console.log('Is now light mode:', isLight);
    
    updateButtons();
    console.log('Mode toggle test complete');
}

// Public API
window.portfolioAPI = {
    switchToTile: switchToTileView,
    switchToContent: switchToContentView,
    reconfigure: reconfigureTiles,
    getCurrentView: () => currentView,
    getCurrentSection: () => currentSection,
    debug: debugPortfolio,
    toggleLang: toggleLanguage,
    toggleMode: toggleMode,
    testMode: testModeToggle
};