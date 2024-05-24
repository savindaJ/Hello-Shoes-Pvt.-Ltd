$('#datepicker').val(new Date().toISOString().slice(0, 10));


$( function() {
    $( "#datepicker" ).datepicker();
} );

$('#datepicker').on('change', function () {
    var date = $('#datepicker').val();

    const dto ={
        date : new Date(date)
    }

    console.log(date);
    $.ajax({
        url: 'http://localhost:8000/hello-shoe/api/v1',
        type: 'POST',
        headers: {
            "Authorization": "Bearer " + user.jwt
        },
        contentType: 'application/json',
        data: JSON.stringify(dto),
        success: function (data) {
            console.log(data.inventoryDTO);
            if (data==null){
                $('#item-img').attr('src', `https://drive.google.com/thumbnail?id=${data.itemPicture}&sz=w1000`);
                $('#item-description').text('no one');
                $('#sell-price').text('no one');
                $('#item-discount').text('no one');
                $('#supplier').text('no one');
                $('#item-id').text('no one');
                $('#sold').text('no one');

            }else {


                $('#item-img').attr('src', `https://drive.google.com/thumbnail?id=${data.itemPicture}&sz=w1000`);
                $('#item-description').text(data.inventoryDTO.itemDescription);
                $('#sell-price').text(data.inventoryDTO.sellingPrice);
                $('#item-discount').text(data.inventoryDTO.discount+'%');
                $('#supplier').text(data.inventoryDTO.supplier.email);
                $('#item-id').text(data.inventoryDTO.itemCode);
                $('#sold').text(data.inventoryDTO.itemSoldCount);
                $('#today-money').text(data.todayTotal);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });});


function getProductInfo(){
    var date = $('#datepicker').val();

    const dto ={
        date : date
    }

    console.log(date);
    $.ajax({
        url: 'http://localhost:8000/hello-shoe/api/v1',
        type: 'POST',
        headers: {
            "Authorization": "Bearer " + user.jwt
        },
        contentType: 'application/json',
        data: JSON.stringify(dto),
        success: function (data) {
            console.log(data);
            $('#item-img').attr('src', `https://drive.google.com/thumbnail?id=${data.inventoryDTO.itemPicture}&sz=w1000`);
            $('#item-description').text(data.inventoryDTO.itemDescription);
            $('#sell-price').text(data.inventoryDTO.sellingPrice);
            $('#item-discount').text(data.inventoryDTO.discount+'%');
            $('#supplier').text(data.inventoryDTO.supplier.email);
            $('#item-id').text(data.inventoryDTO.itemCode);
            $('#sold').text(data.inventoryDTO.itemSoldCount);
            $('#today-money').text('Rs.'+data.todayTotal);
            $('#count-of-inventory').text(data.inventoryCount);
            $('#tot-of-sales').text(data.totalOfSales);
            $('#customer-count').text(data.customerCount);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

getProductInfo();