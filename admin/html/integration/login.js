



console.log("Hey I'm here");



let emailAddresInput, passwordInput, unitName

document.getElementById('emailAddressId').addEventListener('input', ()=>{
    emailAddresInput = document.getElementById('emailAddressId').value;
  
})
document.getElementById('signin-password').addEventListener('input', ()=>{
    passwordInput = document.getElementById('signin-password').value;
  console.log(passwordInput);
})

unitName = document.getElementById('unitId').value;
document.getElementById('unitId').addEventListener('change', ()=>{
    unitName = document.getElementById('unitId').value
    sessionStorage.setItem('temisplace-unitName', JSON.stringify(unitName));

  
})


console.log("i'm on sign btn");
const signInBtn = document.getElementById('signInId');
console.log(signInBtn);

const loginRequest ={
    "emailAddress":"" ,
    "password": ""
}


        
const sendLoginDataToBackend = ()=>{
   
    loginRequest.emailAddress = emailAddresInput
    loginRequest.password = passwordInput

    console.log(loginRequest);

    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/login`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(loginRequest)
    })
    .then(response => {
        if (response.ok) {
            console.log(response);
            return response.json(); 
        } else {
            throw new Error("Invalid Credentials");
        }
    })

    .then(data => {
        const jwtToken = data.data; 
        emailAddresInput = loginRequest.emailAddress; 
        localStorage.setItem('email', emailAddresInput); 
        userRole(jwtToken);
    })
      
    .catch(error =>{
      const message = "Network Failed";
        {toast(message)};
        console.log(error);
    })

}

signInBtn.addEventListener('click',function(){

    const message = "loading....";
    {toast(message)};

    sendLoginDataToBackend()})


    
const sendOtPForVerification =()=>{

    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/sendOtp?emailAddress=${encodeURIComponent(emailAddresInput)}`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'}
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
       
        const message = data.data;
        {toast(message)};

        setInterval(()=>{
             window.location.href = "tp-verify.html";
        },5000)
       
    })
      
    .catch(error =>{
       const timer =  15000;
      {toast("Network Failed", timer)}
        console.log(error);
    })

}



const userRole = (jwtToken)=>{

    const [, payloadBase64] = jwtToken.split('.');
    const payloadJSON = atob(payloadBase64);
    const payload = JSON.parse(payloadJSON);
    const userRoles = payload.roles;

    console.log(userRoles);

    console.log(userRoles[0]);
    
    if (userRoles[0] === "ADMIN") {
        console.log("I'm in here ", userRoles[0]);
    
        localStorage.setItem('temisplaceAdminToken', jwtToken);
        sendOtPForVerification();

    } else if (userRoles[0] === "UNIT") {
        console.log("I'm in here ", userRoles[0]);
        console.log("unit unit");
        
       
        localStorage.setItem('temisplaceUnitEmailAddress', loginRequest.emailAddress);
        localStorage.setItem('temisplaceUnitToken', jwtToken);
        sendOtPForVerification();
    } else if (userRoles[0] === "STAFF") {
      
        localStorage.setItem('temisplaceStaffEmailAddress', loginRequest.emailAddress);
        localStorage.setItem('temisplaceStaffToken', jwtToken);
        sendOtPForVerification();
    } else if (userRoles[0] === "CUSTOMER") {
        localStorage.setItem('temisplaceCustomerEmailAddress', loginRequest.emailAddress);
        localStorage.setItem('temisplaceCustomerToken', jwtToken);
        sendOtPForVerification();
    }
}

