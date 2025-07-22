export function getAvis(){
    const buttonElement = document.querySelectorAll(".articles-lists article button");
    for(let i = 0 ; i < buttonElement.length ; i++){
        buttonElement[i].addEventListener("click", async (event) => {
            const id = event.target.dataset.id;
            const response = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await response.json();
            const articleElement = event.target.parentElement;

            const avisElement = document.createElement("p");
            for(let i = 0 ; i < avis.length ; i++){
                avisElement.innerHTML += `${avis[i].utilisateur} : ${avis[i].commentaire} <br>`;
            }

            articleElement.appendChild(avisElement);
        })
    }
}


export function setAvis(){
    const form = document.querySelector(".form");
    form.addEventListener("submit", (event) => {
        //we stop prevent default...
        event.preventDefault();

        //we getting user data...
        const avis = {
            pieceId: parseInt(event.target.querySelector("#piece-id").value),
            utilisateur: event.target.querySelector("#username").value,
            commentaire: event.target.querySelector("#avis").value
        };

        //we convert data to json format...
        const chargeUtile = JSON.stringify(avis);

        //we send data to api...
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: chargeUtile
        });
    });
}