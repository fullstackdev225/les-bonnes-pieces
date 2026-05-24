import { getOpinions, setOpinions } from "./opinions.js";

let articles = window.localStorage.getItem("articles");
if(articles === ""){
    //we getting data articles from api...
    const response = await fetch(`http://localhost:8081/pieces`);
    articles = await response.json();

    //we convert data articles in json format...
    const articlesValue = JSON.stringify(articles);

    //we store articles data in the local storage...
    window.localStorage.setItem("articles", articlesValue);
}
 else{
    articles = JSON.parse(articles);
 }

setOpinions();

//we display articles...
function displayArticles(articles){
   for(let i = 0 ; i < articles.length ; i++){
        //we create an HTML element...
        const articleElement = document.createElement("article");

        //we create each data of article...
        const imageElement = document.createElement("img");
        imageElement.src = articles[i].image;

        const nameElement = document.createElement("h2");
        nameElement.innerHTML = articles[i].nom;

        const priceElement = document.createElement("h5");
        priceElement.innerHTML = `${articles[i].prix} $`;

        const typeElement = document.createElement('p');
        typeElement.innerHTML = articles[i].categorie ?? "(Aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = articles[i].description ?? "(Aucune description)";

        const availableElement = document.createElement("p");
        availableElement.innerHTML = articles[i].disponibilite ? "En stock" : "Rupture de stock";

        const buttonElement = document.createElement("button");
        buttonElement.dataset.id = articles[i].id;
        buttonElement.textContent = "Voir avis";

        //we tag parent element...
        const articlesSection = document.querySelector(".articles-section");

        //we add child element in the parent element...
        articlesSection.appendChild(articleElement);

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

//filter articles...

const buttonFilterOptical = document.getElementById('btn-filter1');
buttonFilterOptical.addEventListener("click", () => {
    const opticalArticles = articles.filter(article => article.categorie === "Optiques");
    document.querySelector(".articles-section").innerHTML = "";
    displayArticles(opticalArticles);
});

const buttonFilterBraking = document.getElementById("btn-filter2");
buttonFilterBraking.addEventListener("click", () => {
    const brakingArticles = articles.filter(article => article.categorie === "Freinage");
    document.querySelector(".articles-section").innerHTML = "";
    displayArticles(brakingArticles);
});

//sort articles...

const buttonSort1 = document.getElementById("btn-sort1");
buttonSort1.addEventListener("click", () => {
    const increasingPrice = Array.from(articles);
    increasingPrice.sort((a,b) => a.prix - b.prix);
    document.querySelector(".articles-section").innerHTML = "";
    displayArticles(increasingPrice);
});

const buttonSort2 = document.getElementById("btn-sort2");
buttonSort2.addEventListener("click", () => {
    const decreasingPrice = Array.from(articles);
    decreasingPrice.sort((a,b) => b.prix - a.prix);
    document.querySelector(".articles-section").innerHTML = "";
    displayArticles(decreasingPrice);
});