




document.addEventListener('DOMContentLoaded', loadAndDisplayUnitItemsUnderAnItemCategory)





const jwtToken = JSON.parse(sessionStorage.getItem('temisplaceToken'));

const unitName = sessionStorage.getItem('temisplace-unitName');

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


       // ../assets/images/media/media-39.jpg
        listItem.innerHTML = `
            <div data-index=${index} class="d-flex gap-2 flex-wrap align-items-center">
                <span class="avatar avatar-xl me-1">
                    <img src="${item.itemImgUrl}" class="img-fluid" alt="...">
                </span>
                <div class="flex-fill">
                    <a href="javascript:void(0);" class="fs-14 fw-semibold mb-0">${item.itemTitle}</a>
                    <p class="mb-1 popular-blog-content text-truncate">
                        ${item.itemCategory}
                    </p>
                    <div class="item-size-and-price">
                        ${item.itemPriceAndSize.map(sizeAndPrice => `
                            <input type="checkbox" id="${sizeAndPrice.size}+${item.itemTitle}+${sizeAndPrice.price}" name="${sizeAndPrice.size}" value="${sizeAndPrice.size}"  ${sizeAndPrice.isAvailable===true ? 'checked': ''}>
                           
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




        
        item.itemPriceAndSize.forEach((sizeAndPrice) => {
            const sizeCheckbox = document.getElementById(`${sizeAndPrice.size}+${item.itemTitle}+${sizeAndPrice.price}`);

            const checkItemSizeAndPriceBtn = 
            
            sizeCheckbox.addEventListener('change', () => {
                if (sizeCheckbox.checked) {
                    addItemSizeAndPriceAvailabilityToUnit(sizeAndPrice.id)

                }

                if(!sizeCheckbox.checked){
                    removeItemSizeAndPriceAvailabilityFromUnit(sizeAndPrice.id)
                }
               
            }
            )



    });
})
}





function addItemAvailabilityToUnit(itemId){

    console.log("i'm the itemid ", itemId);


   const unitItemAvailabilityRequest ={
        "unitName" :unitName,
        "itemId" : itemId
    }

    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/unitItemAvailabilityAddition`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : jwtToken
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
        const message = data.data;
        const timer = 6000;
        {toast(message, timer)};
    })
    .catch(error=>{
        console.log("error : ", error);
        const message = "Network Failed";
        {toast(message)};
    })
}


function  removeItemAvailabilityFromUnit(itemId) {
    console.log("i'm the itemid ", itemId);


     const unitItemAvailabilityRequest ={
        "unitName" :unitName,
        "itemId" : itemId
    }
    
    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/unitItemAvailabilityRemoval`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : jwtToken
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
        const message = data.data;
        const timer = 6000;
        {toast(message, timer)};
     })
     .catch(error=>{
         console.log("error : ", error);
         const message = "Network Failed";
         {toast(message)};
     })
}




function addItemSizeAndPriceAvailabilityToUnit(Id){

    console.log("i'm the itemSizeAndPriceId in addition  ", Id);


    const updateAvailableItemSizeAndPriceInAunitRequest  ={
        "unitName" :unitName,
        "id" : Id
    }


    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/itemSizeAndPriceAvailabilityAdditionToAUnit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : jwtToken
        },
        body : JSON.stringify(updateAvailableItemSizeAndPriceInAunitRequest)        
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
        const message = data.data;
        const timer = 6000;
        {toast(message, timer)};
    })
    .catch(error=>{
        console.log("error : ", error);
        const message = "Network Failed";
        {toast(message)};
    })

}


              
function removeItemSizeAndPriceAvailabilityFromUnit(Id){


    console.log("i'm the itemSizeAndPriceId in removal ", Id);




    
    const updateAvailableItemSizeAndPriceInAunitRequest  ={
        "unitName" :unitName,
        "id" : Id
    }


    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/itemSizeAndPriceAvailabilityRemovalFromAUnit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : jwtToken
        },
        body : JSON.stringify(updateAvailableItemSizeAndPriceInAunitRequest)        
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
        const message = data.data;
        const timer = 6000;
        {toast(message, timer)};
    })
    .catch(error=>{
        console.log("error : ", error);
        const message = "Network Failed";
        {toast(message)};
    })

}




// ${isToggleChecked ? 'checked' : ''