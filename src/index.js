document.addEventListener('DOMContentLoaded', () => {

    const qs = (selector) => document.querySelector(selector)
    const ce = (element) => document.createElement(element)
    const url = "http://localhost:3000/dogs"
    const table = qs("#table-body")
    const dogForm = qs("#dog-form")

    function fetchDogs(){
        table.innerHTML = ""
        dogForm.reset()
        fetch(url)
        .then(res => res.json())
        .then(dogs => dogs.forEach(dog => addDog(dog)))
    }
    function addDog(dog){
        const tr = ce("tr")
        tr.className = "dog"

        const name = ce("td")
        name.innerText = dog.name 

        const breed = ce("td")
        breed.innerText = dog.breed

        const sex = ce("td")
        sex.innerText = dog.sex 

        const editBtn = ce("button")
        editBtn.innerText = "Edit"
        editBtn.addEventListener("click", () => {
            dogForm[0].value = dog.name
            dogForm[1].value = dog.breed 
            dogForm[2].value = dog.sex 
            dogId = dog.id
        })

        tr.append(name, breed, sex, editBtn)
        table.append(tr)
    }

    dogForm.addEventListener("submit", () => {
        event.preventDefault()
        fetch(url + `/${dogId}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
              name: dogForm[0].value,
              breed: dogForm[1].value,
              sex: dogForm[2].value
            })
        })
        .then(res => res.json())
        .then(res => {
            fetchDogs()
        })
    })
    fetchDogs()
})