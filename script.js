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
    nav: {
        overview: { en: "Overview", fr: "Aperçu" },
        skills: { en: "Skills", fr: "Compétences" },
        education: { en: "Education", fr: "Éducation" },
        experience: { en: "Experience", fr: "Expérience" },
        certification: { en: "Certification", fr: "Certification" },
        extras: { en: "Extras", fr: "Extras" }
    },
    sections: {
        overview: {
            title: { en: "Overview", fr: "Aperçu" },
            content: { 
                en: "I am a seasoned data scientist with four years of experience in the field, specializing in various sectors including banking, ecommerce, pharma, and QSR. I have mainly tackled complex challenges within credit risk and market mix domains, delivering impactful solutions. Armed with a diverse toolkit encompassing machine learning, deep learning, predictive modelling, and analytics, I leverage my expertise in Python, AWS, SQL, PyTorch, HIVE, Pyspark, Excel, and Power BI to extract actionable insights from data and guide strategic decision-making processes.",
                fr: "Je suis un data scientist expérimenté avec quatre ans d'expérience dans le domaine, spécialisé dans divers secteurs tels que la banque, le e-commerce, la pharmacie et la restauration rapide (QSR). J'ai principalement relevé des défis complexes dans les domaines du risque de crédit et du mix marketing, en livrant des solutions impactantes. Doté d'une boîte à outils diversifiée comprenant le machine learning, le deep learning, la modélisation prédictive et l'analyse, j'utilise mon expertise en Python, AWS, SQL, PyTorch, HIVE, Pyspark, Excel, et Power BI pour extraire des insights exploitables à partir des données et guider les processus de prise de décision stratégique."
            }
        },
		
        skills: {
            title: { en: "Skills", fr: "Compétences" },
            content: { 
                en: [
				"Languages: Python, HTML5, CSS ", 
				"Frameworks & Libraries: Pandas, Numpy, Matplotlib, Scikit-learn, Seaborn, Flask, NLTK",
				"Environments: Windows",
				"Machine Learning: Regressions, Xgboost, K-Means, KNN, Bayesian statistics",
				"Deep Learning: YOLOv4, Detectron",
				"Database Applications and cloud: SQL, AWS, HIVE",
				"Software & Tools: Tableau, Power BI",
				"Microsoft Office Suite: Excel, Word, PowerPoint"
				],
                fr: [
				"Langages: Python, HTML5, CSS",
				"Frameworks et Bibliothèques: Pandas, Numpy, Matplotlib, Scikit-learn, Seaborn, Flask, NLTK",
				"Environnements: Windows",
				"Machine Learning: Régressions, Xgboost, K-Means, KNN, Statistiques bayésiennes",
				"Deep Learning: YOLOv4, Detectron",
				"Applications de base de données et cloud: SQL, AWS, HIVE",
				"Logiciels et Outils: Tableau, Power BI",
				"Suite Microsoft Office: Excel, Word, PowerPoint"
				]
            }
        }, 
		/*skills: {
            title: { en: "Skills", fr: "Compétences" },
            content: {
                en: [
                    "PGPDM - University of Chicago & Jigsaw Academy, Bangalore",
                    "B.Tech - Sardar Vallabhbhai National Institute of Technology, Surat",
                    "XII - Delhi Private School, Sharjah",
                    "X - Delhi Private School, Sharjah"
                ],
                fr: [
                    "PGPDM - Université de Chicago & Jigsaw Academy, Bangalore",
                    "B.Tech - Institut National de Technologie Sardar Vallabhbhai, Surat",
                    "XII - École Privée de Delhi, Sharjah",
                    "X - École Privée de Delhi, Sharjah"
                ]
            }
        },
        education: {
            title: { en: "Education", fr: "Éducation" },
            content: {
                en: [
                    "PGPDM - University of Chicago & Jigsaw Academy, Bangalore",
                    "B.Tech - Sardar Vallabhbhai National Institute of Technology, Surat",
                    "XII - Delhi Private School, Sharjah",
                    "X - Delhi Private School, Sharjah"
                ],
                fr: [
                    "PGPDM - Université de Chicago & Jigsaw Academy, Bangalore",
                    "B.Tech - Institut National de Technologie Sardar Vallabhbhai, Surat",
                    "XII - École Privée de Delhi, Sharjah",
                    "X - École Privée de Delhi, Sharjah"
                ]
            }
        },*/ 
		
	education: {
    title: { en: "Education", fr: "Éducation" },
    content: {
        en: [
            {
                title: "PGPDM - University of Chicago & Jigsaw Academy, Bangalore, (2020-2021)",
                points: [
                    "Built probabilty of legal classification and parking detection algorithm",
                    
                ]
            },
            {
                title: "B.Tech - Sardar Vallabhbhai National Institute of Technology, Surat , (2015-2019)",
                points: [
                    "Bachelors of Technology in Mechanical Engineering",
					"Electives - Robotics, Marketing, Cleaner technologies, Entrepreneurship-MSME"
                    
                ]
            },
            {
                title: "XII - Delhi Private School, Sharjah,(2014-2015)",
                points: [
                    "Subjects - Physics, Chemistry, Maths, Computer Science, English",
                   
                ]
            },
            {
                title: "X - Delhi Private School, Sharjah(2014-2015)",
                points: [
                    "Subjects - Science, Maths, Social science, English, Hindi"
                    
                ]
            }
        ],
        fr: [
            {
                title: "PGPDM - Université de Chicago & Jigsaw Academy, Bangalore, (2020-2021)",
                points: [
                    "Développement d'un algorithme de classification juridique probabiliste et de détection de stationnement"
                ]
            },
            {
                title: "B.Tech - Institut National de Technologie Sardar Vallabhbhai, Surat, (2015-2019)",
                points: [
                    "Licence en technologie, spécialisation en génie mécanique",
                    "Cours optionnels - Robotique, Marketing, Technologies propres, Entrepreneuriat-PME"
                ]
            },
            {
                title: "XII - Delhi Private School, Sharjah, (2014-2015)",
                points: [
                    "Matières - Physique, Chimie, Mathématiques, Informatique, Anglais"
                ]
            },
            {
                title: "X - Delhi Private School, Sharjah, (2014-2015)",
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
                title: "Consultant - EXL Services (Sep 2022-Present)",
                points: [
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
                    "Identify, analyze and eliminate the risk/fraud, which arises due to the use of debit cards/credit cards/e-checks/store cards/gift certificates on Amazon.com, Amazon.ca and Amazon.co.uk Platforms by applying the analytical skills along with the use of the tools provided",
                    "Created visually impactful dashboards in Excel and Tableau for data reporting by using pivot tables and VLOOKUP",
                    "Extracted, interpreted and analyzed data to identify key metrics and transform raw data into meaningful, actionable information using SQL and Power BI",
                    "Worked on creating skill-repository functional page using python Django, HTML and CSS for transaction risk department to store additional details of Amazon employees"
                ]
            },
            {
                title: "Deep Learning Intern - Ineuron Pvt Ltd. (Aug 2020- Nov 2020)",
                points: [
                    "Illegal Vehicle Parking Detection - Detected and Identified various parking spots in parking lots and determined if the vehicle was parked illegally",
                    "Contributed by preparing the data to accurately classify various vehicles and parking spots and implementing models such as Yolov4 and Detectron"
                ]
            }
        ],
        fr: [
            {
                title: "Consultant - EXL Services (Sep 2022-Présent)",
                points: [
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
            },
            {
                title: "Stagiaire en Deep Learning - Ineuron Pvt Ltd. (Août 2020- Nov 2020)",
                points: [
                    "Détection de stationnement illégal de véhicules - Détecté et identifié divers emplacements de stationnement dans les parkings et déterminé si le véhicule était garé illégalement",
                    "Contribué à la préparation des données pour classifier avec précision divers véhicules et places de stationnement et à la mise en œuvre de modèles tels que Yolov4 et Detectron"
                ]
            }
        ]
    }
},
        certification: {
            title: { en: "Certifications", fr: "Certifications" },
            content: {
                en: [
                    "Gen AI with LLM 2024",
                    "Deep generative models 2023",
                    "Big data engineer certification 2021-2022",
                    "Post Graduate Diploma in Data Science, Machine and Deep Learning 2019-2020",
                    "Amazon Transaction Risk Investigator BRI 2019-2020"
                ],
                fr: [
                    "IA générative avec LLM 2024",
                    "Modèles génératifs profonds 2023",
                    "Certification d'ingénieur Big Data 2021-2022",
                    "Diplôme d'études supérieures en Science des Données, Machine Learning et Deep Learning 2019-2020",
                    "Enquêteur sur les risques de transaction Amazon BRI 2019-2020"
                ]
            }
        },
        extras: {
            title: { en: "Extracurricular", fr: "Activités Extrascolaires" },
            content: {
                en: [
                    "Winner of Art Chitrakala All India Emerging Artist award 2021",
                    "Winner of IGNIS Inter NIT Football Tournament, Agartala. 2016-2017",
                    "Chief Designer of College Magazine. 2016-2019"
                ],
                fr: [
                    "Lauréat du prix Art Chitrakala All India Emerging Artist 2021",
                    "Vainqueur du tournoi de football IGNIS Inter NIT, Agartala. 2016-2017",
                    "Designer en chef du magazine universitaire. 2016-2019"
                ]
            }
        }
    }
};

