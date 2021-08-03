// check if bookmarked array already exists, if not, create one with an empty array
var bookmarkedBooks = JSON.parse(localStorage.getItem("bookmarkedBooks"));
if (!bookmarkedBooks) {
    localStorage.setItem("bookmarkedBooks", JSON.stringify([]))
}

// this function .....
var fetchBookDetails = function (volumeId) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    //   fetch("https://www.googleapis.com/books/v1/volumes/3YUrtAEACAAJ", requestOptions)
      fetch("https://www.googleapis.com/books/v1/volumes/" + volumeId, requestOptions)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            document.title = data.volumeInfo.title;
            populateBookDetails(data);
        })
        .catch((error) => {
            loadErrorPage();
        });

}

// this function .....
var populateBookDetails = function(data){ 

    var titleEl = document.querySelector("#book-title");
    titleEl.textContent = data.volumeInfo.title;

    var subTitleEl = document.querySelector("#sub-title");
    subTitleEl.textContent = data.volumeInfo.subtitle;

    var authorName = document.querySelector("#author-name");
    authorName.textContent = data.volumeInfo.authors[0];

    var descriptionEl = document.querySelector("#book-descripton");
    descriptionEl.innerHTML = data.volumeInfo.description;
    
    var dateEl = document.querySelector("#publish-year");
    dateEl.textContent = data.volumeInfo.publishedDate;
    
    var bookCoverEl = document.querySelector("#thumbnail-img");
    bookCoverEl.setAttribute("src", data.volumeInfo.imageLinks.thumbnail);

    var isbnEl = document.querySelector("#isbn-number");
    isbnEl.textContent = data.volumeInfo.industryIdentifiers[0].identifier;

    var ratingContainer = document.querySelector(".rating-container");
    var rating = parseInt(data.volumeInfo.averageRating);
    for(var i = 1; i < rating; i++) {

        var imgEl = document.createElement("img");
        imgEl.className = "rating-img";
        imgEl.src = "./assets/images/icons8-star-30.png";

        ratingContainer.appendChild(imgEl);        
    }

}
var loadErrorPage = function() {
    window.location.href="./error.html"
}

// check if it has query parameters
const urlParams = new URLSearchParams(window.location.search);

// if it has query parameters, get the parameter for volume id
const volumeId = urlParams.get('vol_id');

// if it has a volume id, fetchBookDetails with that volume id
if(volumeId){
    fetchBookDetails(volumeId);

    // set bookmark icon on load
    var bookmarkedImgEl = document.querySelector("#bookmark-img");
    bookmarkedImgEl.setAttribute("src", "./assets/images/unbookmarked_1.png");

    var bookmarkedBooks = JSON.parse(localStorage.getItem("bookmarkedBooks"));
    for (var i = 0; i < bookmarkedBooks.length; i++){
        // if volume id is already in the arr, set the correct icon
        if (bookmarkedBooks[i].volumeId == volumeId) {
            bookmarkedImgEl.setAttribute("src", "./assets/images/bookmarked.png");
            break;
        }
    }
}
else {
    loadErrorPage();
}

$("#bookmark-img").on("click", function (e) {
    var bookmarkedImgEl = document.querySelector("#bookmark-img");
    var title = document.getElementById("book-title").textContent
    var newBookmarked = true;
    
    var bookmarkedBooks = JSON.parse(localStorage.getItem("bookmarkedBooks"));
    for (var i = 0; i < bookmarkedBooks.length; i++){

        // if we clicked on the icon and it was already in the list, then we want to unbookmark
        if (bookmarkedBooks[i].volumeId == volumeId) {
            bookmarkedImgEl.setAttribute("src", "./assets/images/unbookmarked_1.png");
            bookmarkedBooks.splice(i, 1); // remove from bookmarked array
            UIkit.notification({message: title + " is removed from bookmarks!"})
            newBookmarked = false;
            break;
        }
    }

    if(newBookmarked) {
        bookmarkedImgEl.setAttribute("src", "./assets/images/bookmarked.png");
        bookmarkedBooks.push({
            "name" : title,
            "volumeId" : volumeId
        })
        UIkit.notification({message: title + " is added to bookmarks!"})
    }
    
    localStorage.setItem("bookmarkedBooks", JSON.stringify(bookmarkedBooks))
  });
