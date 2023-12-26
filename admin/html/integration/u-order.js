



document.addEventListener('DOMContentLoaded', ()=>{
    
    fetchUnitOrderDetailsUnderOrderStatus();
    fetchAllCompletedOrdersUnderOrderStatus()
    fetchAllActiveOrdersUnderOrderStatus();
    fetchAllACancelledOrdersUnderOrderStatus()
    })


const unitName = sessionStorage.getItem('temisplace-unitName')


function fetchUnitOrderDetailsUnderOrderStatus(){

    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/unitOrderDashBoardDetails?unitName=${encodeURIComponent(unitName)}`, {
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
        display(data)
    })
    .catch(error=>{
        console.log("error : ", error);
        const message = "Network Failed";
        {toast(message)};
    })

}




function display(data){

    document.getElementById('revenueId').innerText = '£'+data.revenue
   // document.getElementById('revenueId%Id').innerText =data.percentageDifference
    document.getElementById('numberOfActiveOrderId').innerText = data.activeOrder
    document.getElementById('activeOrders%Id').innerText = data.activePercentageDifference +'%'
    document.getElementById('cancelledOrdersId').innerText = data.cancelledOrder
    document.getElementById('cancelledOrders%Id').innerText = data.cancelledPercentageDifference  +'%'
    document.getElementById('completedOrdersId').innerText = data.completedOrder
    document.getElementById('completedOrders%Id').innerText = data.completedPercentageDifference  +'%'

}

let orderStatus

console.log("I'm the document ",   document.getElementById('completedOrdersId'));
    document.getElementById('completedOrdersId').addEventListener('click', function(event){
        if (event.target.id === 'completedOrdersId') {
            event.preventDefault();
            console.log("Completed Orders tab clicked");
            orderStatus = "COMPLETED";
         //   navigate = "#completed-orders"
          //  fetchAllOrdersUnderOrderStatus();
        }
    })

    



function fetchAllCompletedOrdersUnderOrderStatus(){
    
    unitOrderUnderOrderStatusRequest = {
        unitName:unitName,
        orderStatus : "COMPLETED"
    }


    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/unitAllDailyOrdersUnderOrderStatus`, {
        method : 'POST',
        headers :{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(unitOrderUnderOrderStatusRequest)
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
        console.log("i'm the complted order info ", data);
        displayOrdersUnderOrderStatus(data)
        //window.location.href = navigate;
    })
    .catch(error=>{
        console.log("error : ", error);

        const message = "Network Failed";
        {toast(message)};
    })


}


function displayOrdersUnderOrderStatus(data){


    const tableBody = document.getElementById('completedTableBodyId');
    tableBody.innerHTML = "";


    data.forEach((item, index) => {

    const listItem = document.createElement('tr');

    listItem.innerHTML = `
    
    <td>
        <div class="d-flex align-items-center">
            <div class="lh-1">
                <span class="avatar avatar-md offline avatar-rounded me-2">
                    <img src="../assets/images/faces/2.jpg" alt="">
                </span>
            </div>
            <div class="align-items-center">
                <span class="fs-12 text-muted">Name</span>
                <p class="mb-0">${item.firstName}</p>
            </div>
        </div>
    </td>
                                                                    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">email</span>
            <p class="mb-0 fw-semibold">${item.emailAddress}</p>
        </div>
    </td>																
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Mobile</span>
            <p class="mb-0 fw-semibold">${item.phoneNumber}</p>
        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Item</span>
            <p class="mb-0">(${item.numberOfAllItemQuantityOrdered })</p>

        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Price</span>
            <p class="mb-0 fw-semibold">£${item.total}</p>
        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Order Date</span>
            <p class="mb-0">${item.orderedTime}</p>
        </div>
    </td>																
    <td>
        <div class="dropdown">
            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-light" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fe fe-more-vertical"></i>
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="javascript:void(0);">Rejected</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Unavailable</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Delivered</a></li>
            </ul>
        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Status</span>
            <p class="mb-0">${item.orderStatus}</p>
        </div>
    </td>																
    `;

    tableBody.appendChild(listItem);

});

}




