
 //var bookModal, bookEntry, span;

class feedView{

openBookInformation(){
    let bookModal = document.querySelector(".modal");
    let bookEntry = document.querySelectorAll(".book-entry");
    let span = document.querySelector(".close");

    bookEntry.forEach((e) =>    
            
    e.addEventListener("click", function(){
        console.log("open modal");
        bookModal.style.display= "block";
    })); 
    
    span.onclick = function(){
        bookModal.style.display = "none";
    }

    window.onclick = function(event){
        if(event.target == bookModal){
        bookModal.style.display = "none";
        }
    }}

    onFavButtonClicked(){
        let favIcon = document.querySelectorAll("#book-list .book-entry .fa");
        favIcon.forEach((e) =>    
            
            e.addEventListener("click", function(ev){
                ev.stopPropagation();
                console.log("click");
                if(this.classList.contains("fa-heart-o")){
                    this.classList.add("fa-heart");
                    this.classList.remove("fa-heart-o"); 
                } else{
                    this.classList.add("fa-heart-o");
                    this.classList.remove("fa-heart"); 
                }
        }) );
    }



}


export default feedView;