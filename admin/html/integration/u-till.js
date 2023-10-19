




//document.getElementById('itemCategoryNameListId').innerHTML="";


// Your existing JavaScript code here

// Get the trigger div and the modal
//const triggerDiv =document.querySelector('.product-link'); // Changed to select the product link

//document.querySelector('.mainItemDiv')
//document.querySelector('.product-link'); // Changed to select the product link

//const modal = document.getElementById('myModal');

// Get the modal content elements
const sizeAndPriceList = document.getElementById('sizeAndPriceList');
const addToCartButton = document.getElementById('addToCartButton');

// Define the data for sizes and prices (you can fetch this data dynamically)
const productData = [
    { size: '500ml', price: '£2.75' },
    { size: '750ml', price: '£3.50' },
];

// Function to open the modal and populate it with data
//function openModal() {
  //  sizeAndPriceList.innerHTML = ''; // Clear previous data

    // for (const item of productData) {
    //     const listItem = document.createElement('li');
    //     listItem.innerHTML =  listItem.innerHTML = `
    //     <input type="checkbox" class="check-button" />
    //     <input type="text" class="item-quantity" placeholder="enter quantity"/>
    //     ${item.size} - ${item.price}
    // `;
    //     sizeAndPriceList.appendChild(listItem);
    // }

    // modal.style.display = 'block';
//}

// Function to close the modal
// function closeModal() {
//     modal.style.display = 'none';
// }

// Attach click event listener to the product link
//triggerDiv.addEventListener('click', openModal);

// Attach click event listener to the close button (X)
//document.querySelector('.close').addEventListener('click', closeModal);

// Attach click event listener to the "Add to Cart" button (you can implement cart functionality here)


// Your existing JavaScript code continues here





document.addEventListener('DOMContentLoaded',()=>{ 
    fetcAllItemCategoryName();
    
})

const unitName =JSON.parse(sessionStorage.getItem('temisplace-unitName'))
console.log(unitName);
let listOfItemDetails = [];
let total;
let paymentType;


let sizeOfItemCategory = 0;

function fetcAllItemCategoryName(){

    
    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/namesOfAllItemCategory`, {
        method :'POST',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Failed to load')
        }
        else{
            return response.json()
        }
    })
    .then(data=>{
        console.log("i'm the list of item category ", data);
        displayCategoryName(data)
    })
    .catch(error=>{
        console.log("error : ", error);
        const message = "Network Failed";
        {toast(message)};
    })

}



function displayCategoryName(data){

    sizeOfItemCategory = data.length;


    const mainContainer = document.getElementById("itemCategoryNameListId");



    mainContainer.innerHTML="";



    data.forEach((item, index) => {
 
    const listItem = document.createElement('div');
    listItem.className = "col-xxl-2 col-lg-4 col-md-4";



    listItem.innerHTML = `

<div data-index=${index} class="card custom-card overflow-hidden">
    <div  class="card-body">
        <div class="d-flex align-items-top justify-content-between">
            <div>
                    <span class="avatar avatar-md avatar-rounded bg-blue">
                    </span>
                </div>
                <div class="flex-fill ms-3">
                    <div class="d-flex align-items-center justify-content-between flex-wrap">
                        <div>
                            <p class="text-muted mb-0">${item}</p>
                            <h4 class="fw-semibold mt-1">${index+1}</h4>
                        </div>
                        <div id="crm-total-customers"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

`;

mainContainer.appendChild(listItem);

listItem.addEventListener('click', ()=>{

    const unitAvailableItemsRequest = {
        'unitName' : unitName,
        'itemCategory': item
    };

    console.log("I'm the itemCategory", unitAvailableItemsRequest.itemCategory);
   
    fetchUnitAllAvailableItemUnderItemCategory(unitAvailableItemsRequest)
})



});

}


function fetchUnitAllAvailableItemUnderItemCategory(unitAvailableItemsRequest){
        
    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/AUnitAllItemsUnderItemCategory`, {
        method :'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(unitAvailableItemsRequest)
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Failed to load')
        }
        else{
            return response.json()
        }
    })
    .then(data=>{
        console.log("i'm the list of item under item category ", data);
     
        displayAllAvailableItemsUnderAnItemCategory(data)
    })
    .catch(error=>{
        console.log("error : ", error);
        const message = "Network Failed";
        {toast(message)};
    })

}




