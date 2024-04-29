
let productList;

let cart = [];

let subTotal = 0;

function loadBrands() {
    $.ajax({
        url: BASE_URL + 'api/v1/inventory/get/brands',
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        type: 'GET',
        success: function (response) {
            let brandList = ['All', ...response]
            for (const brand of brandList) {
                if (brand === 'All') {
                    $('#brand-list').append(`
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab" 
            data-bs-toggle="pill" data-bs-target="#pills-home" 
            type="button" role="tab" aria-controls="pills-home">${brand}
            </button>
        </li>
    `);
                    continue;
                }

                $('#brand-list').append(`
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-home-tab" data-bs-toggle="pill"
            data-bs-target="#pills-home" type="button"role="tab" aria-controls="pills-home">${brand}
            </button>
        </li>
    `);
            }
        },
        error: function (error) {
            console.log(error);
        }

    });
}

loadBrands();


function loadProducts() {
    $('#product-content').empty();
    $.ajax({
        url: BASE_URL + 'api/v1/inventory/available',
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        type: 'GET',
        success: function (response) {
            productList = response;
            for (const product of response) {
                $('#product-content').append(`
        <div class="col mt-3 z-1">
            <div class="card h-100">
                 <img src="https://drive.google.com/thumbnail?id=${product.itemPicture}&sz=w1000" width="100" height="120" class="card-img-top" alt="...">
                 <div class="card-body">
                 <div class="d-flex justify-content-sm-between">
                 <small>Code</small>
                 <small>${product.itemCode}</small>
                 </div>
                  
                     <div class="d-flex justify-content-sm-between">
                         <small>${product.itemDescription}</small>
                         <small>${product.itemGender}</small>
                     </div>
                     <div class="d-flex justify-content-sm-between">
                         <small>Size: ${product.size}</small>
                         <small>1k Sold</small>
                     </div>
                      <div class="d-flex justify-content-sm-between">
                         <small class="text-danger">Discount :</small>
                         <small class="text-danger">${product.discount}%</small>
                     </div>
                     <div class="d-flex justify-content-sm-between">
                         <small class="text-primary">QtyOnHand :</small>
                         <small class="text-primary">${product.qtyOnHand}</small>
                     </div>
                     
                     <h5 class="card-title m-2 text-center">Rs. ${product.sellingPrice} /=</h5>
                     <button class="btn btn-primary w-100 btn-add-cart">Add to cart</button>
                </div>
            </div>
        </div>
    `);
            }
            setEvent();
        }, error: function (error) {
            console.log(error);
        }
    });
}

loadProducts();


$('#brand-list').on('click', 'button', function () {
    $(this).addClass('active').siblings().removeClass('active');
    let brand = $(this).text();
    if (brand.trim() === 'All') {
        loadProducts();
    }else {
        renderProductForBrand(brand);
    }

    // $('#product-content').empty();
});


function renderProductForBrand(brand) {
    $.ajax({
        url: BASE_URL + 'api/v1/inventory/available/'+brand,
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        type: 'GET',
        success: function (response) {
            productList = response;
            $('#product-content').empty();
            for (const product of response) {
                $('#product-content').append(`
             <div class="col mt-3 z-1">
                <div class="card h-100">
                 <img src="https://drive.google.com/thumbnail?id=${product.itemPicture}&sz=w1000" width="100" height="120" class="card-img-top" alt="...">
                 <div class="card-body">
                 <small>${product.itemCode}</small>
                     <div class="d-flex justify-content-sm-between">
                         <small>${product.itemDescription}</small>
                         <small>${product.itemGender}</small>
                     </div>
                     <div class="d-flex justify-content-sm-between">
                         <small>Size: ${product.size}</small>
                         <small>1k Sold</small>
                     </div>
                      <div class="d-flex justify-content-sm-between">
                         <small class="text-danger">Discount :</small>
                         <small class="text-danger">${product.discount}%</small>
                     </div>
                     <div class="d-flex justify-content-sm-between">
                         <small class="text-primary">QtyOnHand :</small>
                         <small class="text-primary">${product.qtyOnHand}</small>
                     </div>
                     
                     <h5 class="card-title m-2 text-center">Rs. ${product.sellingPrice} /=</h5>
                     <button class="btn btn-primary w-100 btn-add-cart">Add to cart</button>
                </div>
            </div>
        </div>`);
            }
            setEvent();
        }, error: function (error) {
            console.log(error);
        }
    });
}

