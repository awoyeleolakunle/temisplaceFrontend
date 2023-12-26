



console.log("Hey I'm here");



let emailAddresInput, passwordInput, unitName


emailAddresInput = document.getElementById('emailAddressId').value;
passwordInput = document.getElementById('signin-password').value;

document.getElementById('emailAddressId').addEventListener('input', ()=>{
    emailAddresInput = document.getElementById('emailAddressId').value;
  
})
document.getElementById('signin-password').addEventListener('input', ()=>{
    passwordInput = document.getElementById('signin-password').value;
  console.log(passwordInput);
})


document.getElementById('unitId').addEventListener('change', ()=>{
    unitName = document.getElementById('unitId').value
    sessionStorage.setItem('temisplace-unitName', unitName);

  
})


console.log("i'm on sign btn");
const signInBtn = document.getElementById('signInId');
console.log(signInBtn);

const loginRequest ={
    "emailAddress":"" ,
    "password": ""
}


        
const sendLoginDataToBackend = ()=>{

    unitName = document.getElementById('unitId').value;
    sessionStorage.setItem('temisplace-unitName', unitName);
   
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
        sessionStorage.setItem('email', emailAddresInput); 
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


    
const sendOtPForVerification =(fullName)=>{


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

        
    const stringifiedAdminFullNameToBePassedWithUrl = JSON.stringify(fullName)
    const encodedAdminFullName  = encodeURIComponent(stringifiedAdminFullNameToBePassedWithUrl)


    const url =  `tp-verify.html?adminFullName=${encodedAdminFullName}`;

        setInterval(()=>{
             window.location.href = url;
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
    const firstName = payload.firstName;
    const lastName = payload.lastName

    const fullName = `${firstName} ${lastName}`

    console.log(userRoles);

    console.log(userRoles[0]);
    
    if (userRoles[0] === "ADMIN") {
        console.log("I'm in here ", userRoles[0]);
    
        sessionStorage.setItem('temisplaceToken', JSON.stringify(jwtToken));
        sendOtPForVerification(fullName);

    } else if (userRoles[0] === "UNIT") {
        console.log("I'm in here ", userRoles[0]);
        console.log("unit unit");
        
        sessionStorage.setItem('temisplaceUnitEmailAddress', loginRequest.emailAddress);
        sessionStorage.setItem('temisplaceToken', JSON.stringify(jwtToken));
        if(!unitName){
            const message = "Kindly select your unit / brancch name";
            const timer = 2000;
            {toast(message, timer)}
          
        }else{
            sendOtPForVerification(fullName);
        }
    } else if (userRoles[0] === "STAFF") {
      
        sessionStorage.setItem('temisplaceStaffEmailAddress', loginRequest.emailAddress);
        sessionStorage.setItem('temisplaceToken', JSON.stringify(jwtToken));
        const unitName = sessionStorage.getItem('temisplace-unitName');
        if(!unitName){
            const message = "Kindly select your unit / branch name";
            const timer = 4000;
            {toast(message, timer)}
      
        }else{
            sendOtPForVerification(fullName);
        }
       
    } else if (userRoles[0] === "CUSTOMER") {
        sessionStorage.setItem('temisplaceCustomerEmailAddress', loginRequest.emailAddress);
        sessionStorage.setItem('temisplaceCustomerToken', JSON.stringify(jwtToken));
        sendOtPForVerification(fullName);
    }
}

