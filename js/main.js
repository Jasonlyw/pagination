"use strict";

// Global variables
var studentItems = $('.student-item');
var studentSearch ='<div class="student-search"><input id="search" placeholder="Search for students..."><button>Search</button></div>';
var pagination ='<div class="pagination"><ul></ul></div>';
var studentList = pages(studentItems);

// Append Search Button
$('.page-header.cf').append(studentSearch);



// Create an array for each page with a limit of 10 students per page.
function pages(list) {
	var prevList = list.slice();
	var pageArray = [];
	while (prevList.length) {
		pageArray.push(prevList.splice(0,10));
	}
	return pageArray;
}

// Display the first page and hide the rest.
function showPages(pageNumber, pageList) {
  $(".student-list li").hide();
  $.each(pageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          $(listItem).fadeIn('fast');
        });
      }
  });
}

// Append pagination buttons.
function appendButtons(pageList) {
	$('.page').append(pagination);
	var numPages = pageList.length;
	for (var i = 1; i <= numPages; i+=1) {
		var buttons = '<li><a href="#">' + i + '</a></li>';
		$('.pagination ul').append(buttons);
	}
	$('.pagination ul li a').first().addClass('active');

	// Add click event listeners
	  $(".pagination ul li a").on("click", function(e) {
	    var pageSelection = parseInt($(this)[0].text) - 1;
	    showPages(pageSelection, pageList);
	    $(".pagination ul li a").removeClass("active");
	    $(this).addClass("active");
	    event.preventDefault();
	  });
}


// Search function finds both name and/or email. If no results are found, change the header H2 to display No Results, otherwise display default Students title. On firing of the searchList, check input value to see if matches, if there are matches, generate the new student array & display appropriate list of buttons.
function searchList() {
    var searchTerm = $('#search').val().toLowerCase().trim();

        var resultStudents = studentItems.filter(function(i) {
        	var studentEmails = $(this).find('.email').text();
            var studentNames = $(this).find('h3').text();
            if (studentNames.indexOf(searchTerm) > -1 || studentEmails.indexOf(searchTerm) > -1) {
                return true;
            }
            return false;
        });
        if (resultStudents.length === 0 ) {
        	$('.page-header h2').text('Sorry, there are no matches.');
        } else {
        	$('.page-header h2').text('STUDENTS');
        }
        var paginated_students = pages(resultStudents);
        $('.pagination').remove();
        if (resultStudents.length >= 10) {
          appendButtons(paginated_students);
        }
        showPages(0, paginated_students);
}

// Initial state.
appendButtons(studentList);
showPages(0, studentList);

// Event Handlers
$('.student-search').find('button').on('click', searchList);
$('.student-search').find('input').keyup(searchList);
