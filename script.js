let allProduct;
let totalProducts = 0;
let price = 0;
let deliveryCharge = 10;
let shippingCost = 10;
let totalPrice = 0;
let tax = 0;
let grandTotal = 0;
let discount = 0;
let finalTotal = 0;
let reviewID = 0;

const pair = [];


async function searchProducts() {
    let data = await fetch('https://api.escuelajs.co/api/v1/products');
    let response = await data.json();
    allProduct = response;
    for (let j = 3; j < response.length; j++) {
        const first = response[j].id;
        const second = 0;
        pair.push([first, second]);
    }
    fetchProducts(response)
}
let products = document.querySelector('.service-product-insider');
async function fetchProducts(response) {
    for (let i = 3; i < response.length; i++) {
        let description = response[i].description;
        let title = response[i].title;
        let image = response[i].images[2];
        let price = response[i].price;
        let ID = response[i].id;
        products.innerHTML += `<div class="product-card shadow">
        <div class="product-card-img">
            <img src="${image}" alt="">
        </div>
        <hr>
        <h4>${title.length > 18 ? title.substring(0, 16) : title
            }</h4>
        <div class="product-card-description">
            <p>${description}</p>
        </div>
        <p><strong>Price :</strong> $ ${price} </p>
        <div class="product-card-buttons">

            <button class=" btn btn-outline-primary shadow" id="add" href="#!" value="${ID}"
                onclick="add(this)">Add</button>
            <button class=" btn btn-outline-warning shadow" id="remove" href="#!" value="${ID}"
                onclick="remove(this)">Remove</button>
            <a class=" btn btn-outline-danger shadow" href="#feedback" onclick="review('${ID}')"><i class="fa fa-message"></i></a>
        </div>
    </div>`;
    }

}
searchProducts()

function calculate() {
    var t = 0;
    for (let j = 0; j < pair.length; j++) {
        t += parseInt(pair[j][1]);

    }
    totalProducts = t;
    totalPrice = price + deliveryCharge + shippingCost;
    tax = totalPrice * (15 / 100);
    grandTotal = totalPrice + tax;
    discount = grandTotal * (5 / 100);
    finalTotal = grandTotal - discount;
    if (totalProducts != 0) {
        document.getElementById('totalProducts').innerHTML = parseInt(totalProducts);
        document.getElementById('price').innerHTML = '$ ' + parseInt(price);
        document.getElementById('deliveryCharge').innerHTML = '$ ' + parseInt(deliveryCharge);
        document.getElementById('shippingCost').innerHTML = '$ ' + parseInt(shippingCost);
        document.getElementById('totalPrice').innerHTML = '$ ' + parseInt(totalPrice);
        document.getElementById('tax').innerHTML = '$ ' + parseInt(tax);
        document.getElementById('grandTotal').innerHTML = '$ ' + parseInt(grandTotal);
        document.getElementById('discount').innerHTML = '$ ' + parseInt(discount + 1);
        document.getElementById('finalTotal').innerHTML = '$ ' + parseInt(finalTotal);
    }
    else {
        document.getElementById('totalProducts').innerHTML = 0;
        document.getElementById('price').innerHTML = '$ ' + 0;
        document.getElementById('deliveryCharge').innerHTML = '$ ' + 0;
        document.getElementById('shippingCost').innerHTML = '$ ' + 0;
        document.getElementById('totalPrice').innerHTML = '$ ' + 0;
        document.getElementById('tax').innerHTML = '$ ' + 0;
        document.getElementById('grandTotal').innerHTML = '$ ' + 0;
        document.getElementById('discount').innerHTML = '$ ' + 0;
        document.getElementById('finalTotal').innerHTML = '$ ' + 0;
    }


}

function add(val1) {
    var x = parseInt(val1.value);
    for (let i = 3; i < allProduct.length; i++) {
        if (allProduct[i].id == x) {
            price += allProduct[i].price;

        }
    }
    for (let i = 0; i < pair.length; i++) {
        if (pair[i][0] == x) {
            pair[i][1] = parseInt(pair[i][1]) + 1;
        }
    }
    document.getElementById('message').innerHTML = `<div class="alert alert-success" role="alert">
        ⚠️ Product added in cart
    </div>`
    calculate();

}


function remove(val2) {
    var x = parseInt(val2.value);
    var dPrice = 0;
    for (let i = 1; i < allProduct.length; i++) {
        if (allProduct[i].id == x) {
            dPrice = allProduct[i].price;

        }
    }
    for (let i = 0; i < pair.length; i++) {
        if (pair[i][0] == x) {
            if (pair[i][1] > 0) {
                pair[i][1] = parseInt(pair[i][1]) - 1;
                price = price - dPrice;
            }
            else {
                document.getElementById('message').innerHTML = `<div class="alert alert-danger" role="alert">
            ⚠️ This product absent in cart
        </div>`
            }
            // pair[i][1] = parseInt(pair[i][1]) + 1;
        }

    }
    calculate()

}

function order() {
    console.log("clicked")
    if (totalProducts != 0) {
        document.getElementById('message').innerHTML = `<div class="alert alert-success" role="alert">
        👏 Order Successful
    </div>`
    }
    else {
        document.getElementById('message').innerHTML = ""
    }
    document.getElementById('totalProducts').innerHTML = 0;
    document.getElementById('price').innerHTML = '$ ' + 0;
    document.getElementById('deliveryCharge').innerHTML = '$ ' + 0;
    document.getElementById('shippingCost').innerHTML = '$ ' + 0;
    document.getElementById('totalPrice').innerHTML = '$ ' + 0;
    document.getElementById('tax').innerHTML = '$ ' + 0;
    document.getElementById('grandTotal').innerHTML = '$ ' + 0;
    document.getElementById('discount').innerHTML = '$ ' + 0;
    document.getElementById('finalTotal').innerHTML = '$ ' + 0;
}

function review(val3)
{
    // reviewID = val3.value;
    console.log(val3)
}