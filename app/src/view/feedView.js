
class feedView{

//After page has loaded, functions and events will be available.
   onPageLoaded(){
        window.addEventListener("load", function() {

            console.log("dom loaded");
        });    
        
        //Wait three seconds after the page finished loading, so the events won't be triggered before. 
                const timeout = setTimeout(function() {
                openBookInformation();
                onFavButtonClicked();
                },3000);    
                
    }
}

//Opens and closes a modal window with information after clicking on a book entry in feed
function openBookInformation(){
    console.log("modal");
    
    let bookModal = document.querySelector(".modal");
    let bookEntry = document.querySelectorAll(".book-entry");
    let closeBtn = document.getElementById("close-btn");

    bookEntry.forEach((e) =>    
                
    e.addEventListener("click", function(){
        console.log("open modal");
        bookModal.style.display= "block";
    })); 
        
    closeBtn.onclick = function(){
        bookModal.style.display = "none";
    }

    window.onclick = function(event){
        if(event.target == bookModal){
        bookModal.style.display = "none";
        }
    }
}

//Changes color of heart on the side of a book entry, so users will know which book they added to their favourite-list.
function onFavButtonClicked(){
    let favIcon = document.querySelectorAll("#book-list .book-entry .fa");
    console.log("favbtn");
    favIcon.forEach((e) =>    
        
        e.addEventListener("click", function(ev){
            ev.stopPropagation();

            if(this.classList.contains("fa-heart-o")){
                 console.log("add to favs");
                this.classList.add("fa-heart");
                this.classList.remove("fa-heart-o"); 
            } else{
                console.log("remove from favs");
                this.classList.add("fa-heart-o");
                this.classList.remove("fa-heart"); 
            }
    }) );
}

export default feedView;