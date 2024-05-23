$('#datepicker').val(new Date().toISOString().slice(0, 10));


$( function() {
    $( "#datepicker" ).datepicker();
} );

$('#datepicker').on('change', function () {
    console.log($(this).val());
});


function getProductInfo(){
    var date = $('#datepicker').val();

    const dto ={
        date : "2024-05-23"
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
            $('#item-img').attr('src', `https://drive.google.com/thumbnail?id=${data.itemPicture}&sz=w1000`);
            $('#item-description').text(data.itemDescription);
            $('#sell-price').text(data.sellingPrice);
            $('#item-discount').text(data.discount+'%');
            $('#supplier').text(data.supplier.email);
            $('#item-id').text(data.itemCode);
            $('#sold').text(data.itemSoldCount);

        },
        error: function (error) {
            console.log(error);
        }
    });
}

getProductInfo();