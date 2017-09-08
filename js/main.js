var studentPerPage = 10;
var listStudents = $('.student-list li');
var numStudents = listStudents.length;

function showPage(pageNum, listStudents) {
  listStudents.hide();
  listStudents.each(function(index) {
    if ((index + 1 >= ((pageNum + 1) * 10 - 9)) &&
    (index + 1 <= ((pageNum + 1) * 10))) {
      $(this).show();
    }
  });
}

showPage(0, listStudents);
