// Fetch the book details from localStorage using the book ID from the URL
async function fetchBookDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get('id'));

    if (isNaN(bookId)) {
        document.getElementById('book-detail').innerHTML = '<p>No book found</p>';
        return;
    }

    let books = JSON.parse(localStorage.getItem('books')) || [];
    let book = books.find(b => b.id === bookId);

    if (!book) {
        document.getElementById('book-detail').innerHTML = '<p>Book not found</p>';
        return;
    }

    // Display book details
    document.getElementById('book-title').innerText = book.bookTitle;
    document.getElementById('book-author').innerText = `By ${book.bookAuthor}`;
    document.getElementById('book-image').src = book.bookImage;
    document.getElementById('book-description').innerText = book.bookDescription || 'No description available.';
    document.getElementById('book-price').innerText = `₹${book.bookPrice}`;

    // Display average rating
    displayRating(book);

    // Display reviews
    displayReviews(book);

    // Setup "Add to Cart" button
    document.getElementById('add-to-cart').addEventListener('click', function () {
        addToCart(bookId);
    });

    // Setup stars click event for rating
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function () {
            const rating = parseInt(this.dataset.value);
            rateBook(bookId, rating);
            let updatedBooks = JSON.parse(localStorage.getItem('books')) || [];
            let updatedBook = updatedBooks.find(b => b.id === bookId);
            displayRating(updatedBook); // Refresh after rating
        });
    });

    // Setup submit review button
    document.getElementById('submit-review').addEventListener('click', function () {
        submitReview(bookId);
    });
}

// Function to add book to cart
function addToCart(bookId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let books = JSON.parse(localStorage.getItem('books')) || [];
    let book = books.find(b => b.id === bookId);

    if (!book) return;

    let bookInCart = cart.find(item => item.id === bookId);
    if (!bookInCart) {
        cart.push({ id: book.id, bookTitle: book.bookTitle });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${book.bookTitle} added to cart`);
    } else {
        alert(`${book.bookTitle} is already in the cart.`);
    }
}

// Function to display average rating
function displayRating(book) {
    const ratingHolder = document.getElementById('rating-holder');
    const stars = ratingHolder.getElementsByClassName('star');
    const averageRating = book.ratings ? (book.ratings.reduce((a, b) => a + b) / book.ratings.length).toFixed(1) : 0;

    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove('selected');
        if (i < Math.round(averageRating)) {
            stars[i].classList.add('selected');
        }
    }
}

// Function to rate the book
function rateBook(bookId, rating) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    let book = books.find(b => b.id === bookId);

    if (!book.ratings) {
        book.ratings = [];
    }

    book.ratings.push(rating);
    localStorage.setItem('books', JSON.stringify(books));
}

// Display the reviews of the book
function displayReviews(book) {
    let reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';

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
function submitReview(bookId) {
    let comment = document.getElementById('review-comment').value;
    let user = "Anonymous";

    if (!comment) {
        alert("Please write a comment.");
        return;
    }

    let books = JSON.parse(localStorage.getItem('books')) || [];
    let book = books.find(b => b.id === bookId);

    if (!book.reviews) {
        book.reviews = [];
    }

    book.reviews.push({ user, comment });
    localStorage.setItem('books', JSON.stringify(books));
    displayReviews(book);

    // Clear review input
    document.getElementById('review-comment').value = '';
}

// Simulate a loader
function showLoader() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("book-detail").style.display = "none";

    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("book-detail").style.display = "block";
    }, 2000); // Simulate a 2-second loading time
}

// Final setup when page loads
window.onload = function () {
    showLoader();
    fetchBookDetails();
};
