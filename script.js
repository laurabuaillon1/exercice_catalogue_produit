const produits = [
  {
    nom: "Smartphone X",
    categorie: "Électronique",
    prix: 699,
    image: "https://placehold.co/200x150?text=Smartphone",
  },
  {
    nom: "Roman Policier",
    categorie: "Livres",
    prix: 14,
    image: "https://placehold.co/200x150?text=Livre",
  },
  {
    nom: "T-shirt Coton",
    categorie: "Vêtements",
    prix: 25,
    image: "https://placehold.co/200x150?text=T-shirt",
  },
  {
    nom: "Casque Bluetooth",
    categorie: "Électronique",
    prix: 89,
    image: "https://placehold.co/200x150?text=Casque",
  },
  {
    nom: "Sweat à capuche",
    categorie: "Vêtements",
    prix: 40,
    image: "https://placehold.co/200x150?text=Sweat",
  },
  {
    nom: "Essai Historique",
    categorie: "Livres",
    prix: 19,
    image: "https://placehold.co/200x150?text=Essai",
  },
];

/*Préparation des Données et du contexte*/

const containerProduits = document.querySelector("#empty");
const inputRecherche = document.querySelector("#site-search");
const boutonsFiltre = document.querySelectorAll(".btn-filtre");
const noResultsMessage = document.querySelector("#error__message");

let categorieActive = "tous";
let rechercheActive = "";

/* Affichage des Produits (afficherProduits)*/
function afficherProduits(produitAafficher) {
  containerProduits.replaceChildren();

  if (produitAafficher.length === 0) {
    containerProduits.textContent = "Aucun résultat trouvé";
  } else {
    noResultsMessage.style.display = "none";
  }

  for (let produit of produitAafficher) {
    let carteProduit = document.createElement("div");
    carteProduit.classList.add("product");
    let img = document.createElement("img");
    img.src = produit.image;
    img.alt = produit.nom + "-" + produit.categorie;

    let title = document.createElement("h3");
    let categorie = document.createElement("span");
    let prix = document.createElement("p");

    title.textContent = produit.nom;
    categorie.textContent = produit.categorie;
    prix.textContent = produit.prix + "€";

    containerProduits.appendChild(carteProduit);
    carteProduit.appendChild(img);
    carteProduit.appendChild(title);
    carteProduit.appendChild(categorie);
    carteProduit.appendChild(prix);
  }
}

/*Logique de filtrage*/

function filtrerProduits() {
  const resultat = produits.filter((produit) => {
    const nomProduit = produit.nom.toLowerCase();
    const recherche = rechercheActive.toLowerCase();
    const matchRecherche = nomProduit.includes(recherche);
    let matchCategorie = false;
    
    if (categorieActive === "tous") {
      matchCategorie = true;
    } else if (produit.categorie === categorieActive) {
      matchCategorie = true;
    }

    if (matchCategorie && matchRecherche) {
      return true;
    } else {
      return false;
    }
  });

  afficherProduits(resultat);
}

afficherProduits(produits);

/*GESTION DES INTERACTIONS UTILISATEURS*/

/*bouton textuelle*/
inputRecherche.addEventListener("input", (event) => {
  console.log(event.target.value);
  rechercheActive = event.target.value;
  filtrerProduits();
});

/*boutons de categorie*/
boutonsFiltre.forEach((bouton) => {
  bouton.addEventListener("click", (event) => {
    boutonsFiltre.forEach((btn) => {
      btn.classList.remove("active");
    });
    console.log(boutonsFiltre)
    bouton.classList.add("active");
    categorieActive = event.currentTarget.dataset.categorie;
     console.log("Catégorie cliquée:", categorieActive);
    console.log("Produits disponibles:", produits);
    filtrerProduits();
  });
});

