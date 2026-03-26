import { getOpinions, setOpinions } from "./opinions.js";

let pieces = window.localStorage.getItem("pieces");
if(pieces === null){
    //getting pieces data from api...
    const response = await fetch(`http://localhost:8081/pieces`);
    pieces = await response.json();

    const piecesValue = JSON.stringify(pieces);

    window.localStorage.setItem("pieces", piecesValue);
}
 else{
    pieces = JSON.parse(pieces);
 }

setOpinions();

//display pieces on the page...
function displayPieces(pieces){
    for(let i = 0 ; i < pieces.length ; i++){
        const articleElement = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = pieces[i].image;

        const nameElement = document.createElement("h2");
        nameElement.innerHTML = pieces[i].nom;

        const priceElement = document.createElement("h3");
        priceElement.innerHTML = `${pieces[i].prix} $`;

        const typeElement = document.createElement("p");
        typeElement.innerHTML = pieces[i].categorie ?? "(Aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = pieces[i].description ?? "(Aucune description)";

        const availabilityElement = document.createElement("p");
        availabilityElement.innerHTML = pieces[i].disponibilite ? "En stock" : "Rupture de stock";

       const buttonOpinions = document.createElement("button");
       buttonOpinions.dataset.id = pieces[i].id;
       buttonOpinions.textContent = "Voir avis";

        const articlesSection = document.querySelector(".articles-section");
        articlesSection.appendChild(articleElement);

        articleElement.appendChild(imageElement);
        articleElement.appendChild(nameElement);
        articleElement.appendChild(priceElement);
        articleElement.appendChild(typeElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(availabilityElement);
        articleElement.appendChild(buttonOpinions);
    }

    getOpinions();
}

displayPieces(pieces);

//filter pieces...
const buttonOptique = document.getElementById("btn-optique");
buttonOptique.addEventListener("click", () => {
    const piecesOptique = pieces.filter(piece => piece.categorie === "Optiques");
    document.querySelector('.articles-section').innerHTML = "";
    displayPieces(piecesOptique);
});

const buttonFreinage = document.getElementById("btn-freinage");
buttonFreinage.addEventListener("click", () => {
    const piecesFreinage = pieces.filter(piece => piece.categorie === "Freinage");
    document.querySelector('.articles-section').innerHTML = "";
    displayPieces(piecesFreinage);
});

//sort pieces...
const buttonIncreasePrice = document.getElementById("btn-prix-croissant");
buttonIncreasePrice.addEventListener("click", () => {
    const increasePrice = Array.from(pieces);
    increasePrice.sort((a,b) => a.prix -b.prix);
    document.querySelector(".articles-section").innerHTML = "";
    displayPieces(increasePrice);
});

const buttonDecreasePrice = document.getElementById("btn-prix-decroissant");
buttonDecreasePrice.addEventListener("click", () => {
    const decreasePrice = Array.from(pieces);
    decreasePrice.sort((a,b) => b.prix - a.prix);
    document.querySelector(".articles-section").innerHTML = "";
    displayPieces(decreasePrice);
});