import colors from "../constants/colours";
import { IS_BYPASS_ONBOARDING } from "../constants/others";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const notifications = [
  {
    id: 1,
    title: "Nouveau rendez-vous",
    content:
      "Rendez-vous pris pour Lundi, 12 Fevrier 2023 à 14h à la clinique Fouda.",
    date: "12 Jan 2023",
    triggeredBy: "Rendez-vous",
    status: "new",
    color: colors.warning,
    bg: colors.transp_warning,
  },

  {
    id: 2,
    title: "Rendez-vous annulé",
    content:
      "Votre rendez-vous initialement prévu pour Lundi, 12 Février 2023 à 14h à la clinique Fouda vient d’être annulé.",
    date: "12 Jan 2023",
    triggeredBy: "Rendez-vous",
    status: "canceled",
    color: colors.danger,
    bg: colors.transp_danger,
  },

  {
    id: 3,
    title: "Rendez-vous terminé",
    content:
      "Nous espérons que votre consultation s’est bien déroulé. N’hésité pas à nous partager votre avis.",
    date: "12 Jan 2023",
    triggeredBy: "Rendez-vous",
    status: "completed",
    color: colors.success,
    bg: colors.transp_success,
  },
];

export const practiciens = [
  {
    id: 1,
    name: "Tiemeni Happi",
    img: require("../assets/img/pub1.jpg"),
    center: "Clinique FOUDA",
    cost: 15000,
  },
  {
    id: 2,
    name: "Embolo Emma",
    img: require("../assets/img/logo.png"),
    center: "Clinique FOUDA",
    cost: 15000,
  },
  {
    id: 3,
    name: "Tabou Blondin",
    img: require("../assets/img/logo.png"),
    center: "Clinique FOUDA",
    cost: 15000,
  },
  {
    id: 4,
    name: "Tiemeni Happi",
    img: require("../assets/img/logo.png"),
    center: "Clinique FOUDA",
    cost: 15000,
  },
  {
    id: 5,
    name: "Embolo Emma",
    img: require("../assets/img/logo.png"),
    center: "Clinique FOUDA",
    cost: 15000,
  },
];

export const appointmentDate = [
  {
    id: 1,
    date: "Jeudi, 12 Fev",
  },
  {
    id: 2,
    date: "Jeudi, 12 Fev",
  },
  {
    id: 3,
    date: "Jeudi, 12 Fev",
  },
  {
    id: 4,
    date: "Jeudi, 12 Fev",
  },
  {
    id: 5,
    date: "Jeudi, 12 Fev",
  },
];

export const disponibilites = [
  {
    id: 1,
    period: "10h30",
  },
  {
    id: 2,
    period: "11h30",
  },
  {
    id: 3,
    period: "12h30",
  },
  {
    id: 4,
    period: "14h30",
  },
  {
    id: 5,
    period: "15h30",
  },
  {
    id: 6,
    period: "16h45",
  },
  {
    id: 7,
    period: "18h30",
  },
];

export const motifs = [
  {
    id: 1,
    label: "Motif 1",
    value: "Motif 1",
  },
  {
    id: 2,
    label: "Motif 2",
    value: "Motif 2",
  },
  {
    id: 3,
    label: "Motif 3",
    value: "Motif 3",
  },
  {
    id: 4,
    label: "Motif 4",
    value: "Motif 4",
  },
];

export const specialites = [
  {
    id: 1,
    value: "Ophtalmologie",
  },
  {
    id: 2,
    value: "Oncologie",
  },
  {
    id: 3,
    value: "Allergologie",
  },
  {
    id: 4,
    value: "Pneumologie",
  },
  {
    id: 5,
    value: "Ondontostomatologie",
  },
  {
    id: 6,
    value: "Gériaitrie",
  },
];

export const cguSections = [
  {
    title: "1. Description du Service",
    content:
      "L'application [Nom de l'application] offre un service de prise de rendez-vous médical en ligne avec paiement intégré...",
  },
  {
    title: "2. Utilisation du Service",
    content:
      "En utilisant l'application [Nom de l'application], vous garantissez que vous avez l'âge légal requis pour conclure un contrat...",
  },
  {
    title: "3. Rendez-vous Médicaux et Paiement",
    content:
      "L'application facilite la réservation de rendez-vous médicaux avec des professionnels de santé. Les détails des rendez-vous...",
  },
  {
    title: "4. Annulation et Remboursement",
    content:
      "Les politiques d'annulation et de remboursement peuvent varier en fonction des praticiens et des services...",
  },
  {
    title: "5. Confidentialité",
    content:
      "La confidentialité de vos données personnelles est importante pour nous. Consultez notre Politique de Confidentialité...",
  },
  {
    title: "6. Propriété Intellectuelle",
    content:
      "Tous les contenus présents sur l'application, y compris le texte, les images, les logos et les marques de commerce...",
  },
  {
    title: "7. Limitation de Responsabilité",
    content:
      "L'application [Nom de l'application] ne garantit pas la disponibilité constante des rendez-vous médicaux ni la qualité...",
  },
  {
    title: "8. Modifications des CGU",
    content:
      "Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les modifications seront affichées...",
  },
  {
    title: "9. Contact",
    content:
      "Si vous avez des questions ou des préoccupations concernant les CGU, veuillez nous contacter à [adresse e-mail de contact].",
  },
];

