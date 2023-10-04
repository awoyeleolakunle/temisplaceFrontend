



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
        console.log("i'm the orderStatus info ", data);
        displayCategoryName(data)
    })
    .catch(error=>{
        console.log("error : ", error);
    })

}



function displayCategoryName(data){


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
    console.log("I'm running the function ");
}



