var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    // document.getElementById("nextBtn").innerHTML = "Submit";
    document.getElementById("nextBtn").style.display = "none";

    document.getElementById("Submit_Btn").style.display = "block";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("nextBtn").style.display = "block";

    document.getElementById("Submit_Btn").style.display = "none";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 ) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

const addButton = document.getElementById("addButton");

$("#taskMath").hide();
$("#taskEng").hide();

$("#subject").change(function () {
  if (
    $("#subject").val() == "Math"
  ) {
    $("#taskMath").show();
    $("#taskEng").hide();
    
  }
  else if ($("#subject").val() == "English") {
    $("#taskMath").hide();
    $("#taskEng").show();
    
  }
  else if ($("#subject").val() == "select") {
    $("#taskMath").hide();
    $("#taskEng").hide();
  }
});
$("#subject").trigger("change");




var arr= [];

addButton.addEventListener("click", (e) => {

  const quesID = Math.floor(Math.random() * 10);
  const ques = document.getElementById("ques").value;
  const option1 = document.getElementById("opt1").value;
  const option2 = document.getElementById("opt2").value;
  const option3 = document.getElementById("opt3").value;
  const option4 = document.getElementById("opt4").value;
  const option5 = document.getElementById("opt5").value;
  const answer = document.getElementById("answer").value;
  const answerExp = document.getElementById("answerExp").value;


arr.push({
  questionID:quesID,
  ques: ques,
  option1: option1,
  option2: option2,
  option3: option3,
  option4: option4,
  option5: option5,
  Answer: answer,
  Explanation : answerExp
});


  var item = JSON.stringify(arr, undefined, 9);
  // console.log(item);
  var area = document.getElementById("area");

  // console.log(ques);

  area.innerHTML = "&nbsp;" + "<br>" + item;

  e.preventDefault();


  document.getElementById("ques").value = "";
  document.getElementById("opt1").value = "";
  document.getElementById("opt2").value = "";
  document.getElementById("opt3").value = "";
  document.getElementById("opt4").value = "";
  document.getElementById("opt5").value = "";
  document.getElementById("answer").value = "";
  document.getElementById("answerExp").value = "";
 var arrayField =  document.getElementById("array").value = item;

  // console.log(arrayField);
  // console.log(grade);
  // console.log(goalName);
  // console.log(taskName);
  // console.log(taskInstructions);
  // console.log(set);




});
