


const unitName = sessionStorage.getItem('temisplace-unitName');



console.log("Ope ooo I'm the unit ooo  : ", unitName)

let pageNumber =1;
let pageSize = 10;


document.addEventListener('DOMContentLoaded', fetchUnitMenuDashBoardInfoFromBackEnd)


const jwtToken = JSON.parse(sessionStorage.getItem('temisplaceToken'))



console.log(unitName);


function fetchUnitMenuDashBoardInfoFromBackEnd (){

    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/unitDashboardDetails?unitName=${encodeURIComponent(unitName)}`,{
        method : "POST",
        headers : {

            'Content-Type' : 'application/json'
        },        
    })
    .then(response =>{

        if(!response.ok){
            throw new Error('Failed to load info')
        }
        else{
            console.log("I'm the response from backend", response.data);
            return response.json();
        }
    })
    .then(unitMenuDashBoardLIst =>{
        display(unitMenuDashBoardLIst)
        console.log("I'm the unitMenuDashBoardLIst", unitMenuDashBoardLIst);
    })
    .catch(error=>{
        console.log("error", error);
        const message = "Network Failed";
        {toast(message)};
    })
}






function display(unitMenuDashBoardLIst) {

    const listOfUnitMenuDashBoardContainer = document.getElementById("listOfUnitMenuDashBoardContainer");

    const mainContainer2 = document.getElementById('mainContainer2')
    mainContainer2.className = "row";



    listOfUnitMenuDashBoardContainer.innerHTML = "";

    unitMenuDashBoardLIst.forEach((item, index) => {
        
    const itemList = document.createElement('li');
    itemList.className = "item-row col-xxl-4 col-lg-6 col-md-6";

    itemList.innerHTML =  `

    <div data-index=${index} class="col-xxl-4 col-lg-6 col-md-6">
                                        <div class="card custom-card overflow-hidden">
                                            <div class="card-body">
                                                <div class="d-flex align-items-top justify-content-between">
                                                    <div>
                                                        <span class="avatar avatar-md avatar-rounded bg-blue">
                                                        </span>
                                                    </div>
                                                    <div class="flex-fill ms-3">
                                                        <div class="d-flex align-items-center justify-content-between flex-wrap">
                                                            <div>
                                                                <p class="text-muted mb-0">${item.category}</p>
                                                                <h4 class="fw-semibold mt-1">${item.numberOfItems}</h4>
                                                            </div>
                                                            <div id="crm-total-customers"></div>
                                                        </div>
                                                        <div class="d-flex align-items-center justify-content-between mt-1">
                                                            <div>
                                                                <a id="viewId" class="text-blue" >View All<i class="ti ti-arrow-narrow-right ms-2 fw-semibold d-inline-block"></i></a>
                                                            </div>
                                                            <div class="text-end">
                                                                <p class="mb-0 text-success fw-semibold">+${item.percentageDifferenceInMonthlySales}%</p>
                                                                <span class="text-muted op-7 fs-11">this month</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    `;

    listOfUnitMenuDashBoardContainer.appendChild(itemList);

    mainContainer2.appendChild(listOfUnitMenuDashBoardContainer);
    
    const viewItemLink = itemList.querySelectorAll('.text-blue'); // Select the .text-blue class within the current item

    
    viewItemLink.forEach(link=>{
        link.addEventListener('click', () => {
            const itemCategory = unitMenuDashBoardLIst[index].category; // Use the correct item from the array
            console.log("i'm the item category ", itemCategory);
            fectchAllItemsUnderItemCategory(itemCategory);
        });
    })
 
}
)}




function fectchAllItemsUnderItemCategory(itemCategory){

    const itemCategoryAndPaginationRequest = {
      
        "itemCategory": itemCategory,
        "pageNumber": pageNumber,
        "pageSize" : pageSize
    }

    
    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/allItemsUnderAnItemCategory`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            
        },
        body: JSON.stringify(itemCategoryAndPaginationRequest)
    })
    .then(response=>{
        if(!response){
            throw new Error("Failed to load");
        }
        else{
            return response.json()
        }
    })
    .then(listOfItemsUnderItemCategory=>{
        sessionStorage.setItem('listOfItemsUnderAnItemCategory', JSON.stringify(listOfItemsUnderItemCategory))
        console.log("I'm the list of items under item category " , listOfItemsUnderItemCategory);
        window.location.href="u-menu-item.html"
    })
    .catch(error=>{
        console.log("error : ", error);
        message = "NetWork Failed";
        {toast(message)};
    })

}


