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

        const priceElement = document.createElement("h3");
        priceElement.innerHTML = `${articles[i].prix} $`;

        const typeElement = document.createElement("p");
        typeElement.innerHTML = articles[i].categorie ?? "(Aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = articles[i].description ?? "(Aucune description)";

        const availableElement = document.createElement("p");
        availableElement.innerHTML = articles[i].disponibilite ? "En stock" : "Rupture de stock";

        const opinionsButton = document.createElement("button");
        opinionsButton.dataset.id = articles[i].id;
        opinionsButton.textContent = "Voir avis";

        const articlesLists = document.querySelector(".section-articles");
        articlesLists.appendChild(articleElement);

        articleElement.appendChild(imageElement);
        articleElement.appendChild(nameElement);
        articleElement.appendChild(priceElement);
        articleElement.appendChild(typeElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(availableElement);
        articleElement.appendChild(opinionsButton);
    }

    getOpinions();
}

displayArticles(articles);

//articles filter...
const opticalButton = document.getElementById("btn-optique");
opticalButton.addEventListener("click", () => {
    const opticalArticles = articles.filter(article => article.categorie === "Optiques");
    document.querySelector(".section-articles").innerHTML = "";
    displayArticles(opticalArticles);
});

const brakingButton = document.getElementById("btn-freinage");
brakingButton.addEventListener("click", () => {
    const brakingArticles = articles.filter(article => article.categorie === "Freinage");
    document.querySelector(".section-articles").innerHTML = "";
    displayArticles(brakingArticles);
});



//articles sort...
const increasingPriceButton = document.getElementById("btn-prix-croissant");
increasingPriceButton.addEventListener("click", () => {
    const increasingPrice = Array.from(articles);
    increasingPrice.sort((a,b) => a.prix - b.prix);
    document.querySelector(".section-articles").innerHTML = "";
    displayArticles(increasingPrice);
});


const decreasingPriceButton = document.getElementById("btn-prix-decroissant");
decreasingPriceButton.addEventListener("click", () => {
    const decreasingPrice = Array.from(articles);
    decreasingPrice.sort((a,b) => b.prix - a.prix);
    document.querySelector(".section-articles").innerHTML = "";
    displayArticles(decreasingPrice);
});