fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    const table = document.getElementById("productTable");

    products.forEach(product => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <a href="details.html?id=${product.id}">
                    ${product.title}
                </a>
            </td>
            <td>$${product.price}</td>
        `;

        table.appendChild(row);

    });
  });