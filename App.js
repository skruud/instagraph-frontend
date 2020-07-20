
//Selectors
const form = document.querySelector('.form-list');
const formButton = document.querySelector('.form-button');
const postInput = document.querySelector('.post-input');
const postInputX = document.querySelector('.post-input-x');
const postInputY = document.querySelector('.post-input-y');
const postButton = document.querySelector('.post-button');
const postList = document.querySelector('.post-list');
const chartType = document.querySelector('.pick-chart');
const postPreview = document.querySelector('.preview-list');


//Event Listeners
document.addEventListener('DOMContentLoaded', getPostList);
formButton.addEventListener('click', buttonsCheck);
postButton.addEventListener('click', createPost);
postList.addEventListener('click', buttonsCheck);
postInput.addEventListener('click', updatePreview);
postInputX.addEventListener('click', updatePreview);
postInputY.addEventListener('click', updatePreview);
chartType.addEventListener('change', updatePreview);


//Functions

async function updatePreview(event) {

  //Prevent form from submitting
  event.preventDefault();

  
  //Post DIV
  const postDiv = document.createElement('li');
  postDiv.classList.add('post');

  //Create LI
  let newPost = document.createElement('li');
  newPost.innerText = postInput.value;
  newPost.classList.add('post-item');
  postDiv.appendChild(newPost);


  let x_array = postInputX.value.split(",");
  let y_array = postInputY.value.split(",");


  let newGraph = document.createElement('canvas');
  newGraph.id = 'myChart2';
  

  var ctx2 = newGraph.getContext('2d');
  var myChart2 = new Chart(ctx2, {
        type: chartType.value,
        data: {
            labels: x_array,
            datasets: [{
                label: '# of Votes',
                data: y_array,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          title:  { display: true, text: 'PREVIEW' },
          legend: { display: false },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
    });

    postDiv.appendChild(newGraph);
  

  //CHECK MARK BUTTON
  const likeButton = document.createElement('button');
  likeButton.innerHTML = '<i class="fas fa-heart">';
  likeButton.classList.add('like-btn');
  postDiv.appendChild(likeButton);
  
  //DELETE BUTTON
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash">';
  deleteButton.classList.add('delete-btn');
  postDiv.appendChild(deleteButton);

  //Append to post list
  if (postPreview.childNodes[0] !== undefined) {
    postPreview.removeChild(postPreview.childNodes[0]);
  }
  postPreview.appendChild(postDiv);

  
}

function buttonsCheck(e) {
  const button = e.target;
  //Check mark
  if (button.classList[0] === 'like-btn') {
    const postItem = button.parentElement;
    const id = postItem.childNodes[1].innerText;

    console.log(postItem);
    console.log(postItem.childNodes);
    postItem.childNodes[3].classList.toggle('liked');
    if (postItem.classList.contains('liked')) {
      //putPost(id, true);
    } 
    else {
      //putPost(id, false);
    }
  }
  //Delete post
  else if (button.classList[0] === 'delete-btn') {
    const postItem = button.parentElement;
    
    console.log('DELETED');
    //Animation
    postItem.classList.add('fall');
    postItem.addEventListener('transitionend', function() {
      postItem.remove();
    })
    const id = postItem.childNodes[2].innerText;
    deletePost(id);
  }
  //View form
  else if (button.classList[0] === 'form-button') {
    console.log('FORM BUTTON');
    if (form.style.display === 'block') {
      form.style.display = 'none';
      button.innerHTML = '<i class="fas fa-plus-square"></i>';
      if (postPreview.childNodes[0] !== undefined) {
        postPreview.removeChild(postPreview.childNodes[0]);
      }
    }
    else {
      form.style.display = 'block';
      button.innerHTML = '<i class="fas fa-minus-square"></i>';
    }
  }
}

//Get posts from server
function getPostList() {
  fetch('https://63fvwrrcug.execute-api.eu-north-1.amazonaws.com/dev/ig')
    .then(response => response.json())
    .then(data => 
      importPosts(data)

    );
}

//Iterate through each post
function importPosts(data) {
  console.log(data);
  for (const post of data) {
    importPost(post);
  }
}

//Add post to html
function importPost(post) {
  //Post DIV
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  //Create LI
  let newPost = document.createElement('li');
  newPost.innerText = post.text;
  newPost.classList.add('post-item');
  postDiv.appendChild(newPost);


  let newElement = document.createElement('li');
  newElement.innerText = post.id;
  newElement.classList.add('post-id');
  newElement.style.display = 'none';
  postDiv.appendChild(newElement);

  let x_array = post['x-array'][0];
  let y_array = post['y-array'][0];
  let chartType = post.chartType;

  let newGraph = document.createElement('canvas');
  newGraph.id = 'myChart2';
  

  var ctx2 = newGraph.getContext('2d');
  var myChart2 = new Chart(ctx2, {
        type: chartType,
        data: {
            labels: x_array,
            datasets: [{
                label: '# of Votes',
                data: y_array,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          legend: { display: false },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
    });

    postDiv.appendChild(newGraph);
  

  //CHECK MARK BUTTON
  const likeButton = document.createElement('button');
  likeButton.innerHTML = '<i class="fas fa-heart">';
  likeButton.classList.add('like-btn');
  postDiv.appendChild(likeButton);
  
  //DELETE BUTTON
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash">';
  deleteButton.classList.add('delete-btn');
  postDiv.appendChild(deleteButton);

  //Append to post list
  postList.appendChild(postDiv);
  
}

//Get post data from form 
async function createPost(event) {
  event.preventDefault();
  const x_array = postInputX.value.split(",");
  const y_array = postInputY.value.split(",");
  console.log('postPost Function');
  const data = { userName: 'admin', text: postInput.value, 'x-array': [x_array], 'y-array': [y_array], chartType: chartType.value };
  //const data = { text: postInput.value };
  let postData = await postPost(data);
}

//Upload post to server
function postPost(postData) {

  return fetch('https://63fvwrrcug.execute-api.eu-north-1.amazonaws.com/dev/ig', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  .then(response => response.json())
  .then( function(data)  {
    return data;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function putPost(id, liked) {
  const data = { likes: liked };

  fetch(`https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/posts/${id}`, {
    method: 'PUT', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function deletePost(id) {

  fetch(`https://63fvwrrcug.execute-api.eu-north-1.amazonaws.com/dev/ig/${id}`, {
    method: 'DELETE', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => console.log(response) )
  .catch((error) => {
    console.error('Error:', error);
  });
}