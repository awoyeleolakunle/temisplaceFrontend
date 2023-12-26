





itemPaginationListRequest = {
    "pageNumber": 0,
    "pageSize": 10
}


const jwtToken = JSON.parse(sessionStorage.getItem('temisplaceToken'));


console.log("I'm the jwtToke : ", jwtToken);

const fetchPaginatedItemListFromBackend=()=>{


    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/allItems`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(itemPaginationListRequest)
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Failed')
        }
        else{
            return response.json()
        }
    })
    .then(data=>{
        console.log("i'm the list of items from backend ", data);
        display(data)
        clearFormDetailsAfterResponseFromBackend()
    })
    .catch(error=>{
        console.log(error);
    })

}



document.addEventListener('DOMContentLoaded', fetchPaginatedItemListFromBackend)



let itemImg, itemTitle, size1, price1, size2, price2, size3, price3, size4, price4,
  ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, ingredient7, ingredient8,
  allergy, publishingType, itemCategory, itemOverView;

  postItemBtn = document.getElementById('postItemBtnId')

const itemJsonData = {
  "itemTitle": "",
  "itemCategory": "",
  "itemImgUrl": "",
  "itemPriceAndSize": [],
  "ingredients": [],
  "allergy": "",
  "publishingType": "",
  "itemOverView" : "",

};



document.getElementById("itemImgId").addEventListener("click", function(){

  cloudinary.createUploadWidget({
      cloudName: 'deokatly1', 
      uploadPreset: 'temisplace'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
          itemJsonData.itemImgUrl = result.info.url
          console.log(itemJsonData.itemImgUrl);

          document.getElementById("imageId").value = result.info.original_filename;
         
        }        
      }
    ).open()

}, false);

const addSizeAndPriceToList = (size, price) => {
  if (size && price) {
    itemJsonData.itemPriceAndSize.push({ "size": size, "price": price });
  }
};


const populateIngredientList = (...ingredients) => {
  for (const ingredient of ingredients) {
    if (ingredient) {
      itemJsonData.ingredients.push(ingredient);
    }
  }
};


const editFieldValue = ()=>{
    itemImg = document.getElementById('itemImgId').value;
    itemTitle = document.getElementById('itemTitleId').value;
    size1 = document.getElementById('size1Id').value;
    price1 = document.getElementById('price1Id').value;
    size2 = document.getElementById('size2Id').value;
    price2 = document.getElementById('price2Id').value; 
    size3 = document.getElementById('size3Id').value;
    price3 = document.getElementById('price3Id').value;
    size4 = document.getElementById('size4Id').value;
    price4 = document.getElementById('price4Id').value;
    ingredient1 = document.getElementById('ingredient1Id').value;
    ingredient2 = document.getElementById('ingredient2Id').value;
    ingredient3 = document.getElementById('ingredient3Id').value;
    ingredient4 = document.getElementById('ingredient4Id').value;
    ingredient5 = document.getElementById('ingredient5Id').value;
    ingredient6 = document.getElementById('ingredient6Id').value;
    ingredient7 = document.getElementById('ingredient7Id').value;
    ingredient8 = document.getElementById('ingredient8Id').value;
    allergy = document.getElementById('allergyId').value;
    publishingType = document.getElementById('publishingTypeId').value;
    itemCategory = document.getElementById('itemCategoryId').value;
    itemOverView = document.getElementById('blog-content').value
}



document.getElementById('itemImgId').addEventListener('input', editFieldValue)
document.getElementById('itemTitleId').addEventListener('input', editFieldValue)
document.getElementById('size1Id').addEventListener('input', editFieldValue)
document.getElementById('price1Id').addEventListener('input', editFieldValue)
document.getElementById('size2Id').addEventListener('input', editFieldValue)
document.getElementById('price2Id').addEventListener('input', editFieldValue) 
document.getElementById('size3Id').addEventListener('input', editFieldValue)
document.getElementById('price3Id').addEventListener('input', editFieldValue)
document.getElementById('size4Id').addEventListener('input', editFieldValue)
document.getElementById('price4Id').addEventListener('input', editFieldValue)
document.getElementById('ingredient1Id').addEventListener('input', editFieldValue)
document.getElementById('ingredient2Id').addEventListener('input', editFieldValue)
document.getElementById('ingredient3Id').addEventListener('input', editFieldValue)
document.getElementById('ingredient4Id').addEventListener('input', editFieldValue)
document.getElementById('ingredient5Id').addEventListener('input', editFieldValue)
document.getElementById('ingredient6Id').addEventListener('input', editFieldValue)
document.getElementById('ingredient7Id').addEventListener('input', editFieldValue)
document.getElementById('ingredient8Id').addEventListener('input', editFieldValue)
document.getElementById('allergyId').addEventListener('input', editFieldValue)
document.getElementById('publishingTypeId').addEventListener('input', editFieldValue)
document.getElementById('itemCategoryId').addEventListener('input', editFieldValue)
document.getElementById('blog-content').addEventListener('input', editFieldValue)


const sendItemToTheBackEnd = () => {

    itemJsonData.itemTitle = itemTitle;
    itemJsonData.publishingType = publishingType;
    itemJsonData.itemCategory = itemCategory;
    itemJsonData.allergy = allergy;


    console.log("I'm the request before sending ", itemJsonData);

    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/itemCreationOrUpdate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : jwtToken.trim()
        },
        body : JSON.stringify(itemJsonData)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('itemCreation Failed')
        }
        else{
        return response.json()}
    })
    .then(data=>{
        console.log(data.data);
        fetchPaginatedItemListFromBackend()
       
    })
    .catch(error=>{
        console.log("error ", error);
    })

  }

postItemBtn.addEventListener('click', () => {
 
 editFieldValue();
 
  addSizeAndPriceToList(size1, price1);
  addSizeAndPriceToList(size2, price2);
  addSizeAndPriceToList(size3, price3);
  addSizeAndPriceToList(size4, price4);

  populateIngredientList(ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, ingredient7, ingredient8);

 
  sendItemToTheBackEnd();
});





function display(itemList) {
    const itemListContainer = document.getElementById('itemListId');
  
    itemListContainer.innerHTML = '';
  
    itemList.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
  
      const itemDetailsContainer = document.createElement('div');
      itemDetailsContainer.className = 'd-flex gap-2 flex-wrap align-items-center';
  
      itemDetailsContainer.setAttribute('data-index', index);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';


      item.isDisplay===true ? checkbox.checked ='checked' : checkbox.checked='';

   
      checkbox.addEventListener('change', ()=>{

        if(checkbox.checked){
          enableItemHomePageDisplayFeature(item.itemId);
        }
        else{
          disenableItemHomePageDisplayFeature(item.itemId)
        }
      })
      
  
      const avatarElement = document.createElement('span');
      avatarElement.className = 'avatar avatar-xl me-1';
      const avatarImage = document.createElement('img');
      avatarImage.src = item.itemImgUrl;
      //'../assets/images/media/media-39.jpg';
      avatarImage.className = 'img-fluid';
      avatarImage.alt = '...';
      avatarElement.appendChild(avatarImage);
  
      const itemInfoDiv = document.createElement('div');
      itemInfoDiv.className = 'flex-fill';
      const itemNameLink = document.createElement('a');
      itemNameLink.href = 'javascript:void(0)';
      itemNameLink.className = 'fs-14 fw-semibold mb-0';
      itemNameLink.textContent = item.itemTitle;
      const itemCategory = document.createElement('p');
      itemCategory.className = 'mb-1 popular-blog-content text-truncate';
      itemCategory.textContent = item.itemCategory;
      
     
      const itemPriceAndSizeDiv = document.createElement('div');
      itemPriceAndSizeDiv.className = 'text-muted fs-11';
  
   
      item.itemPriceAndSize.forEach((priceAndSize, priceIndex) => {
        const priceAndSizeSpan = document.createElement('span');
        if (priceIndex !== 0) {
          priceAndSizeSpan.textContent = ' | ';
        }
        priceAndSizeSpan.textContent += `${priceAndSize.size} - £${priceAndSize.price}`;
        itemPriceAndSizeDiv.appendChild(priceAndSizeSpan);
      });
  
      const dropdownDiv = document.createElement('div');
      dropdownDiv.className = 'dropdown';
      const dropdownButton = document.createElement('a');
      dropdownButton.href = 'javascript:void(0)';
      dropdownButton.setAttribute('aria-label', 'anchor');
      dropdownButton.className = 'btn btn-icon btn-sm btn-light';
      dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
      dropdownButton.setAttribute('aria-expanded', 'false');
      const dropdownIcon = document.createElement('i');
      dropdownIcon.className = 'fe fe-more-vertical';
      dropdownButton.appendChild(dropdownIcon);
      const dropdownMenu = document.createElement('ul');
      dropdownMenu.className = 'dropdown-menu';
      const dropdownItems = ['Active', 'Suspend', 'Delete'];
  
      dropdownItems.forEach((itemText) => {
        const dropdownItem = document.createElement('li');
        const dropdownLink = document.createElement('a');
        dropdownLink.className = 'dropdown-item';
        dropdownLink.href = 'javascript:void(0)';
        dropdownLink.textContent = itemText;


        if (itemText === 'Delete') {
          dropdownLink.addEventListener('click', () => {
            deleteItem(item.itemId); 
          });
        }


        dropdownItem.appendChild(dropdownLink);
        dropdownMenu.appendChild(dropdownItem);
      });

  
      dropdownDiv.appendChild(dropdownButton);
      dropdownDiv.appendChild(dropdownMenu);
  
      itemInfoDiv.appendChild(itemNameLink);
      itemInfoDiv.appendChild(itemCategory);
      
   
      itemInfoDiv.appendChild(itemPriceAndSizeDiv);

      itemDetailsContainer.appendChild(checkbox)
      itemDetailsContainer.appendChild(avatarElement);
      itemDetailsContainer.appendChild(itemInfoDiv);
      itemDetailsContainer.appendChild(dropdownDiv);
  
      listItem.appendChild(itemDetailsContainer);
  
      itemListContainer.appendChild(listItem);
    
      listItem.addEventListener('click', () => {
        const selectedItem = itemList[index];
        console.log(selectedItem);
        populateForm(selectedItem);
      });
    });
  }
  


  function deleteItem(itemId){
    console.log("I'm the item Id to be deleted : ", itemId);


    
    fetch(`${temisplaceBaseUrl}/api/v1/temisplace/itemDeletionById?id=${encodeURIComponent(itemId)}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          "Authorization" : jwtToken.trim()
      },
  })
  .then(response =>{
      if(!response.ok){
          throw new Error('itemDeletion Failed')
      }
      else{
      return response.json()}
  })
  .then(data=>{
      console.log(data.data);
      const message = data.data
      {toast(message)}    
      fetchPaginatedItemListFromBackend()  
    })
  .catch(error=>{
      console.log("error ", error);
  })

}
  

  function populateForm (selectedItem){


document.getElementById('itemTitleId').value = selectedItem.itemTitle

if(selectedItem.itemPriceAndSize[0]){
document.getElementById('size1Id').value = selectedItem.itemPriceAndSize[0].size
document.getElementById('price1Id').value = selectedItem.itemPriceAndSize[0].price
}else{
  document.getElementById('size1Id').value = "";
document.getElementById('price1Id').value = "";
}


if(selectedItem.itemPriceAndSize[1]){
document.getElementById('size2Id').value = selectedItem.itemPriceAndSize[1].size
document.getElementById('price2Id').value = selectedItem.itemPriceAndSize[1].price
}else{
  document.getElementById('size2Id').value = "";
document.getElementById('price2Id').value = "";
}

if(selectedItem.itemPriceAndSize[2]){
  document.getElementById('size3Id').value = selectedItem.itemPriceAndSize[2].size
  document.getElementById('price3Id').value = selectedItem.itemPriceAndSize[2].price
}else{
  document.getElementById('size3Id').value = "";
  document.getElementById('price3Id').value = "";
}

if(selectedItem.itemPriceAndSize[3]){
document.getElementById('size4Id').value = selectedItem.itemPriceAndSize[3].size
document.getElementById('price4Id').value = selectedItem.itemPriceAndSize[3].price
}else{
  document.getElementById('size4Id').value = "";
document.getElementById('price4Id').value = "";
}


if(selectedItem.ingredients && selectedItem.ingredients[0]){
document.getElementById('ingredient1Id').value = selectedItem.ingredients[0]
}else{
  document.getElementById('ingredient1Id').value = "";
}

if(selectedItem.ingredients && selectedItem.ingredients[1]){
document.getElementById('ingredient2Id').value= selectedItem.ingredients[1]
}else{
  document.getElementById('ingredient2Id').value= "";
}
if(selectedItem.ingredients && selectedItem.ingredients[2]){
document.getElementById('ingredient3Id').value = selectedItem.ingredients[2]
}
else{
  document.getElementById('ingredient3Id').value = "";
}
if(selectedItem.ingredients && selectedItem.ingredients[3]){
document.getElementById('ingredient4Id').value = selectedItem.ingredients[3]
}else{
  document.getElementById('ingredient4Id').value = "";
}
if(selectedItem.ingredients && selectedItem.ingredients[4]){
document.getElementById('ingredient5Id').value = selectedItem.ingredients[4]
}else{
  document.getElementById('ingredient5Id').value = "";
}
if(selectedItem.ingredients && selectedItem.ingredients[5]){
document.getElementById('ingredient6Id').value = selectedItem.ingredients[5]
}else{
  document.getElementById('ingredient6Id').value = "";
}
if(selectedItem.ingredients && selectedItem.ingredients[6]){
document.getElementById('ingredient7Id').value = selectedItem.ingredients[6]
}else{
  document.getElementById('ingredient7Id').value = "";
}
if(selectedItem.ingredients && selectedItem.ingredients[7]){
document.getElementById('ingredient8Id').value = selectedItem.ingredients[7]
}else{
  document.getElementById('ingredient8Id').value = "";
}

document.getElementById('allergyId').value = selectedItem.allergy
document.getElementById('itemCategoryId').value = selectedItem.itemCategory 
document.getElementById('blog-content').value = selectedItem.itemOverView
} 






