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

//filtre pieces...
const buttonOptique = document.getElementById("piece-optique");
const buttonFreinage = document.getElementById("piece-freinage");

buttonOptique.addEventListener("click", () => {
    const pieceOptique = pieces.filter(piece => piece.categorie === "Optiques");
    document.querySelector(".articles-lists").innerHTML = "";
    displayPieces(pieceOptique);
});

buttonFreinage.addEventListener("click", () => {
    const pieceFreinage = pieces.filter(piece => piece.categorie === "Freinage");
    document.querySelector(".articles-lists").innerHTML = "";
    displayPieces(pieceFreinage);
});

//trie pieces...
const btnSort1 = document.getElementById("prix-croissant");
const btnSort2 = document.getElementById("prix-decroissant");

btnSort1.addEventListener("click", () => {
    const prixCroissant = Array.from(pieces);
    prixCroissant.sort((a, b) => a.prix - b.prix);
    document.querySelector(".articles-lists").innerHTML = "";
    displayPieces(prixCroissant);
});

btnSort2.addEventListener("click", () => {
    const prixDecroissant = Array.from(pieces);
    prixDecroissant.sort((a, b) => b.prix - a.prix);
    document.querySelector(".articles-lists").innerHTML = "";
    displayPieces(prixDecroissant);
});