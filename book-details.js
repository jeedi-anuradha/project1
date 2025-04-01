// Get book ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const bookId = parseInt(urlParams.get('id'));  // Retrieve the book ID from URL

if (isNaN(bookId)) {
    document.getElementById('book-detail').innerHTML = '<p>No book found</p>';
}

// Load books data from localStorage
let books = JSON.parse(localStorage.getItem('books')) || [];

// Find the book by ID
let book = books.find(b => b.id === bookId);
console.log("book id is " + bookId);

if (book) {
    // Display the book details
    document.getElementById('book-image').src = book.bookImage;  // Set the book image
    document.getElementById('book-title').textContent = book.bookTitle;  // Set the title
    document.getElementById('book-author').textContent = `Author: ${book.bookAuthor}`;  // Set the author
    document.getElementById('book-description').textContent = book.bookDescription || 'No description available.';  // Set the description

    // Display average rating
    displayRating(book);
} else {
    document.getElementById('book-detail').innerHTML = '<p>Book not found</p>';
}

// Add the book to cart functionality
document.getElementById('add-to-cart').addEventListener('click', function () {
    addToCart(bookId);
});

// Function to add book to cart
function addToCart(bookId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let bookInCart = cart.find(item => item.id === bookId);

    if (!bookInCart) {
        let book = books.find(b => b.id === bookId);
        if (book) {
            cart.push({
                id: book.id,
                bookTitle: book.bookTitle
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${book.bookTitle} added to cart`);
        }
    } else {
        alert(`${book.bookTitle} is already in the cart.`);
    }
}

// Function to display average rating
function displayRating(book) {
    const ratingHolder = document.getElementById('rating-holder');
    const stars = ratingHolder.getElementsByClassName('star');
    const averageRating = book.ratings ? (book.ratings.reduce((a, b) => a + b) / book.ratings.length).toFixed(1) : 0;

    // Highlight the stars based on average rating
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove('selected');
        if (i < averageRating) {
            stars[i].classList.add('selected');
        }
    }
}

// Add click event to stars for rating
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', function () {
        const rating = parseInt(this.dataset.value);
        rateBook(bookId, rating);
        displayRating(books.find(b => b.id === bookId)); // Refresh the displayed rating
    });
});

// Function to rate the book
function rateBook(bookId, rating) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    let book = books.find(b => b.id === bookId);

    // Initialize ratings array if it doesn't exist
    if (!book.ratings) {
        book.ratings = [];
    }

    // Add new rating and save back to localStorage
    book.ratings.push(rating);
    localStorage.setItem('books', JSON.stringify(books));
}

// Fetch the book details from localStorage using the book ID from the URL
async function fetchBookDetails() {
    let bookId = new URLSearchParams(window.location.search).get('id');
    let books = JSON.parse(localStorage.getItem("books"));
    let book = books.find(b => b.id === parseInt(bookId));

    if (!book) {
        // Handle case when book is not found
        alert("Book not found!");
        return;
    }

    // Display book details
    document.getElementById('book-title').innerText = book.bookTitle;
    document.getElementById('book-author').innerText = `By ${book.bookAuthor}`;
    document.getElementById('book-image').src = book.bookImage;
    document.getElementById('book-description').innerText = book.bookDescription;
    document.getElementById('book-price').innerText = ` INR ${book.bookPrice}`

    // Display reviews
    displayReviews(book);
}

// Display the reviews of the book
function displayReviews(book) {
    let reviewList = document.getElementById('review-list');
    reviewList.innerHTML = ''; // Clear existing reviews

    if (book.reviews && book.reviews.length > 0) {
        book.reviews.forEach(review => {
            let reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `
                <p><strong>${review.user}</strong></p>
                <p>${review.comment}</p>
            `;
            reviewList.appendChild(reviewItem);
        });
    } else {
        reviewList.innerHTML = '<p>No reviews yet.</p>';
    }
}

// Handle submitting a new review
document.getElementById('submit-review').addEventListener('click', function () {
    let comment = document.getElementById('review-comment').value;
    let user = "Anonymous";  // You can replace this with an actual user name if needed

    if (!comment) {
        alert("Please write a comment.");
        return;
    }

    let bookId = new URLSearchParams(window.location.search).get('id');
    let books = JSON.parse(localStorage.getItem("books"));
    let book = books.find(b => b.id === parseInt(bookId));

    if (book) {
        // Initialize reviews array if it doesn't exist
        if (!book.reviews) {
            book.reviews = [];
        }

        // Add new review
        book.reviews.push({ user, comment });
        localStorage.setItem('books', JSON.stringify(books));

        // Display updated reviews
        displayReviews(book);

        // Clear review form
        document.getElementById('review-comment').value = '';
    }
});

// Call the function to fetch and display book details on page load
window.onload = fetchBookDetails;
// Function to simulate loading the book details
function loadBookDetails() {
    // Show the loader (in case there's some delay in fetching data)
    document.getElementById("loader").style.display = "block";
    document.getElementById("book-detail").style.display = "none"; // Hide content initially

    // Simulate loading data (like from an API or database)
    setTimeout(function () {
        // After data is loaded, fill in the book details
        document.getElementById('book-title').innerText = book.bookTitle;
        document.getElementById('book-author').innerText = `By ${book.bookAuthor}`;
        document.getElementById('book-image').src = book.bookImage;
        document.getElementById('book-description').innerText = book.bookDescription;
        document.getElementById('book-price').innerText = ` INR ${book.bookPrice}`

        // Now hide the loader and show the content
        document.getElementById("loader").style.display = "none";
        document.getElementById("book-detail").style.display = "block";
    }, 2000); // Simulate a 2-second delay for loading the content
}

// Call the function when the page loads
window.onload = loadBookDetails;