function clearFormDetailsAfterResponseFromBackend(){


  document.getElementById('itemImgId').value =""
  document.getElementById('itemTitleId').value=""
  document.getElementById('size1Id').value=""
  document.getElementById('price1Id').value=""
  document.getElementById('size2Id').value=""
  document.getElementById('price2Id').value="" 
  document.getElementById('size3Id').value=""
  document.getElementById('price3Id').value=""
  document.getElementById('size4Id').value=""
  document.getElementById('price4Id').value=""
  document.getElementById('ingredient1Id').value=""
  document.getElementById('ingredient2Id').value=""
  document.getElementById('ingredient3Id').value=""
  document.getElementById('ingredient4Id').value=""
  document.getElementById('ingredient5Id').value=""
  document.getElementById('ingredient6Id').value=""
  document.getElementById('ingredient7Id').value=""
  document.getElementById('ingredient8Id').value=""
  document.getElementById('allergyId').value=""
  document.getElementById('publishingTypeId').value=""
  document.getElementById('itemCategoryId').value=""
  document.getElementById('blog-content').value =""



 console.log("i'm the ingredient inside the remove ", itemJsonData.ingredients);
 console.log("i'm the sizes inside the remove", itemJsonData.itemPriceAndSize );
 itemJsonData.ingredients=[]
 itemJsonData.itemPriceAndSize=[]
 ;
  
}




