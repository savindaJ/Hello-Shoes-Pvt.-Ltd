let itemCode;

$('#btn-open-model').on('click', function () {
    itemCode = null;
    $('#btn-add-item').text('Add Item');
    $('#inventory-modal').modal('show');
});

$('#item-img').on('change', function () {
    var reader = new FileReader();
    reader.onload = function (e) {
        $('#item-img-preview').attr('src', e.target.result);
    };
    reader.readAsDataURL(this.files[0]);
});


$('#btn-add-item').on('click', function () {

    let formData = new FormData();

    var item = {
        itemCode: itemCode,
        supplierId: $('#item-supplier').val(),
        itemDescription: $('#item-desc').val(),
        itemCategory: $('#item-category').val(),
        brand: $('#item-brand').val(),
        qtyOnHand: $('#item-qty').val(),
        size: $('#item-size').val(),
        buyingPrice: $('#item-buying-price').val(),
        sellingPrice: $('#item-selling-price').val(),
        expectedProfit: $('#item-expect-profit').val(),
        profitMargin: $('#profit-margin').val(),
        itemStatus: $('#item-status').val(),
        discount: $('#item-discount').val(),
        itemType: $('#item-userbility').val(),
        itemGender: $('#item-gender').val(),
    };

    formData.append('item', JSON.stringify(item));
    let timerInterval;
    if ($('#btn-add-item').text() === 'Update Item') {


        Swal.fire({
            timer: 100000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });

        if ($('#item-img')[0].files.length === 0) {
            formData.append('itemImage', new File([""], "notUpdate"));
        }else {
            formData.append('itemImage', $('#item-img')[0].files[0]);
        }

        $.ajax({
            type: 'PUT',
            url: BASE_URL + 'api/v1/inventory',
            headers: {
                Authorization: 'Bearer ' + user.jwt
            },
            contentType: false,
            processData: false,
            data: formData,
            success: function (data) {
                $('#inventory-modal').modal('hide');
                clearInterval(timerInterval);
                loadItems();
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


            }, error: function (error) {
                clearInterval(timerInterval);
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
                    title: 'Item not added !'
                });
            }
        });
    } else {

        Swal.fire({
            timer: 100000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });

        formData.append('itemImage', $('#item-img')[0].files[0]);
        $.ajax({
            type: 'POST',
            url: BASE_URL + 'api/v1/inventory',
            headers: {
                Authorization: 'Bearer ' + user.jwt
            },
            contentType: false,
            processData: false,
            data: formData,
            success: function (data) {
                clearInterval(timerInterval);
                $('#inventory-modal').modal('hide');
                loadItems();
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
            }, error: function (error) {
                clearInterval(timerInterval);
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
                    title: 'Item not added !'
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
        }, error: function (error) {
            // swal("Error", "Failed to load supplier id", "error");
        }
    });
}

function initializeTable() {
    $(document).ready(function () {
        $('#example').DataTable({
            "language": {
                "search": "Search Supplier:",
                "lengthMenu": "Display count _MENU_",
                "info": "Showing _START_ to _END_ of _TOTAL_ records",
                "infoEmpty": "Showing 0 to 0 of 0 records",
                "infoFiltered": "(filtered from _MAX_ total records)",
            }
        });
    });
}

initializeTable();

function loadItems() {
    $.ajax({
        url: BASE_URL + 'api/v1/inventory',
        method: 'GET',
        async: true,
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            console.log(data)
            let items = data;
            let status;
            let html = '';
            items.forEach(item => {

                if (item.itemStatus === 'AVAILABLE') {
                    status = `<span class="badge bg-success">${item.itemStatus}</span>`;
                } else if (item.itemStatus === 'LOW_STOCK') {
                    status = `<span class="badge bg-warning">Low<20</span>`;
                } else {
                    status = `<span class="badge bg-danger">${item.itemStatus}</span>`;
                }

                html += `
                      <tr style="width: 50px" class="">
                        <td class="text-center"><img src="https://drive.google.com/thumbnail?id=${item.itemPicture}&sz=w1000"  width="80" alt="no one"></td>
                        <td class="text-center">${item.itemCode}</td>
                        <td class="text-center">${item.itemDescription}</td>
                        <td class="text-center">${item.size}</td>
                        <td class="text-center">${item.qtyOnHand}</td>
                        <td class="text-center">${item.supplier.supplierCode}</td>
                        <td class="text-center">${item.supplier.supplierName}</td>
                        <td class="text-center">${item.brand}</td>
                        <td class="text-center">${item.itemType}</td>
                        <td class="text-center">${item.discount}%</td>
                        <td class="text-center">${item.itemGender}</td>
                        <td class="text-center">${item.sellingPrice}</td>
                        <td class="text-center">${item.buyingPrice}</td>
                        <td class="text-center">${item.expectedProfit}</td>
                        <td class="text-center">${item.profitMargin}</td>
                        <td class="text-center">${status}</td>
                        <td class="text-center text-white">
                            <button class="btn btn-sm btn-primary btn-edit-item"><i class="bi bi-pencil-square"></i></button>
                        </td>
                    </tr>
                `;
            });
            $('#tbl-item-body').html(html);
            setEvents();
        }, error: function (error) {
            console.log(error);
        }
    });
}


loadItems();

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

function setEvents() {
    $('.btn-edit-item').on('click', function () {
        $('#btn-add-item').text('Update Item');
        itemCode = $(this).closest('tr').find('td:eq(1)').text();
        renderItem(itemCode)
        $('#inventory-modal').modal('show');
    });
}

function renderItem(id) {
    $.ajax({
        type: 'GET',
        url: BASE_URL + 'api/v1/inventory/' + id,
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            $('#item-supplier').val(data.supplierId);
            $('#item-desc').val(data.itemDescription);
            $('#item-category').val(data.itemCategory);
            $('#item-brand').val(data.brand);
            $('#item-qty').val(data.qtyOnHand);
            $('#item-size').val(data.size);
            $('#item-buying-price').val(data.buyingPrice);
            $('#item-selling-price').val(data.sellingPrice);
            $('#item-expect-profit').val(data.expectedProfit);
            $('#profit-margin').val(data.profitMargin);
            $('#item-status').val(data.itemStatus);
            $('#item-discount').val(data.discount);
            $('#item-userbility').val(data.itemType);
            $('#item-supplier').val(data.supplier.supplierCode);
            $('#supplier-name').text(data.supplier.supplierName);
            $('#item-gender').val(data.itemGender);
            $('#item-img-preview').attr('src', 'https://drive.google.com/thumbnail?id=' + data.itemPicture + '&sz=w1000');
        },
        error: function (error) {
            alert('Item not found !')
        }
    });
}