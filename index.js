document.addEventListener('DOMContentLoaded', function(){
    Business.fetchBusinesses() 
    Idea.listenForEvents()
    Idea.listenForBackBttn()
})