function fetchAllActiveOrdersUnderOrderStatus(){
    
    unitOrderUnderOrderStatusRequest = {
        unitName:unitName,
        orderStatus : "ACTIVE"
    }


    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/unitAllDailyOrdersUnderOrderStatus`, {
        method : 'POST',
        headers :{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(unitOrderUnderOrderStatusRequest)
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
        console.log("i'm the active order info ", data);
        displayOrdersUnderActiveOrderStatus(data)
        //window.location.href = navigate;
    })
    .catch(error=>{
        console.log("error : ", error);
        
        const message = "Network Failed";
        {toast(message)};
    })


}




function displayOrdersUnderActiveOrderStatus(data){


    const tableBody = document.getElementById('activeTableBodyId');
    tableBody.innerHTML = "";


    data.forEach((item, index) => {

    const listItem = document.createElement('tr');

    listItem.innerHTML = `
    
        <div class="d-flex align-items-center">
            <div class="lh-1">
                <span class="avatar avatar-md online avatar-rounded me-2">
                    <img src="../assets/images/faces/4.jpg" alt="">
                </span>
            </div>
            <div class="align-items-center">
                <span class="fs-12 text-muted">Name</span>
                <p class="mb-0">${item.firstName}</p>
            </div>
        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">email</span>
            <p class="mb-0 fw-semibold">${item.emailAddress}</p>
        </div>
    </td>																
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Mobile</span>
            <p class="mb-0 fw-semibold">${item.phoneNumber}</p>
        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Item</span>
            <p class="mb-0">(${item.numberOfAllItemQuantityOrdered })</p>

        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Price</span>
            <p class="mb-0 fw-semibold">£${item.total}</p>
        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Order Date</span>
            <p class="mb-0">${item.orderedTime}</p>
        </div>
    </td>																
    <td>
        <div class="dropdown item-status-dropdown">
            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-light" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fe fe-more-vertical"></i>
            </a>
            <ul class="dropdown-menu">
                <li  data-item-id="${item.orderId}" data-status="ACCEPT_AND_PROCESSING"><a class="dropdown-item" href="javascript:void(0);">Accept & Process</a></li>
                <li data-item-id="${item.orderId}" data-status="ON_ITS_WAY"><a class="dropdown-item" href="javascript:void(0);">On it's way</a></li>
                <li data-item-id="${item.orderId}" data-status="DELIVERED"><a class="dropdown-item" href="javascript:void(0);">Delivered</a></li>
                <li data-item-id="${item.orderId}" data-status="CANCELLED"><a class="dropdown-item" href="javascript:void(0);">Cancel</a></li>
            </ul>
        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Status</span>
            <p class="mb-0">${item.activeOrderStatus}</p>
        </div>
    </td>    
    `;

    tableBody.appendChild(listItem);
    

    const dropdown = listItem.querySelector('.item-status-dropdown');
    dropdown.addEventListener('click', function (event) {
        if (event.target.classList.contains('dropdown-item')) {
            const itemId = event.target.parentElement.getAttribute('data-item-id');
            const status = event.target.parentElement.getAttribute('data-status');

            handleDropdownChange(itemId, status);
        }
});

})}



function handleDropdownChange(itemId, status){

    console.log("i'm the itemId ", itemId);
    activeOrderStatusAndOrderStatusRequest = {
        orderId : itemId,
         activeOrderStatusOrOrderStatus : status
    }

    console.log(activeOrderStatusAndOrderStatusRequest.orderId);
    console.log(activeOrderStatusAndOrderStatusRequest.status);

   fetch( `${temisplaceBaseUrl}/api/v1/temisplace/activeOrderStatusAndOrderStatusManagement`, {

    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : jwtToken
    },
    body : JSON.stringify(activeOrderStatusAndOrderStatusRequest)
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
        console.log("i'm the info response", data);
        const message = data.data;
        {toast(message)};
    })
    .catch(error=>{
        console.log("error : ", error);
        const message = "Network Failed";
        {toast(message)};
    })

   
};




function fetchAllACancelledOrdersUnderOrderStatus(){
    
    unitOrderUnderOrderStatusRequest = {
        unitName:unitName,
        orderStatus : "CANCELLED"
    }


    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/unitAllDailyOrdersUnderOrderStatus`, {
        method : 'POST',
        headers :{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(unitOrderUnderOrderStatusRequest)
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
        console.log("i'm the active order info ", data);
        displayOrdersUnderCancelledOrderStatus(data)
        //window.location.href = navigate;
    })
    .catch(error=>{
        console.log("error : ", error);
        const message = "Network Failed";
        {toast(message)};
    })


}




function displayOrdersUnderCancelledOrderStatus(data){


    const tableBody = document.getElementById('cancelledTableBodyId');
    tableBody.innerHTML = "";


    data.forEach((item, index) => {

    const listItem = document.createElement('tr');

    listItem.innerHTML = `
    
    <td>
        <div class="d-flex align-items-center">
            <div class="lh-1">
                <span class="avatar avatar-md online avatar-rounded me-2">
                    <img src="../assets/images/faces/6.jpg" alt="">
                </span>
            </div>
            <div class="align-items-center">
                <span class="fs-12 text-muted">Name</span>
                <p class="mb-0">${item.firstName}</p>
            </div>
        </div>
    </td>
     <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">email</span>
            <p class="mb-0 fw-semibold">${item.emailAddress}</p>
        </div>
    </td>																
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Mobile</span>
            <p class="mb-0 fw-semibold">${item.phoneNumber}</p>
        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Item</span>
            <p class="mb-0">(${item.numberOfAllItemQuantityOrdered })</p>

        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Price</span>
            <p class="mb-0 fw-semibold">£${item.total}</p>
        </div>
    </td>
    <td>
        <div class="align-items-center">
            <span class="fs-12 text-muted">Order Date</span>
            <p class="mb-0">${item.orderedTime}</p>
        </div>
    </td>																
    <td>
        <a aria-label="anchor" href="javascript:void(0);">
            <span class="orders-arrow"><i class="ri-arrow-right-s-line fs-18"></i></span>
        </a>
    </td>

    `;

    tableBody.appendChild(listItem);

});

}






