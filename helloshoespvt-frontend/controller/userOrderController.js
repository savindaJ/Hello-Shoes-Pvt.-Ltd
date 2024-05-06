
let productList;

let cart = [];

let subTotal = 0;

let paymentMethod = 'cash';

let isDemoUser = true;

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
            product.getqty = 1;
            cart.push(product);
        }
        renderCart();
        console.log(cart);
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
                          <small class="text-dark">${product.itemCode}</small>
                          <small class="text-dark">Rs. ${product.sellingPrice} /=</small>
                          <small class="text-dark">Size: ${product.size}</small>
                      </div>
                  </div>
                  <div class="d-flex justify-content-sm-between rounded-4">
                  <button class="btn btn-danger btn-sm btn-remove-cart-item"><i class="bi bi-trash3-fill"></i></button>
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
    $('#txt-point').text('0');
    $('#txt-cus-contact').val('');
    $('#txt-customer-name').text('');
    $('#txt-cus-contact').css({
        'border-color': 'gray'
    });
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
            product.getqty = qty;
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
            product.getqty = qty;
            subTotal += product.sellingPrice - (product.sellingPrice * product.discount / 100);
            $('#txt-sub-total').text('Rs. ' + subTotal + ' /=');
            let point = Math.ceil(subTotal/800);
            $('#added-new-point').text(point+'');
        }
    });

    $('.btn-remove-cart-item').on('click', function () {
        let index = $(this).closest('.cart-item').index();
        let product = cart[index];
        subTotal -= product.sellingPrice - (product.sellingPrice * product.discount / 100);
        $('#txt-sub-total').text('Rs. ' + subTotal + ' /=');
        let point = Math.ceil(subTotal/800);
        $('#added-new-point').text(point+'');
        cart.splice(index, 1);
        renderCart();
    });
}

$('#txt-search-product').on('keyup', function () {
    let search = $(this).val();
    let filtered = productList.filter(p => p.itemCode.toLowerCase().includes(search.toLowerCase()) || p.itemDescription.toLowerCase().includes(search.toLowerCase()));
    $('#product-content').empty();
    for (const product of filtered) {
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

});

function setCustomerContacts() {
    $.ajax({
        url: BASE_URL + 'api/v1/customers/contact-list',
        headers: {
            Authorization : 'Bearer ' + user.jwt
        },
        type: 'GET',
        success: function (response) {
            console.log(response);
            for (const contact of response) {
                $('#list-customerList').append(`
                    <option value=${contact}></option>
                `);
            }
        },
        error: function (error) {
            console.log(error);
        }});
}

setCustomerContacts();


$('#txt-cus-contact').on('keypress', function () {
    let contact = $(this).val();
    $.ajax({
        url: BASE_URL + 'api/v1/customers/get/contact/' + contact,
        headers: {
            Authorization : 'Bearer ' + user.jwt
        },
        type: 'GET',
        success: function (response) {
            console.log(response);
            $('#txt-customer-name').text(response.customerName);
            $('#txt-point').text(response.totalPoints === null ? 0 : response.totalPoints);
            $('#txt-cus-contact').css({
                'border-color': 'green'
            });
        },
        error: function (error) {
            $('#txt-cus-contact').css({
                'border-color': 'red'
            });
        }
    });
});

$('#pay-method input').on('change', function () {
    paymentMethod = $(this).val();
    console.log(paymentMethod);
});

$('#nav-demo-tab').on('click', function () {
    isDemoUser = true;
    console.log(isDemoUser);
});

$('#nav-tab-loyality').on('click', function () {
    isDemoUser = false;
});

$('#btn-proceed-order').on('click', function () {
    let contact = $('#txt-cus-contact').val();
    let customerName = $('#txt-customer-name').text();
    let point = $('#added-new-point').text();
    let demoCusName = $('#txt-demo-name').val() === '' ? 'Demo Customer' : $('#txt-demo-name').val()
    let order = {
        customerContact: contact,
        customerName: isDemoUser === true ? demoCusName : customerName,
        subTotal: subTotal,
        addedPoints: point,
        orderDetails: cart,
        cashierName: user.username,
        paymentMethod: paymentMethod,
        isDemo: isDemoUser
    };
    console.log(order);
    // $.ajax({
    //     url: BASE_URL + 'api/v1/sale/place',
    //     headers: {
    //         Authorization: 'Bearer ' + user.jwt
    //     },
    //     type: 'POST',
    //     contentType: 'application/json',
    //     data: JSON.stringify(order),
    //     success: function (response) {
    //         console.log(response);
    //         $('#btn-clear').click();
    //         $('#txt-cus-contact').val('');
    //         $('#txt-customer-name').text('');
    //         $('#txt-cus-contact').css({
    //             'border-color': 'gray'
    //         });
    //     },
    //     error: function (error) {
    //         console.log(error);
    //     }
    // });
});