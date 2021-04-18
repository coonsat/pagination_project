/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
let currentPage = 1;
const itemsPerPage = 9;



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const createHTMLElement = (element, nameOfClass, content) => {
   return document.createElement(element)
            .class(nameOfClass)
            .innerHTML(content);
}

const createProfileCard = (profile) => {
   //Create li container
   let container = document.createElement('li');
   container.className = "student-item cf";

   //Create profile details
   let details = document.createElement('div');
   details.className = "student-details";
   let avatar = document.createElement('img');
   avatar.className = "avatar";
   avatar.src = profile.picture.thumbnail;
   avatar.alt = "Profile Picture";
   let name = document.createElement('h3');
   name.innerHTML = profile.name.first +" " + profile.name.last;
   let email = document.createElement('span');
   email.className = "email";
   details.append(avatar, name, email);

   //Joined details
   let joinedDetails = document.createElement('div');
   let joined = "Joined " + profile.registered.date;
   joinedDetails.append(joined);

   container.append(details, joinedDetails);

   return container;
}

function showPage(pageNumber) {
   let memberList = document.querySelector('.student-list');
   // memberList.innerHTML = "";
   currentPage = pageNumber;
   let start = (pageNumber * itemsPerPage) - itemsPerPage;
   let end = pageNumber * itemsPerPage;

   for ( ; start < end ; start++) {
      const member = data[start];
      memberList.append( createProfileCard(member) );
      // studentList.append(
      //    <li class="student-item cf">
      //       <div class="student-details">
      //          <img class="avatar" src={student.picture.thumbnail} alt="Profile Picture"/>
      //          <h3>{student.name.first} {student.name.last}</h3>
      //          <span class="email">{student.email}</span>
      //       </div>
      //       <div class="joined-details">
      //          <span class="date">Joined {student.registered.date}</span>
      //       </div>
      //    </li>
      // );
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const createButton = (index) => {
   let button = document.createElement('button');
   button.type = "button";
   button.className = index === currentPage ? "active" : "";
   button.innerHTML = index;
   button.addEventListener('click', changePage);
   return button;
}

function createPaginationBar() {
   let pagination = document.querySelector('.link-list');
   let pages = Math.ceil(data.length / itemsPerPage);

   for (let i = 0 ; i < pages ; i++) {
      let li = document.createElement('li');
      li.append( createButton(i + 1) );
      pagination.append(li);
   }
}

// function showPage(pageNumber){
//    console.log("Request page " + pageNumber);
// }

const changePage = e => {
   console.log(e.target.innerHTML);
}

function filterEntries(input) {
   console.log("I have a value " + input)
}

let header = document.querySelector('header');

// header.append(
//    <label for="search" class="student-search">
//       <span>Search by name</span>
//       <input id="search" placeholder="Search bz name..." onChange={() => filterEntries(input.value)}/>
//       <button>
//          <img src="img/icn-search.svg" alt="Search icon" />
//       </button>
//    </label>
// );


// Call functions

createPaginationBar()
showPage(currentPage);



