
const brandList = ['All','DSI','Adidas','Nike','Puma','Reebok','NewBalance','UnderArmour','Converse','Vans','Fila','Skechers','ASICS','Crocs','Timberland','Clarks','Bata','Liberty','HushPuppies','Woodland','RedTape','LeeCooper','Sparx','Power','Action','Paragon','Relaxo','Lakhani','Khadims','Metro','Mochi','Catwalk','Inc5','CarltonLondon','SteveMadden','Aldo','Charles&Keith','NineWest','Zara','H&M','Forever21','Mango','Gucci','Prada','LouisVuitton','Chanel','Burberry','Hermes','Dior','Balenciaga','Versace','Fendi','Givenchy','Valentino','YSL','JimmyChoo','ChristianLouboutin','SalvatoreFerragamo','ToryBurch','Coach','MichaelKors','KateSpade','MarcJacobs','TommyHilfiger','CalvinKlein','RalphLauren','Lacoste','HugoBoss','Armani','GAP','Levis','Diesel','Wrangler','PepeJeans','Lee','TommyJeans','Superdry','Jack&Jones','Only','VeroModa','ZaraMan','H&MMan','Forever21'];

for (const brand of brandList) {

    if (brand === 'All') {
        $('#brand-list').append(`
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab" 
            data-bs-toggle="pill" data-bs-target="#pills-home" 
            type="button" role="tab" aria-controls="pills-home">${brand}
            </button>
        </li>
    `);
        continue;
    }

    $('#brand-list').append(`
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-home-tab" data-bs-toggle="pill"
            data-bs-target="#pills-home" type="button"role="tab" aria-controls="pills-home">${brand}
            </button>
        </li>
    `);
}

$('#brand-list').on('click', 'button', function () {
    $(this).addClass('active').siblings().removeClass('active');
    let brand = $(this).text();
    console.log(brand);
    $('#product-content').empty();
    $('#product-content').append(`
        <div class="col mt-3">
            <div class="card h-100">
                 <img src="../../assets/images/shoe-1.jpg" class="card-img-top" alt="...">
                 <div class="card-body">
                     <div class="d-flex justify-content-sm-between">
                         <small>${brand}</small>
                         <small>Men</small>
                     </div>
                     <div class="d-flex justify-content-sm-between">
                         <small>Size: 7 / 8 / 9 / 10</small>
                         <small>1k Sold</small>
                     </div>
                     <h5 class="card-title m-2 text-center">Rs. 4200</h5>
                     <button class="btn btn-primary w-100">Add to cart</button>
                </div>
            </div>
        </div>
    `);
});

$('#btn-move-right').on('click', function () {
    $('#brand-list').animate({
        scrollLeft: '+=500px'
    }, 500, 'linear');
});

$('#btn-move-left').on('click', function () {
    $('#brand-list').animate({
        scrollLeft: '-=500px'
    }, 500, 'linear');
});

for (let i = 0; i < 10; i++) {
    $('#product-content').append(`
        <div class="col mt-3 z-1">
            <div class="card h-100">
                 <img src="../../assets/images/shoe-1.jpg" class="card-img-top" alt="...">
                 <div class="card-body">
                     <div class="d-flex justify-content-sm-between">
                         <small>UnderAmor</small>
                         <small>Men</small>
                     </div>
                     <div class="d-flex justify-content-sm-between">
                         <small>Size: 7 / 8 / 9 / 10</small>
                         <small>1k Sold</small>
                     </div>
                     <h5 class="card-title m-2 text-center">Rs. 4200</h5>
                     <button class="btn btn-primary w-100">Add to cart</button>
                </div>
            </div>
        </div>
    `);
}