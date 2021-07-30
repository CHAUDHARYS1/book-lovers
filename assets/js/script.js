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

$("#searchBtn1").on("click", function () {
    var searchInput = document.getElementById("searchBar1").value;
    if(searchInput === "") {

    }
    else {
        fetchBook(searchInput);
    }
});





