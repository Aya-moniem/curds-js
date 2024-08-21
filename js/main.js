let productName = document.getElementById('productnameinput');
let productPrice = document.getElementById('productpriceinput');
let productCategory = document.getElementById('productcategoryinput');
let numOfProducts = document.getElementById('header');
let productCount = document.getElementById('productcountinput');
let addBtn = document.getElementById('addBtn');
let products = [];
let mood = 'Add';
let currentIndex; 


if(localStorage.getItem('products') != null){
    products = JSON.parse(localStorage.getItem('products'));
    displayProduct();
}
else{
    document.getElementById('tablebody').innerHTML=

        `<tr>
        <td colspan="7">
        <div class="alert alert-danger" role="alert">
            No products found
        </div>
        </td>
        </tr>`
}


//create
function addProduct(){
    if(mood == 'Add'){
        if(productName.value != '' && productPrice.value != ''
            && productPrice.value != '' && productCount.value != ''){
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            count: productCount.value,
        }
        products.push(product);
        localStorage.setItem('products',JSON.stringify(products));
        console.log(products);
        clearForm();
        displayProduct();
        }
        else{
            alert('All product fields must be filled.');
        }
    }
    else if (mood == 'Update'){
    products[currentIndex].name = productName.value;
    products[currentIndex].price = productPrice.value;
    products[currentIndex].category = productCategory.value;
    products[currentIndex].count = productCount.value;
    localStorage.setItem('products', JSON.stringify(products));

    clearForm();
    addBtn.innerHTML = 'Add';
    addBtn.className = 'btn btn-outline-Success d-block';
    displayProduct();
    mood == 'Add'
    }
    
}

//clear From
function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productCount.value = "";
}

//read
function displayProduct() {
    if(localStorage.getItem('products')){
         var container = '';
    for(var i=0; i<products.length ; i++){
    container+=
    `<tr> 
        <td>${i+1}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].count}</td>
        <td><button onclick=editProduct(${i}) class="btn btn-warning">Update</button></td>
        <td><button onclick=deleteProduct(${i}) class="btn btn-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById('tablebody').innerHTML = container;
    numOfProducts.innerHTML = `All products (${products.length})`
    }
    else{
        document.getElementById('tablebody').innerHTML=
        `<tr>
        <td colspan="7">
        <div class="alert alert-danger" role="alert">
            No products found
        </div>
        </td>
        </tr>`

    }
   
   
}

//delete
function deleteProduct(deletedIndex) {
    products.splice(deletedIndex,1);
    localStorage.setItem('products',JSON.stringify(products));
    displayProduct();
}

//search
function searchProduct(term) {
    var container = '';
    for(var i=0; i<products.length ; i++)
        {
    if(products[i].name.toLowerCase().includes(term.toLowerCase()) == true || 
    products[i].category.toLowerCase().includes(term.toLowerCase()) == true)
        {
        container+=`<tr> 
                <td>${i+1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].count}</td>
                <td><button  onclick=editProduct(${i}) class="btn btn-warning">Update</button></td>
                <td><button onclick=deleteProduct(${i}) class="btn btn-danger">Delete</button></td>
                </tr>`
    }
    document.getElementById('tablebody').innerHTML = container;


}
}

//Update
function editProduct(index) {
    currentIndex = index; // Store the index of the product being edited

    let product = products[index];
    productName.value = product.name;
    productPrice.value = product.price;
    productCategory.value = product.category;
    productCount.value = product.count;

    addBtn.innerHTML = 'Update';
    addBtn.className = 'btn btn-outline-warning d-block';
    mood = 'Update';
}

//delete all
function clearAll() {
    localStorage.removeItem('products');
    displayProduct();
   
}