function generateSizesAndPricesItem(sizesAndPrices, itemId, itemTitle) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <input type="checkbox" class="check-button" />
        <input type="text" class="item-quantity" placeholder="enter quantity"/>
        ${sizesAndPrices.size} - £${sizesAndPrices.price}
    `;

    const checkbox = listItem.querySelector('.check-button');
    const quantityInput = listItem.querySelector('.item-quantity');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            
            let itemQuantity = quantityInput.value || 0; 
            let subTotal = itemQuantity * sizesAndPrices.price;
            let itemDetails = {
                itemTitle: itemTitle,
                itemQuantity: itemQuantity,
                subTotal: subTotal,
                itemId: itemId,
                itemSize: sizesAndPrices.size
            };
            addItemDetailsToList(itemDetails);
        } else {
         
            removeItemDetailsFromList(itemId, sizesAndPrices.size);
        }
    });

    quantityInput.addEventListener('input', () => {
        if (checkbox.checked) {
         
            let itemQuantity = quantityInput.value || 0;
            let subTotal = itemQuantity * sizesAndPrices.price;
            let updatedItemDetails = {
                itemTitle : itemTitle,
                itemQuantity: itemQuantity,
                subTotal: subTotal,
                itemId: itemId,
                itemSize: sizesAndPrices.size
                
            };

            updateItemDetailsInList(updatedItemDetails);
        }
    });

    return listItem;
}

function displayAllAvailableItemsUnderAnItemCategory(listOfItemsUnderItemCategory) {
    const mainContainer = document.getElementById("itemCategoryNameListId");
   
   
    clearInitialItemsFectehedUnderItemCategory();
   
   
    listOfItemsUnderItemCategory.forEach((item, index) => {
        const modalId = `myModal${index}`;
        const itemContainer = document.createElement('div');
        itemContainer.className = "col-xxl-2 col-lg-4 col-md-4 item-container";

        itemContainer.innerHTML = `
            <!-- Item Card Content -->
            <div class="card custom-card overflow-hidden">
                <div class="card-body">
                    <div class="d-flex align-items-top justify-content-between product-link">
                        <div><a href="javascript:void(0);">
                            <span class="avatar avatar-md avatar-rounded bg-blue">
                            </span></a>
                        </div>
                        <div class="flex-fill ms-3">
                            <div class="d-flex align-items-center justify-content-between flex-wrap">
                                <div>
                                    <p class="text-muted mb-0">${item.price} </p>
                                    <a href="javascript:void(0);" class="product-name">
                                        <h4 class="fw-semibold mt-1">${item.itemId}</h4>
                                    </a>
                                </div>
                                <div id="crm-total-customers"></div>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mt-1">
                                <div class="text-end">
                                    <p class="mb-0 text-blue fw-semibold product-description">${item.itemTitle}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pop-up/modal -->
            <div id=${modalId} class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <!-- Content of the pop-up/modal -->
                    <h2>Available Sizes and Prices</h2>
                    <ul id="sizeAndPriceList">
                        <!-- Populate this list with the sizes and prices dynamically -->
                    </ul>
                    <button id="addToCartButton">Add to Cart</button>
                </div>
            </div>
        `;

        mainContainer.appendChild(itemContainer);

        itemContainer.querySelector('.product-link').addEventListener('click', () => {
            openModal(modalId);
        });

        const sizeAndPriceList = itemContainer.querySelector('#sizeAndPriceList');
        for (const sizesAndPrices of item.itemPriceAndSize) {
            const listItem = generateSizesAndPricesItem(sizesAndPrices, item.itemId, item.itemTitle);
            sizeAndPriceList.appendChild(listItem);
        }
    });
}

function clearInitialItemsFectehedUnderItemCategory() {



    const elements = document.querySelectorAll('.item-container');
    if (elements.length > 0) {
        
        elements.forEach(element => {
 
                element.innerHTML = "";
        });
    } else {
        console.log('No matching elements found.');
    }
}

function openModal( modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';

    modal.querySelector('.close').addEventListener('click', () => {
        closeModal(modal); 
    });
}

function closeModal(modal) {
    modal.style.display = 'none';
}

function addItemDetailsToList(itemDetails) {
    listOfItemDetails.push(itemDetails);
    displayCartDetails()
    console.log(listOfItemDetails);
}

function updateItemDetailsInList(updatedItemDetails) {
    for (const item of listOfItemDetails) {
        if (item.itemId === updatedItemDetails.itemId &&
            item.itemSize === updatedItemDetails.itemSize) {
            Object.assign(item, updatedItemDetails);
            break;
        }
    }

    displayCartDetails()
    console.log(listOfItemDetails);
}

function removeItemDetailsFromList(itemId, itemSize) {
    const Id = parseInt(itemId);
    const size = String(itemSize)
    listOfItemDetails = listOfItemDetails.filter(item => item.itemId !== Id || item.itemSize !== size);
   
    console.log("I'm the list in after removing ",listOfItemDetails);
    displayCartDetails();
   
}







function displayCartDetails() {
    const instoreContainer = document.getElementById('instoreContainerId');

    const itemListContainerId = document.getElementById('itemListContainerId');

    if(itemListContainerId){
        instoreContainer.removeChild(itemListContainerId)
    }

    const itemListContainer = document.createElement('div');
    itemListContainer.id = 'itemListContainerId';


    instoreContainer.prepend(itemListContainer);
  

    listOfItemDetails.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.className = "d-flex align-items-center justify-content-between";

        listItem.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="me-2">
                    <span class="avatar avatar-sm">
                        <span class="avatar avatar-sm avatar-rounded bg-blue">												
                        </span>
                    </div>
                    <div>
                        <p class="mb-0 fw-semibold">${item.itemTitle || ""}</p>
                        <p class="mb-0 fs-11 text-success fw-semibold">${item.itemSize || ""}</p>
                    </div>
                </div>

                <div class="text-end">
                    <p class="mb-0 fw-semibold">
                        £${item.subTotal || 0}
                    </p>
                    <p class="mb-0 op-7 text-muted fs-11">
                        Quantity: ${item.itemQuantity || 0}
                    </p>
                    <p class="mb-0 op-7 text-muted fs-11">
                        <button   aria-label="button" type="button" class="btn btn-sm btn-success-light btn-icon delete-btn" data-item-id="${item.itemId}" data-item-size="${item.itemSize}" ><i class="ri-delete-bin-line"></i></button>
                    </p>															
                </div>
            </div>
        `;

        itemListContainer.appendChild(listItem);
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = event.currentTarget.getAttribute('data-item-id');
                const itemSize = event.currentTarget.getAttribute('data-item-size');
                console.log("i'm the itemId ", itemId);
                console.log("i'm the itemSize ", itemSize);
                removeItemDetailsFromList(itemId, itemSize);
            });
        });
        
        totalSumOfCartItems();
      

    });
}


