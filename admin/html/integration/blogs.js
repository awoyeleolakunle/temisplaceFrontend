



const jwtToken = JSON.parse(sessionStorage.getItem('temisplaceToken'));

console.log( "I'm the jwtToken ", jwtToken);

document.addEventListener('DOMContentLoaded', function () {

  // Initialize flatpickr for Publish Date
  flatpickr('#publishDateId', {
    dateFormat: 'Y-m-d', // Date format (customize as needed)
    enableTime: false,   // Disable time selection
    altInput: true,      // Display an alternative input field
    altFormat: 'F j, Y', // Format for the alternative input field
  });

  // Initialize flatpickr for Publish Time
  flatpickr('#publishTimeId', {
    enableTime: true,    // Enable time selection
    noCalendar: true,    // Disable the calendar
    dateFormat: 'H:i',   // Time format (24-hour)
    altInput: true,      // Display an alternative input field
    altFormat: 'h:i K',  // Format for the alternative input field (with AM/PM)
  });

  fetchPaginatedblogPostListFromBackend();
});
  




let blogTitle, postAuthor, email, publishDate, publishTime, publishStatus, blogPostCategory, blogType, blogContent, postImageUrl;



console.log("I'm the blogTitle ", blogTitle , "yes");
document.getElementById('publishTimeId').addEventListener('change',()=>{
  const selectedTime = document.getElementById('publishTimeId').value;
   publishTime = formatTimeTo12Hour(selectedTime)
  console.log(publishTime);
} )


document.getElementById('publishDateId').addEventListener('change', ()=>{
  publishDate = document.getElementById('publishDateId').value
})

function formatTimeTo12Hour(time) {
  const [hours, minutes] = time.split(':');
  const parsedHours = parseInt(hours);
  const ampm = parsedHours >= 12 ? 'PM' : 'AM';
  const formattedHours = parsedHours % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
}


const freeRadioButton = document.getElementById('blog-free1');

if (freeRadioButton.checked) {
  blogType = document.getElementById('freeCheckId').innerText.toUpperCase()
  console.log(blogType);
  console.log('Selected Option: ', blogType);
}


const paidRadioButton = document.getElementById('blog-paid1');


if (paidRadioButton.checked) {
  blogType = document.getElementById('paidCheckId').innerText.toUpperCase()
  console.log(blogType);
  console.log('Selected Option: Paid');
}


freeRadioButton.addEventListener('change', () => {
  if (freeRadioButton.checked) {
    blogType = document.getElementById('freeCheckId').innerText.toUpperCase()
    console.log(blogType);
    console.log('Selected Option: ', blogType);
  }
});

paidRadioButton.addEventListener('change', () => {
  if (paidRadioButton.checked) {
    blogType = document.getElementById('paidCheckId').innerText.toUpperCase()
    console.log(blogType);
    console.log('Selected Option: Paid');
  }
});




document.getElementById("postImageUrlId").addEventListener("click", function(){

  cloudinary.createUploadWidget({
      cloudName: 'deokatly1', 
      uploadPreset: 'temisplace'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
          postImageUrl = result.info.url
          console.log(postImageUrl);

        //  document.getElementById("imageId").value = result.info.original_filename;
         
        }        
      }
    ).open()

}, false);




paginationRequest = {
  "pageNumber": 0,
  "pageSize": 10
}




function fetchPaginatedblogPostListFromBackend() {
  console.log("i'm here")
  fetch(`${temisplaceBaseUrl}/api/v1/temisplace/allBlogPost`, {
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
    .then(listOfBlogPost => {
      display(listOfBlogPost);
      console.log("I'm the userList", listOfBlogPost);
    })
    .catch(error => {
      console.error(error);
    });
}






const editBlogDetails = ()=>{

  document.getElementById('blogTitleId').addEventListener('input', ()=>{
    blogTitle =  document.getElementById('blogTitleId').value;  
  console.log(blogTitle);
  });

    document.getElementById('postAuthorId').addEventListener('input', ()=>{
      postAuthor = document.getElementById('postAuthorId').value;
    });

    document.getElementById('emailId').addEventListener('input', ()=>{
      email = document.getElementById('emailId').value;
      console.log("i'm the email");
    });


    document.getElementById('blogContentId').addEventListener('input', ()=>{
      blogContent = document.getElementById('blogContentId').value;
      console.log(blogContent);
    });

    document.getElementById('postImageUrlId').addEventListener('input', ()=>{
      postImageUrl = document.getElementById('postImageUrlId').value;
    });

    document.getElementById('blogCategoryId').addEventListener('input', ()=>{
      blogPostCategory = document.getElementById('blogCategoryId').value
    
    })     

    document.getElementById('publishStatusId').addEventListener('input', ()=>{
      publishStatus = document.getElementById('publishStatusId').value
    })
}



const blogPostJsonData = {
  "postTitle": "", 
   "postAuthor" : "",
    "email" : "", 
    "publishDate" : "", 
    "publishTime" : "",
    "blogPostCategory": "", 
    "blogType" : "", 
    "blogContent ": "", 
    "postImageUrl ": "",
    "publishStatus ": "",
 }

editBlogDetails();


console.log("I'm the text area ", document.getElementById('blogContentId'));

function sendBlogPostJsonDataToBackend() {

  blogTitle =  document.getElementById('blogTitleId').value;
  postAuthor = document.getElementById('postAuthorId').value; 
  email = document.getElementById('emailId').value;
  blogContent = document.getElementById('blogContentId').value
  blogPostCategory = document.getElementById('blogCategoryId').value
  publishStatus = document.getElementById('publishStatusId').value





  blogPostJsonData.postTitle = blogTitle;
  blogPostJsonData.postAuthor = postAuthor;
  blogPostJsonData.email = email;
  blogPostJsonData.publishDate = publishDate;
  blogPostJsonData.publishTime = publishTime;
  blogPostJsonData.blogType = blogType;
  blogPostJsonData.publishStatus = publishStatus.toUpperCase();
  blogPostJsonData.blogPostCategory =  blogPostCategory.toUpperCase();
  blogPostJsonData.blogContent = blogContent;
  blogPostJsonData.postImageUrl = postImageUrl;

  console.log("i'm here")
  fetch(`${temisplaceBaseUrl}/api/v1/temisplace/blog/blogPostCreation`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : jwtToken
    },
      body: JSON.stringify(blogPostJsonData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed");
      }
      return response.json();
    })
    .then(data => {
      const message = data.data;
      const timer = 3000;
      {toast(message, timer)};
      console.log("Response from backend:", data);
      fetchPaginatedblogPostListFromBackend()
    })
     .catch(error => {
      console.log("error :" , error  );
      console.error(error);
    });
}


