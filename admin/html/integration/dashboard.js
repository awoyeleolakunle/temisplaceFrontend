







const adminNameParam= new URLSearchParams(window.location.search)
const adminName = adminNameParam.get('adminFullName') 

if(adminName){
    const decodedAdminName = decodeURIComponent(adminName)
    console.log("Im the decoded region ", decodedAdminName);
    const cleanedAdminName = decodedAdminName.replace(/^"|"$/g, '').replace(/\\"/g, '');
    document.getElementById('adminFullNameId').innerText =`Welcome back, ${cleanedAdminName} !` ;
}


const fetchDashBoardInfoFromBackend = ()=>{


        fetch(`${temisplaceBaseUrl}/api/v1/temisplace/dashBoardInfo`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            }
        })
    
    .then(response=>{
        if(!response.ok){
            throw new Error("Failed to retrieve information")
        }
        else{
            return response.json();
        }
    })

    .then( dashBoardInfo=>{
        console.log("i'm the dashboardInfo", dashBoardInfo);
        displayInfo(dashBoardInfo)
    })
    .catch(error=>{
        console.log("error", error);
    })

}

const displayInfo =(dashBoardInfo)=>{

    console.log("I'm the total customers", dashBoardInfo.data.totalCustomers);
    console.log("I'm the completed orders", dashBoardInfo.data.completedOrders);
    document.getElementById("completedOrdersId").textContent= dashBoardInfo.data.completedOrders
    document.getElementById("totalCustomerId").textContent=dashBoardInfo.data.totalCustomers
    document.getElementById("cancelledOrdersId").textContent=dashBoardInfo.data.cancelledOrders
    document.getElementById("totalRevenueId").textContent= `£${dashBoardInfo.data.totalRevenue}`
    document.getElementById("instoreOrderId").textContent = dashBoardInfo.data.instoreOrders
    document.getElementById("onlineOrdersId").textContent = dashBoardInfo.data.onlineOrders;
    document.getElementById("completedPercentageId").textContent =`${dashBoardInfo.data.completedPercentage}%`
    document.getElementById("cancelledPercentageId").textContent = `${dashBoardInfo.data.cancelledPercentage}%`
    document.getElementById("onlinePercentageId").textContent = `${dashBoardInfo.data.onlinePercentage}%`
    document.getElementById("instorePercentageId").textContent = `${dashBoardInfo.data.instorePercentage}%`
    document.getElementById("revenuePercentageId").textContent = `${dashBoardInfo.data.revenuePercentage}%`
   



    const listContainer = document.getElementById('unitNameAndRevenueId');
    listContainer.innerHTML="";
    dashBoardInfo.data.listOfAllUnitsWithMonthlyRevenue.forEach((item, index) => {

        const listItem = document.createElement('li')
        listItem.innerHTML =`
        
        <div class="d-flex align-items-top flex-wrap">
                <span class="avatar avatar-sm avatar-rounded bg-success-transparent fw-semibold">
                    ${item.unitName.substring(0,3)}
                </span>
            <div class="flex-fill">
                <p class="fw-semibold mb-0">${item.unitName}</p>
                <span class="text-muted fs-12"></span>
            </div>
            <div class="fw-semibold fs-15">£${item.unitCurrentMonthRevenue}</div>
        </div>

        `;
        listContainer.appendChild(listItem)
        
    });

  }















  
    

document.addEventListener('DOMContentLoaded', fetchDashBoardInfoFromBackend)