function totalSumOfCartItems(){
   total = listOfItemDetails.map(item=>item.subTotal).reduce((accumulator, currentValue)=>accumulator+currentValue, 0);
   document.getElementById('totalAmountId').innerHTML = "£"+total.toFixed(2);
}


let orderItemRequestList = [];
function extractListOfItemDetailsNeeAsAListToSendToBackend(){

    for(const item of listOfItemDetails){
        orderItemDetails = {
            itemId:item.itemId,
            quantity: item.itemQuantity,
            subTotal : item.subTotal
        };
        orderItemRequestList.push(orderItemDetails)
    }

}


const completeBTn = document.getElementById('completeOrderBtnId');
completeBTn.addEventListener('click', sendOrderToBackend);

const radioCreditCard = document.getElementById('flexRadioDefault1'); 
const radioCash = document.getElementById('flexRadioDefault2');

radioCreditCard.addEventListener('change', function(){
    if(this.checked){
        paymentType = "CREDIT_DEBIT_CARD"
        console.log('payment type : ', paymentType);
    }
})

radioCash.addEventListener('change', function () {
    if (this.checked) {
        paymentType = "CASH"
        console.log('payment type :', paymentType);
    }
});


function sendOrderToBackend(){
    extractListOfItemDetailsNeeAsAListToSendToBackend();



    const numberOfAllItemQuantityOrdered = orderItemRequestList.reduce((sum, item) => sum + Number(item.quantity), 0);


    console.log("I'm the total numbers of items purchased", numberOfAllItemQuantityOrdered);

    const itemRequestDetails= {
        orderItemRequestList : orderItemRequestList,
        total  : total,
        unitName : unitName,
        orderFrom : "INSTORE",
        paymentType : String(paymentType),
        numberOfAllItemQuantityOrdered :numberOfAllItemQuantityOrdered
    }


    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/Orders/makeOrder`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemRequestDetails)
    })
    .then(response=>{
        if(!response.ok){
          
            throw new Error('Failed to make order')
        }
        else{
            console.log("I'm the response data ", response.data);
            return response.json()
        }
    })
    .then(data=>{
        console.log("response message ", data);
        const message = "Your Order has been successfully created";
        {toast(message)};
        listOfItemDetails = [];
        displayCartDetails()


    })
    .catch(error=>{
        console.log("error : ", error);
        const message = "Failed to create order";
       const timer = 6000;
        {toast(message, timer)};
    })
}

