



console.log("Hello ");

const jwtToken = JSON.parse(sessionStorage.getItem('temisplaceToken'));

document.addEventListener('DOMContentLoaded', fetchPaginatedUserListFromBackend)

let listOfUsers = [];

const registrationData = {
  "emailAddress": "",
  "firstName": "",
  "lastName": "",
  "roles": "",
  "phoneNumber": "",
  "country": "",
  "city": "",
  "postCode": "",
  "address": "",
  "userStatus": "",
  "profileImg": "",
}

paginationRequest = {
  "pageNumber": 0,
  "pageSize": 10
}

function fetchPaginatedUserListFromBackend() {
  console.log("i'm here")
  fetch( `${temisplaceBaseUrl}/api/v1/temisplace/paginatedUserList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paginationRequest)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed");
      }
      console.log("I'm the response from backend", response.data);
      return response.json();
    })
    .then(UserList => {
      display(UserList);
      clearFormDetailsAfterResponseFromBackend()
      console.log("I'm the userList", UserList);
    })
    .catch(error => {
      console.error(error);
    });
}

function display(userList) {
  const userListContainer = document.getElementById("userListId");

  userListContainer.innerHTML = '';

  userList.forEach((user, index) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";

    listItem.innerHTML = `
        <div data-index=${index} class="user-item d-flex gap-2 flex-wrap align-items-center">
            <span class="avatar avatar-xl me-1">
                <img src="../assets/images/media/media-39.jpg" class="img-fluid" alt="...">
            </span>
            <div class="flex-fill">
                <a class="fs-14 fw-semibold mb-0">${user.firstName} ${user.lastName}</a>
                <p class="mb-1 popular-blog-content text-truncate">
                ${user.city}, ${user.country}
                </p>
                <span class="text-muted fs-11">${user.registrationDate} - ${user.registrationTime}</span>
            </div>
            <div>
                <div class="dropdown">
                    <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fe fe-more-vertical"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" data-user-id="${user.id}" href="javascript:void(0);">Active</a></li>
                        <li><a class="dropdown-item" data-user-id="${user.id}" href="javascript:void(0);">Suspend</a></li>
                        <li><a class="dropdown-item" data-user-id="${user.id}" href="javascript:void(0);">Edit</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    userListContainer.appendChild(listItem);

    listItem.addEventListener('click', () => {
      const selectedUser = userList[index];
      populateForm(selectedUser);
    });


    const dropdownItems = listItem.querySelectorAll('.dropdown-item');
     dropdownItems.forEach(dropDown => {
        dropDown.addEventListener('click', (event) => {
            const dropDownText = event.target.textContent;
            const userId = event.target.getAttribute('data-user-id');
            updateUserStatus(dropDownText, userId);
        });

      });

  });

}



function updateUserStatus(textContent, id){
  console.log(textContent, id);
 

  userStatusUpdataRequest = {
    userId :id,
    userStatus : textContent
  }

  
  fetch(`${temisplaceBaseUrl}/api/v1/temisplace/userStatusUpdate`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : jwtToken
    },
    body: JSON.stringify(userStatusUpdataRequest) 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to update user data");
    }
    return response.json();
  })
  .then(data => {
    console.log("User data updated successfully:", data);
    {toast(data.data)}
    fetchPaginatedUserListFromBackend();

  })
  .catch(error => {
    console.error("Error updating user data:", error);
    const message = "Network Failed";
    {toast(message)};
  });
}