/*
1. Préparation des Données et du Contexte

    Données produits : Un tableau (liste) d'objets JavaScript est défini. Chaque objet représente un produit avec son nom, sa categorie, son prix et l'URL de son image. C'est le catalogue de base.

    Sélection des Éléments (DOM) : Les références vers les éléments HTML essentiels sont stockées dans des variables (containerProduits, inputRecherche, boutonsFiltre, noResultsMessage). Cela permet au code d'interagir facilement avec la page (comme afficher les produits ou lire la saisie utilisateur).

    Définition de l'État : Deux variables d'état sont créées (categorieActive initialisée à 'Tous', et rechercheActive initialisée à ''). Elles servent à mémoriser ce que l'utilisateur est en train de filtrer à un instant donné.

2. Affichage des Produits (afficherProduits)

Cette fonction est responsable de la création et de l'affichage des cartes de produits sur la page.

    Elle commence par vider le conteneur HTML principal pour s'assurer qu'il n'y a pas d'anciens produits.

    Elle vérifie si la liste de produits qu'elle a reçue est vide. Si oui, elle affiche le message "Aucun résultat trouvé" et s'arrête. Sinon, elle masque ce message.

    Pour chaque produit dans la liste fournie :

        Elle crée un élément div pour la carte du produit.

        Elle crée un élément img pour l'image et y affecte l'URL et le texte alternatif.

        Elle crée les éléments de texte (titre h3, catégorie span, prix p) et y insère les données du produit.

        Elle assemble tous ces éléments ensemble (texte dans un conteneur, puis image et conteneur de texte dans la carte principale).

        Enfin, elle ajoute la carte complète au conteneur principal affiché dans la page web.

3. Logique de Filtrage (filtrerProduits)

Cette fonction est le moteur du filtre, combinant la recherche et la catégorie.

    Elle utilise la méthode filter() sur le tableau initial des produits pour créer un nouveau tableau (produitsFiltres).

    Pour chaque produit, elle vérifie deux conditions principales :

        Condition de Catégorie : Le produit doit correspondre à la categorieActive mémorisée, sauf si la catégorie active est 'Tous'.

        Condition de Recherche : Le nom du produit doit inclure le texte de la rechercheActive mémorisée. Pour que la recherche soit efficace, elle convertit à la fois le nom du produit et la recherche active en minuscules (insensible à la casse).

    Seuls les produits qui remplissent les deux conditions en même temps sont conservés dans le nouveau tableau.

    Une fois le nouveau tableau filtré créé, la fonction appelle afficherProduits pour mettre à jour l'affichage sur la page avec ce résultat.

4. Gestion des Interactions Utilisateur (Événements)

Ces sections connectent les actions de l'utilisateur aux fonctions de filtrage.

    Recherche Textuelle :

        Un écouteur d'événement est placé sur la barre de recherche (inputRecherche) qui se déclenche à chaque fois que l'utilisateur tape une lettre ('input').

        Lorsque l'événement se produit, elle met à jour la variable d'état rechercheActive avec le contenu actuel de la barre de recherche.

        Elle appelle immédiatement la fonction filtrerProduits() pour recalculer et afficher les résultats.

    Boutons de Catégorie :

        Elle parcourt tous les boutons de filtre (boutonsFiltre).

        Un écouteur d'événement est placé sur chaque bouton, se déclenchant lors d'un clic.

        Lors du clic, elle gère l'aspect visuel : elle retire la classe 'active' de tous les boutons, puis l'ajoute au bouton qui vient d'être cliqué.

        Elle met à jour la variable d'état categorieActive avec la catégorie associée au bouton cliqué (stockée dans l'attribut data-categorie).

        Elle appelle ensuite la fonction filtrerProduits() pour recalculer et afficher les produits de la nouvelle catégorie.

5. Initialisation

    À la fin du script, la fonction filtrerProduits() est appelée une première fois.

    Comme les états sont initialisés à categorieActive = 'Tous' et rechercheActive = '', cela permet d'afficher tous les produits dès le chargement de la page.


*/
