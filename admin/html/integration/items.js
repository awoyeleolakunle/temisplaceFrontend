





itemPaginationListRequest = {
    "pageNumber": 0,
    "pageSize": 10
}


const fetchPaginatedItemListFromBackend=()=>{


    fetch('http://localhost:8080/api/v1/temisplace/allItems', {
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
    })
    .catch(error=>{
        console.log(error);
    })

}



document.addEventListener('DOMContentLoaded', fetchPaginatedItemListFromBackend)



let itemImg, itemTitle, size1, price1, size2, price2, size3, price3, size4, price4,
  ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, ingredient7, ingredient8,
  allergy, publishingType, itemCategory;

  postItemBtn = document.getElementById('postItemBtnId')

const itemJsonData = {
  "itemTitle": "",
  "itemCategory": "",
  "itemImgUrl": "",
  "itemPriceAndSize": [],
  "ingredients": [],
  "allergy": "",
  "publishingType": ""
};


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
    size3 = document.getElementById('size3Id').value
    price3 = document.getElementById('price3Id').value
    size4 = document.getElementById('size4Id').value
    price4 = document.getElementById('price4Id').value
    ingredient1 = document.getElementById('ingredient1Id').value
    ingredient2 = document.getElementById('ingredient2Id').value
    ingredient3 = document.getElementById('ingredient3Id').value
    ingredient4 = document.getElementById('ingredient4Id').value
    ingredient5 = document.getElementById('ingredient5Id').value
    ingredient6 = document.getElementById('ingredient6Id').value
    ingredient7 = document.getElementById('ingredient7Id').value
    ingredient8 = document.getElementById('ingredient8Id').value
    allergy = document.getElementById('allergyId').value
    publishingType = document.getElementById('publishingTypeId').value
    itemCategory = document.getElementById('itemCategoryId').value
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


const sendItemToTheBackEnd = () => {

    itemJsonData.itemTitle = itemTitle;
    itemJsonData.itemImgUrl = itemImg;
    itemJsonData.publishingType = publishingType;
    itemJsonData.itemCategory = itemCategory;
    itemJsonData.allergy = allergy;

    fetch('http://localhost:8080/api/v1/temisplace/itemCreation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
    })
    .catch(error=>{
        console.log("error ", error);
    })

  }

