var fetchBook = function(searchInput){
    var apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchInput
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            displaySearchResults(data);
        })
}

// function to populate search results papge
var displaySearchResults = function(data) {
    console.log("title, author, thumbnail, description")
}

$("#search-btn").on("click", function (e) {
    console.log("here")
    var searchInput = document.getElementById("search-bar").value;
    if(searchInput === "") {

    }
    else {
        fetchBook(searchInput);
    }
});





