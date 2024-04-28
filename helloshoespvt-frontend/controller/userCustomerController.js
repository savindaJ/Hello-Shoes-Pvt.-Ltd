const customers = [];
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
        customerId:'',
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
            $('#employee-modal').modal('hide');
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
                title: 'Failed to update employee'
            });
        }
    });
});
