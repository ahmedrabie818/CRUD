var Name = document.getElementById("Name");
var Price = document.getElementById("Price");
var Category = document.getElementById("Category");
var Description = document.getElementById("Description");
var button = document.getElementById("demo");
var nameMessage = document.getElementById("nameMessage");
var priceMessage = document.getElementById("priceMessage");
var categoryMessage = document.getElementById("categoryMessage");
var descriptionMessage = document.getElementById("descriptionMessage");
var products = [];
var index = -1;

if (localStorage.getItem("products") != null) {
  products = JSON.parse(localStorage.getItem("products"));
  displayProduct();
}

function addNewProduct() {
  if (
    nameValidation() &&
    priceValidation() &&
    categoryValidation() &&
    descriptionValidation()
  ) {
    var Product = {
      name: Name.value,
      price: Price.value,
      category: Category.value,
      description: Description.value,
    };

    if (index === -1) {
      products.push(Product);
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      products[index] = Product;
      localStorage.setItem("products", JSON.stringify(products));
      index = -1;
      button.innerText = "Submit";
    }
    displayProduct();
    clearData();
  }
}

function displayProduct() {
  var cartona = "";

  for (i = 0; i < products.length; i++) {
    cartona += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].description}</td>
            <td><button class = "btn btn-danger" onclick ="deleteProduct(${i})">Delete</button></td>
            <td><button class = "btn btn-warning"onclick ="updateProduct(${i})">Update</button></td>
          </tr>`;
  }
  document.getElementById("tbody").innerHTML = cartona;
}

function clearData() {
  Name.value = "";
  Price.value = "";
  Category.value = "";
  Description.value = "";
}
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProduct();
}

function updateProduct(idx) {
  index = idx;
  Name.value = products[idx].name;
  Price.value = products[idx].price;
  Category.value = products[idx].category;
  Description.value = products[idx].description;
  button.innerText = "Update";
}

function searchProduct(term) {
  var cartona = "";
  for (let i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      cartona += `<tr>
      <th scope="row">${i + 1}</th>
      <td>${products[i].name}</td>
      <td>${products[i].price}</td>
      <td>${products[i].category}</td>
      <td>${products[i].description}</td>
      <td><button class = "btn btn-danger" onclick ="deleteProduct(${i})">Delete</button></td>
      <td><button class = "btn btn-warning"onclick ="updateProduct(${i})">Update</button></td>
    </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = cartona;
}

function nameValidation() {
  const nameRegex = /^[A-Z][a-z]{3,7}$/;

  if (nameRegex.test(Name.value) == true) {
    Name.classList.add("is-valid");
    Name.classList.remove("is-invalid");
    nameMessage.classList.add("d-none");
    return true;
  } else {
    nameMessage.classList.remove("d-none");
    Name.classList.add("is-invalid");
    Name.classList.remove("is-valid");
    return false;
  }
}
function priceValidation() {
  const priceRegex = /^[1-9][0-9]*/;

  if (priceRegex.test(Price.value) == true) {
    Price.classList.add("is-valid");
    Price.classList.remove("is-invalid");
    priceMessage.classList.add("d-none");

    return true;
  } else {
    Price.classList.add("is-invalid");
    Price.classList.remove("is-valid");
    priceMessage.classList.remove("d-none");

    return false;
  }
}
function categoryValidation() {
  const categoryRegex = /^[A-Z][a-z]{3,10}$/;
  if (categoryRegex.test(Category.value) == true) {
    Category.classList.add("is-valid");
    Category.classList.remove("is-invalid");
    categoryMessage.classList.add("d-none");

    return true;
  } else {
    Category.classList.add("is-invalid");
    Category.classList.remove("is-valid");
    categoryMessage.classList.remove("d-none");

    return false;
  }
}
function descriptionValidation() {
  const descriptionRegex = /^[A-Z][a-z]{0,}$/;
  if (descriptionRegex.test(Description.value) == true) {
    Description.classList.add("is-valid");
    Description.classList.remove("is-invalid");
    descriptionMessage.classList.add("d-none");

    return true;
  } else {
    Description.classList.add("is-invalid");
    Description.classList.remove("is-valid");
    descriptionMessage.classList.remove("d-none");

    return false;
  }
}
