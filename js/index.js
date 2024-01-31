//You are going to build a JavaScript application which searches GitHub for users by name and 
//displays the results on the screen. 
//Clicking on a specific user will show all the repositories for that user.

//User Search Endpoint You can search for users matching a certain name
//User Repos Endpoint You can find all the public repositories for a user using this endpoint

{/* <form id='github-form'>
      <input id='search' type='text' name='search'>
      <input type='submit' name='submit'/>
    </form> */}


{/* grab form
get input value URL user search endpoint and when form is submitted send get request. Should search for user matches using the user search endpoint */}


     document.addEventListener('DOMContentLoaded', function() {
      document.getElementById("github-form").addEventListener("submit", function(event) {
        event.preventDefault();
  
        const searchInput = document.getElementById("search");
        const username = searchInput.value;
        
        const userUrl = `https://api.github.com/search/users?q=${username}`;
  
        fetch(userUrl)
          .then(function(response){
            console.log(response)
          
            return response.json()
          
        }) 
          .then(function(data) {

            const searchInput = document.getElementById('search').value;

            // Make a request to the GitHub Users API to get information about the searched user
            fetch(`https://api.github.com/users/${searchInput}`)
              .then(response => response.json())
              .then(userData => {
                // Display user information on the page
                const userList = document.getElementById('user-list');
                userList.innerHTML = `
                  <li>
                    <h2>${userData.login}</h2>
                    <img src="${userData.avatar_url}" alt="User Avatar">
                    <p>Name: ${userData.name}</p>
                    <p>Location: ${userData.location}</p>
                    <a href="${userData.html_url}" target="_blank">Profile Link</a>
                  </li>
                `;
          
                // Add click event listener to the user's name for fetching repositories
                const userElement = userList.querySelector('li');
                userElement.addEventListener('click', function () {
                  // Make a request to the GitHub Repos API to get repositories for the clicked user
                  fetch(`https://api.github.com/users/${searchInput}/repos`)
                    .then(response => response.json())
                    .then(reposData => {
                      // Display repositories on the page
                      const reposList = document.getElementById('repos-list');
                      reposList.innerHTML = reposData.map(repo => `
                        <li>
                          <h3>${repo.name}</h3>
                          <p>${repo.description || 'No description available'}</p>
                          <a href="${repo.html_url}" target="_blank">Repo Link</a>
                        </li>
                      `).join('');
                    })
                    .catch(error => console.error('Error fetching repositories:', error));
                });
              })
              .catch(error => console.error('Error fetching user data:', error));
          });
            
            })
      })
        // Using the results of the search, display information about the users to the page. (You might include showing their username, 
        // avatar and a link to their profile.)
        // Clicking on one of these users should send a request to the User Repos Endpoint
        // Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
        

        

      
      
    

