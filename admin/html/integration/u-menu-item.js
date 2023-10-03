




document.addEventListener('DOMContentLoaded', loadAndDisplayUnitItemsUnderAnItemCategory)


function loadAndDisplayUnitItemsUnderAnItemCategory() {

    const listOfItemsUnderAnItemCategory = JSON.parse(sessionStorage.getItem('listOfItemsUnderAnItemCategory'));
    console.log(listOfItemsUnderAnItemCategory);

    const itemListUnderItemCategoryContainer = document.getElementById('itemListUnderItemCategoryContainerId');

    itemListUnderItemCategoryContainer.innerHTML = "";

    listOfItemsUnderAnItemCategory.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = "list-group-item";

    
        const toggleId = `toggle-${listOfItemsUnderAnItemCategory[index].itemTitle}`;

        
        const isToggleChecked = localStorage.getItem(toggleId) === 'true';

        listItem.innerHTML = `
            <div data-index=${index} class="d-flex gap-2 flex-wrap align-items-center">
                <span class="avatar avatar-xl me-1">
                    <img src="../assets/images/media/media-39.jpg" class="img-fluid" alt="...">
                </span>
                <div class="flex-fill">
                    <a href="javascript:void(0);" class="fs-14 fw-semibold mb-0">${item.itemTitle}</a>
                    <p class="mb-1 popular-blog-content text-truncate">
                        ${item.itemCategory}
                    </p>
                    <div class="item-size-and-price">
                        ${item.itemPriceAndSize.map(sizeAndPrice => `
                            <input type="checkbox" id="${sizeAndPrice.size}" name="${sizeAndPrice.size}" value="${sizeAndPrice.size}" ${isToggleChecked ? 'checked' : ''}>
                            <span class="text-muted fs-11">${sizeAndPrice.size} - £${sizeAndPrice.price}</span> | 
                        `).join('')}
                    </div>
                </div>
                <div>
                    <div class="custom-toggle-switch ms-sm-2 ms-0"> 
                        <input id="${toggleId}"  data-item-id="${item.itemId}"name="toggleswitchsize" type="checkbox" ${isToggleChecked ? 'checked' : ''}> 
                        <label for="${toggleId}" class="label-primary mb-1"></label>
                    </div>
                </div>
            </div>
        `;

        itemListUnderItemCategoryContainer.appendChild(listItem);


        const toggleInput = document.getElementById(toggleId);
        toggleInput.addEventListener('change', () => {

            const isChecked = toggleInput.checked;
            localStorage.setItem(toggleId, isChecked);

            const itemId = toggleInput.getAttribute('data-item-id'); 

            console.log("i'm the toggle itemid ", itemId);
            if (!isChecked) {

                removeItemAvailabilityFromUnit(itemId);
            }

            if(isChecked){

                addItemAvailabilityToUnit(itemId)
            }
        });
    });
}



function addItemAvailabilityToUnit(itemId){

    console.log("i'm the itemid ", itemId);

   const unitName = "LONDON";
    // sessionStorage.getItem('temisplace-unitName')

   const unitItemAvailabilityRequest ={
        "unitName" :unitName,
        "itemId" : itemId
    }

    fetch('http://localhost:8080/api/v1/temisplace/unitItemAvailabilityAddition', {
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(unitItemAvailabilityRequest)        
    })

    .then(response=>{
       if(!response.ok){
        throw new Error('failed to update')
       }
       else{
        return response.json()
       }
    })
    .then(data=>{
        console.log(data);
    })
    .catch(error=>{
        console.log("error : ", error);
    })
}


function  removeItemAvailabilityFromUnit(itemId) {
    console.log("i'm the itemid ", itemId);

   const unitName = "LONDON"
    // sessionStorage.getItem('temisplace-unitName')

     const unitItemAvailabilityRequest ={
        "unitName" :unitName,
        "itemId" : itemId
    }
    
    fetch('http://localhost:8080/api/v1/temisplace/unitItemAvailabilityRemoval', {
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(unitItemAvailabilityRequest) 
    })
    .then(response=>{
        if(!response.ok){
         throw new Error('failed to update')
        }
        else{
         return response.json()
        }
     })
     .then(data=>{
         console.log(data);
     })
     .catch(error=>{
         console.log("error : ", error);
     })
}



















// function loadAndDisplayUnitItemsUnderAnItemCategory(){

// const listOfItemsUnderAnItemCategory = JSON.parse(sessionStorage.getItem('listOfItemsUnderAnItemCategory'))
// console.log(listOfItemsUnderAnItemCategory);


// const itemListUnderItemCategoryContainer = document.getElementById('itemListUnderItemCategoryContainerId');

// itemListUnderItemCategoryContainer.innerHTML = "";


// listOfItemsUnderAnItemCategory.forEach((item , index)=> {
    
// const listItem = document.createElement('li')

// listItem.className = "list-group-item";


// listItem.innerHTML = `

// <div class="d-flex gap-2 flex-wrap align-items-center">
//     <span class="avatar avatar-xl me-1">
//         <img src="../assets/images/media/media-39.jpg" class="img-fluid" alt="...">
//     </span>
//     <div class="flex-fill">
//         <a href="javascript:void(0);" class="fs-14 fw-semibold mb-0">${item.itemTitle}</a>
//         <p class="mb-1 popular-blog-content text-truncate">
//             ${item.itemCategory}
//         </p>
//         <input type="checkbox" id="size1" name="500ml" value="101-500ml">
//         <span class="text-muted fs-11">${item.itemPriceAndSize[index].size} - £${item.itemPriceAndSize[index].price}</span> | 
//         <input type="checkbox" id="size2" name="750ml" value="101-750ml">
//         <span class="text-muted fs-11">750ml - £2.75</span>												
//     </div>
//     <div>
//                     <div class="custom-toggle-switch ms-sm-2 ms-0"> 
//                         <input id="two-step" name="toggleswitchsize" type="checkbox" checked=""> 
//                         <label for="two-step" class="label-primary mb-1"></label>
//                     </div>
//     </div>
// </div>

// `;

// itemListUnderItemCategoryContainer.appendChild(listItem)
// });




// }

