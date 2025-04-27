async function fetchData() {
    let res = await fetch("https://rust-shocking-composer.glitch.me/books");
    try {
        if (!res.ok) {
            throw new Error(res.status, res.statusText);
        }
        let data = await res.json();
        localStorage.setItem("data", JSON.stringify(data));  // Store data in localStorage
        displayData(data); // Display books after fetching them
    } catch (error) {
        console.error(error.message);
    }
}

function displayData(data) {
    let container = document.getElementsByClassName("main-container")[0];
    container.innerHTML = "";  // Clear the container first

    // Display the books
    data.forEach(book => {
        let item = document.createElement("div");
        item.classList.add("book-card");  // Add class for styling if needed
        item.innerHTML = `
            <img src="${book.bookImage}" alt="${book.bookTitle}" class="book-img"/>
            <h3>Title: ${book.bookTitle}</h3>
            <p>Author: ${book.bookAuthor}</p>
        `;
        container.appendChild(item);
    });
}

function filterData(category) {
    let books = JSON.parse(localStorage.getItem("data")) || [];
    let filteredBooks = books.filter(book => book.bookCategory.toLowerCase() === category.toLowerCase());
    displayData(filteredBooks);  // Display filtered books for the selected category
}

// On page load, check if books are in localStorage and fetch if not
window.onload = () => {
    let books = JSON.parse(localStorage.getItem('data')) || [];
    if (books.length === 0) {
        fetchData();  // Fetch books if not already in localStorage
    }
};

// Event listener for search input
document.getElementById('search').addEventListener('input', function (e) {
    let query = e.target.value.toLowerCase();
    let books = JSON.parse(localStorage.getItem("data")) || [];

    if (query === "") {
        displayData([]);  // Clear the displayed books
    } else {
        let filteredBooks = books.filter(book => {
            return book.bookTitle.toLowerCase().includes(query) ||
                book.bookCategory.toLowerCase().includes(query) ||
                book.bookAuthor.toLowerCase().includes(query);
        });

        if (filteredBooks.length > 0) {
            displayData(filteredBooks);  // Display filtered books
        } else {
            displayData([]);  // Display no books if there are no matches
        }
    }
});
