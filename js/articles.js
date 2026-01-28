//we getting articles data from api...
const response = await fetch(`http://localhost:8081/pieces`);
const articles = await response.json();

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

        const articlesLists = document.querySelector(".articles-lists");
        articlesLists.appendChild(articleElement);

        articleElement.appendChild(imageElement);
        articleElement.appendChild(nameElement);
        articleElement.appendChild(priceElement);
        articleElement.appendChild(typeElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(availabilityElement);
    }
}

displayArticles(articles);