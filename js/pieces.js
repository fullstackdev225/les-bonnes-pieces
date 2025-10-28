//we getting data pieces from api...
const response = await fetch("http://localhost:8081/pieces");
const pieces = await response.json();

//we display pieces on the page...
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
        typeElement.innerHTML = pieces[i].categorie ?? "(aucune categorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = pieces[i].description ?? "(aucune description)";

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

//pieces filter...
const buttonFilter1 = document.getElementById("btn-filter1");
buttonFilter1.addEventListener("click", () => {
    const piecesFreinage = pieces.filter(piece => piece.categorie === "Freinage");
    document.querySelector(".articles-lists").innerHTML = "";
    displayPieces(piecesFreinage);
});

const buttonFilter2 = document.getElementById("btn-filter2");
buttonFilter2.addEventListener("click", () => {
    const piecesOptiques = pieces.filter(piece => piece.categorie === "Optiques");
    document.querySelector(".articles-lists").innerHTML = "";
    displayPieces(piecesOptiques);
});

//pieces sort...
const buttonSort1 = document.getElementById("btn-sort1");
buttonSort1.addEventListener("click", () => {
    const increasingPrice = Array.from(pieces);
    increasingPrice.sort((a,b) => a.prix - b.prix);
    document.querySelector(".articles-lists").innerHTML = "";
    displayPieces(increasingPrice);
});

const buttonSort2 = document.getElementById("btn-sort2");
buttonSort2.addEventListener("click", () => {
    const decreasingPrice = Array.from(pieces);
    decreasingPrice.sort((a,b) => b.prix - a.prix);
    document.querySelector(".articles-lists").innerHTML = "";
    displayPieces(decreasingPrice);
});