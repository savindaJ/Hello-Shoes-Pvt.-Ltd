$('#btn-open-model').on('click', function () {
    $('#btn-add-item').text('Add Item');
    $('#inventory-modal').modal('show');
});

let itemCode;

$('#btn-add-item').on('click', function () {
    var item = {
        itemCode: itemCode,
        supplierId: $('#item-supplier').val(),
        itemDescription: $('#item-desc').val(),
        itemCategory: $('#item-category').val(),
        brand: $('#item-brand').val(),
        itemPrice: $('#item-price').val(),
        qtyOnHand: $('#item-qty').val(),
        size: $('#item-size').val()
    };

    console.log(item);

    if ($('#btn-add-item').text() === 'Update Item') {
        $.ajax({
            type: 'PUT',
            url: BASE_URL + 'api/v1/inventory',
            headers: {
                Authorization: 'Bearer ' + user.jwt
            },
            contentType: 'application/json',
            data: JSON.stringify(item),
            success: function (data) {
                $('#inventory-modal').modal('hide');
                loadInventory();
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: data
                });
            },
            error: function (error) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: error.responseJSON.message
                });
            }
        });
    } else {
        $.ajax({
            type: 'POST',
            url: BASE_URL + 'api/v1/inventory',
            headers: {
                Authorization: 'Bearer ' + user.jwt
            },
            contentType: 'application/json',
            data: JSON.stringify(item),
            success: function (data) {
                $('#inventory-modal').modal('hide');
                loadInventory();
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: data
                });
            },
            error: function (error) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: error.responseJSON.message
                });
            }
        });
    }
});

function loadAllSupplierId() {
    $.ajax({
        url: BASE_URL + 'api/v1/suppliers/get/id',
        method: 'GET',
        async: true,
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            data.forEach(function (supplier) {
                $('#item-supplier').append('<option value="' + supplier + '">' + supplier + '</option>');
            });
        },error: function (error) {
            swal("Error", "Failed to load supplier id", "error");
        }
    });
}

loadAllSupplierId();

$('#item-supplier').on('change', function () {
    renderSupplier($(this).val());
});

function renderSupplier(id) {
    $.ajax({
        type: 'GET',
        url: BASE_URL + 'api/v1/suppliers/' + id,
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            $('#supplier-name').text(data.supplierName);
        },
        error: function (error) {
            alert('Supplier not found !')
        }
    });
}