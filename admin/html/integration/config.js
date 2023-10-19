


const temisplaceBaseUrl = "http://localhost:8080";



const toast = (message, timer)=>{
    Toastify({
        text: message,
        duration: timer || 10000,
        position: "center"
        }).showToast();
};