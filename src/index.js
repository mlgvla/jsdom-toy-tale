let addToy = false;
let toyURL ="http://localhost:3000/toys"
let toyCollection = document.getElementById("toy-collection")


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});

function getToys(){
    return fetch(toyURL)
        .then(resp => resp.json())
        .then(toyData => {
            toyData.forEach(toy => renderToyCard(toy))
        })
}

function renderToyCard(toy) {
    let toyCard = document.createElement('div')
    toyCard.setAttribute('class', 'card')

    let h2 = document.createElement('h2')
    h2.innerHTML = toy.name

    let img = document.createElement('img')
    img.src = toy.image
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`

    let button = document.createElement('button')
    button.setAttribute('class', 'like-btn')
    button.innerText = "like"

    toyCard.append(h2, img, p, button)
    toyCollection.append(toyCard)
}
