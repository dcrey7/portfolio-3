let isEnglish = true;
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
            subtitle: { en: "About me", fr: "À propos de moi" }
        },
        experience: { 
            title: { en: "Experience", fr: "Expérience" },
            subtitle: { en: "Professional journey", fr: "Parcours professionnel" }
        },
        education: { 
            title: { en: "Education", fr: "Éducation" },
            subtitle: { en: "Academic background", fr: "Formation académique" }
        },
        skills: { 
            title: { en: "Skills", fr: "Compétences" },
            subtitle: { en: "", fr: "" }
        },
        certification: { 
            title: { en: "Certificates", fr: "Certificats" },
            subtitle: { en: "", fr: "" }
        },
        extras: { 
            title: { en: "Projects", fr: "Projets" },
            subtitle: { en: "Hackathons & achievements", fr: "Hackathons et réalisations" }
        }
    },
    leftTiles: {
        resume: { en: "See resume", fr: "Voir CV" },
        lightMode: { en: "Light mode", fr: "Mode clair" },
        darkMode: { en: "Dark mode", fr: "Mode sombre" },
        translateFr: { en: "Translate to french", fr: "Traduire en anglais" }
    },
    backButton: {
        en: "Back",
        fr: "Retour"
    },
    sections: {
        overview: {
            title: { en: "Overview", fr: "Aperçu" },
            content: { 
                en: "I am a Data Scientist with an engineering degree from NIT Surat, India. Currently, I am pursuing an MSc in Data Science & Artificial Intelligence at emlyon business school, Paris to further upskill myself. My expertise spans model development, optimization, and statistical analysis, with hands-on experience in Python, SQL, and data visualization tools. I am passionate about making data-driven decisions, running experiments, and contributing to frontier AI research.",
                fr: "Je suis un Data Scientist avec un diplôme d'ingénieur de NIT Surat, en Inde. Actuellement, je poursuis un MSc en Science des Données et Intelligence Artificielle à emlyon business school, Paris pour améliorer davantage mes compétences. Mon expertise couvre le développement de modèles, l'optimisation et l'analyse statistique, avec une expérience pratique en Python, SQL et outils de visualisation de données. Je suis passionné par la prise de décisions basées sur les données, la conduite d'expérimentations et la contribution à la recherche de pointe en IA."
            }
        },
        skills: {
            title: { en: "Skills", fr: "Compétences" },
            content: { 
                en: [
                    "ML/AI: Regression & Classification (XGBoost, LightGBM, Catboost), Bayesian Optimization, Neural Networks, A/B Testing, Forecasting",
                    "Deep Learning: Transformers, Computer Vision (YOLOv4, Detectron), NLP, LLMs, Transformers(CNNs, RNNs, LSTMs, GANs)",
                    "MLOps & Data Engineering: AWS (SageMaker, S3), Triggers and procedures in TSQL, SQL/NoSQL (MongoDB), Git",
                    "Programming: Python, R, PySpark, Scikit-Learn, Pandas, NumPy, PyTorch, Tensorflow",
                    "Visualization & Analysis: Tableau (advanced), SHAP, LIME, Power BI, Seaborn, Plotly, NLTK, spaCy, scikit-learn",
                    "Additional Skills: JavaScript, Flask, FastAPI, Deeplabsv3+, Streamlit, Langchain, GIS, Sentinel-2, big data",
                    "Languages: French (A2), English (Fluent), Hindi (Fluent), Malayalam (Fluent)"
                ],
                fr: [
                    "ML/IA: Régression & Classification (XGBoost, LightGBM, Catboost), Optimisation Bayésienne, Réseaux de Neurones, Tests A/B, Prévisions",
                    "Deep Learning: Transformers, Vision par Ordinateur (YOLOv4, Detectron), NLP, LLMs, Transformers(CNNs, RNNs, LSTMs, GANs)",
                    "MLOps & Ingénierie des Données: AWS (SageMaker, S3), Déclencheurs et procédures en TSQL, SQL/NoSQL (MongoDB), Git",
                    "Programmation: Python, R, PySpark, Scikit-Learn, Pandas, NumPy, PyTorch, Tensorflow",
                    "Visualisation & Analyse: Tableau (avancé), SHAP, LIME, Power BI, Seaborn, Plotly, NLTK, spaCy, scikit-learn",
                    "Compétences Additionnelles: JavaScript, Flask, FastAPI, Deeplabsv3+, Streamlit, Langchain, SIG, Sentinel-2, big data",
                    "Langues: Français (A2), Anglais (Courant), Hindi (Courant), Malayalam (Courant)"
                ]
            }
        },
        education: {
            title: { en: "Education", fr: "Éducation" },
            content: {
                en: [
                    {
                        title: "MSc. - Emlyon Business School, Data Science & Artificial Intelligence Strategy (2024-2026)",
                        points: ["Masters of science in Data Science & Artificial Intelligence Strategy"]
                    },
                    {
                        title: "B.Tech - Sardar Vallabhbhai National Institute of Technology, Surat, Mechanical Engineering (2015-2019)",
                        points: [
                            "Bachelors of Technology in Mechanical Engineering",
                            "Electives - Robotics, Marketing, Cleaner technologies, Entrepreneurship-MSME"
                        ]
                    },
                    {
                        title: "XII - Delhi Private School, Sharjah, Science & Computer Science (2014-2015)",
                        points: [
                            "Subjects - Physics, Chemistry, Maths, Computer Science, English"
                        ]
                    },
                    {
                        title: "X - Delhi Private School, Sharjah, Science (2012-2013)",
                        points: [
                            "Subjects - Science, Maths, Social science, English, Hindi"
                        ]
                    }
                ],
                fr: [
                    {
                        title: "MSc. - Emlyon Business School, Science des Données & Stratégie d'Intelligence Artificielle (2024-2026)",
                        points: ["Maîtrise ès Sciences en Science des Données et Stratégie d'Intelligence Artificielle "]
                    },
                    {
                        title: "B.Tech - Institut National de Technologie Sardar Vallabhbhai, Surat, Génie Mécanique (2015-2019)",
                        points: [
                            "Licence en technologie, spécialisation en génie mécanique",
                            "Cours optionnels - Robotique, Marketing, Technologies propres, Entrepreneuriat-PME"
                        ]
                    },
                    {
                        title: "XII - Delhi Private School, Sharjah, Sciences & Informatique (2014-2015)",
                        points: [
                            "Matières - Physique, Chimie, Mathématiques, Informatique, Anglais"
                        ]
                    },
                    {
                        title: "X - Delhi Private School, Sharjah, Sciences (2012-2013)",
                        points: [
                            "Matières - Sciences, Mathématiques, Sciences sociales, Anglais, Hindi"
                        ]
                    }
                ]
            }
        },
        experience: {
            title: { en: "Experience", fr: "Expérience" },
            content: {
                en: [
                    {
                        title: "Consultant - EXL Services (Sep 2022-Jul 2024)",
                        points: [
                            "Built probability models for a leading US collections agency, improving the GINI coefficient by 6% through the use of LightGBM and Bayesian optimization.",
                            "Conducted A/B testing for a dining rewards campaign, contributing to the segmentation of test, control, and holdout groups while actively monitoring key KPIs such as conversion rates, engagement metrics, and customer retention.",
                            "Built probability of default models using XGBoost for customer and business for a major business lending firm, improved GINI score by ~2% with the help of Bayesian optimization",
                            "Performed binning and information value analysis for feature selection, created reports using various accuracy metrics, confusion matrix, SHAP and LIME plots to interpret best models",
                            "Worked on multi touch attribution models in marketing, increased attribution to upper funnel channels by ~14% for a major US banking institution",
                            "Developed models for multiple products for US and international markets using Seemingly unrelated, Ridge, Linear and Bayesian regressions",
                            "Created multiple dashboards analyzing impressions and spends at yearly and quarterly level using Tableau, performed feature selection of core business variables for robust models",
                            "Helped extract core, external variables and automate feature engineering using Python, SQL and HIVE scripts"
                        ]
                    },
                    {
                        title: "Data Analyst - TheMathCompany (Sep 2021-Aug 2022)",
                        points: [
                            "Provided solutions to optimize spends on different channels in marketing, simulation with optimized budget improved sales by ~3%",
                            "Created multiple regional and national level market mix models for several medicative products for Indian markets using Bayesian regression",
                            "Built national level linear regressive market mix models for a leading international QSR in the Netherlands region",
                            "Helped to build simulation tool to allocate budget and predict sales of multiple budget scenario using Python",
                            "Made reports and analyzed trends of data for null analysis, regional/ national level exploration, seasonality investigation using Excel and Power BI",
                            "Automated preprocessing (Adstock, carryover, lag) of data using Python to make models which are suitable to business context"
                        ]
                    },
                    {
                        title: "Transaction Risk Analyst - Amazon (Nov 2019-Sep 2021)",
                        points: [
                            "Identified, analyzed and eliminated the risk/fraud, which arises due to the use of debit cards/credit cards/e-checks/store cards/gift certificates on Amazon.com, Amazon.ca and Amazon.co.uk Platforms by applying the analytical skills along with the use of the tools provided",
                            "Created visually impactful dashboards in Excel and Tableau for data reporting by using pivot tables and VLOOKUP",
                            "Extracted, interpreted and analyzed data to identify key metrics and transform raw data into meaningful, actionable information using SQL and Power BI",
                            "Worked on creating skill-repository functional page using python Django, HTML and CSS for transaction risk department to store additional details of Amazon employees"
                        ]
                    }
                ],
                fr: [
                    {
                        title: "Consultant - EXL Services (Sep 2022-Juil 2024)",
                        points: [
                            "Construit des modèles de probabilité pour une importante agence de recouvrement américaine, améliorant le coefficient GINI de 6% grâce à l'utilisation de LightGBM et de l'optimisation bayésienne.",
                            "Réalisé des tests A/B pour une campagne de récompenses de restauration, contribuant à la segmentation des groupes test, contrôle et de réserve tout en surveillant activement les KPI clés tels que les taux de conversion, les métriques d'engagement et la rétention des clients.",
                            "Construit des modèles de probabilité de défaut utilisant XGBoost pour les clients et les entreprises d'une importante société de prêts aux entreprises, améliorant le score GINI d'environ 2% grâce à l'optimisation bayésienne",
                            "Effectué une analyse de binning et de valeur d'information pour la sélection des caractéristiques, créé des rapports utilisant diverses métriques de précision, matrice de confusion, graphiques SHAP et LIME pour interpréter les meilleurs modèles",
                            "Travaillé sur des modèles d'attribution multi-touch en marketing, augmenté l'attribution aux canaux supérieurs de l'entonnoir d'environ 14% pour une grande institution bancaire américaine",
                            "Développé des modèles pour plusieurs produits pour les marchés américains et internationaux en utilisant des régressions apparemment non liées, Ridge, linéaires et bayésiennes",
                            "Créé plusieurs tableaux de bord analysant les impressions et les dépenses au niveau annuel et trimestriel en utilisant Tableau, effectué une sélection des variables commerciales essentielles pour des modèles robustes",
                            "Aidé à extraire les variables de base et externes et à automatiser l'ingénierie des caractéristiques en utilisant Python, SQL et des scripts HIVE"
                        ]
                    },
                    {
                        title: "Analyste de données - TheMathCompany (Sep 2021-Août 2022)",
                        points: [
                            "Fourni des solutions pour optimiser les dépenses sur différents canaux de marketing, la simulation avec un budget optimisé a amélioré les ventes d'environ 3%",
                            "Créé plusieurs modèles de mix marketing au niveau régional et national pour plusieurs produits médicaux pour les marchés indiens en utilisant la régression bayésienne",
                            "Construit des modèles de mix marketing de régression linéaire au niveau national pour un important QSR international dans la région des Pays-Bas",
                            "Aidé à construire un outil de simulation pour allouer le budget et prédire les ventes de plusieurs scénarios budgétaires en utilisant Python",
                            "Réalisé des rapports et analysé les tendances des données pour l'analyse des valeurs nulles, l'exploration au niveau régional/national, l'investigation de la saisonnalité en utilisant Excel et Power BI",
                            "Automatisé le prétraitement (Adstock, report, décalage) des données en utilisant Python pour créer des modèles adaptés au contexte commercial"
                        ]
                    },
                    {
                        title: "Analyste des risques de transaction - Amazon (Nov 2019-Sep 2021)",
                        points: [
                            "Identifier, analyser et éliminer les risques/fraudes liés à l'utilisation de cartes de débit/crédit/chèques électroniques/cartes de magasin/chèques-cadeaux sur les plateformes Amazon.com, Amazon.ca et Amazon.co.uk en appliquant des compétences analytiques et en utilisant les outils fournis",
                            "Créé des tableaux de bord visuellement impactants dans Excel et Tableau pour le reporting de données en utilisant des tableaux croisés dynamiques et VLOOKUP",
                            "Extrait, interprété et analysé des données pour identifier les métriques clés et transformer les données brutes en informations significatives et exploitables en utilisant SQL et Power BI",
                            "Travaillé sur la création d'une page fonctionnelle de référentiel de compétences en utilisant Python Django, HTML et CSS pour le département des risques de transaction afin de stocker des détails supplémentaires sur les employés d'Amazon"
                        ]
                    }
                ]
            }
        },
        certification: {
            title: { en: "Certifications", fr: "Certifications" },
            content: {
                en: [
                    "AWS Certified Cloud Practitioner Certification by March 2025",
                    "AWS Certified Machine Learning - Specialty by March 2025",
                    "Gen AI with LLM 2024, deeplearning.ai",
                    "Deep generative models 2023, Indian Institute of Science, Bangalore",
                    "Big data engineer certification 2021-2022, Udemy",
                    "Post Graduate Diploma in Data Science, Machine and Deep Learning 2019-2020, Udemy",
                    "Amazon Transaction Risk Investigator BRI 2019-2020"
                ],
                fr: [
                    "Certification AWS Certified Cloud Practitioner d'ici mars 2025",
                    "Certification AWS Certified Machine Learning - Specialty d'ici mars 2025",
                    "IA générative avec LLM 2024, deeplearning.ai",
                    "Modèles génératifs profonds 2023, Indian Institute of Science, Bangalore",
                    "Certification d'ingénieur Big Data 2021-2022, Udemy",
                    "Diplôme d'études supérieures en Science des Données, Machine Learning et Deep Learning 2019-2020, Udemy",
                    "Enquêteur sur les risques de transaction Amazon BRI 2019-2020"
                ]
            }
        },
        extras: {
            title: { en: "Key Achievements", fr: "Réalisations Clés" },
            content: {
                en: [
                    "<a href='https://huggingface.co/spaces/Mistral-AI-Game-Jam/team_16trial' target='_blank' class='achievement-link'>Finalist, Mistral AI Game Jam, deployed a game demo called 'Notme' on Huggingface using Mistral AI and Eleven Labs (2025)</a>",
                    "<a href='#' target='_blank' class='achievement-link'>Datacraft x Egis, Wetlands segmentation using satellite imagery with Unet and Deeplabsv3+ (2025)</a>",
                    "<a href='https://github.com/dcrey7/mistral_alan_hackathon' target='_blank' class='achievement-link'>Finalist, Mistral AI x Alan Healthcare Hackathon, implemented LightRAG architecture for medical knowledge retrieval and reasoning (2024)</a>",
                    "<a href='https://github.com/dcrey7/NovatrisBCN_finance_hackathon_2024/blob/main/Novatris_24_hackathon.ipynb' target='_blank' class='achievement-link'>Top 10, Novartis BCN Finance Hackathon, recent and historical drug sales forecasting using K-means and Hierarchical clustering (2024)</a>",
                    "<a href='https://github.com/dcrey7/janestreet_R' target='_blank' class='achievement-link'>Jane Street Real-Time Market Data Forecasting, real-time market responders forecasting (2025)</a>"
                ],
                fr: [
                    "<a href='https://huggingface.co/spaces/Mistral-AI-Game-Jam/team_16trial' target='_blank' class='achievement-link'>Finaliste, Mistral AI Game Jam, déploiement d'une démo de jeu appelée 'Notme' sur Huggingface en utilisant Mistral AI et Eleven Labs (2025)</a>",
                    "<a href='#' target='_blank' class='achievement-link'>Datacraft x Egis, segmentation des zones humides à l'aide d'images satellitaires avec Unet et Deeplabsv3+ (2025)</a>",
                    "<a href='https://github.com/dcrey7/mistral_alan_hackathon' target='_blank' class='achievement-link'>Finaliste, Mistral AI x Alan Healthcare Hackathon, mise en œuvre de l'architecture LightRAG pour la récupération et le raisonnement des connaissances médicales (2024)</a>",
                    "<a href='https://github.com/dcrey7/NovatrisBCN_finance_hackathon_2024/blob/main/Novatris_24_hackathon.ipynb' target='_blank' class='achievement-link'>Top 10, Novartis BCN Finance Hackathon, prévision des ventes de médicaments récents et historiques en utilisant K-means et le clustering hiérarchique (2024)</a>",
                    "<a href='https://github.com/dcrey7/janestreet_R' target='_blank' class='achievement-link'>Jane Street, prévision en temps réel des données de marché, prévision des répondeurs du marché en temps réel (2025)</a>"
                ]
            }
        }
    }
};

