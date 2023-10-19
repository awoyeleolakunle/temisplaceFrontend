




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
    otpConfirmationRequest.emailAddress = localStorage.getItem('email')


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

    if(data[0]=="ADMIN"){
        localStorage.removeItem('email');
        localStorage.setItem('adminEmail', otpConfirmationRequest.emailAddress)
        window.location.href = "tp-dashboard.html";
    };

    if(data[0]=="UNIT"){
        localStorage.removeItem('email');
        localStorage.setItem('unitEmail', otpConfirmationRequest.emailAddress)
        window.location.href = "u-menu.html";
    };

    if(data[0]=="STAFF"){
        localStorage.removeItem('email');
        localStorage.setItem('staffEmail', otpConfirmationRequest.emailAddress)
        window.location.href = "u-menu.html";
    };

}