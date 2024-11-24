const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
progress = document.querySelector(".slider .progress");

let priceGap =1000;

// Sample products array
const products = [
    { id: 1, name: "Product 1", price: 1500 },
    { id: 2, name: "Product 2", price: 2500 },
    { id: 3, name: "Product 3", price: 3500 },
    { id: 4, name: "Product 4", price: 4500 },
    { id: 5, name: "Product 5", price: 5500 },
    { id: 6, name: "Product 6", price: 6500 },
    { id: 7, name: "Product 7", price: 7500 },
    { id: 8, name: "Product 8", price: 8500 }
];

const productsContainer = document.querySelector('.products-container');

// Function to display filtered products
function displayProducts(minPrice, maxPrice) {
    const filteredProducts = products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );

    productsContainer.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>Price: Rs. ${product.price}</p>
        </div>
    `).join('');
}

// Update existing event listeners to include product filtering
rangeInput.forEach(input =>{
    input.addEventListener("input", e=>{
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if(maxVal - minVal < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap;
                minVal = maxVal - priceGap;
            } else { 
                rangeInput[1].value = minVal + priceGap;
                maxVal = minVal + priceGap;
            }   
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
        
        displayProducts(minVal, maxVal);
    });
});

priceInput.forEach(input =>{
    input.addEventListener("input", e=>{
        let minVal = parseInt(priceInput[0].value),
            maxVal = parseInt(priceInput[1].value);

        if((maxVal - minVal >= priceGap) && maxVal <= 10000){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            } else { 
                rangeInput[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }   
            displayProducts(minVal, maxVal);
        }
    });
});

// Initial products display
displayProducts(2500, 7500);
