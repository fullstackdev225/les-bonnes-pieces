const response = await fetch("http://localhost:8081/pieces");
const pieces = await response.json();

function displayPieces(pieces){
    for(let i = 0 ; i < pieces.length ; i++){
        const articleElement = document.createElement("article");
        
        const imageElement = document.createElement("img");
        imageElement.src = pieces[i].image;

        const nameElement = document.createElement("h2");
        nameElement.innerHTML = pieces[i].nom;

        const priceElement = document.createElement("p");
        priceElement.innerHTML = `${pieces[i].prix} $`;
        priceElement.style.fontWeight = 'bold';

        const typeElement = document.createElement("p");
        typeElement.innerHTML = pieces[i].categorie ?? "(Aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = pieces[i].description ?? "(Aucune description)";

        const availableElement = document.createElement("p");
        availableElement.innerHTML = pieces[i].disponibilite ? "En stock" : "Rupture de stock";

        const articlesLists = document.querySelector(".articles-lists");
        articlesLists.appendChild(articleElement);

        articleElement.appendChild(imageElement);
        articleElement.appendChild(nameElement);
        articleElement.appendChild(priceElement);
        articleElement.appendChild(typeElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(availableElement);
    }
}

displayPieces(pieces);