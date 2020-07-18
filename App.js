
//Selectors
const postInput = document.querySelector('.post-input');
const postInputX = document.querySelector('.post-input-x');
const postInputY = document.querySelector('.post-input-y');
const postButton = document.querySelector('.post-button');
const postList = document.querySelector('.post-list');
const chartType = document.querySelector('.pick-chart');

const postPreview = document.querySelector('.preview-container');


//Event Listeners
//document.addEventListener('DOMContentLoaded', getPostList);
postButton.addEventListener('click', addPost);
postList.addEventListener('click', buttonsCheck);
//filterOption.addEventListener('click', filterPosts);
postInput.addEventListener('click', updatePreview);




//Functions

async function updatePreview(event) {

  //Prevent form from submitting
  event.preventDefault();

  
  //Post DIV
  const postDiv = document.createElement('div');
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
  postPreview = postDiv;

  //Clear postInput
  postInput.value = "";
  postInputX.value = "";
  postInputY.value = "";
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
    const id = postItem.childNodes[1].innerText;
    //deletePost(id);
  }
}

async function addPost(event) {

  //Prevent form from submitting
  event.preventDefault();

  
  //Post DIV
  const postDiv = document.createElement('div');
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

  //Clear postInput
  postInput.value = "";
  postInputX.value = "";
  postInputY.value = "";
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
    const id = postItem.childNodes[1].innerText;
    //deletePost(id);
  }
}

function filterPosts(e) {
  const posts = postList.childNodes;
  for (const post of posts) {
    switch (e.target.value) {
      case 'all':
        post.style.display = 'flex';
        break;
      case 'liked':
        post.classList.contains('liked') ? 
          post.style.display = 'flex' : post.style.display = 'none';
        break;
      case 'unliked':
        !post.classList.contains('liked') ? 
          post.style.display = 'flex' : post.style.display = 'none';
        break;
    }
  }
}

function getPostList() {
  fetch('https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/posts')
    .then(response => response.json())
    .then(data => 
      importPosts(data)

    );
}

function importPosts(data) {
  console.log(data);
  for (const post of data) {
    importPost(post);
  }
}

function importPost(post) {
  const title = post.title;
  //Post DIV
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  //Create LI
  let newPost = document.createElement('li');
  newPost.innerText = title;
  newPost.classList.add('post-item');
  postDiv.appendChild(newPost);

  newPost = document.createElement('li');
  newPost.innerText = post.id;
  newPost.classList.add('post-id');
  newPost.style.display = 'none';
  postDiv.appendChild(newPost);

  //CHECK MARK BUTTON
  const likeButton = document.createElement('button');
  likeButton.innerHTML = '<i class="fas fa-check">';
  likeButton.classList.add('like-btn');
  postDiv.appendChild(likeButton);
  
  //DELETE BUTTON
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash">';
  deleteButton.classList.add('delete-btn');
  postDiv.appendChild(deleteButton);

  if (post.like == true) postDiv.classList.toggle('liked');

  //Append to post list
  postList.appendChild(postDiv);

  //Clear postInput
  postInput.value = "";
}

function postPost(title) {
  const data = { title: title };
  var id;

  return fetch('https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/posts', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then( function(data)  {
    return data.id;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function putPost(id, liked) {
  const data = { like: liked };

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

  fetch(`https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/posts/${id}`, {
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