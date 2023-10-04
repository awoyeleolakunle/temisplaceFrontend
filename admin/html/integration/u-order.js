



document.addEventListener('DOMContentLoaded', fetchUnitOrderDetailsUnderOrderStatus)

//sessionStorage.getItem('temisplace-unitName')

const unitName = "LONDON";


function fetchUnitOrderDetailsUnderOrderStatus(){

    fetch(`http://localhost:8080/api/v1/temisplace/unitOrderDashBoardDetails?unitName=${encodeURIComponent(unitName)}`, {
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