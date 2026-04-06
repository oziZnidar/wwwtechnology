const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const url = `https://fakestoreapi.com/products/${productId}`;

fetch(url)
  .then(response => response.json())
  .then(product => {
    const title = product.title;
    const price = product.price;
    const detailsContainer = document.getElementById("productDetails");

    detailsContainer.innerHTML = `
      <h2>${title}</h2>
      <img src="${product.image}" alt="${title}" style="width:200px;">
      <p>${product.description}</p>
      <p><strong>Price: $${price}</strong></p>
    `;

   document.getElementById("addtoCartBtn").addEventListener("click", () => {
    const qty = parseInt(document.getElementById("quantity").value);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.id == productId);

    if (existingProduct) {
        existingProduct.qty += qty;
    } else {
        const productItem = {
            id: productId,
            title: title,
            price: price,
            qty: qty
        };
        cart.push(productItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("The product " + title + "added to cart!");
    });
  });