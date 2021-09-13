const loadProducts = () => {

  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR3Eat9a95h6ULaz3B4E2aWctPCNqVt7xA7CrhKsA5jY2mRE25LPHMJ1EcY`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));

  /*
fetch(`../js/product.json`)
  .then((response) => response.json())
  .then((data) => showProducts(data));
  */

};

loadProducts();

// show all product in UI 
const showProducts = (products) => {

  const allProducts = products.map((pd) => pd);

  for (const product of allProducts) {

    ///change images to image
    const image = product.image;

    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h5>Price: $ ${product.price}</h5>

      <h6>Rating: ${product.rating.rate} </h6>
      <h6>Rating Count: ${product.rating.count} </h6>

      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>

      <button type="button" onclick="clickIndividualItem(${product.id})" id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>

      </div>
      `;

    document.getElementById("all-products").appendChild(div);
  }
};

const clickIndividualItem = (idOfItem) => {
  fetch(`https://fakestoreapi.com/products/${idOfItem}`)
    .then(res => res.json())
    .then(json => showIndividualItem(json))
}
const showIndividualItem = (product) => {
  const modalTitle = document.getElementById('exampleModalLabel');
  modalTitle.innerText = `[${product.id}]${product.title}`;
  const modalBody = document.getElementById('single-item-body');
  modalBody.innerHTML = `
  <div class="d-flex justify-content-between align-items-center">
  <img src=${product.image} class="img-fluid w-25" alt="">
  <p>"${product.description.slice(0, 200)}"</p>
  </div>
  <div class="d-flex justify-content-between">
  <h5>Category: ${product.category}</h5>
      <h5>Price: $ ${product.price}</h5>
  </div>
  <div class="d-flex justify-content-between">
  <h6>Rating: ${product.rating.rate} </h6>
      <h6>Rating Count: ${product.rating.count} </h6>
  </div>
  `;
}


let count = 0;
const addToCart = (id, price) => {

  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;

  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  let converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {

  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  let grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");

  grandTotal = grandTotal.toFixed(2);
  //console.log("grandTotal", grandTotal);
  document.getElementById("total").innerText = grandTotal;
};


document.getElementById('search-btn').addEventListener('click',function(){
 // console.log("clicked");
  document.getElementById('search-input').value="";
})