const baseURL = "http://localhost:3000/"
const businessesList = document.querySelector("#businesses-list")
const businessShow = document.querySelector("#business-show")

class Business {
    static all = []
    constructor({id, name, img_url, b_url}){
        this.id = id
        this.name = name
        this.img_url = img_url
        this.b_url = b_url 
        Business.all.push(this)
    }

    static fetchBusinesses(){
        fetch(baseURL + "businesses")
        .then(res => res.json())
        .then(businessData => {
            businessData.forEach(business => {
                let organization = new Business(business)
                organization.addToDom()
            })
        })
    }

    handleClick(e){
        businessesList.style.display="none"
        businessShow.style.display=""
        this.addToShow()
        let businessId = parseInt(e.target.id.split("-")[1])
        Idea.fetchIdeas(businessId)

    }

    addToDom(){
        let img = document.createElement('img');
        img.src = this.img_url
        img.id = `business-${this.id}`
        businessesList.appendChild(img)
        img.addEventListener('click',(e) => this.handleClick(e))
    }

    addToShow(){
        let div = document.createElement('div');
        let title = document.createElement('h2');
        title.innerText = this.name
        let img = document.createElement('img');
        img.src = this.img_url
        img.id = `business-${this.id}`
        let burl = document.createElement('a');
        burl.href = this.b_url
        burl.innerText = this.b_url
        div.appendChild(title)
        div.appendChild(img)
        div.appendChild(burl)
        businessShow.prepend(div)
        let input = document.createElement('input')
        input.type="hidden"
        input.value= this.id
        input.id="business_id"
        ideaForm.prepend(input)
    }

}