export const licenseSections = [
  {
    title: "Licences Open Source",
    content:
      "Cette application utilise plusieurs bibliothèques open source sous diverses licences...",
  },
  {
    title: "Remerciements",
    content:
      "Nous tenons à remercier la communauté open source pour ses contributions, ainsi que nos utilisateurs...",
  },
];

export const allAstuces = [
  {
    title: "Cardiologie",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },

  {
    title: "Cancérologie",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },

  {
    title: "Urologie",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },

  {
    title: "Psychiatrie",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },
  {
    title: "Obstétrique",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },

  {
    title: "Neurochirurgie",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },

  {
    title: "Neurologie",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },

  {
    title: "Hématologie",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },

  {
    title: "Gastroentérologie",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },

  {
    title: "Endocrinologie",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },

  {
    title: "Chirurgie générale",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },

  {
    title: "Anesthésiologie",
    content: [
      {
        title: "Alimentation équilibrée",
        body: "Choisissez des aliments faibles en gras saturés et en cholestérol pour protéger votre cœur.",
      },
      {
        title: "Évitez le tabac et l'alcool excessif ",
        body: "Faites de l'exercice aérobie pour renforcer votre système cardiovasculaire.",
      },

      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Surveillez votre tension artérielle et votre taux de cholestérol.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Limitez la consommation de sel pour maintenir une pression artérielle saine.",
      },

      {
        title: "Astuce 2 pour la cardiologie",
        body: "Maintenez un poids corporel santé pour réduire la charge sur le cœur.",
      },
    ],
  },

  {
    title: "Opthamologie",
    content: [
      {
        title: "Astuce 1 pour la cardiologie",
        body: "Contenu de l'astuce 1 pour la cardiologie",
      },
      {
        title: "Astuce 2 pour la cardiologie",
        body: "Contenu de l'astuce 2 pour la cardiologie",
      },
      // ...
    ],
  },

  {
    title: "Dermatologie",
    content: [
      {
        title: "Astuce 1 pour la dermatologie",
        body: "Contenu de l'astuce 1 pour la dermatologie",
      },
      {
        title: "Astuce 2 pour la dermatologie",
        body: "Contenu de l'astuce 2 pour la dermatologie",
      },
      // ...
    ],
  },
];

export const privacySections = [
  {
    title: "1. Collecte des Données Personnelles",
    content:
      "Lorsque vous utilisez notre application [Nom de l'application], nous pouvons collecter certaines données personnelles...",
  },
  {
    title: "2. Utilisation des Données",
    content:
      "Nous utilisons les données personnelles collectées pour fournir, maintenir et améliorer les fonctionnalités de l'application...",
  },
  {
    title: "3. Partage des Données",
    content:
      "Nous ne partageons pas vos données personnelles avec des tiers sauf dans les cas spécifiques décrits dans cette Politique de Confidentialité...",
  },
  {
    title: "4. Sécurité",
    content:
      "Nous prenons des mesures pour protéger vos données personnelles contre l'accès non autorisé, la divulgation ou la destruction...",
  },
  {
    title: "5. Vos Choix",
    content:
      "Vous pouvez accéder, corriger ou supprimer les données personnelles que nous avons collectées vous concernant. Vous pouvez également choisir de désactiver certaines fonctionnalités...",
  },
  {
    title: "6. Modifications de la Politique de Confidentialité",
    content:
      "Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Toute modification sera affichée dans l'application...",
  },
  {
    title: "7. Contact",
    content:
      "Si vous avez des questions concernant notre Politique de Confidentialité, veuillez nous contacter à [adresse e-mail de contact]...",
  },
];

export const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const sortArray = (key, array) => {
  const sorted = array.reduce((rv, x) => {
    let v = key instanceof Function ? key(x) : x[key];
    let el = rv.find((r) => r && r.key === v);
    if (el) {
      el.values.push(x);
    } else {
      rv.push({ key: v, values: [x] });
    }
    return rv;
  }, []);
  return sorted;
};

