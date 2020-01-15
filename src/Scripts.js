var addtoCart = document.querySelectorAll('.fa-shopping-cart');

for(let i=0; i<addtoCart.length; i++){
    addtoCart[i].addEventListener('click', addedtoCart);
}

function addedtoCart(event){
    var temp = event.target;
    var item = temp.parentElement.parentElement.parentElement.parentElement;
    var title = item.getElementsByClassName('title-prod')[0].innerText;
    var price = item.getElementsByClassName('price-prod')[0].innerText;
    var imgs = item.getElementsByTagName('img')[0].src;
    addtoCarts(title, price, imgs);
    updateCartTotal();
    insertPurchaseButton();
    //console.log(title + ', ' + price + ', ' + imgs);
    
}

function addtoCarts(title, price, imgs){
    var cartRow = document.createElement('div');
    cartRow.classList.add('crt-row');
    var cartList = document.getElementsByClassName('cart-list')[0];
    var titleChecker = cartList.getElementsByClassName('titlep');
    for(let i=0; i<titleChecker.length; i++){
        if(title == titleChecker[i].innerText){
            alert('Already listed!');
            return;
        }
    }
    var cartRowContents = `
        <div class="crt-clm">
            <img src="${imgs}" width="64" style="float:left">
            <span class="titlep">${title}</span>
        </div>
        <span class="crt-clm prices">${price}</span>
        <div class="crt-clm">
            <input type="number" value="1" />
            <button type="button" class="btn btn-danger">Remove</button>
        </div>
    `;
    cartRow.innerHTML = cartRowContents;
    cartList.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItem);
    cartRow.getElementsByTagName('input')[0].addEventListener('change', changeQty);
}

function removeItem(event){
    var btn = event.target;
    btn.parentElement.parentElement.remove();
    updateCartTotal();
    insertPurchaseButton();
}

function updateCartTotal(){
    var cartList = document.getElementsByClassName('cart-list')[0];
    var cartRows = cartList.getElementsByClassName('crt-row');
    var total = 0;
    for(let i=0; i<cartRows.length; i++){
        var priceEl = cartRows[i].getElementsByClassName('prices')[0];
        //console.log(priceEl)
        var qty = cartRows[i].getElementsByTagName('input')[0].value;
        var tmpPrice = priceEl.innerText;
        do{
            tmpPrice = tmpPrice.replace('.', '');
        }while(tmpPrice.indexOf('.') != -1);
        //console.log(tmpPrice);
        var price = parseInt(tmpPrice.replace('Rp', ''));
        //console.log(qty);
        total = total +  (qty * price);
    }
    document.getElementsByClassName('crt-price')[0].innerText = total
}

function changeQty(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function insertPurchaseButton(){
    var tmp = document.getElementsByClassName('cart-list');
    var purchaseButton = `
        <button type="button">Purchase</button>
    `;
    var purDiv = document.getElementsByClassName('pur-btn');
    var btn = document.createElement('button');
    btn.classList.add('btn-success', 'btn');
    var txt = document.createTextNode('Purchase');
    btn.appendChild(txt);

    if(purDiv[0].innerHTML == "" && tmp[0].innerHTML != ""){
        purDiv[0].append(btn);
        document.getElementsByClassName('btn-success')[0].addEventListener('click', PurchaseSuccess);
    }else if(tmp[0].innerHTML == ""){
        purDiv[0].removeChild(purDiv[0].childNodes[0]);
    }
}

function PurchaseSuccess(){
    var price = document.getElementsByClassName('crt-price')[0].innerText;
    alert('You have purchased Rp. ' + price + '. Thank you for transaction.');
    var temp = document.getElementsByClassName('cart-list')[0];
    while(temp.hasChildNodes()){
        temp.removeChild(temp.firstChild);
    }
    insertPurchaseButton();
    updateCartTotal();
}
