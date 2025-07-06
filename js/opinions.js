export function getOpinions(){
    const buttonOpinions = document.querySelectorAll('.articles-lists article button');

    for(let i = 0 ; i < buttonOpinions.length; i++) {
        buttonOpinions[i].addEventListener('click', async (event) => {
             const id = event.target.dataset.id;
             const response = await fetch("http://localhost:8081/pieces/" + id + "/avis");
             const opinions = await response.json();
             const articleElement = event.target.parentElement;
             
             const opinionElement = document.createElement('p');
             for(let i = 0 ; i < opinions.length; i++) {
                opinionElement.innerHTML += `<strong>${opinions[i].utilisateur} :</strong> ${opinions[i].commentaire} <br/>`; 
             }

             articleElement.appendChild(opinionElement);
      });
    }

}


export function setOpinions(){
    const form = document.querySelector('.opinion-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const avis = {
            pieceId: parseInt(event.target.querySelector('#article-id').value),
            utilisateur: event.target.querySelector('#username').value,
            commentaire: event.target.querySelector('#opinion').value
        };

        const chargeUtile = JSON.stringify(avis);

        fetch('http://localhost:8081/avis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: chargeUtile
        });
    });
}