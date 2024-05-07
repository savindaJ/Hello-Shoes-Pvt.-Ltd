let cusId;
for (let i = 0; i < 0; i++) {
    $('#tbl-customer-body').append(`
        <tr>
             <td class="text-center">${i}</td>
             <td class="text-center">System Architect</td>
             <td class="text-center">Edinburgh</td>
             <td class="text-center">61</td>
             <td class="text-center">2011-04-25</td>
             <td class="text-center">$320,800</td>
             <td class="text-center">$320,800</td>
             <td class="text-center">$320,800</td>
             <td class="text-center">$320,800</td>
        </tr>
    `)
}

$('#btn-add-customer').on('click', function () {
    $('#btn-save-customer').text('save Customer');
    $('#customer-modal').modal('show');
});

$('#btn-save-customer').on('click',function () {

    const customer = {
        userEmail:user.username,
        customerId:cusId,
        customerName: $('#customer-name').val(),
        gender: $('#customer-gender').val(),
        contact: $('#customer-contact').val(),
        email: $('#customer-email').val(),
        address: {
            lane: $('#customer-address-lane').val(),
            mainCountry: $('#customer-address-country').val(),
            mainCity: $('#customer-address-city').val(),
            mainState: $('#customer-address-state').val(),
            postalCode: $('#customer-address-code').val(),
        },
        dob: $('#customer-dob').val()
    }


    $.ajax({
        url: BASE_URL + 'api/v1/customers',
        type: $('#btn-save-customer').text()==='save Customer' ? 'POST' : 'PUT',
        data: JSON.stringify(customer),
        contentType: 'application/json',
        headers: {
            "Authorization": "Bearer " + user.jwt
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
                title: data
            });
            $('#customer-modal').modal('hide');
            loadAllCustomers();
            loadRegeularUserCustomers();
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
                title: 'Fail Customer Saved !'
            });
        }
    });
});


function loadAllCustomers(){
    $.ajax({
        url: BASE_URL + 'api/v1/customers',
        type: 'GET',
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            console.log(data)
            // initializeTable();  //initialize table
            let customers = data;
            let html = '';
            customers.forEach(customer => {
                let deleteBtn;
                if(customer.totalPoints==null){
                    deleteBtn = `<button class="btn btn-sm btn-danger ms-2 btn-delete-customer"><i class="bi bi-person-x-fill"></i></button>`
                }else {
                    deleteBtn = ''
                }
                html += `
               <tr>
                   <td class="text-center">${customer.customerId}</td>
                   <td class="text-center">${customer.customerName}</td>
                   <td class="text-center">${customer.gender}</td>
                   <td class="text-center">${customer.registeredDate}</td>
                   <td class="text-center">${customer.dob}</td>
                   <td class="text-center">${customer.recentPurchaseDate}</td>
                   <td class="text-center">${customer.totalPoints}</td>
                   <td class="text-center">${customer.contact}</td>
                   <td class="text-center">${customer.level}</td>
                   <td class="text-center">${customer.email}</td>
                   <td class="text-center">${customer.address.lane},${customer.address.mainState},${customer.address.mainCity},${customer.address.postalCode}</td>
                   <td class="text-center">
                      <div class="d-flex">
                      <button class="btn btn-sm btn-primary btn-edit-customer"><i class="bi bi-pencil-square"></i></button>
                      ${deleteBtn}
                      </div>
                   </td>
            </tr>
                `;
            });

            $('#tbl-customer-body').html(html);
            setEvent();
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
                title: 'session expired'
            });
        }
    });

}

loadAllCustomers();

function setEvent() {
    $('.btn-edit-customer').on('click',function () {
        $('#btn-save-customer').text('Update Customer');
        $('#customer-modal').modal('show')
        let id = $(this).closest('tr').find('td:first-child').text();
        cusId = id;
        renderCustomer(id);
    });

    $('.btn-delete-customer').on('click',function () {
        let id = $(this).closest('tr').find('td:first-child').text();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete Customer!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: BASE_URL + 'api/v1/customers/' + id,
                    type: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + user.jwt
                    },
                    success: function (data) {
                        Swal.fire(
                            'Deleted!',
                            'Customer has been deleted.',
                            'success'
                        )
                        loadAllCustomers();
                    },
                    error: function (error) {
                        Swal.fire(
                            'Failed!',
                            'Customer has not been deleted.',
                            'error'
                        )
                    }
                });
            }
        })
    });
}

function renderCustomer(id) {
    $.ajax({
        type: 'GET',
        url: BASE_URL + 'api/v1/customers/' + id,
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            $('#customer-name').val(data.customerName);
            $('#customer-gender').val(data.gender);
            $('#customer-contact').val(data.contact);
            $('#customer-email').val(data.email);
            $('#customer-dob').val(data.dob);
            $('#customer-address-lane').val(data.address.lane);
            $('#customer-address-city').val(data.address.mainCity);
            $('#customer-address-state').val(data.address.mainState);
            $('#customer-address-code').val(data.address.postalCode);
            $('#customer-address-country').val(data.address.mainCountry);
        },
        error: function (error) {
            alert('Supplier not found !')
        }
    });
}

function initializeTable(){
    $(document).ready(function () {
        $('#tbl-customer').DataTable({
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


function loadRegeularUserCustomers(){
    $.ajax({
        url: BASE_URL + 'api/v1/customers',
        type: 'GET',
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            console.log(data)
            // initializeTable();  //initialize table
            let customers = data;
            let html = '';
            customers.forEach(customer => {
                html += `
               <tr>
                   <td class="text-center">${customer.customerId}</td>
                   <td class="text-center">${customer.customerName}</td>
                   <td class="text-center">${customer.gender}</td>
                   <td class="text-center">${customer.registeredDate}</td>
                   <td class="text-center">${customer.dob}</td>
                   <td class="text-center">${customer.recentPurchaseDate}</td>
                   <td class="text-center">${customer.totalPoints}</td>
                   <td class="text-center">${customer.contact}</td>
                   <td class="text-center">${customer.level}</td>
                   <td class="text-center">${customer.email}</td>
                   <td class="text-center">${customer.address.lane},${customer.address.mainState},${customer.address.mainCity},${customer.address.postalCode}</td>
            </tr>
                `;
            });

            $('#tbl-customer-regeular-body').html(html);
            $(document).ready(function () {
                $('#tbl-customer-regeular').DataTable({
                    "language": {
                        "search": "Search Supplier:",
                        "lengthMenu": "Display count _MENU_",
                        "info": "Showing _START_ to _END_ of _TOTAL_ records",
                        "infoEmpty": "Showing 0 to 0 of 0 records",
                        "infoFiltered": "(filtered from _MAX_ total records)",
                    }
                });
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
                title: 'session expired'
            });
        }
    });

}

loadRegeularUserCustomers();