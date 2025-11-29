let form = document.querySelector('form')
let submitButton = document.querySelector('button')
let input = document.querySelector('input')
let userList = document.querySelector('section')

let getUsers = async ()=> {
    let response = await fetch('http://localhost:3000/users')
    let finalusers = await response.json()

    finalusers.map(user => {
        let container = document.createElement('aside')
        let name = document.createElement('p')
        let deleteButton = document.createElement('button')
        let editButton = document.createElement('button')
        let buttonsContainer = document.createElement('div')

        name.innerHTML = user.name
        deleteButton.innerHTML = 'Delete'
        editButton.innerHTML = 'Edit'

        
        // ! ADDING EVENTS

        deleteButton.addEventListener('click', () => {
            deleteUser(user.id)
        })

        editButton.addEventListener('click', () => {
            editUser(user)
        })

        buttonsContainer.append(editButton,deleteButton)
        container.append(name,buttonsContainer)
        userList.append(container)
    })
}
getUsers()


// ! CREATE USER
let createUser = async () => {
    await fetch('http://localhost:3000/users',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name: input.value})
    })
}

submitButton.addEventListener('click', () => {
    createUser()
})


// ! DELETE USER
let deleteUser = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`,{
        method: 'DELETE'
    })
}


// ! EDIT USER
let editUser = (value) => {
    input.value = value.name

    let updateButton = document.createElement('button')
    updateButton.innerHTML = 'Update'

    updateButton.addEventListener('click', () => {
        updateUser(value.id)
    })

    form.replaceChild(updateButton, submitButton)
}


let updateUser= async (id) =>{
    await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',

        headers: {
            'Content-Type' : 'application/json'
        },

        body:JSON.stringify({ name: input.value})
    })
}