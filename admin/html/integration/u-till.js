



document.addEventListener('DOMContentLoaded', fetcAllItemCategoryName)

const unitName = 'LONDON'

//document.getElementById('itemCategoryNameListId').innerHTML="";


// Your existing JavaScript code here

// Get the trigger div and the modal
const triggerDiv =document.querySelector('.product-link'); // Changed to select the product link

//document.querySelector('.mainItemDiv')
//document.querySelector('.product-link'); // Changed to select the product link

const modal = document.getElementById('myModal');

// Get the modal content elements
const sizeAndPriceList = document.getElementById('sizeAndPriceList');
const addToCartButton = document.getElementById('addToCartButton');

// Define the data for sizes and prices (you can fetch this data dynamically)
const productData = [
    { size: '500ml', price: '£2.75' },
    { size: '750ml', price: '£3.50' },
];

// Function to open the modal and populate it with data
function openModal() {
    sizeAndPriceList.innerHTML = ''; // Clear previous data

    for (const item of productData) {
        const listItem = document.createElement('li');
        listItem.innerHTML =  listItem.innerHTML = `
        <input type="checkbox" class="check-button" />
        <input type="text" class="item-quantity" placeholder="enter quantity"/>
        ${item.size} - ${item.price}
    `;
        sizeAndPriceList.appendChild(listItem);
    }

    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    modal.style.display = 'none';
}

// Attach click event listener to the product link
triggerDiv.addEventListener('click', openModal);

// Attach click event listener to the close button (X)
document.querySelector('.close').addEventListener('click', closeModal);

// Attach click event listener to the "Add to Cart" button (you can implement cart functionality here)
addToCartButton.addEventListener('click', () => {
    // Add selected item to cart
    // Implement your cart logic here
});

// Your existing JavaScript code continues here




let sizeOfItemCategory = 0;

function fetcAllItemCategoryName(){

    
    fetch('http://localhost:8080/api/v1/temisplace/namesOfAllItemCategory', {
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
    })

}



function displayCategoryName(data){

    sizeOfItemCategory = data.length;


    const mainContainer = document.getElementById("itemCategoryNameListId");



    mainContainer.innerHTML="";

   // <div class="col-xxl-2 col-lg-4 col-md-4">

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
        
    fetch('http://localhost:8080/api/v1/temisplace/AUnitAllItemsUnderItemCategory', {
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
    })

}




function displayAllAvailableItemsUnderAnItemCategory(listOfItemsUnderItemCategory) {
    
    clearInitialItemsFectehedUnderItemCategory()

    
    const mainContainer = document.getElementById("itemCategoryNameListId");

  
    listOfItemsUnderItemCategory.forEach((item, index) => {
        const modalId = `myModal${index}`;
       // const itemsId = `itemsId${index}`;
    
        const itemContainer = document.createElement('div')
        itemContainer.className = "col-xxl-2 col-lg-4 col-md-4";

        itemContainer.innerHTML = `
            <!-- Item Card Content -->
            <div id="itemsId" class="card custom-card overflow-hidden">
                <div class="card-body">
                    <div class="d-flex align-items-top justify-content-between   product-link">
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
            <div id=${ modalId} class="modal">
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
            openModal(item, modalId);
        });

        // Add click event listener to open the modal
        // listItem.addEventListener('click', () => {
        //     openModal(modalId);
        // });
    });

    console.log("I'm the function");
}





function clearInitialItemsFectehedUnderItemCategory(){
    const elements = document.querySelectorAll('.col-xxl-2.col-lg-4.col-md-4')

    if (elements.length > 0) {
        elements.forEach(element => {
            if((element.querySelector('#itemsId'))){
            element.innerHTML ="";}
        });
    } else {
        console.log('No matching elements found.');
    }
}



function openModal(item, modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';

    const sizeAndPriceList = modal.querySelector('#sizeAndPriceList');
    const addToCartButton = modal.querySelector('#addToCartButton');

    sizeAndPriceList.innerHTML = "";

    for (const sizesAndPrices of item.itemPriceAndSize) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" class="check-button" />
            <input type="text" class="item-quantity" placeholder="enter quantity"/>
            ${sizesAndPrices.size} - £${sizesAndPrices.price}
        `;
        sizeAndPriceList.appendChild(listItem);
    }

    modal.querySelector('.close').addEventListener('click', () => {
        closeModal(modal); // Pass the modal as a parameter
    });
}

function closeModal(modal) {
    modal.style.display = 'none';
}



















