/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
let currentPage = 1; // set default start page to 1
const itemsPerPage = 9; // as per requirement, items per page is 9
let filteredList = []; // Will be used for filtering the data array

// Reusable methods

   //Used to determine if a filter exists in the input tag
   //If the list has been filtered then the filtered list is returned
   //If not then send back the original data. 
const fetchStudentList = () => {
   return filteredList.length > 0 ? filteredList : data;
}

   //Removes all child nodes from a parent node
const removeAllChildNodes = parent => {
   while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
   }
}

   //Dynamically creates DOM elements according to parameters
const createDocumentElement = (elementName, property, content) => {
   const element = document.createElement(elementName);
   element[property] = content;
   return element;
}

   //Adds extra attributes to image DOM elements
const editImageAttributes = (imgObject, source, altText) => {
   imgObject.src = source;
   imgObject.alt = altText;
   return imgObject;
}

   //Calculates the number of pages to be shown according to 
   //full or filtered data list
const numberOfPages = (array, perPage) => {
   return Math.ceil(array.length / perPage);
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

//Creates the profile card for each student in the array
const createProfileCard = (profile) => {

   //Create container for profile
   const container = createDocumentElement('li', 'className', 'student-item cf');
   
   //Create profile details
   const details =   createDocumentElement('div', 'className', 'student-details');
   const avatar =    createDocumentElement('img', 'className', 'avatar');
   editImageAttributes(avatar, profile.picture.thumbnail, 'Profile Picture')
   const name =      createDocumentElement('h3', 'textContent',  profile.name.first +" " + profile.name.last);
   const email =     createDocumentElement('span', 'className', 'email');
   details.append(avatar, name, email);

   //Create joined details
   const joinCon =   createDocumentElement('div', 'className', 'joined-details');
   const joined =    createDocumentElement('span', 'className', 'date');
   joined.textContent = `Joined ${profile.registered.date}`;
   joinCon.append(joined);

   //Consolidate all html tags
   container.append(details, joinCon);

   return container;
}


function showPage(pageNumber, studentList) {
   let memberList = document.querySelector('.student-list');
   removeAllChildNodes(memberList);
   currentPage = pageNumber;
   let start = (pageNumber * itemsPerPage) - itemsPerPage;
   let end = pageNumber * itemsPerPage;

   if (studentList.length > 0) {
      for ( ; start < end ; start++) {
         const member = studentList[start];
         if (member) memberList.append( createProfileCard(member) );
      }
   } else {
      let noResults = createDocumentElement('span', 'textContent', 'No results');
      memberList.append(noResults);
   }

}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

//function that is responsible for changing the page (where applicable)
const changePage = e => {
   showPage( parseInt(e.target.innerHTML), fetchStudentList() );
   createPaginationBar( numberOfPages(fetchStudentList(), itemsPerPage) );
}

//Active class allocated only if current page match the index
//in the loop of the calling function. The current page is set
//in showpage()
const createButton = (index) => {
   const button = createDocumentElement('button', 'type', 'button');
   button.className = index === currentPage ? "active" : "";
   button.innerHTML = index;
   button.addEventListener('click', changePage);
   return button;
}

//DOM selector used to retrieve pagination and then clear out
//any children nodes. Once cleared, new nodes are added. 
function createPaginationBar(pages) {
   const pagination = document.querySelector('.link-list');
   removeAllChildNodes(pagination);

   for (let index = 0 ; index < pages ; index++) {
      let li = document.createElement('li');
      li.append( createButton(index + 1) );
      pagination.append(li);
   }
}

//The name of the student and the input entered is first 
//concatenated and then evaluated using the .includes(method) 
//Every change in the input box clears out the filteredList
//declared in the script above. 
const filterEntries = value => {
   filteredList = [];
   for (let i = 0 ; i < data.length ; i++) {
      studentName = data[i].name.first + " " + data[i].name.last;
      if (studentName.toLowerCase().includes(value.toLowerCase())) {
         filteredList.push(data[i]);
      }
   }
   showPage(1, filteredList);
   createPaginationBar( numberOfPages( filteredList, itemsPerPage) );
}

//Render search bar
const createSearchBar = () => {
   
   let header = document.querySelector('header');

   const label =     createDocumentElement('label', 'for', 'search');
   label.className = "student-search";
   const phText =    createDocumentElement('span', 'innerHTML', 'Search by name');
   const input =     createDocumentElement('input', 'placeholder', 'Search by name');
   input.addEventListener('input', () => filterEntries(input.value));

   const button =    createDocumentElement('button', '', '');
   const search =    createDocumentElement('img', '', '');
   editImageAttributes(search, 'img/icn-search.svg', 'Search icon')
   button.append(search);

   label.append(phText, input, button);
   header.append(label);
};

// Call functions
createSearchBar();
createPaginationBar( numberOfPages( data, itemsPerPage) );
showPage(currentPage, data);