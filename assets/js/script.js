var fetchBooks = function (searchInput) {
    var apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchInput;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            displaySearchResults(data);
        });
};

$("#search-btn").on("click", function (e) {
    var searchInput = document.getElementById("search-bar").value;
    if (searchInput !== "") {
        fetchBooks(searchInput);
    }
});

// function to populate search results page in main-container
var displaySearchResults = function (data) {

    var mainContainer = document.querySelector("#main-container");
    var pageLimt = 10;
    for (var index = 0; index < pageLimt; index++) {

        var book = data.items[index];

        var individualBookContainerDivEl = document.createElement("div");
        individualBookContainerDivEl.className = "individual-book-container";

        // get booklist div
        var bookDivEl = document.createElement("div");
        bookDivEl.id = "book-list";
        bookDivEl.className = "uk-grid";

        // get book cover div
        var thumbnailDivEl = document.createElement("div");
        thumbnailDivEl.className = "uk-width-auto";

        // get book cover img
        var thumbnailEl = document.createElement("img");
        thumbnailEl.id = "book-cover-img";
        thumbnailEl.setAttribute("src", "assets/images/thumbnail.png");
        thumbnailEl.setAttribute("alt", "cover photo of book");
        thumbnailDivEl.appendChild(thumbnailEl);

        // get book div
        var bookInfoEl = document.createElement("div");
        bookInfoEl.className = "uk-width-expand@m";

        // h4 inside of book div
        var bookTitleEl = document.createElement("h4");
        bookTitleEl.id = "book-title";
        bookTitleEl.classList = "uk-margin-remove-bottom";
        bookTitleEl.innerHTML = "Title of the book";

        // <p> for author name inside of book div
        var authorNameEl = document.createElement("p");
        authorNameEl.id = "author-name";
        authorNameEl.classList = "uk-margin-remove-top";
        authorNameEl.innerHTML = "Author name";

        // <p> for 'description' word inside of book div
        var descriptionWordEl = document.createElement("p");
        descriptionWordEl.classList = "uk-margin-remove-button";
        descriptionWordEl.style.fontWeight = "bold";
        descriptionWordEl.innerHTML = "Description:";

        // <p> for description for book inside of book div
        var descriptionEl = document.createElement("p");
        descriptionEl.id = "book-description";
        descriptionEl.classList = "uk-margin-remove-top";
        descriptionEl.innerHTML =
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates non quam ad repudiandae ducimus optio, reprehenderit inventore eligendi dolores? Animi blanditiis similique harum obcaecati totam iure, molestiae distinctio! Nostrum, ipsa!";

        // <a> for Learn more inside of book div
        var learnMoreEl = document.createElement("a");
        learnMoreEl.id = "learn-more";
        learnMoreEl.setAttribute("href", "./book-page.html?vol_id=" + book.id);
        learnMoreEl.innerHTML = "Learn more";

        var dividerEl = document.createElement("hr");

        bookInfoEl.append(
            bookTitleEl,
            authorNameEl,
            descriptionWordEl,
            descriptionEl,
            learnMoreEl
        );

        // append 2 child to 1 parent
        bookDivEl.append(thumbnailDivEl, bookInfoEl);
        individualBookContainerDivEl.append(bookDivEl, dividerEl);

        mainContainer.appendChild(individualBookContainerDivEl);
    }
};

