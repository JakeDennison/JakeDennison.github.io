var ftoken = $("#token").val();
var ftid = $("#task-id").val();
var foutcome = $('input[name="outcome"]').val();
const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://eu.nintex.io/workflows/v1/tasks/task-id",
  "method": "PATCH",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": ftoken
  },
  "processData": false,
  "data": "{\n  \"outcome\": \"Approve\"\n}"
};
$('input#submitbtn').click( function() {
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
});