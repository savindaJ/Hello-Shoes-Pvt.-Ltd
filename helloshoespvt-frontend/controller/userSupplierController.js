let supplierId;

$('#btn-add-modal').on('click', function () {
    $('#btn-add-sup').text('Add Supplier')
    $('#supplier-modal').modal('show');
});

$('#btn-add-sup').on('click', function () {
    var supplier = {
        supplierCode: supplierId,
        supplierName: $('#supplier-name').val(),
        supplierCategory: $('#supplier-category').val(),
        contact: {
            mobile: $('#sup-contact-1').val(),
            land: $('#sup-contact-2').val()
        },
        email: $('#sup-email').val(),
        address: {
            lane: $('#sup-address-lane').val(),
            mainCountry: $('#sup-address-country').val(),
            mainCity: $('#sup-address-city').val(),
            mainState: $('#sup-address-state').val(),
            postalCode: $('#sup-address-code').val(),
        },
        originCountry: $('#sup-origin-country').val()
    };

    console.log(supplier);

    if ($('#btn-add-sup').text() === 'Update Supplier') {
        $.ajax({
            type: 'PUT',
            url: BASE_URL + 'api/v1/suppliers',
            headers: {
                Authorization: 'Bearer ' + user.jwt
            },
            contentType: 'application/json',
            data: JSON.stringify(supplier),
            success: function (data) {
                $('#supplier-modal').modal('hide');
                loadSuppliers();
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
                    title: 'Supplier not updated !'
                });
            }
        });
    }else {
        $.ajax({
            type: 'POST',
            url: BASE_URL + 'api/v1/suppliers',
            headers: {
                Authorization: 'Bearer ' + user.jwt
            },
            contentType: 'application/json',
            data: JSON.stringify(supplier),
            success: function (data) {
                $('#supplier-modal').modal('hide');
                loadSuppliers();
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
                    title: 'Supplier not added !'
                });
            }
        });
    }



});

function loadSuppliers() {
    $.ajax({
        type: 'GET',
        url: BASE_URL + 'api/v1/suppliers',
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            console.log(data)
            let supplier = data;
            let html = '';
            supplier.forEach(supplier => {
                html += `
               <tr>
                   <td class="text-center">${supplier.supplierCode}</td>
                   <td class="text-center">${supplier.supplierName}</td>
                   <td class="text-center">${supplier.supplierCategory}</td>
                   <td class="text-center">${supplier.contact.land}</td>
                   <td class="text-center">${supplier.contact.mobile}</td>
                   <td class="text-center">${supplier.email}</td>
                   <td class="text-center"> ${supplier.address.lane} , ${supplier.address.mainCity},${supplier.address.mainState},${supplier.address.mainCountry},${supplier.address.postalCode}</td>
                      <td class="text-center">
                          <div class="d-flex">
                          <button class="btn btn-sm btn-primary btn-supplier-edit"><i class="bi bi-pencil-square"></i></button>
                          <button class="btn btn-sm btn-danger ms-2 btn-supplier-delete"><i class="bi bi-person-x-fill"></i></button>
                          </div>
                      </td>
              </tr>
                `;
            });
            $('#tbl-supplier-body').html(html);
            initializeTable();
            setEvent();
        },error: function (error) {
            console.log(error);
        }});
}

loadSuppliers();

function setEvent(){


    $('.btn-supplier-edit').on('click', function(){
        $('#btn-add-sup').text('Update Supplier');
        let id = $(this).closest('tr').find('td:first-child').text();
        supplierId = id;
        renderSupplier(supplierId);
        $('#supplier-modal').modal('show');
    });

    $('.btn-supplier-delete').on('click', function(){
        let id = $(this).closest('tr').find('td:first-child').text();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteSupplier(id);
            }
        });
    });
}

function deleteSupplier(id) {
    $.ajax({
        type: 'DELETE',
        url: BASE_URL + 'api/v1/suppliers/delete/' + id,
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
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
                title: 'Supplier deleted !'
            });
            loadSuppliers();
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
                title: 'Something went wrong! Please try again.'
            });
        }});
}

function renderSupplier(id) {
    $.ajax({
        type: 'GET',
        url: BASE_URL + 'api/v1/suppliers/' + id,
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            $('#supplier-name').val(data.supplierName);
            $('#supplier-category').val(data.supplierCategory);
            $('#sup-contact-1').val(data.contact.mobile);
            $('#sup-contact-2').val(data.contact.land);
            $('#sup-email').val(data.email);
            $('#sup-address-lane').val(data.address.lane);
            $('#sup-address-country').val(data.address.mainCountry);
            $('#sup-address-city').val(data.address.mainCity);
            $('#sup-address-state').val(data.address.mainState);
            $('#sup-address-code').val(data.address.postalCode);
            $('#sup-origin-country').val(data.originCountry);
        },
        error: function (error) {
            alert('Supplier not found !')
        }
    });
}

function initializeTable(){
    $(document).ready(function () {
        $('#tbl-supplier').DataTable({
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

function loadSuppliersForRegeular() {
    $.ajax({
        type: 'GET',
        url: BASE_URL + 'api/v1/suppliers',
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            console.log(data)
            let supplier = data;
            let html = '';
            supplier.forEach(supplier => {
                html += `
               <tr>
                   <td class="text-center">${supplier.supplierCode}</td>
                   <td class="text-center">${supplier.supplierName}</td>
                   <td class="text-center">${supplier.supplierCategory}</td>
                   <td class="text-center">${supplier.contact.land}</td>
                   <td class="text-center">${supplier.contact.mobile}</td>
                   <td class="text-center">${supplier.email}</td>
                   <td class="text-center"> ${supplier.address.lane} , ${supplier.address.mainCity},${supplier.address.mainState},${supplier.address.mainCountry},${supplier.address.postalCode}</td>
              </tr>
                `;
            });
            $('#tbl-supplier-regeular-body').html(html);
            new DataTable('#tbl-supplier-regeular');
        },error: function (error) {
            console.log(error);
        }});
}

loadSuppliersForRegeular();