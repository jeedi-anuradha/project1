// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let books = JSON.parse(localStorage.getItem('books')) || [];

// Function to display cart items
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
        let book = books.find(book => book.id === item.id);
        let itemElement = document.createElement('li');
        itemElement.innerHTML = `
            <img src="${book.bookImage}" alt="${book.bookTitle}">
            <span>${book.bookTitle}</span> 
            <span>(${book.bookAuthor})</span> 
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        totalPrice += book.bookPrice;  // Assuming each book has a `price` property
    });

    cartTotalPriceContainer.innerHTML = `<strong>Total Price: INR ${totalPrice.toFixed(2)}</strong>`;
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));  // Update cart in localStorage
    displayCartItems();  // Re-display updated cart
}

// Display cart items on page load
window.onload = () => {
    displayCartItems();
};