// State management
let currentView = 'tiles';
let currentSection = null;

// Glass effect parameters (can be adjusted)
const glassParams = {
    refraction: 1.0,    // How much the glass bends light (0.5-2.0)
    aberration: 1.0,    // Chromatic aberration strength (0.0-2.0)
    thickness: 1.0,     // Glass thickness (0.5-2.0)
    clarity: 0.95       // Glass clarity (0.8-1.0, higher = clearer)
};

// Predefined glass presets
const glassPresets = {
    apple: {
        refraction: 1.2,
        aberration: 1.2,
        thickness: 1.1,
        clarity: 0.92
    },
    crystal: {
        refraction: 0.6,
        aberration: 0.5,
        thickness: 0.8,
        clarity: 0.98
    },
    frosted: {
        refraction: 1.5,
        aberration: 1.3,
        thickness: 1.4,
        clarity: 0.85
    },
    subtle: {
        refraction: 0.8,
        aberration: 0.8,
        thickness: 0.9,
        clarity: 0.96
    }
};

// Function to apply glass preset
function applyGlassPreset(presetName) {
    const preset = glassPresets[presetName];
    if (preset && typeof updateGlassParams === 'function') {
        updateGlassParams(preset);
    }
}

function updateContent() {
    const lang = isEnglish ? 'en' : 'fr';

    // Update profile section
    document.getElementById('name').textContent = translations.name[lang];
    document.getElementById('title').textContent = translations.title[lang];

    // Update left tiles
    document.querySelector('.tile-resume .tile-text').textContent = translations.leftTiles.resume[lang];
    const modeToggle = document.querySelector('.tile-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    modeToggle.querySelector('.tile-text').textContent = isLightMode ? 
        translations.leftTiles.darkMode[lang] : translations.leftTiles.lightMode[lang];
    document.querySelector('.tile-lang .tile-text').textContent = isEnglish ? 
        translations.leftTiles.translateFr.en : translations.leftTiles.translateFr.fr;

    // Update right tiles
    const tiles = document.querySelectorAll('.tile-grid-right .tile');
    tiles.forEach(tile => {
        const section = tile.getAttribute('data-section');
        if (section && translations.tiles[section]) {
            const titleElement = tile.querySelector('.tile-title');
            const subtitleElement = tile.querySelector('.tile-subtitle');
            
            if (titleElement) {
                titleElement.textContent = translations.tiles[section].title[lang];
            }
            if (subtitleElement) {
                subtitleElement.textContent = translations.tiles[section].subtitle[lang];
            }
        }
    });

    // Update back button
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.innerHTML = `<span class="back-icon">←</span> ${translations.backButton[lang]}`;
    }

    // Update section content
    Object.keys(translations.sections).forEach(sectionKey => {
        const section = document.getElementById(sectionKey);
        if (section) {
            const titleElement = section.querySelector('h3');
            if (titleElement) {
                titleElement.textContent = translations.sections[sectionKey].title[lang];
            }
            
            const contentElement = section.querySelector('p, ul, div');
            if (contentElement) {
                const content = translations.sections[sectionKey].content[lang];
                if (Array.isArray(content)) {
                    if (typeof content[0] === 'object') {
                        // For education and experience sections
                        let html = '';
                        content.forEach((item, index) => {
                            html += `<h4>${item.title}</h4><ul>`;
                            item.points.forEach(point => {
                                html += `<li>${point}</li>`;
                            });
                            html += '</ul>';
                            if (sectionKey === 'experience' && index < content.length - 1) {
                                html += '<hr class="experience-divider">';
                            }
                        });
                        contentElement.innerHTML = html;
                    } else {
                        // For skills, certification, and extras sections
                        contentElement.innerHTML = content.map(item => `<li>${item}</li>`).join('');
                    }
                } else {
                    // For overview section
                    contentElement.textContent = content;
                }
            }
        }
    });
}

