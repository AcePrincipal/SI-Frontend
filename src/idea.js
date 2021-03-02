const newIdea = document.querySelector("#new-idea")
const ideaForm = document.querySelector("#idea-form")

class Idea {
    constructor({id, title, content}){
        this.title = title
        this.content = content

        this.element = document.createElement("div")
        this.element.id = `idea-${id}`
        this.ideasList = document.querySelector("#ideas-list")



    }

    static fetchIdeas(id){

        fetch(`http://localhost:3000/businesses/${id}/ideas`)
        .then(res => res.json())
        .then(ideaData => {
                ideaData.forEach(idea => {
                    let x = new Idea(idea)
                    x.addToDom()
                })
        })

    }

    static createIdea(e){
        e.preventDefault()
        let title = document.querySelector("#title").value
        let content = document.querySelector("#content").value
        let businessId = document.querySelector("#business_id").value

        ideaForm.reset()

        let ideaObj = {
            title, content
        }

        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(ideaObj)
        }

        fetch(`http://localhost:3000/businesses/${businessId}/ideas`, config)
        .then(res => res.json())
        .then(res => {
            let r = new Idea(res)
            r.addToDom()
            newIdea.style.display=""
            ideaForm.style.display="none"

        })
    }

    static listenForEvents(){
        newIdea.addEventListener('click', this.showForm)
        ideaForm.addEventListener('submit', (e) => Idea.createIdea(e))
    }

    static showForm(){
        newIdea.style.display="none"
        ideaForm.style.display=""
    }

    addToDom(){
        this.ideasList.appendChild(this.setElementHTML())
    }

    setElementHTML(){
         this.element.innerHTML = `
         <h1>${this.title}</h1>
         <p>${this.content}</p>
         `   
         return this.element
    }
}