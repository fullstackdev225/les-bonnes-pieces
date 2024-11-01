export function getOpinions(){
    const buttonElement = document.querySelectorAll(".section-articles article button");

    for(let i = 0 ; i < buttonElement.length ; i++){
        buttonElement[i].addEventListener("click", async (event) => {
            const id = event.target.dataset.id;
            const response = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const opinions = await response.json();
            const articleElement = event.target.parentElement;

            const opinionElement = document.createElement("p");
            for(let i = 0 ; i < opinions.length ; i++){
                opinionElement.innerHTML += `${opinions[i].utilisateur} : ${opinions[i].commentaire} <br>`;
            }

            articleElement.appendChild(opinionElement);
        });
    }
}

export function addOpinions(){
    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const opinions = {
            pieceId: parseInt(event.target.querySelector("[name=article-id]").value),
            utilisateur: event.target.querySelector("[name=username]").value,
            commentaire: event.target.querySelector("[name=user-message]").value
        };

        const chargeUtile = JSON.stringify(opinions);

        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: chargeUtile
        });
    });
}