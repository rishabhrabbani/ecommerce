// Navigation toggle for mobile menu
document.addEventListener("DOMContentLoaded", () => {
  const bar = document.getElementById("bar");
  const close = document.getElementById("close");
  const nav = document.getElementById("navbar");

  if (bar) bar.addEventListener("click", () => nav.classList.add("active"));
  if (close) close.addEventListener("click", () => nav.classList.remove("active"));
});

// Cart array to store added products
let cart = [];

/**
 * Parse a currency string like "₹699.00" and return a float value
 * @param {string} priceStr
 * @returns {number}
 */
function parsePrice(priceStr) {
  return parseFloat(priceStr.replace(/[^\d.]/g, ""));
}

/**
 * Add product to the cart
 */
function addToCart() {
  const name = document.getElementById("productName").innerText.trim();
  const priceText = document.getElementById("productPrice").innerText.trim();
  const quantity = parseInt(document.getElementById("productQty").value);
  const size = document.getElementById("productSize").value;

  const price = parsePrice(priceText);

  if (!quantity || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  const existingIndex = cart.findIndex(item => item.name === name);

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ name, price, quantity, size });
  }

  renderCart();
}

/**
 * Remove product from cart by index
 * @param {number} index
 */
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

/**
 * Render the cart table and update the total
 */
function renderCart() {
  const cartBody = document.getElementById("cartBody");
  const cartTotal = document.getElementById("cartTotal");

  cartBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>₹${subtotal.toFixed(2)}</td>
      <td><button onclick="removeFromCart(${index})">Remove</button></td>
    `;
    cartBody.appendChild(row);
  });

  cartTotal.innerText = `Total: ₹${total.toFixed(2)}`;
}
