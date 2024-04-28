
let productList;

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
                 <img src="https://drive.google.com/thumbnail?id=${product.itemPicture}&sz=w1000" width="100" class="card-img-top" alt="...">
                 <div class="card-body">
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
                     <button class="btn btn-primary w-100">Add to cart</button>
                </div>
            </div>
        </div>
    `);
            }
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
            $('#product-content').empty();
            for (const product of response) {
                $('#product-content').append(`
             <div class="col mt-3 z-1">
            <div class="card h-100">
                 <img src="https://drive.google.com/thumbnail?id=${product.itemPicture}&sz=w1000" width="100" class="card-img-top" alt="...">
                 <div class="card-body">
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
                     <button class="btn btn-primary w-100">Add to cart</button>
                </div>
            </div>
        </div>
`);
            }
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