function toggleLanguage() {
    isEnglish = !isEnglish;
    updateContent();
}

function showTileGrid() {
    const tileGrid = document.getElementById('tile-grid');
    const contentView = document.getElementById('content-view');
    
    contentView.classList.remove('active');
    setTimeout(() => {
        contentView.style.display = 'none';
        tileGrid.style.display = 'grid';
        setTimeout(() => {
            tileGrid.classList.add('active');
        }, 50);
    }, 300);
    
    currentView = 'tiles';
    currentSection = null;
}

function showContent(sectionId) {
    const tileGrid = document.getElementById('tile-grid');
    const contentView = document.getElementById('content-view');
    
    // Hide all sections first
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Transition from tiles to content
    tileGrid.classList.remove('active');
    setTimeout(() => {
        tileGrid.style.display = 'none';
        contentView.style.display = 'flex';
        setTimeout(() => {
            contentView.classList.add('active');
        }, 50);
    }, 300);
    
    currentView = 'content';
    currentSection = sectionId;
}

function toggleMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    
    const modeToggle = document.querySelector('.tile-mode');
    const lang = isEnglish ? 'en' : 'fr';
    modeToggle.querySelector('.tile-icon').textContent = isLightMode ? '🌑' : '☀️';
    modeToggle.querySelector('.tile-text').textContent = isLightMode ? 
        translations.leftTiles.darkMode[lang] : translations.leftTiles.lightMode[lang];

    // Update background if you have a function for that
    if (typeof updateBackgroundMode === 'function') {
        updateBackgroundMode(isLightMode);
    }
    
    // Adjust glass parameters for light mode
    if (isLightMode) {
        // Use subtle preset for light mode
        applyGlassPreset('subtle');
    } else {
        // Use apple preset for dark mode
        applyGlassPreset('apple');
    }
}