$('#btn-move-right').on('click', function () {
    $('#brand-list').animate({
        scrollLeft: '+=500px'
    }, 500, 'linear');
});

$('#btn-move-left').on('click', function () {
    $('#brand-list').animate({
        scrollLeft: '-=500px'
    }, 500, 'linear');
});

function setEvent() {
    $('.btn-add-cart').on('click', function () {
        let index = $(this).closest('.col').index();
        let product = productList[index];
        if (!cart.find(p => p.itemCode === product.itemCode)) {
            subTotal += product.sellingPrice - (product.sellingPrice * product.discount / 100);
            $('#txt-sub-total').text('Rs. ' + subTotal + ' /=');
            let point = Math.ceil(subTotal/800)
            $('#added-new-point').text(point+'');
            cart.push(product);
        }
        renderCart();
    });
}

function renderCart() {
    $('#cart').empty();
    for (const product of cart) {
        $('#cart').append(
              `<div class="border mt-1 rounded-4 cart-item">
                  <div class="d-flex">
                      <img <img src="https://drive.google.com/thumbnail?id=${product.itemPicture}&sz=w1000" width="100" style="width: 80px;height: 80px">
                      <div class="d-flex flex-column ms-3 p-2">
                          <small class="text-dark">${product.itemDescription}</small>
                          <small class="text-dark">Rs. ${product.sellingPrice} /=</small>
                          <small class="text-dark">Size: ${product.size}</small>
                      </div>
                  </div>
                  <div class="d-flex justify-content-end rounded-4">
                      <div class="d-flex gap-3 bg-secondary rounded-4">
                          <button class="btn btn-secondary rounded-4 btn-sm btn-increse-qty">-</button>
                          <small class="text-dark mt-1 text-white txt-qty">1</small>
                          <button class="btn btn-secondary rounded-4 btn-sm btn-decrees-qty">+</button>
                      </div>
                  </div>
              </div>`);
    }
    setQtyEvent();
}

$('#btn-clear').on('click', function () {
    cart = [];
    subTotal = 0;
    $('#cart').empty();
    $('#txt-sub-total').text('Rs. 0 /=');
});

function setQtyEvent() {
    $('.btn-increse-qty').on('click', function () {
        let index = $(this).closest('.cart-item').index();
        let product = cart[index];
        console.log(product)
        let qty = $(this).siblings('.txt-qty').text();
        if (qty > 1) {
            qty--;
            $(this).siblings('.txt-qty').text(qty);
            subTotal -= product.sellingPrice - (product.sellingPrice * product.discount / 100);
            $('#txt-sub-total').text('Rs. ' + subTotal + ' /=');
            let point = Math.ceil(subTotal/800)
            $('#added-new-point').text(point+'');
        }
    });

    $('.btn-decrees-qty').on('click', function () {
        let index = $(this).closest('.cart-item').index();
        let product = cart[index];
        let qty = $(this).siblings('.txt-qty').text();
        if (qty < product.qtyOnHand) {
            qty++;
            $(this).siblings('.txt-qty').text(qty);
            subTotal += product.sellingPrice - (product.sellingPrice * product.discount / 100);
            $('#txt-sub-total').text('Rs. ' + subTotal + ' /=');
            let point = Math.ceil(subTotal/800)
            $('#added-new-point').text(point+'');
        }
    });
}