function updateContent() {
    const lang = isEnglish ? 'en' : 'fr';

    document.getElementById('name').textContent = translations.name[lang];
    document.getElementById('title').textContent = translations.title[lang];

    const navLinks = document.querySelectorAll('#main-nav .nav-link');
    navLinks.forEach(link => {
        const key = link.getAttribute('data-target');
        link.textContent = translations.nav[key][lang];
    });

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
                        content.forEach(item => {
                            html += `<h4>${item.title}</h4><ul>`;
                            item.points.forEach(point => {
                                html += `<li>${point}</li>`;
                            });
                            html += '</ul>';
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
    const langToggle = document.getElementById('lang-toggle');
    langToggle.textContent = isEnglish ? 'FR' : 'GB';
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('#main-content .section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateContent();
    showSection('overview');
    
    const langToggle = document.getElementById('lang-toggle');
    langToggle.addEventListener('click', toggleLanguage);

    const navLinks = document.querySelectorAll('#main-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');

            showSection(targetId);
        });
    });

    // Dark mode toggle
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        this.textContent = document.body.classList.contains('light-mode') ? '🌑' : '☀️';
    });

    // Copy email and phone to clipboard
    const emailInfo = document.getElementById('email-info');
    const phoneInfo = document.getElementById('phone-info');
    
    [emailInfo, phoneInfo].forEach(element => {
        element.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                alert('Copied to clipboard: ' + text);
            });
        });
    });
});