// $(document).ready(function () {

// 	// FETCHING DATA FROM JSON FILE
// 	$.getJSON("productData.json",
// 		function (data) {
// 			var product = '';

// 			// ITERATING THROUGH OBJECTS
// 			$.each(data, function (key, value) {

// 				//CONSTRUCTION OF ROWS HAVING
// 				// DATA FROM JSON OBJECT

// 				product += `<div class="item"><img src="${value.image}"/><div class="itemInfo"><h1>${value.name}</h1><p>Rs.<span>${value.price}</span></p><a href="#" title="add to cart" class="attToCart">Add to cart</a></div></div>`;

// 			});

// 			//adding items  
// 			$('.itemsBox').append(product);
// 		});
// });


var xmlhttp = new XMLHttpRequest();
var url = "productData.txt";

xmlhttp.onreadystatechange = function () {
	console.log(this.responseText);
	// if (this.readyState == 4 || this.status == 200) {
		var myArr = JSON.parse(this.responseText);
		myFunction(myArr);
	// }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
	var product = [];
	var i;
	for (i = 0; i < arr.length; i++) {
		// out += '<a href="' + arr[i].url + '">' +
		// 	arr[i].display + '</a><br>';
		product += `<div class="item"><img src="${arr[i].image}"/><div class="itemInfo"><h1>${arr[i].name}</h1><p>Rs.<span>${arr[i].price}</span></p><a href="#" title="add to cart" class="attToCart">Add to cart</a></div></div>`;
	}
	document.getElementsByClassName("itemsBox")[0].innerHTML = product;
}
//---------------------------------------------
window.onload = function () {
	//cart box
	const iconShopping = document.querySelector('.iconShopping');
	const cartCloseBtn = document.querySelector('.fa-close');
	const cartBox = document.querySelector('.cartBox');
	iconShopping.addEventListener("click", function () {
		cartBox.classList.add('active');
	});
	cartCloseBtn.addEventListener("click", function () {
		cartBox.classList.remove('active');
	});


	// adding data to localstorage
	const attToCartBtn = document.getElementsByClassName('attToCart');
	let items = [];
	for (let i = 0; i < attToCartBtn.length; i++) {
		attToCartBtn[i].addEventListener("click", function (e) {
			if (typeof (Storage) !== 'undefined') {
				let item = {
					id: i + 1,
					name: e.target.parentElement.children[0].textContent,
					price: e.target.parentElement.children[1].children[0].textContent,
					no: 1
				};
				if (JSON.parse(localStorage.getItem('items')) === null) {
					items.push(item);
					localStorage.setItem("items", JSON.stringify(items));
					window.location.reload();
				} else {
					const localItems = JSON.parse(localStorage.getItem("items"));
					localItems.map(data => {
						if (item.id == data.id) {
							item.no = data.no + 1;
						} else {
							items.push(data);
						}
					});
					// alert('There is an Item in your cart!')
					items.push(item);
					localStorage.setItem('items', JSON.stringify(items));
					window.location.reload();
				}
			} else {
				alert('local storage is not working on your browser');
			}
		});
	}
	// adding data to shopping cart 
	const iconShoppingP = document.querySelector('.iconShopping p');
	let no = 0;
	JSON.parse(localStorage.getItem('items')).map(data => {
		no = no + data.no
			;
	});
	iconShoppingP.innerHTML = no;


	//adding cartbox data in table
	const cardBoxTable = cartBox.querySelector('table');
	let tableData = '';
	tableData += '<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';
	if (JSON.parse(localStorage.getItem('items'))[0] === null) {
		tableData += '<tr><td colspan="5">No items found</td></tr>'
	} else {
		JSON.parse(localStorage.getItem('items')).map(data => {
			tableData += '<tr><th>' + data.id + '</th><th>' + data.name + '</th><th>' + data.no + '</th><th>' + data.price + '</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
		});
	}
	cardBoxTable.innerHTML = tableData;
}

function purchase() {
	alert("Your order is booked. Thankyou for choosing us ")
	localStorage.clear();
	window.location.reload();
}
