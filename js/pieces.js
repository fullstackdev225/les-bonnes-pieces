import { getOpinion, addOpinion } from "./avis.js";

//getting article data from api...
const response = await fetch("http://localhost:8081/pieces");
const articles = await response.json();

addOpinion();

//display article on the webpage...
function displayArticle(articles){
    for(let i = 0 ; i < articles.length ; i++){
        const article = articles[i];

        const articleElement = document.createElement("article");

        const articleImage = document.createElement("img");
        articleImage.src = article.image;

        const articleName = document.createElement("h2");
        articleName.innerHTML = article.nom;

        const articlePrice = document.createElement("p");
        articlePrice.innerHTML = `Prix: ${article.prix} $`;

        const articleType = document.createElement("p");
        articleType.innerHTML = article.categorie ?? "(aucune catégorie)";

        const articleDescription = document.createElement("p");
        articleDescription.innerHTML = article.description ?? "(aucune description)";

        const articleAvailable = document.createElement("p");
        articleAvailable.innerHTML = article.disponibilite ? "En stock" : "Rupture de stock";

        const buttonOpinion = document.createElement("button");
        buttonOpinion.dataset.id = article.id;
        buttonOpinion.textContent = "Voir avis";

        const articleList = document.querySelector(".article-list");
        articleList.appendChild(articleElement);

        articleElement.appendChild(articleImage);
        articleElement.appendChild(articleName);
        articleElement.appendChild(articlePrice);
        articleElement.appendChild(articleType);
        articleElement.appendChild(articleDescription);
        articleElement.appendChild(articleAvailable);
        articleElement.appendChild(buttonOpinion);
    }

    getOpinion();
}

displayArticle(articles);

//making filter featured...
const opticalButton = document.getElementById("optical-article");
opticalButton.addEventListener("click", () => {
    const opticalArticle = articles.filter(article => article.categorie === "Optiques");

    document.querySelector(".article-list").innerHTML = "";
    displayArticle(opticalArticle);
});

const brakingButton = document.getElementById("braking-article");
brakingButton.addEventListener("click", () => {
    const brakingArticle = articles.filter(article => article.categorie === "Freinage");

    document.querySelector(".article-list").innerHTML = "";
    displayArticle(brakingArticle);
});

const priceButton = document.getElementById("low-price");
priceButton.addEventListener("input", () => {
    const lowPrice = articles.filter(article => article.prix < 40);

    document.querySelector(".article-list").innerHTML = "";
    displayArticle(lowPrice);
});


//making sort featured...
const ascendingButton = document.getElementById("ascending-price");
ascendingButton.addEventListener("click", () => {
    const ascendingPrice = Array.from(articles);

    ascendingPrice.sort((a,b) => a.prix - b.prix);

    document.querySelector(".article-list").innerHTML = "";
    displayArticle(ascendingPrice);
});

const decreasingButton = document.getElementById("decreasing-price");
decreasingButton.addEventListener("click", () => {
    const decreasingPrice = Array.from(articles);

    decreasingPrice.sort((a,b) => b.prix - a.prix);

    document.querySelector(".article-list").innerHTML = "";
    displayArticle(decreasingPrice);
});