postBlogBtn = document.getElementById('postBlogBtnId');

postBlogBtn.addEventListener('click', sendBlogPostJsonDataToBackend)



function display(listOfBlogPost){


  const userListContainer = document.getElementById("blogPostListId");

  userListContainer.innerHTML = '';

  listOfBlogPost.forEach((blogPost, index) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";

    

    listItem.innerHTML = `
  <div data-index=${index} class="d-flex gap-2 flex-wrap align-items-center">
      <span class="avatar avatar-xl me-1">
          <img src="../assets/images/media/media-39.jpg" class="img-fluid" alt="...">
      </span>
      <div class="flex-fill">
          <a href="javascript:void(0);" class="fs-14 fw-semibold mb-0">Animals</a>
          <p class="mb-1 popular-blog-content text-truncate">
              ${blogPost.postTitle}
          </p>
          <span class="text-muted fs-11">${blogPost.publishDate} - ${blogPost.publishTime}</span>
      </div>
      <div>
                    <div class="dropdown">
<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-light" data-bs-toggle="dropdown" aria-expanded="false">
<i class="fe fe-more-vertical"></i>
</a>
<ul class="dropdown-menu">
<li><a class="dropdown-item"  data-blogPost-id=${blogPost.id} href="javascript:void(0);">Active</a></li>
<li><a class="dropdown-item" data-blogPost-id=${blogPost.id} href="javascript:void(0);">Suspend</a></li>
<li><a  class="dropdown-item" data-blogPost-id=${blogPost.id} href="javascript:void(0);">Delete</a></li>
</ul>
</div>
      </div>
  </div>
</li>

`;
userListContainer.appendChild(listItem);

listItem.addEventListener('click', () => {
  const selectedBlogPost = listOfBlogPost[index];
  populateForm(selectedBlogPost);
});



const dropdownItems = listItem.querySelectorAll('.dropdown-item');
dropdownItems.forEach(dropDown => {
   dropDown.addEventListener('click', (event) => {
       const dropDownText = event.target.textContent;
       const blogPostId = event.target.getAttribute('data-blogPost-id');
       dropDownText=='Delete'? deteleBlogPost(blogPostId): updateBlogPostStatus(dropDownText, blogPostId);
   });

  });

})

}

function populateForm(selectedBlogPost) {

  console.log("I'm the title ",   selectedBlogPost.postTitle);
  document.getElementById('blogTitleId').value = selectedBlogPost.postTitle;
  document.getElementById('postAuthorId').value = selectedBlogPost.postAuthor;
  document.getElementById('emailId').value = selectedBlogPost.email;
  document.getElementById('blogContentId').value = selectedBlogPost.blogContent;
  document.getElementById('postImageUrlId').value = selectedBlogPost.postImageUrl;
  // document.getElementById('postCodeId').value = selectedBlogPost.postCode;
  document.getElementById('blogCategoryId').value = selectedBlogPost.blogPostCategory;
  document.getElementById('publishStatusId').value = selectedBlogPost.publishStatus;
  document.getElementById('publishDateId').value = selectedBlogPost.publishDate;
  document.getElementById('publishTimeId').value = selectedBlogPost.publishTime;

  console.log("I'm the selected blog post's title ", selectedBlogPost.postTitle);

}


function deteleBlogPost(blogPostId){

  console.log("I'm the delete function : ", blogPostId);

  fetch(`${temisplaceBaseUrl}/api/v1/temisplace/blogPostDeletion?id=${encodeURIComponent(blogPostId)}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : jwtToken
    },
    
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed");
      }
      return response.json();
    })
    .then(data => {
      const message = data.data;
      const timer = 3000;
      {toast(message, timer)};
      console.log("Response from backend:", data);
      fetchPaginatedblogPostListFromBackend()
    })
     .catch(error => {
      console.log("error :" , error  );
      console.error(error);
    });

}


function updateBlogPostStatus(dropDownText , blogPostId){

  console.log("I'm the update function : ", dropDownText ,  blogPostId);
  const blogPostStatusUpdateRequest = {
    id : Number(blogPostId),
    blogPostStatus : dropDownText.toUpperCase()
  }


  fetch(`${temisplaceBaseUrl}/api/v1/temisplace/blogPostStatusUpdate`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : jwtToken
    },
      body: JSON.stringify(blogPostStatusUpdateRequest)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed");
      }
      return response.json();
    })
    .then(data => {
      const message = data.data;
      const timer = 3000;
      {toast(message, timer)};
      console.log("Response from backend:", data);
      fetchPaginatedblogPostListFromBackend()
    })
     .catch(error => {
      console.log("error :" , error  );
      console.error(error);
    });
}