export const ajouterDuree = (date, duree) => {
  const [heure, minute] = date.split(":");
  const dureeEnMinutes = parseInt(duree, 10);

  let nouvelleHeure = parseInt(heure, 10);
  let nouveauMinute = parseInt(minute, 10) + dureeEnMinutes;

  // Gérer le dépassement de 60 minutes
  if (nouveauMinute >= 60) {
    const heuresSupplementaires = Math.floor(nouveauMinute / 60);
    nouvelleHeure += heuresSupplementaires;
    nouveauMinute = nouveauMinute % 60;
  }

  // Formater la nouvelle heure et minute
  const nouvelleHeureFormattee = nouvelleHeure.toString().padStart(2, "0");
  const nouveauMinuteFormattee = nouveauMinute.toString().padStart(2, "0");

  // Renvoyer la nouvelle date au format "hh:mm"
  return `${nouvelleHeureFormattee}:${nouveauMinuteFormattee}`;
};

export const dayOfWeek = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];
export const creneauxOfDay = [
  "08:00-17:00",
  "08:00-10:00",
  "10:00-12:00",
  "12:00-14:00",
  "14:00-16:00",
  "16:00-18:00",
];
export const generateKeyTab = (tab = []) => {
  let keyTab = [];
  tab.forEach((e) => {
    keyTab.push(e.key);
  });
  return keyTab;
};

export const generateValuesTab = (key, dispo = []) => {
  let valuesTab = [];
  dispo?.forEach((e) => {
    if (e.key === key) {
      valuesTab = e.values;
    }
  });
  return valuesTab;
};

export const goFromDayToNumber = (string) => {
  switch (string) {
    case "lundi":
      return 1;
    case "mardi":
      return 2;
    case "mercredi":
      return 3;
    case "jeudi":
      return 4;
    case "vendredi":
      return 5;
    case "samedi":
      return 6;
    case "dimanche":
      return 7;
  }
};

export const goFromNumberToDay = (n) => {
  switch (n) {
    case 1:
      return "lundi";
    case 2:
      return "mardi";
    case 3:
      return "mercredi";
    case 4:
      return "jeudi";
    case 5:
      return "vendredi";
    case 6:
      return "samedi";
    case 7:
      return "dimanche";
  }
};

export function calculerEcartEnMinutes(heure1, heure2) {
  const [heure1Heures, heure1Minutes] = heure1?.split(":");
  const [heure2Heures, heure2Minutes] = heure2?.split(":");

  const totalMinutes1 = parseInt(heure1Heures) * 60 + parseInt(heure1Minutes);
  const totalMinutes2 = parseInt(heure2Heures) * 60 + parseInt(heure2Minutes);

  const ecartEnMinutes = Math.abs(totalMinutes1 - totalMinutes2);

  return ecartEnMinutes;
}

export const isSpecialist = (idProf, TabProf) => {
  let profession;
  for (let i = 0; i < TabProf.length; i++) {
    if (TabProf[i]._id == idProf) {
      profession = TabProf[i].name;
      break;
    }
  }
  if (profession == "Specialiste") {
    return true;
  } else {
    return false;
  }
};

export const searchByName = (tab, val) => {
  let id = "";
  tab.forEach((element) => {
    if (element.name === val) {
      id = element._id;
    }
  });
  return id;
};

export const isEmailValid = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

export const transfomeToSlashDate = (data) => {
  const dateString = data;
  const dateObj = new Date(dateString);

  const jour = dateObj.getDate().toString().padStart(2, "0"); // Jour avec 2 chiffres (padded)
  const mois = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Mois avec 2 chiffres (les mois sont 0-indexés)
  const annee = dateObj.getFullYear().toString().slice(-2); // Les deux derniers chiffres de l'année

  const dateFormatee = `${jour}/${mois}/${annee}`;

  return dateFormatee;
};

export function jourDeLaSemaine(date) {
  const joursSemaine = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const [annee, mois, jour] = date.split("-");
  const dateObj = new Date(`${annee}-${mois}-${jour}`);
  const jourSemaine = joursSemaine[dateObj.getDay()];
  return jourSemaine;
}

export const generateLink = (link, params) => {
  let result = link;
  for (let i = 0; i < Object.keys(params)?.length; i++) {
    if (params[Object.keys(params)[i]]) {
      result +=
        i > 0
          ? "&" +
            "" +
            Object.keys(params)[i] +
            "" +
            "=" +
            params[Object.keys(params)[i]]
          : Object.keys(params)[i] + "" + "=" + params[Object.keys(params)[i]];
    }
  }
  return result;
};

export const troncate = (s) => {
  if (s?.length > 25) {
    return s.slice(0, 25) + "...";
  }else {
    return s;
  }
};

export const setBypassOnboarding = async () => {
  await AsyncStorage.setItem(
    IS_BYPASS_ONBOARDING,
    JSON.stringify({ data: true })
  );
};

export const getLocalStorageOnBoardingState = async (key) => {
  return await AsyncStorage.getItem(key);
};

export function formatTimeFromDate(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes with two digits (e.g., 09:05 instead of 9:5)
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}