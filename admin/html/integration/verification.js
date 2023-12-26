




let one, two, three, four

     document.getElementById('one').addEventListener('change', ()=>{

        one = document.getElementById('one').value;
     })
     document.getElementById('two').addEventListener('change', ()=>{

        two = document.getElementById('two').value;
     })

     document.getElementById('three').addEventListener('change', ()=>{

        three = document.getElementById('three').value;
     })
     document.getElementById('four').addEventListener('change', ()=>{

        four = document.getElementById('four').value;
     })


  

     const otpConfirmationRequest = {

        "token" : "",
        "emailAddress" : ""
       }

const confirmOtPFromBackend = ()=>{
    const concatenatedValue = one + two + three + four;

    otpConfirmationRequest.token = concatenatedValue;
    otpConfirmationRequest.emailAddress = sessionStorage.getItem('email')


    console.log(otpConfirmationRequest);
    
    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/otpConfirmation`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(otpConfirmationRequest)
    })

    .then(response => {
        if (response.ok) {
            console.log(response);
            return response.json(); 
        } else {
            throw new Error("Network Failed");
        }
    })
    .then(data=>{
        console.log("I'm the data ", data.data);
        const timer = 3000;
        {toast(data.data, timer)}
        routeToDashBoard(data.data)
    })
      
    .catch(error =>{
        console.log(error);
        const message = "Network Failed";
        {toast(message)};
    })

}


document.getElementById('confirmOtpBtnId').addEventListener('click', confirmOtPFromBackend)


const routeToDashBoard =(data)=>{
    let adminFullName;

    if(data[0]=="ADMIN"){
        sessionStorage.removeItem('email');
        sessionStorage.setItem('adminEmail', otpConfirmationRequest.emailAddress)
        const adminNameParam= new URLSearchParams(window.location.search)
        const adminName = adminNameParam.get('adminFullName') 
        alert("I'm the gotten admin name ", adminName)

if(adminName){
    const decodedAdminName = decodeURIComponent(adminName)
    alert("Im the decoded adminName ", decodedAdminName);
    adminFullName = decodedAdminName;
}

        const stringifiedAdminFullNameToBePassedWithUrl = JSON.stringify(adminFullName)
        const encodedAdminFullName  = encodeURIComponent(stringifiedAdminFullNameToBePassedWithUrl)


        const url =  `tp-dashboard.html?adminFullName=${encodedAdminFullName}`;
        window.location.href = url;
    };

    if(data[0]=="UNIT"){
        sessionStorage.removeItem('email');
        sessionStorage.setItem('unitEmail', otpConfirmationRequest.emailAddress)
        window.location.href = "u-menu.html";
    };

    if(data[0]=="STAFF"){
        sessionStorage.removeItem('email');
        sessionStorage.setItem('staffEmail', otpConfirmationRequest.emailAddress)
        window.location.href = "u-menu.html";
    };

}