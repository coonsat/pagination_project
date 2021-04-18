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
const itemsPerPage = 20;



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(pageNumber) {
   let studentList = document.querySelector('student-list');
   studentList.innerHTML = "";
   currentPage = pageNumber;
   let start = pageNumer * itemsPerPage;
   let end = (pageNumber + 1) * itemsPerPage;

   for ( ; i < end ; start++) {
      const student = data[start];
      studentList.append(
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src={student.picture.thumbnail} alt="Profile Picture"/>
               <h3>{student.name.first} {student.name.last}</h3>
               <span class="email">{student.email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined {student.registered.date}</span>
            </div>
         </li>
      );
   }

}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/


function createPaginationBar() {
   let pagination = document.querySelector('link-list');
   let pages = (data.length / 2) + 1;

   for (let i = 0 ; i < pages.length ; i++) {
      pagination.append(
         <li>
            <button type="button" 
                    class={i + 1 === currentPage ? "active" : ""}
                    onClick={() => showPage(i + 1)}>
               {i + 1}
            </button>
         </li>
      );
   }

}


// Call functions

