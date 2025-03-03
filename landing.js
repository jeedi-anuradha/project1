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
    catHeading.innerText = 'Categories';
    btncontainer.appendChild(catHeading);
    categoryArr.forEach(category => {
        let button = document.createElement('button');
        button.textContent = category;
        button.onclick = () => {
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
            <button class="add-to-cart" data-product="${book.id}">Add to cart</button>
        `;
        bestSellar.appendChild(rankItem);
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
            <button class="add-to-cart" data-product="${book.id}">Add to Cart</button>
        `;
        newArrivels.appendChild(newItem);
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
            <button class="add-to-cart" data-product="${book.id}">Add to cart</button>
        `;
        trend.appendChild(trendItem);
    });

    setupAddToCartButtons();
}

// Function to filter data based on category
function filterData(category) {
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
        item.classList.add('book-item'); // Add a class to easily style it or manage its events
        item.innerHTML = `
            <img src="${book.bookImage}" alt="${book.bookTitle}">
            <h3>${book.bookTitle}</h3>
            <p>Author: ${book.bookAuthor}</p>
            <button class="add-to-cart" data-product="${book.id}">Add to cart</button>
        `;
        
        // Add event listener to redirect to the book details page
        item.addEventListener('click', () => {
            window.location.href = `book-details.html?id=${book.id}`;
        });
    
        container.appendChild(item);
    });
    setupAddToCartButtons();
}

// Function to update the cart display (only showing total items count)
// let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    let totalItems = document.getElementById('total-items');
    let itemCount = cart.length;
    totalItems.textContent = itemCount;  // Only show the total count of items

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
        showToast(`${book.bookTitle} added to cart`);  // Show the toast message with the book title
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
