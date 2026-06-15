// Product Data
const products = [
    { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', price: '$129.99', rating: '4.8★', icon: '🎧', rating_num: 4.8 },
    { id: 2, name: 'Smart Watch Pro', category: 'Electronics', price: '$299.99', rating: '4.9★', icon: '⌚', rating_num: 4.9 },
    { id: 3, name: 'Designer T-Shirt', category: 'Fashion', price: '$49.99', rating: '4.6★', icon: '👕', rating_num: 4.6 },
    { id: 4, name: 'Premium Sneakers', category: 'Fashion', price: '$129.99', rating: '4.7★', icon: '👟', rating_num: 4.7 },
    { id: 5, name: 'Gaming Console', category: 'Gaming', price: '$499.99', rating: '4.9★', icon: '🎮', rating_num: 4.9 },
    { id: 6, name: 'Wireless Gaming Mouse', category: 'Gaming', price: '$79.99', rating: '4.8★', icon: '🖱️', rating_num: 4.8 },
    { id: 7, name: 'Smart Coffee Maker', category: 'Home & Living', price: '$89.99', rating: '4.7★', icon: '☕', rating_num: 4.7 },
    { id: 8, name: 'LED Desk Lamp', category: 'Home & Living', price: '$59.99', rating: '4.6★', icon: '💡', rating_num: 4.6 },
    { id: 9, name: 'JavaScript Mastery', category: 'Books', price: '$34.99', rating: '4.9★', icon: '📕', rating_num: 4.9 },
    { id: 10, name: 'Web Design Guide', category: 'Books', price: '$39.99', rating: '4.8★', icon: '📗', rating_num: 4.8 },
    { id: 11, name: 'Professional Basketball', category: 'Sports', price: '$69.99', rating: '4.7★', icon: '🏀', rating_num: 4.7 },
    { id: 12, name: 'Yoga Mat Premium', category: 'Sports', price: '$45.99', rating: '4.6★', icon: '🧘', rating_num: 4.6 },
];

// Cart State
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderProducts();
    setupEventListeners();
    updateCartCount();
});

// Render Products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">${product.rating}</div>
                <div class="product-footer">
                    <div class="product-price">${product.price}</div>
                    <div class="product-actions">
                        <button onclick="toggleWishlist(event)" title="Add to Wishlist">♡</button>
                        <button onclick="addToCart(${product.id})" title="Add to Cart">🛒</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

// Toggle Wishlist
function toggleWishlist(event) {
    event.target.style.color = event.target.style.color === 'rgb(255, 68, 68)' ? 'inherit' : '#ff4444';
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Cart Button
    document.querySelector('.cart-btn').addEventListener('click', () => {
        showToast(`You have ${cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart!`);
    });

    // Newsletter Form
    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        showToast(`Thanks for subscribing, ${email}!`);
        e.target.reset();
    });

    // CTA Buttons
    document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Offer Cards
    document.querySelectorAll('.offer-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('Navigating to special offers...');
        });
    });

    // Smooth scroll animations
    observeElements();
}

// Intersection Observer for Animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card, .category-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
