import { getOpinions, setOpinions } from "./opinions.js";

//we getting articles data from api...
const response = await fetch(`http://localhost:8081/pieces`);
const articles = await response.json();

setOpinions();

//we display articles...
function displayArticles(articles){
    for(let i = 0 ; i < articles.length ; i++){
        const articleElement = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = articles[i].image;

        const nameElement = document.createElement("h2");
        nameElement.innerHTML = articles[i].nom;

        const priceElement = document.createElement("h4");
        priceElement.innerHTML = `${articles[i].prix} $`;

        const typeElement = document.createElement("p");
        typeElement.innerHTML = articles[i].categorie ?? "(Aucune categorie)";

        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = articles[i].description ?? "(Aucune description)";

        const availabilityElement = document.createElement("p");
        availabilityElement.innerHTML = articles[i].disponibilite ? "En stock" : "Rupture de stock";

        const avisButton = document.createElement("button");
        avisButton.textContent = "Voir avis";
        avisButton.dataset.id = articles[i].id;


        const articlesLists = document.querySelector(".articles-lists");
        articlesLists.appendChild(articleElement);

        articleElement.appendChild(imageElement);
        articleElement.appendChild(nameElement);
        articleElement.appendChild(priceElement);
        articleElement.appendChild(typeElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(availabilityElement);
        articleElement.appendChild(avisButton);
    }

    getOpinions();
}

displayArticles(articles);

//filter articles...
const optiquesButton = document.getElementById("btn-filter1");
optiquesButton.addEventListener("click", () => {
    const optiquesArticles = articles.filter(article => article.categorie === "Optiques")
    document.querySelector(".articles-lists").innerHTML = '';
    displayArticles(optiquesArticles);
});

const freinageButton = document.getElementById("btn-filter2");
freinageButton.addEventListener("click", () => {
    const freinageArticles = articles.filter(article => article.categorie === "Freinage");
    document.querySelector(".articles-lists").innerHTML = '';
    displayArticles(freinageArticles);
});

//sort articles...
const btnSort1 = document.getElementById("btn-sort1");
btnSort1.addEventListener("click", () => {
    const increasePrice = Array.from(articles);
    increasePrice.sort((a,b) => a.prix - b.prix);
    document.querySelector(".articles-lists").innerHTML = "";
    displayArticles(increasePrice);
});

const btnSort2 = document.getElementById("btn-sort2");
btnSort2.addEventListener("click", () => {
    const decreasePrice = Array.from(articles);
    decreasePrice.sort((a,b) => b.prix - a.prix);
    document.querySelector(".articles-lists").innerHTML = "";
    displayArticles(decreasePrice);
});