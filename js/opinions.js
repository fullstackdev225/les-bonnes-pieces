export function getOpinions(){
    const buttonElement = document.querySelectorAll(".articles-lists article button");
    for(let i = 0 ; i < buttonElement.length ; i++){
        buttonElement[i].addEventListener("click", async (event) => {
            const id = event.target.dataset.id;
            const response = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const opinions = await response.json();
            const articleElement = event.target.parentElement;

            const paragraphElement = document.createElement("p");
            for(let i = 0 ; i < opinions.length ; i++){
               paragraphElement.innerHTML += `${opinions[i].utilisateur} : ${opinions[i].commentaire} <br>`;
            }

            articleElement.appendChild(paragraphElement);
        })
    }
}


export function setOpinions(){
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const opinions = {
           pieceId: parseInt(event.target.querySelector("#article-id").value),
           utilisateur: event.target.querySelector("#username").value,
           commentaire: event.target.querySelector("#opinion").value
        };

        const chargeUtile = JSON.stringify(opinions);

        fetch(`http://localhost:8081/avis`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: chargeUtile
        });
    })
}