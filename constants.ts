import { AuditItem, Character } from './types';

export const STORY_INTRO = `Agent, bienvenue. 
Le Lycée "Saint-Glinglin 2.0" est tombé. 
Les GAFAM (l'Empire Big Tech) contrôlent tout : données siphonnées, PC jetés tous les 3 ans, licences hors de prix.
Votre mission : Infiltrer, Auditer, Recycler et Libérer le village numérique.
Nom de code : Opération NIRD.`;

export const AUDIT_ITEMS: AuditItem[] = [
  { 
    id: 1, x: 20, y: 30, 
    label: "Licence OS Empire", 
    description: "Coût exorbitant renouvelé chaque année. Une rançon numérique.", 
    found: false,
    icon: "💰"
  },
  { 
    id: 2, x: 70, y: 20, 
    label: "Obsolescence", 
    description: "Ces PC ont 4 ans et sont considérés 'déchets'. Faux !", 
    found: false,
    icon: "🗑️"
  },
  { 
    id: 3, x: 50, y: 60, 
    label: "Cloud Inconnu", 
    description: "Les données des élèves partent sur des serveurs à l'étranger.", 
    found: false,
    icon: "☁️"
  },
  { 
    id: 4, x: 80, y: 70, 
    label: "Vendor Lock-in", 
    description: "Formats de fichiers propriétaires impossibles à ouvrir ailleurs.", 
    found: false,
    icon: "🔒"
  },
];

export const CHARACTERS: Character[] = [
  {
    id: 'prof',
    name: "M. Sceptique",
    role: "Prof d'Histoire",
    avatar: "👨‍🏫",
    intro: "Je ne peux pas changer, tous mes cours sont sur Word 97 !",
    convinced: false,
    options: [
      { text: "Vous êtes dépassé, monsieur.", isCorrect: false, feedback: "Il se braque. Mauvaise approche." },
      { text: "LibreOffice ouvre vos fichiers et ne vous espionne pas.", isCorrect: true, feedback: "Il semble intéressé par la confidentialité..." },
      { text: "Passez tout sur tablette.", isCorrect: false, feedback: "Encore plus fermé ! Raté." }
    ]
  },
  {
    id: 'gamer',
    name: "Kévin",
    role: "Élève Gamer",
    avatar: "🎧",
    intro: "Linux c'est nul, je peux pas jouer à mes jeux AAA.",
    convinced: false,
    options: [
      { text: "Le jeu c'est une perte de temps.", isCorrect: false, feedback: "Kévin vous ignore." },
      { text: "Tu as essayé Steam Proton ? Ça tourne nickel.", isCorrect: true, feedback: "Ses yeux brillent. Il va tester ce soir." },
      { text: "Joue au démineur.", isCorrect: false, feedback: "Sérieusement ?" }
    ]
  },
  {
    id: 'admin',
    name: "Mme Radine",
    role: "Intendante",
    avatar: "📉",
    intro: "On n'a pas de budget pour racheter des ordinateurs neufs.",
    convinced: false,
    options: [
      { text: "Faut augmenter les impôts.", isCorrect: false, feedback: "Elle soupire." },
      { text: "Achetons des Mac, c'est joli.", isCorrect: false, feedback: "Elle fait une crise cardiaque." },
      { text: "Justement ! Gardons les vieux PC, installons Linux : 0€.", isCorrect: true, feedback: "Le mot '0€' a fait mouche." }
    ]
  }
];