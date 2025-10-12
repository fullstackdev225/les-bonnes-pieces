//we getting articles from api...
const response = await fetch("http://localhost:8081/pieces");
const articles = await response.json();

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

        const articlesLists = document.querySelector(".articles-lists");
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