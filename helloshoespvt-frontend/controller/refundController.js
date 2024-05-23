let canRefundList = [];
let refundedList = [];


function loadCanRefundItemsDetails() {
    $.ajax({
        url: BASE_URL + 'api/v1/sale/refund',
        headers: {
            "Authorization": "Bearer " + user.jwt
        },
        method: 'GET',
        success: function (res) {
            console.log(res);
            canRefundList = res;
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
    $('.btn-refund').click(async function () {
        let saleId = $(this).closest('tr').find('th').text();
        let inventoryId = $(this).closest('tr').find('td').eq(2).text();
        let qtyOnSale = $(this).closest('tr').find('td').eq(3).text();
        console.log(saleId);
        console.log(inventoryId);
        const {value: qty} = await Swal.fire({
            title: "Confirm Refund",
            input: "text",
            inputLabel: "what is refund count ?",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "Please enter quantity!";
                }
            }
        });
        if (qty) {
            console.log(qty,qtyOnSale)
            if (parseInt(qtyOnSale) < parseInt(qty) && parseInt(qty) > 0) {
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
                    title: 'Refund quantity should be less than sold quantity'
                });
                return;
            }

            const refund = {
                saleId: saleId,
                inventoryId: inventoryId,
                quantity: qty
            };
            $.ajax({
                url: BASE_URL + 'api/v1/refund',
                contentType: 'application/json',
                headers: {
                    "Authorization": "Bearer " + user.jwt
                },
                method: 'POST',
                data: JSON.stringify(refund),
                success: function (res) {
                    console.log(res);
                    loadAllRefundedItems();
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
                        title: 'Refund success'
                    });
                    loadCanRefundItemsDetails();
                    getTotalOfSale();
                    getTotalOfRefund();
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
        }else {
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
                title: 'Refund quantity should be less than sold quantity'
            });
        }
    });
}

function loadAllRefundedItems() {
    $.ajax({
        url: BASE_URL + 'api/v1/refund',
        headers: {
            Authorization: "Bearer " + user.jwt
        },
        method: 'GET',
        success: function (res) {
            console.log(res);
            refundedList = res;
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
                     <td>${refun.subTotal}</td>
               </tr>
               
                `;
            });
            $('#tbl-refunded').html(html);
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

loadAllRefundedItems();

$('#txt-can-refund').on('keyup keydown', function () {
    let search = $(this).val();

    if (search === '') {
        loadCanRefundItemsDetails();
    }

    let filtered = canRefundList.filter(item => item.saleId.toLowerCase().includes(search.toLowerCase()) || item.inventoryId.toLowerCase().includes(search.toLowerCase()));
    let html = '';
    filtered.forEach(refun => {
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
});

$('#txt-serch-refund').on('keyup keydown', function () {
    let search = $(this).val();
    if (search === '') {
        loadAllRefundedItems();
    }
    let filtered = refundedList.filter(item => item.saleId.toLowerCase().includes(search.toLowerCase()) || item.inventoryId.toLowerCase().includes(search.toLowerCase()));
    let html = '';
    filtered.forEach(refun => {
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
                     <td>${refun.subTotal}</td>
               </tr>
               
                `;
    });
    $('#tbl-refunded').html(html);
});

function getTotalOfRefund() {
    $.ajax({
        url: BASE_URL + 'api/v1/refund/get-total',
        headers: {
            Authorization: "Bearer " + user.jwt
        },
        method: 'GET',
        success: function (res) {
            $('#total-refund').text('Rs. '+res);
        },
    });
}

getTotalOfRefund();

function getTotalOfSale(){
    $.ajax({
        url: BASE_URL + 'api/v1/sale/total',
        headers: {
            Authorization: "Bearer " + user.jwt
        },
        method: 'GET',
        success: function (res) {
            $('#total-sale').text('Rs. '+res);
        },
    });
}

getTotalOfSale();