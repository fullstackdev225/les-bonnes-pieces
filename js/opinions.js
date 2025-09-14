export function getOpinions() {
    const buttonOpinions = document.querySelectorAll(".articles-lists article button");
    
    for (let i = 0; i < buttonOpinions.length; i++) {
        buttonOpinions[i].addEventListener("click", async (event) => {
            const id = event.target.dataset.id;

            // Vérifie si les avis sont déjà en cache (localStorage)
            let opinions = window.localStorage.getItem(`opinions_${id}`);
            
            if (opinions) {
                opinions = JSON.parse(opinions); // transforme en objet utilisable
            } else {
                // Si pas en cache → on fetch depuis l'API
                const response = await fetch(`http://localhost:8081/pieces/${id}/avis`);
                opinions = await response.json();

                // Stockage en localStorage
                window.localStorage.setItem(`opinions_${id}`, JSON.stringify(opinions));
            }

            // Récupère l'élément parent (article)
            const articleElement = event.target.parentElement;

            // Vérifie si les avis ne sont pas déjà affichés
            if (!articleElement.querySelector(".opinions")) {
                const opinionElement = document.createElement("div");
                opinionElement.classList.add("opinions");

                for (let i = 0; i < opinions.length; i++) {
                    opinionElement.innerHTML += `${opinions[i].utilisateur} : ${opinions[i].commentaire} <br>`;
                }

                articleElement.appendChild(opinionElement);
            }
        });
    }
}



export function setOpinions(){
    const form = document.querySelector(".form");
    form.addEventListener("submit", (event) => {
        //stop prevent default...
        event.preventDefault();

        const opinions = {
            pieceId: parseInt(event.target.querySelector("#piece-id").value),
            utilisateur: event.target.querySelector("#username").value,
            commentaire: event.target.querySelector("#opinion").value
        };

       const chargeUtile = JSON.stringify(opinions);

       fetch(`http://localhost:8081/avis`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: chargeUtile
       });

    });
}