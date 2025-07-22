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