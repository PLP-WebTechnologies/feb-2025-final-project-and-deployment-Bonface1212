// Product data
const products = [
    {
        id: 1,
        name: "Samsung Galaxy S23",
        price: 150000,
        image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 2,
        name: "MacBook Pro M2",
        price: 280000,
        image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 3,
        name: "Sony WH-1000XM4",
        price: 45000,
        image: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 4,
        name: "Apple Watch Series 8",
        price: 65000,
        image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 5,
        name: "iPad Pro 12.9",
        price: 180000,
        image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 6,
        name: "PlayStation 5",
        price: 75000,
        image: "https://images.pexels.com/photos/13189272/pexels-photo-13189272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 7,
        name: "Canon EOS R5",
        price: 420000,
        image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 8,
        name: "DJI Mavic 3 Pro",
        price: 350000,
        image: "https://images.pexels.com/photos/1087180/pexels-photo-1087180.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
];

// Theme functionality
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Product added to cart!');
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function displayProducts(containerId, productList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = productList.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">KSH ${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 50px;">
            <h3>${item.name}</h3>
            <p>KSH ${item.price.toLocaleString()}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toLocaleString();
}

// Handle contact form submission
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    }
}

// Initialize pages
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    handleContactForm();

    // Home page
    if (document.getElementById('featured-products')) {
        displayProducts('featured-products', products.slice(0, 4));
    }

    // Products page
    if (document.getElementById('all-products')) {
        displayProducts('all-products', products);
    }

    // Cart page
    if (document.getElementById('cart-items')) {
        displayCart();
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Thank you for your purchase!');
            cart = [];
            localStorage.removeItem('cart');
            updateCartCount();
            displayCart();
        });
    }
});