function enableItemHomePageDisplayFeature(itemId){





  itemId = Number(itemId);
  console.log("Im the item Id to activate display feature ", itemId);
  console.log("Token ", jwtToken);


 
    
  fetch(`${temisplaceBaseUrl}/api/v1/temisplace/homePageDisplayEnablement?itemId=${encodeURIComponent(itemId)}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : jwtToken
    },
})
.then(response =>{
    if(!response.ok){
        throw new Error('Home Page Display Enablement Failed')
    }
    else{
    return response.json()}
})
.then(data=>{
    console.log(data.data);
    const message = data.data
    const timer = 2000;
    {toast(message, timer)}    
    fetchPaginatedItemListFromBackend()  
  })
.catch(error=>{
    console.log("error ", error);
    const message = "Network Failed"
    const timer = 3000;
    {toast(message, timer)}  
})
}



function disenableItemHomePageDisplayFeature(itemId){

  
  itemId = Number(itemId);

  console.log("Im the item Id to deactivate display feature ", itemId);


  console.log("I'm the jwt token inside the fuction ", jwtToken );
      
  fetch(`${temisplaceBaseUrl}/api/v1/temisplace/homePageDisplayDisablement?itemId=${encodeURIComponent(itemId)}`, {
    method: 'POST',
    // mode: "no-cors",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': jwtToken.trim()
    },
})
.then(response =>{
  console.log(response);
    if(!response.ok){
        throw new Error('Home Page Display Enablement Failed')
    }
    else{
    return response.json()}
})
.then(data=>{
    console.log(data.data);
    const message = data.data
    const timer = 2000;
    {toast(message, timer)}    
    fetchPaginatedItemListFromBackend()  
  })
.catch(error=>{
    console.log("error ", error);
    const message = "Network Failed"
    const timer = 3000;
    {toast(message, timer)}  

})

}











