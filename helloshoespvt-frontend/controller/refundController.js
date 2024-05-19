function loadCanRefundItemsDetails() {
    $.ajax({
        url: BASE_URL + 'api/v1/sale/refund',
        headers: {
            "Authorization": "Bearer " + user.jwt
        },
        method: 'GET',
        success: function (res) {
            console.log(res);
            let refunds = res;
            let html = '';
            refunds.forEach(refun => {
                var date = new Date(refun.purchaseDate);
                var day = date.getDate();
                var month = date.toLocaleString('default', {month: 'short'});
                var year = date.getFullYear();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                var formattedDate = day + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds;
                html += `
               <tr>
                     <th scope="row">${refun.saleId}</th>
                     <td>${refun.itemDescription}</td>
                     <td>${refun.customerName}</td>
                     <td>${refun.inventoryId}</td>
                     <td>${refun.quantity}</td>
                     <td>${formattedDate}</td>
                     <td>${refun.cashierName}</td>
                     <td>${refun.subTotal}</td>
                     <td>
                         <button style="height: 25px" class="btn btn-sm btn-outline-danger btn-refund">
                             <i class="bi bi-arrow-down-square-fill"></i>
                         </button>
                     </td>
               </tr>
                `;
            });
            $('#tbl-refund').html(html);
            setEvent();
        }, error: function (error) {
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
                title: 'Session expired! Please login again.'
            });
        }
    });
}

loadCanRefundItemsDetails();

function setEvent() {
    $('.btn-refund').click(function () {
        let saleId = $(this).closest('tr').find('th').text();
        console.log(saleId);
        // $.ajax({
        //     url: BASE_URL + 'api/v1/sale/refund/' + saleId,
        //     headers: {
        //         "Authorization": "Bearer " + user.jwt
        //     },
        //     method: 'POST',
        //     success: function (res) {
        //         console.log(res);
        //         const Toast = Swal.mixin({
        //             toast: true,
        //             position: "top-end",
        //             showConfirmButton: false,
        //             timer: 3000,
        //             timerProgressBar: true,
        //             didOpen: (toast) => {
        //                 toast.onmouseenter = Swal.stopTimer;
        //                 toast.onmouseleave = Swal.resumeTimer;
        //             }
        //         });
        //         Toast.fire({
        //             icon: "success",
        //             title: 'Refund success'
        //         });
        //         loadCanRefundItemsDetails();
        //     }, error: function (error) {
        //         const Toast = Swal.mixin({
        //             toast: true,
        //             position: "top-end",
        //             showConfirmButton: false,
        //             timer: 3000,
        //             timerProgressBar: true,
        //             didOpen: (toast) => {
        //                 toast.onmouseenter = Swal.stopTimer;
        //                 toast.onmouseleave = Swal.resumeTimer;
        //             }
        //         });
        //         Toast.fire({
        //             icon: "error",
        //             title: 'Session expired! Please login again.'
        //         });
        //     }
        // });
    });
}