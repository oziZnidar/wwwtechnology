document.addEventListener("DOMContentLoaded", () => {
    const tableElement = document.getElementById("cartTable");
    const cartTable = tableElement.querySelector("tbody") || tableElement;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let totalAmount = 0;

    cart.forEach((product, index) => {
        const row = document.createElement("tr");
        const subtotal = product.price * product.qty;
        totalAmount += subtotal;

        row.innerHTML = `
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td>
                <input type="number" 
                       value="${product.qty}" 
                       min="1" 
                       data-index="${index}" 
                       class="qty-input">
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </td>
        `;
        cartTable.appendChild(row);
    });

    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td colspan="3" style="text-align:right"><strong>Total:</strong></td>
        <td><strong>$${totalAmount.toFixed(2)}</strong></td>
        <td></td>
    `;
    cartTable.appendChild(totalRow);

    document.querySelectorAll(".qty-input").forEach(input => {
        input.addEventListener("change", event => {
            const index = event.target.dataset.index;
            const newQty = parseInt(event.target.value);

            if (newQty > 0) {
                cart[index].qty = newQty;
                localStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            }
        });
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", event => {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });
});