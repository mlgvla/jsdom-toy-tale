let addToy = false;
let toyURL ="http://localhost:3000/toys"
let toyCollection = document.getElementById('toy-collection')
let toyForm = document.querySelector('.add-toy-form')


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener('submit', e => {
          e.preventDefault()
          postToy(e.target)
      })
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
    button.setAttribute('id', toy.id) // will need for PATCH method
    button.innerText = "like"
    button.addEventListener("click", e => addLike(e))

    toyCard.append(h2, img, p, button)
    toyCollection.append(toyCard)
}


function postToy(toyData) {
    let toyObj = {
        name: toyData.name.value,
        image: toyData.image.value,
        likes: 0
    }

    let configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(toyObj)
    }
    fetch(toyURL, configObj)
        .then(resp => resp.json())
        .then(toyData => renderToyCard(toyData))
}

function addLike(e){
    e.preventDefault()
    let p = e.target.previousElementSibling
  
    let increasedLikes = parseInt(p.innerText) + 1

    let configObj = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            likes: increasedLikes
        })
    }

    fetch(`${toyURL}/${e.target.id}`, configObj)
        .then(resp => resp.json())
        .then(result => {
            console.log(increasedLikes)
            p.innerText = `${increasedLikes} likes`
        })
}
