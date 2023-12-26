
let slogan, overview, telephone, facebook, twitter, instagram, linkedin, address, city, postCode, footerImgUrl

const jwtToken = JSON.parse(sessionStorage.getItem('temisplaceAdminToken'));

function editFooterDetails(){
    slogan = document.getElementById('sloganId').value;
    slogan = document.getElementById('overviewId').value;
    slogan = document.getElementById('telephoneId').value;
    slogan = document.getElementById('facebookId').value;
    slogan = document.getElementById('twitterId').value;
    slogan = document.getElementById('instagramId').value;
    slogan = document.getElementById('linkedinId').value;
    slogan = document.getElementById('addressId').value;
    slogan = document.getElementById('cityId').value;
    slogan = document.getElementById('postCodeId').value;

}


    document.getElementById('sloganId').addEventListener('input', ()=>{
        slogan = document.getElementById('sloganId').value
     })

    document.getElementById('overviewId').addEventListener('input', ()=>{
        overview = document.getElementById('overviewId').value
    })

  
    document.getElementById('telephoneId').addEventListener('input', ()=>{
        telephone = document.getElementById('telephoneId').value
    })

    document.getElementById('facebookId').addEventListener('input', ()=>{
        facebook = document.getElementById('facebookId').value
    })


    document.getElementById('twitterId').addEventListener('input', ()=>{
        twitter = document.getElementById('twitterId').value
    })

    
    document.getElementById('instagramId').addEventListener('input', ()=>{
        instagram = document.getElementById('instagramId').value
    })

    document.getElementById('linkedinId').addEventListener('input', ()=>{
        linkedin = document.getElementById('linkedinId').value
    })

    document.getElementById('addressId').addEventListener('input', ()=>{
        address = document.getElementById('addressId').value
    })

    document.getElementById('cityId').addEventListener('input', ()=>{
        city = document.getElementById('cityId').value
    })

    document.getElementById('postCodeId').addEventListener('input', ()=>{
        postCode = document.getElementById('postCodeId').value
    })

  



 console.log(document.getElementById('footerImgId'));
 
 document.getElementById('footerImgId').addEventListener('click', function(){

 cloudinary.createUploadWidget({
    cloudName: 'deokatly1', 
    uploadPreset: 'temisplace'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        footerImgUrl = result.info.url;
        console.log(footerImgUrl);

        // document.getElementById("imageOriginalPathId").value = result.info.original_filename;
      }        
    }
  ).open()
})




function sendFooterInfoToTheBackEnd(){


    editFooterDetails();

    const footerObject ={
    slogan: slogan,
    overview: overview,
    telephone: telephone,
    facebook: facebook,
    twitter: twitter,
    linkedin: linkedin,
    address: address,
    city: city,
    postCode: postCode,
    footerImgUrl: footerImgUrl
    }

fetch(`${temisplaceBaseUrl}/api/v1/temisplace/footerCreationOrUpdate`, {

    method :'Post',
    headers: {
        'Content-Type':'application/json',
        'authorization' : jwtToken
    },
    body: JSON.stringify(footerObject)
    
})
.then(response=>{
    if(!response.ok){
        throw new Error('Unable to update footer details')
    }
    else{
   return response.json()
    }
})
.then(data=>{

    {toast(data.data)}
})
.catch(err=>{
    const message = "Network Failed";
    toast(message)
})

}


document.getElementById('saveFooterBtnId').addEventListener('click', sendFooterInfoToTheBackEnd)