function populateForm(selectedUser) {
  document.getElementById('firstNameId').value = selectedUser.firstName;
  document.getElementById('lastNameId').value = selectedUser.lastName;
  document.getElementById('userCategoryId').value = selectedUser.roles[0];
  document.getElementById('phoneNumberId').value = selectedUser.phoneNumber;
  document.getElementById('countryId').value = selectedUser.country;
  document.getElementById('postCodeId').value = selectedUser.postCode;
  document.getElementById('emailAddressId').value = selectedUser.emailAddress;
  document.getElementById('cityId').value = selectedUser.city;
  document.getElementById('statusId').value = selectedUser.userStatus;

  console.log("I'm the selected user emailAddress", selectedUser.emailAddress);


  registrationData.firstName = document.getElementById('firstNameId').value
  registrationData.lastName = document.getElementById('lastNameId').value
  registrationData.roles = document.getElementById('userCategoryId').value
  registrationData.phoneNumber = document.getElementById('phoneNumberId').value
  registrationData.postCode = document.getElementById('postCodeId').value
  registrationData.city = document.getElementById('cityId').value
  registrationData.userStatus = document.getElementById('statusId').value
  registrationData.country = document.getElementById('countryId').value
  registrationData.emailAddress = document.getElementById('emailAddressId').value


  document.getElementById('firstNameId').addEventListener('input', () => {
    registrationData.firstName = document.getElementById('firstNameId').value;
  });
  document.getElementById('lastNameId').addEventListener('input', ()=>{
    registrationData.lastName = document.getElementById('lastNameId').value
  });

  document.getElementById('userCategoryId').addEventListener('input', ()=>{
    registrationData.roles = document.getElementById('userCategoryId').value
  });

  document.getElementById('phoneNumberId').addEventListener('input', ()=>{
    registrationData.phoneNumber = document.getElementById('phoneNumberId').value
  });

  document.getElementById('postCodeId').addEventListener('input', ()=>{
    registrationData.postCode = document.getElementById('postCodeId').value
  });

  document.getElementById('cityId').addEventListener('input', ()=>{
    registrationData.city = document.getElementById('cityId').value
  });

  document.getElementById('statusId').addEventListener('input', ()=>{
    registrationData.userStatus = document.getElementById('statusId').value
  });

  document.getElementById('countryId').addEventListener('input', ()=>{
    registrationData.country = document.getElementById('countryId').value
  });

  document.getElementById('emailAddressId').addEventListener('input', ()=>{
    registrationData.emailAddress = document.getElementById('emailAddressId').value
  });



  console.log("I'm here ", registrationData.firstName);

  document.getElementById('saveBtnId').addEventListener('click', () => {
    upDateUser(selectedUser);
  });
}

function upDateUser(selectedUser) {
    console.log("I'm the registration firstname ", registrationData.firstName);
  
  selectedUser.firstName = registrationData.firstName;
  selectedUser.lastName = registrationData.lastName;
  selectedUser.roles = [registrationData.roles]; 
  selectedUser.phoneNumber = registrationData.phoneNumber;
  selectedUser.country = registrationData.country;
  selectedUser.postCode = registrationData.postCode;
  selectedUser.emailAddress = registrationData.emailAddress;
  selectedUser.city = registrationData.city;
  selectedUser.userStatus = registrationData.userStatus;

  //console.log("Updated user data:", selectedUser);

  console.log("Updated registration update ", registrationData)


  fetch(`${temisplaceBaseUrl}/api/v1/temisplace/registerOrUpdateUser`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : jwtToken
    },
    body: JSON.stringify(registrationData) 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to update user data");
    }
    return response.json();
  })
  .then(data => {
    console.log("User data updated successfully:", data);
    fetchPaginatedUserListFromBackend();
  })
  .catch(error => {
    console.error("Error updating user data:", error);
    const message = "Network Failed";
    {toast(message)};
  });
}




function  clearFormDetailsAfterResponseFromBackend(){
  document.getElementById('firstNameId').value= "";
  document.getElementById('lastNameId').value ="";
  document.getElementById('userCategoryId').value ="";
  document.getElementById('phoneNumberId').value = "";
  document.getElementById('countryId').value = "";
  document.getElementById('postCodeId').value = "";
  document.getElementById('emailAddressId').value ="";
  document.getElementById('cityId').value = "";
  document.getElementById('statusId').value ="";
}