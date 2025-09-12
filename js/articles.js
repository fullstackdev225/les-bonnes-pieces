import { getOpinions, setOpinions } from "./opinions.js";

//recuperation des donnees des articles depuis l'api...
const response = await fetch("http://localhost:8081/pieces");
const articles = await response.json();

setOpinions();

//affichage des articles sur la page web...
function displayArticles(articles){
    for(let i = 0 ; i < articles.length ; i++){
        const articleElement = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = articles[i].image;

        const nameElement = document.createElement("h2");
        nameElement.innerHTML = articles[i].nom;

        const priceElement = document.createElement("p");
        priceElement.innerHTML = `${articles[i].prix} $`;
        priceElement.style.fontWeight = 'bold';

        const typeElement = document.createElement("p");
        typeElement.innerHTML = articles[i].categorie ?? "(Aucune categorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = articles[i].description ?? "(Aucune description)";

        const availableElement = document.createElement("p");
        availableElement.innerHTML = articles[i].disponibilite ? "En stock" : "Rupture de stock";

        const buttonElement = document.createElement("button");
        buttonElement.dataset.id = articles[i].id;
        buttonElement.textContent = "Voir avis";

        const articlesLists = document.querySelector(".articles-lists");
        articlesLists.appendChild(articleElement);

        articleElement.appendChild(imageElement);
        articleElement.appendChild(nameElement);
        articleElement.appendChild(priceElement);
        articleElement.appendChild(typeElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(availableElement);
        articleElement.appendChild(buttonElement);
    }

    getOpinions();
}

displayArticles(articles);

//filtre des articles...
const buttonOptique = document.getElementById("optiques");
buttonOptique.addEventListener("click", () => {
    const optiqueArticle = articles.filter(article => article.categorie === "Optiques");
    document.querySelector(".articles-lists").innerHTML = "";
    displayArticles(optiqueArticle);
});

const buttonFreinage = document.getElementById("freinage");
buttonFreinage.addEventListener("click", () => {
    const freinageArticle = articles.filter(article => article.categorie === "Freinage");
    document.querySelector(".articles-lists").innerHTML = "";
    displayArticles(freinageArticle);
});

//trie des articles...
const buttonPrixCroissant = document.getElementById("increase-price");
buttonPrixCroissant.addEventListener("click", () => {
    const prixCroissant = Array.from(articles);
    prixCroissant.sort((a,b) => a.prix - b.prix);
    document.querySelector(".articles-lists").innerHTML = '';
    displayArticles(prixCroissant);
});

const buttonPrixDecroissant = document.getElementById("decrease-price");
buttonPrixDecroissant.addEventListener('click', () => {
    const prixDecroissant = Array.from(articles);
    prixDecroissant.sort((a,b) => b.prix - a.prix);
    document.querySelector('.articles-lists').innerHTML = '';
    displayArticles(prixDecroissant);
});