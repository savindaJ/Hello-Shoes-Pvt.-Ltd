$('#btn-open-model').on('click', function () {
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

let itemCode;

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
        },error: function (error) {
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

function initializeTable(){
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

                if (item.itemStatus === 'AVAILABLE'){
                    status = `<span class="badge bg-success">${item.itemStatus}</span>`;
                }else if (item.itemStatus === 'LOW_STOCK'){
                    status = `<span class="badge bg-warning">Low<20</span>`;
                }else {
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
                            <button class="btn btn-sm btn-primary">Edit</button>
                        </td>
                    </tr>
                `;
            });
            $('#tbl-item-body').html(html);
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