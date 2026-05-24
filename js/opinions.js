export function getOpinions(){
    const buttonOpinions = document.querySelectorAll(".articles-section article button");
    for(let i = 0 ; i < buttonOpinions.length ; i++){
        buttonOpinions[i].addEventListener("click", async (event) => {
            const id = event.target.dataset.id;
            const response = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const opinions = await response.json();
            const articleElement = event.target.parentElement;

            const opinionsParagraph = document.createElement("p");
            for(let i = 0 ; i < opinions.length ; i++){
                opinionsParagraph.innerHTML += `${opinions[i].utilisateur} : ${opinions[i].commentaire} <br>`;
            }

            articleElement.appendChild(opinionsParagraph);
        })
    }
}