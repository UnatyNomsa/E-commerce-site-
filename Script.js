// Load cart from localStorage and render items on cart.html
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("total-price").textContent = "Total: $0.00";
    return;
  }

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: $${item.price.toFixed(2)}</p>
      <label>
        Quantity:
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" />
      </label>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  updateTotalPrice(cart);
}

// Update quantity of a cart item
function updateQuantity(id, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(i => i.id === id);
  if (!item) return;

  const quantity = parseInt(newQuantity);
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }

  item.quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Remove an item from the cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Calculate and update total price
function updateTotalPrice(cart) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("total-price").textContent = `Total: $${total.toFixed(2)}`;
}

// Run renderCart on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