postItemBtn.addEventListener('click', () => {
 
 editFieldValue();
 
  addSizeAndPriceToList(size1, price1);
  addSizeAndPriceToList(size2, price2);
  addSizeAndPriceToList(size3, size4);
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
  
      const avatarElement = document.createElement('span');
      avatarElement.className = 'avatar avatar-xl me-1';
      const avatarImage = document.createElement('img');
      avatarImage.src = '../assets/images/media/media-39.jpg';
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
      
      // Create a div to display the price and size of each object
      const itemPriceAndSizeDiv = document.createElement('div');
      itemPriceAndSizeDiv.className = 'text-muted fs-11';
  
      // Iterate over the itemPriceAndSize list and display each price and size
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
      const dropdownItems = ['Active', 'Suspend', 'Edit'];
  
      dropdownItems.forEach((itemText) => {
        const dropdownItem = document.createElement('li');
        const dropdownLink = document.createElement('a');
        dropdownLink.className = 'dropdown-item';
        dropdownLink.href = 'javascript:void(0)';
        dropdownLink.textContent = itemText;
        dropdownItem.appendChild(dropdownLink);
        dropdownMenu.appendChild(dropdownItem);
      });
  
      dropdownDiv.appendChild(dropdownButton);
      dropdownDiv.appendChild(dropdownMenu);
  
      itemInfoDiv.appendChild(itemNameLink);
      itemInfoDiv.appendChild(itemCategory);
      
      // Append the itemPriceAndSizeDiv to the itemInfoDiv
      itemInfoDiv.appendChild(itemPriceAndSizeDiv);
  
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
  



  function populateForm (selectedItem){

console.log("i'm the ingredients in 0 ", selectedItem.ingredients[0]);
//document.getElementById('itemImgId')
document.getElementById('itemTitleId').value = selectedItem.itemTitle

if(selectedItem.itemPriceAndSize[0]){
document.getElementById('size1Id').value = selectedItem.itemPriceAndSize[0].size
document.getElementById('price1Id').value = selectedItem.itemPriceAndSize[0].price
}

if(selectedItem.itemPriceAndSize[1]){
document.getElementById('size2Id').value = selectedItem.itemPriceAndSize[1].size
document.getElementById('price2Id').value = selectedItem.itemPriceAndSize[1].price
}

if(selectedItem.itemPriceAndSize[2]){
  document.getElementById('size3Id').value = selectedItem.itemPriceAndSize[2].size
  document.getElementById('price3Id').value = selectedItem.itemPriceAndSize[2].price
}

if(selectedItem.itemPriceAndSize[3]){
document.getElementById('size4Id').value = selectedItem.itemPriceAndSize[3].size
document.getElementById('price4Id').value = selectedItem.itemPriceAndSize[3].price
}


document.getElementById('ingredient1Id').value = selectedItem.ingredients[0]
document.getElementById('ingredient2Id').value= selectedItem.ingredients[1]
document.getElementById('ingredient3Id').value = selectedItem.ingredients[2]
document.getElementById('ingredient4Id').value = selectedItem.ingredients[3]
document.getElementById('ingredient5Id').value = selectedItem.ingredients[4]
document.getElementById('ingredient6Id').value = selectedItem.ingredients[5]
document.getElementById('ingredient7Id').value = selectedItem.ingredients[6]
document.getElementById('ingredient8Id').value = selectedItem.ingredients[7]
document.getElementById('allergyId').value = selectedItem.allergy
document.getElementById('itemCategoryId').value = selectedItem.itemCategory } 

















// function display(itemList) {
//     const itemListContainer = document.getElementById('itemListId');
  
//     itemListContainer.innerHTML = '';
  
//     itemList.forEach((item, index) => {
//       const listItem = document.createElement('li');
//       listItem.className = 'list-group-item';
  
      
//       const itemDetailsContainer = document.createElement('div');
//       itemDetailsContainer.className = 'd-flex gap-2 flex-wrap align-items-center';
  
      
//       itemDetailsContainer.setAttribute('data-index', index);
      
//       const avatarElement = document.createElement('span');
//       avatarElement.className = 'avatar avatar-xl me-1';
//       const avatarImage = document.createElement('img');
//       avatarImage.src = '../assets/images/media/media-39.jpg';
//       avatarImage.className = 'img-fluid';
//       avatarImage.alt = '...';
//       avatarElement.appendChild(avatarImage);
  
      
//       const itemInfoDiv = document.createElement('div');
//       itemInfoDiv.className = 'flex-fill';
//       const itemNameLink = document.createElement('a');
//       itemNameLink.href = 'javascript:void(0)';
//       itemNameLink.className = 'fs-14 fw-semibold mb-0';
//       itemNameLink.textContent = item.itemTitle;
//       const itemCategory = document.createElement('p');
//       itemCategory.className = 'mb-1 popular-blog-content text-truncate';
//       itemCategory.textContent = item.itemCategory;
//       const itemPriceAndSize = document.createElement('span');
//       itemPriceAndSize.className = 'text-muted fs-11';
  
      
//       item.itemPriceAndSize.forEach((priceAndSize, priceIndex) => {
//         const priceAndSizeSpan = document.createElement('span');
//         if (priceIndex !== 0) {
//           priceAndSizeSpan.textContent = ' | ';
//         }
//         priceAndSizeSpan.textContent += `${priceAndSize.size} - £${priceAndSize.price}`;
//         itemPriceAndSize.appendChild(priceAndSizeSpan);
//       });
  
      
//       const dropdownDiv = document.createElement('div');
//       dropdownDiv.className = 'dropdown';
//       const dropdownButton = document.createElement('a');
//       dropdownButton.href = 'javascript:void(0)';
//       dropdownButton.setAttribute('aria-label', 'anchor');
//       dropdownButton.className = 'btn btn-icon btn-sm btn-light';
//       dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
//       dropdownButton.setAttribute('aria-expanded', 'false');
//       const dropdownIcon = document.createElement('i');
//       dropdownIcon.className = 'fe fe-more-vertical';
//       dropdownButton.appendChild(dropdownIcon);
//       const dropdownMenu = document.createElement('ul');
//       dropdownMenu.className = 'dropdown-menu';
//       const dropdownItems = ['Active', 'Suspend', 'Edit'];
  
      
//       dropdownItems.forEach((itemText) => {
//         const dropdownItem = document.createElement('li');
//         const dropdownLink = document.createElement('a');
//         dropdownLink.className = 'dropdown-item';
//         dropdownLink.href = 'javascript:void(0)';
//         dropdownLink.textContent = itemText;
//         dropdownItem.appendChild(dropdownLink);
//         dropdownMenu.appendChild(dropdownItem);
//       });
  
//       dropdownDiv.appendChild(dropdownButton);
//       dropdownDiv.appendChild(dropdownMenu);
  
      
//       itemInfoDiv.appendChild(itemNameLink);
//       itemInfoDiv.appendChild(itemCategory);
//       itemInfoDiv.appendChild(itemPriceAndSize);
  
      
//       itemDetailsContainer.appendChild(avatarElement);
//       itemDetailsContainer.appendChild(itemInfoDiv);
//       itemDetailsContainer.appendChild(dropdownDiv);
  
      
//       listItem.appendChild(itemDetailsContainer);
  
    
//       itemListContainer.appendChild(listItem);


//       listItem.addEventListener('click', () => {
//         const selectedItem = itemList[index];
//         populateForm(selectedItem);
//       });
//     });



//   

