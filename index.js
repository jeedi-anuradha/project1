let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to fetch data from the API
async function fetchData() {
    try {
        let response = await fetch('https://rust-shocking-composer.glitch.me/books');
        if (!response.ok) {
            throw new Error(response.status, response.statusText);
        }
        let books = await response.json();
        console.log('Books Data:', books);  // Debugging line to check data
        localStorage.setItem('books', JSON.stringify(books)); // Store the books data in localStorage
        displayData(books);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Function to display categories
function displayCategories() {
     let books = JSON.parse(localStorage.getItem("books"));
    let category = books.map(product => product.bookCategory);
    let set = new Set(category);
    let categoryArr = Array.from(set);
    let btncontainer = document.getElementById('btn-container');
    let catHeading = document.createElement('h3');
    catHeading.id="catHead"
    catHeading.innerText = 'Categories';
    btncontainer.innerHTML = ''; // Clear existing content
    btncontainer.appendChild(catHeading);
    btncontainer.appendChild(document.createElement('br'));
    
    categoryArr.forEach((category) => {
        let button = document.createElement('button');
        button.textContent = category;
        button.onclick = (e) => {
            filterData(category);
        }
        btncontainer.appendChild(button);
    });
}

// Function to display best seller books
function bestSeller() {
    let bestSellar = document.getElementById('best-seller');
    let rankHead = document.createElement('h3');
    rankHead.innerText = 'Best Seller';
    bestSellar.appendChild(rankHead);

    let books = JSON.parse(localStorage.getItem("books"));
    let bestSellerBooks = books.filter(book => book.bookRank == 1); // Filtering best-seller books

    if (bestSellerBooks.length === 0) {
        bestSellar.innerHTML += `<p>No Best Seller books found.</p>`;
        return;
    }

    bestSellerBooks.forEach(book => {
        let rankItem = document.createElement('div');
        rankItem.innerHTML = `
            <img src="${book.bookImage}" alt="${book.bookTitle}">
            <h3>${book.bookTitle}</h3>
            <p>Author: ${book.bookAuthor}</p>
            <div class="rating-holder" data-book-id="${book.id}">  
                ${getStars(book)} 
            </div>
            
            <button class="add-to-cart" data-product="${book.id}">Add to cart</button>
        `;
        bestSellar.appendChild(rankItem);
        setupRatingEvent(rankItem, book.id);
        rankItem.addEventListener('click', () => {
            window.location.href = `book-details.html?id=${book.id}`;
        });
    });

    setupAddToCartButtons();
}

// Function to display new arrivals
function newArrivels() {
    let newArrivels = document.getElementById('new-arrivels');
    let newHead = document.createElement('h3');
    newHead.innerText = 'New Arrivals';
    newArrivels.appendChild(newHead);

    let books = JSON.parse(localStorage.getItem("books"));
    let newBooks = books.filter(book => book.publishYear === 2024); // Filter books by new arrival year (e.g., 2024)

    if (newBooks.length === 0) {
        newArrivels.innerHTML += `<p>No new arrival books found.</p>`;
        return;
    }

    newBooks.forEach(book => {
        let newItem = document.createElement('div');
        newItem.innerHTML = `
            <img src="${book.bookImage}" alt="${book.bookTitle}">
            <h3>${book.bookTitle}</h3>
            <p>Author: ${book.bookAuthor}</p>
            <div class="rating-holder" data-book-id="${book.id}">  
                ${getStars(book)} 
            </div>
            <button class="add-to-cart" data-product="${book.id}">Add to Cart</button>
        `;
        newArrivels.appendChild(newItem);
        setupRatingEvent(newItem, book.id);
        newItem.addEventListener('click', () => {
            window.location.href = `book-details.html?id=${book.id}`;
        });
    });

    setupAddToCartButtons();
}

// Function to display trending books
function trending() {
    let trend = document.getElementById('trend');
    let trendHead = document.createElement('h3');
    trendHead.innerText = 'Trending';
    trend.appendChild(trendHead);

    let books = JSON.parse(localStorage.getItem("books"));
    let trendingBooks = books.filter(book => book.bookCategory === 'Romance');

    if (trendingBooks.length === 0) {
        trend.innerHTML += `<p>No trending books found.</p>`;
        return;
    }

    trendingBooks.forEach(book => {
        let trendItem = document.createElement('div');
        trendItem.innerHTML = `
            <img src="${book.bookImage}" alt="${book.bookTitle}">
            <h3>${book.bookTitle}</h3>
            <p>Author: ${book.bookAuthor}</p>
            <div class="rating-holder" data-book-id="${book.id}">  
                ${getStars(book)} 
            </div>
            <button class="add-to-cart" data-product="${book.id}">Add to cart</button>
        `;
       
        trend.appendChild(trendItem);
        setupRatingEvent(trendItem, book.id);
        trendItem.addEventListener('click', () => {
            window.location.href = `book-details.html?id=${book.id}`;
        });
    });

    setupAddToCartButtons();
}

// Function to filter data based on category
function filterData(category) {
    // Remove active class from all buttons
    document.querySelectorAll('#btn-container button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to the clicked button
    event.target.classList.add('active');
    
    let products = JSON.parse(localStorage.getItem('books')) || [];
    let filteredData = products.filter(book => book.bookCategory == category);
    displayData(filteredData);
}

// Function to display books in the main container
function displayData(books) {
    let container = document.getElementsByClassName('main-container')[0];
    container.innerHTML = '';

    if (books.length === 0) {
        let noResultItem = document.createElement('div');
        noResultItem.textContent = 'No books found';
        container.appendChild(noResultItem);
        return;
    }

    books.forEach(book => {
        let item = document.createElement('div');
        item.classList.add('book-item');
        
        item.innerHTML = `
            <img src="${book.bookImage}" alt="${book.bookTitle}">
            <h3>${book.bookTitle}</h3>
            <p>Author: ${book.bookAuthor}</p>
            <div class="rating-holder" data-book-id="${book.id}">  
                ${getStars(book)} 
            </div>
            <button class="add-to-cart" data-product="${book.id}">Add to cart</button>
        `;
        
        // Add rating click events
        setupRatingEvent(item, book.id);
        
        // Add event listener to redirect to the book details page
        item.addEventListener('click', () => {
            window.location.href = `book-details.html?id=${book.id}`;
        });
    
        container.appendChild(item);
    });
    setupAddToCartButtons();
}

// Function to update the cart display (only showing total items count)
function updateCartDisplay() {
    let totalItems = document.getElementById('total-items');
    let itemCount = cart.length;
    totalItems.textContent = itemCount;

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to show a toast message
function showToast(message) {
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}

// Add book to cart
function addToCart(bookId) {
    let books = JSON.parse(localStorage.getItem("books"));
    let book = books.find(book => book.id === bookId);
    
    let bookInCart = cart.find(item => item.id === bookId);
    if (!bookInCart) {
        cart.push({
            id: book.id,
            bookTitle: book.bookTitle
        });
        showToast(`${book.bookTitle} added to cart`); 
    }
    
    updateCartDisplay();
}

// Handle add to cart button click
function setupAddToCartButtons() {
    let buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            let bookId = parseInt(e.target.dataset.product);
            addToCart(bookId);
        });
    });
}

