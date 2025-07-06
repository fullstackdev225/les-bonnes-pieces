import { getOpinions, setOpinions } from "./opinions.js";

//Getting articles from the api...
const response = await fetch('http://localhost:8081/pieces');
const articles = await response.json();

setOpinions();

// Displaying articles in the HTML
function displayArticles(articles) {
    for(let i = 0 ; articles.length > i ; i++) {
        const article = articles[i];
        const articleElement = document.createElement('article');

        const articleImage = document.createElement('img');
        articleImage.src = article.image;
       
        const articleTitle = document.createElement('h2');
        articleTitle.textContent = article.nom; 

        const articlePrice = document.createElement('p');
        articlePrice.textContent = `${article.prix} €`;

        const articleType = document.createElement('p');
        articleType.textContent = article.categorie ?? ("Aucune catégorie");

        const articleDescription = document.createElement('p');
        articleDescription.textContent = article.description ?? ("Aucune description");

        const articleAvailability = document.createElement('p');
        articleAvailability.textContent = article.disponibilite ? "En stock" : "Rupture de stock";

        const buttonOpinions = document.createElement('button');
        buttonOpinions.dataset.id = article.id;
        buttonOpinions.textContent = "Voir les avis";

        const articlesLists = document.querySelector('.articles-lists');
        articlesLists.appendChild(articleElement);

        articleElement.appendChild(articleImage);
        articleElement.appendChild(articleTitle);
        articleElement.appendChild(articlePrice);
        articleElement.appendChild(articleType);
        articleElement.appendChild(articleDescription);
        articleElement.appendChild(articleAvailability);
        articleElement.appendChild(buttonOpinions);

    }

    getOpinions(); // Call the function to handle opinions
}

displayArticles(articles);

// Filtering articles by type...
const btnOptique = document.getElementById('btn-optique');
const btnFreinage = document.getElementById('btn-freinage');

btnOptique.addEventListener('click', () => {
    const filteredArticles = articles.filter(article => article.categorie === 'Optiques');
    document.querySelector('.articles-lists').innerHTML = ''; // Clear previous articles
    displayArticles(filteredArticles);
});

btnFreinage.addEventListener('click', () => {
    const filteredArticles = articles.filter(article => article.categorie === 'Freinage');
    document.querySelector('.articles-lists').innerHTML = ''; // Clear previous articles
    displayArticles(filteredArticles);
});

// Sorting articles by price...
const btnIncrease = document.getElementById('btn-increase');
const btnDecrease = document.getElementById('btn-decrease');

btnIncrease.addEventListener('click', () => {
    const sortedArticles = Array.from(articles);
    sortedArticles.sort((a, b) => a.prix - b.prix);
    document.querySelector('.articles-lists').innerHTML = ''; // Clear previous articles
    displayArticles(sortedArticles);
});

btnDecrease.addEventListener('click', () => {
    const sortedArticles = Array.from(articles);
    sortedArticles.sort((a, b) => b.prix - a.prix);
    document.querySelector('.articles-lists').innerHTML = ''; // Clear previous articles
    displayArticles(sortedArticles);
});