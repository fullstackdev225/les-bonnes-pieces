import { getOpinions, setOpinions } from "./opinions.js";

let articles = window.localStorage.getItem('articles');

if(articles === null){
   //we getting articles from api...
   const response = await fetch("http://localhost:8081/pieces");
   articles = await response.json();

   //we convert articles data to json format...
   const articlesValue = JSON.stringify(articles);

   //we store in the local storage...
   window.localStorage.setItem("articles", articlesValue);
}
 else{
   articles = JSON.parse(articles);
 }

setOpinions();

//we display articles on the page...
function displayArticles(articles){
   for(let i = 0 ; i < articles.length ; i++){
        const articleElement = document.createElement("article");

        const articleImage = document.createElement("img");
        articleImage.src = articles[i].image;

        const articleName = document.createElement("h2");
        articleName.innerHTML = articles[i].nom;

        const articlePrice = document.createElement("h3");
        articlePrice.innerHTML = `${articles[i].prix} £`;

        const articleType = document.createElement("p");
        articleType.innerHTML = articles[i].categorie ?? "(aucune catégorie)";

        const articleDescription = document.createElement("p");
        articleDescription.innerHTML = articles[i].description ?? "(aucune description)";
        
        const articleAvailability = document.createElement("p");
        articleAvailability.innerHTML = articles[i].disponibilite ? "En stock" : "Rupture de stock";

        const opinionButton = document.createElement("button");
        opinionButton.dataset.id = articles[i].id;
        opinionButton.textContent = "Voir avis";

        const articlesLists = document.querySelector(".articles-lists");
        articlesLists.appendChild(articleElement);

        articleElement.appendChild(articleImage);
        articleElement.appendChild(articleName);
        articleElement.appendChild(articlePrice);
        articleElement.appendChild(articleType);
        articleElement.appendChild(articleDescription);
        articleElement.appendChild(articleAvailability);
        articleElement.appendChild(opinionButton);
   }

   getOpinions();
}

displayArticles(articles);

//sort of articles...
const btnSort1 = document.getElementById("btn-sort1");
btnSort1.addEventListener("click", () => {
   const opticalArticles = articles.filter(article => article.categorie === "Optiques");
   document.querySelector(".articles-lists").innerHTML = "";
   displayArticles(opticalArticles);
});

const btnSort2 = document.getElementById("btn-sort2");
btnSort2.addEventListener("click", () => {
   const freinageArticles = articles.filter(article => article.categorie === "Freinage");
   document.querySelector(".articles-lists").innerHTML = "";
   displayArticles(freinageArticles);
});

//filter of articles...
const btnFilter1 = document.getElementById("btn-filter1");
btnFilter1.addEventListener("click", () => {
   const increasingPrice = Array.from(articles);
   increasingPrice.sort((a, b) => a.prix - b.prix);
   document.querySelector(".articles-lists").innerHTML = "";
   displayArticles(increasingPrice);
});

const btnFilter2 = document.getElementById("btn-filter2");
btnFilter2.addEventListener('click', () => {
   const decreasingPrice = Array.from(articles);
   decreasingPrice.sort((a, b) => b.prix - a.prix);
   document.querySelector(".articles-lists").innerHTML = "";
   displayArticles(decreasingPrice);
});