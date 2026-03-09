//getting opinions...
export function getOpinions(){
    const buttonElement = document.querySelectorAll(".section-articles article button");
    for(let i = 0 ; i < buttonElement.length ; i++){
        buttonElement[i].addEventListener("click", async (event) => {
            const id = event.target.dataset.id;
            const response = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const opinions = await response.json();
            const articleElement = event.target.parentElement;

            const paragraphElement = document.createElement("p");
            for(let i = 0 ; i < opinions.length ; i++){
                paragraphElement.innerHTML += `<strong>${opinions[i].utilisateur}</strong> : <em>${opinions[i].commentaire}</em> <br>`;
            }

            articleElement.appendChild(paragraphElement);
        });
    }
}


//setting opinions...
export function setOpinions(){
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const opinions = {
            pieceId: parseInt(event.target.querySelector("#piece-id").value),
            utilisateur: event.target.querySelector("#username").value,
            commentaire: event.target.querySelector("#comment").value
        };

        const chargeUtile = JSON.stringify(opinions);

        fetch(`http://localhost:8081/avis`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: chargeUtile
        });
    })
}