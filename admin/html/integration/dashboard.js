







const fetchDashBoardInfoFromBackend = ()=>{

        fetch('http://localhost:8080/api/v1/temisplace/dashBoardInfo', {
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
    document.getElementById("totalRevenueId").textContent= "£" + dashBoardInfo.data.totalRevenue
  }
  
    


document.addEventListener('DOMContentLoaded', fetchDashBoardInfoFromBackend)
