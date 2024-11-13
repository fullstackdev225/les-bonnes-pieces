//we getting data from api...
const response = await fetch("http://localhost:8081/pieces");
const articles = await response.json();

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

        const articleElement = document.createElement("article");

        const articlesLists = document.querySelector(".articles-lists");
        articlesLists.appendChild(articleElement);

        articleElement.appendChild(articleImage);
        articleElement.appendChild(articleName);
        articleElement.appendChild(articlePrice);
        articleElement.appendChild(articleType);
        articleElement.appendChild(articleDescription);
        articleElement.appendChild(articleAvailable);
    }
}

displayArticles(articles);