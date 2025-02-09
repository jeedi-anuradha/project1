// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display (total item count)
function updateCartDisplay() {
    let totalItems = document.getElementById('total-items');
    let itemCount = cart.length;
    totalItems.textContent = itemCount;  // Show total item count in the cart
    localStorage.setItem('cart', JSON.stringify(cart));  // Save cart to localStorage
}

// Function to display cart items in the modal
function displayCartItems() {
    let cartItemsContainer = document.getElementById('cart-item-list');
    let cartTotalPriceContainer = document.getElementById('cart-total-price');
    cartItemsContainer.innerHTML = '';  // Clear previous cart items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>No items in the cart</p>`;
        cartTotalPriceContainer.innerHTML = '';
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        let book = JSON.parse(localStorage.getItem('books')).find(book => book.id === item.id);
        let itemElement = document.createElement('li');
        itemElement.innerHTML = `
            <span>${book.bookTitle}</span> 
            <span>(${book.bookAuthor})</span> 
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        totalPrice += book.price;  // Assuming each book has a `price` property
    });

    cartTotalPriceContainer.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
}

// Function to toggle the cart modal visibility
function toggleCartDisplay() {
    let cartModal = document.getElementById('cart-modal');
    cartModal.style.display = (cartModal.style.display === 'block') ? 'none' : 'block';

    // Update cart items when opening the modal
    if (cartModal.style.display === 'block') {
        displayCartItems();
    }
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));  // Update localStorage
    updateCartDisplay();  // Update cart display
    displayCartItems();  // Re-display updated cart
}

// Function to add book to cart
function addToCart(bookId) {
    let books = JSON.parse(localStorage.getItem("books"));
    let book = books.find(book => book.id === bookId);

    let bookInCart = cart.find(item => item.id === bookId);
    if (!bookInCart) {
        cart.push({
            id: book.id,
            bookTitle: book.bookTitle
        });
        showToast(`${book.bookTitle} added to cart`);  // Optional toast for feedback
    }

    updateCartDisplay();  // Update the cart total count
}

// Optional: Show a toast message
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

// Update the cart display when the page loads
window.onload = () => {
    updateCartDisplay();
};
