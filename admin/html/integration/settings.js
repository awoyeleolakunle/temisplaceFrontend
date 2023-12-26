




let  itemCategoryName, itemCategoryImageUrl;

const jwtToken = JSON.parse(sessionStorage.getItem('temisplaceToken'));

document.getElementById("itemCategoryImageUrlId").addEventListener("click", function(){

    cloudinary.createUploadWidget({
        cloudName: 'deokatly1', 
        uploadPreset: 'temisplace'}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
            itemCategoryImageUrl = result.info.url
            console.log(itemCategoryImageUrl);
  
            document.getElementById("imageOriginalPathId").value = result.info.original_filename;
           
          }        
        }
      ).open()
    });

    document.getElementById('itemCategoryId').addEventListener('change', ()=>{
      itemCategoryName = document.getElementById('itemCategoryId').value;
        console.log(itemCategoryName);
    })



  function sendItemCategoryImageAndNameToBackend(){

    itemCategoryNameAndImageRequet = {
       itemCategoryName:itemCategoryName,
       itemCategoryImageUrl:  itemCategoryImageUrl
    }


    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/itemCategoryNameAndImageCreation`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          "Authorization" : jwtToken
      },
        body : JSON.stringify(itemCategoryNameAndImageRequet)
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
       
    })
      
    .catch(error =>{
       const timer =  8000;
      {toast("Network Failed", timer)}
        console.log(error);
    })

}

const saveBtn = document.getElementById('saveItemCategoryImageId');
saveBtn.addEventListener('click', sendItemCategoryImageAndNameToBackend)


