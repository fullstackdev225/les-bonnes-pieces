//we getting data articles from api
const response = await fetch("http://localhost:8081/pieces");
const articles = await response.json();

//we display articles...
function displayArticles(articles){
    for(let i = 0 ; i < articles.length ; i++){
        const article = articles[i];

        const articleImage = document.createElement("img");
        articleImage.src = article.image;

        const articleName = document.createElement("h2");
        articleName.innerHTML = article.nom;

        const articlePrice = document.createElement("p");
        articlePrice.innerHTML = `Prix: ${article.prix} €`;

        const articleType = document.createElement("p");
        articleType.innerHTML = article.categorie ?? "(aucune catégorie)";

        const articleDescription = document.createElement("p");
        articleDescription.innerHTML = article.description ?? "(aucune description)";

        const articleAvailability = document.createElement("p");
        articleAvailability.innerHTML = article.disponibilite ? "En stock" : "Rupture de stock";

        const articleElement = document.createElement("article");

        const articlesLists = document.querySelector(".section-articles");
        articlesLists.appendChild(articleElement);

        articleElement.appendChild(articleImage);
        articleElement.appendChild(articleName);
        articleElement.appendChild(articlePrice);
        articleElement.appendChild(articleType);
        articleElement.appendChild(articleDescription);
        articleElement.appendChild(articleAvailability);
    }
}

displayArticles(articles);

//filter of articles...
const btnFilter1 = document.getElementById("btn-filter1");
btnFilter1.addEventListener("click", () => {
    const opticalArticles = articles.filter(article => article.categorie === "Optiques");

    document.querySelector(".section-articles").innerHTML = "";
    displayArticles(opticalArticles);
});

const btnFilter2 = document.getElementById("btn-filter2");
btnFilter2.addEventListener("click", () => {
    const brakingArticles = articles.filter(article => article.categorie === "Freinage");

    document.querySelector(".section-articles").innerHTML = "";
    displayArticles(brakingArticles);
});

const maxPriceValue = document.getElementById("max-price");
maxPriceValue.addEventListener("input", () => {
    const maxPrice = articles.filter(article => article.prix <= maxPriceValue.value);

    document.querySelector(".section-articles").innerHTML = "";
    displayArticles(maxPrice);
});

//sort of articles...
const btnSort1 = document.getElementById("btn-sort1");
btnSort1.addEventListener("click", () => {
    const increasingPrice = Array.from(articles);

    increasingPrice.sort((a,b) => a.prix - b.prix);

    document.querySelector(".section-articles").innerHTML = "";
    displayArticles(increasingPrice);
});

const btnSort2 = document.getElementById("btn-sort2");
btnSort2.addEventListener("click", () => {
    const decreasingPrice = Array.from(articles);

    decreasingPrice.sort((a,b) => b.prix - a.prix);

    document.querySelector(".section-articles").innerHTML = "";
    displayArticles(decreasingPrice);
});