// Function to get star rating display
function getStars(book) {
    let averageRating = book.ratings ? (book.ratings.reduce((a, b) => a + b) / book.ratings.length).toFixed(1) : 0;
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star" data-star="${i}">${i <= averageRating ? '★' : '☆'}</span>`;
    }
    return stars;
}

// Set up rating event
function setupRatingEvent(item, bookId) {
    const ratingHolder = item.querySelector('.rating-holder');
    if (!ratingHolder) return;

    ratingHolder.addEventListener('click', (e) => {
        if (e.target.classList.contains('star')) {
            const selectedRating = parseInt(e.target.dataset.star);
            rateBook(bookId, selectedRating);
        }
    });
}

// Function to rate a book
function rateBook(bookId, rating) {
    let books = JSON.parse(localStorage.getItem("books"));
    let book = books.find(b => b.id === bookId);

    // Initialize ratings array if it doesn't exist
    if (!book.ratings) {
        book.ratings = [];
    }

    book.ratings.push(rating);  // Add the new rating
    localStorage.setItem('books', JSON.stringify(books)); // Update local storage

    // Refresh the display to show the updated rating
    displayData(books); 
}

// Fetch and display books based on categories, best-sellers, etc.
window.onload = () => {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    if (books.length === 0) {
        fetchData();
    } else {
        displayCategories();
        bestSeller();
        newArrivels();
        trending();
        updateCartDisplay();
    }
};

// Handle search functionality
document.getElementById('search').addEventListener('input', function(e) {
    let query = e.target.value.toLowerCase();
    let books = JSON.parse(localStorage.getItem("books")) || [];

    let filteredBooks = books.filter(book => {
        return book.bookTitle.toLowerCase().includes(query) ||
               book.bookCategory.toLowerCase().includes(query) ||
               book.bookAuthor.toLowerCase().includes(query);
    });

    displayData(filteredBooks);
});
