import { addOpinions, getOpinions } from "./opinions.js";

//we getting data from api...
const response = await fetch("http://localhost:8081/pieces");
const articles = await response.json();

//we add opinions...
addOpinions();

//we display articles...
function displayArticles(articles){
    for(let i = 0 ;  i < articles.length ; i++){
        const article = articles[i];
        
        const articleImage = document.createElement("img");
        articleImage.src = article.image;

        const articleName = document.createElement("h2");
        articleName.innerHTML = article.nom;

        const articlePrice = document.createElement("p");
        articlePrice.innerHTML = `Prix : ${article.prix} €`;

        const articleType = document.createElement("p");
        articleType.innerHTML = article.categorie ?? "(aucune catégorie)";

        const articleDescription = document.createElement("p");
        articleDescription.innerHTML = article.description ?? "(aucune description)";

        const articleAvailable = document.createElement("p");
        articleAvailable.innerHTML = article.disponibilite ? "En stock" : "Rupture de stock";

        const opinionsButton = document.createElement("button");
        opinionsButton.dataset.id = article.id;
        opinionsButton.innerText = "Voir avis";
        opinionsButton.classList.add("btn");

        const articleElement = document.createElement("article");

        const articlesLists = document.querySelector(".articles-lists");
        articlesLists.appendChild(articleElement);

        articleElement.appendChild(articleImage);
        articleElement.appendChild(articleName);
        articleElement.appendChild(articlePrice);
        articleElement.appendChild(articleType);
        articleElement.appendChild(articleDescription);
        articleElement.appendChild(articleAvailable);
        articleElement.appendChild(opinionsButton);
    }

    //we getting opinions...
    getOpinions();
}

displayArticles(articles);

//sort articles...
const buttonSort1 = document.getElementById("btn-sort1");
buttonSort1.addEventListener("click", () => {
    const increasingPrice = Array.from(articles);

    increasingPrice.sort((a,b) =>  a.prix - b.prix);

    document.querySelector(".articles-lists").innerHTML = "";
    displayArticles(increasingPrice);
});

const buttonSort2 = document.getElementById("btn-sort2");
buttonSort2.addEventListener("click", () => {
    const decreasingPrice = Array.from(articles);

    decreasingPrice.sort((a,b) => b.prix - a.prix);

    document.querySelector(".articles-lists").innerHTML = "";
    displayArticles(decreasingPrice);
});

//filter articles...
const buttonFilter1 = document.getElementById("btn-filter1");
buttonFilter1.addEventListener("click", () => {
    const opticalArticles = articles.filter(article => article.categorie === "Optiques");

    document.querySelector(".articles-lists").innerHTML = "";
    displayArticles(opticalArticles);
});

const buttonFilter2 = document.getElementById("btn-filter2");
buttonFilter2.addEventListener("click", () => {
    const brakingArticles = articles.filter(article => article.categorie === "Freinage");

    document.querySelector(".articles-lists").innerHTML = "";
    displayArticles(brakingArticles);
});

const inputMaxPrice = document.getElementById("max-price");
inputMaxPrice.addEventListener("input", () => {
     const maxPrice = articles.filter(article => article.prix <= inputMaxPrice.value);

     document.querySelector(".articles-lists").innerHTML = "";
     displayArticles(maxPrice);
});