function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        // Create a temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Copied!';
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            pointer-events: none;
            z-index: 1000;
            transform: translateX(-50%);
            left: 50%;
            top: -30px;
        `;
        
        element.style.position = 'relative';
        element.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.remove();
        }, 1500);
    });
}

// Debounce function for resize events
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

// Update container bounds on resize
const debouncedUpdateBounds = debounce(() => {
    if (typeof updateContainerBounds === 'function') {
        updateContainerBounds();
    }
}, 250);

document.addEventListener('DOMContentLoaded', function() {
    updateContent();
    
    // Language toggle
    const langToggle = document.getElementById('lang-toggle');
    langToggle.addEventListener('click', toggleLanguage);

    // Mode toggle
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', toggleMode);

    // Right side tile click handlers
    const rightTiles = document.querySelectorAll('.tile-grid-right .tile');
    rightTiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            showContent(targetSection);
        });
    });

    // Back button handler
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', showTileGrid);

    // Email and phone copy handlers
    const emailTile = document.getElementById('email-tile');
    const phoneTile = document.getElementById('phone-tile');
    
    emailTile.addEventListener('click', function() {
        const emailText = document.getElementById('email-info').textContent;
        copyToClipboard(emailText, this);
    });
    
    phoneTile.addEventListener('click', function() {
        const phoneText = document.getElementById('phone-info').textContent;
        copyToClipboard(phoneText, this);
    });

    // Prevent link tiles from interfering with their anchor tags
    const linkTiles = document.querySelectorAll('.tile-resume, .tile-github, .tile-linkedin');
    linkTiles.forEach(tile => {
        tile.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Add entrance animations for tiles
    const allTiles = document.querySelectorAll('.tile');
    allTiles.forEach((tile, index) => {
        tile.style.animationDelay = `${index * 0.05}s`;
        tile.style.animation = 'fadeInScale 0.5s ease forwards';
    });
    
    // Update glass effect bounds on window resize
    window.addEventListener('resize', debouncedUpdateBounds);
    
    // Initialize glass parameters with Apple-like preset
    if (typeof updateGlassParams === 'function') {
        applyGlassPreset('apple');
    }
    
    // You can change the glass effect by calling:
    // applyGlassPreset('crystal');   // Clear, minimal distortion
    // applyGlassPreset('frosted');   // Thick, more distortion
    // applyGlassPreset('subtle');    // Very subtle effect
    // applyGlassPreset('apple');     // Apple-like glass (default)
});

// Add CSS animation for tile entrance
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Export functions for external use
window.applyGlassPreset = applyGlassPreset;