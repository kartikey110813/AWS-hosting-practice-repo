
const subBtn = document.getElementById('parentSubmit');

subBtn.addEventListener('click',sendData);

function sendData() {
    const showing_student = document.getElementById('showing_student');
    const usernameStudent = document.getElementById('name').value;
    const passwordStudent = document.getElementById('password').value;
    const confirmPasswordStudent = document.getElementById('confirmPassword').value;
    const studentFirstName = document.getElementById('studentFirstName').value;
    const studentLastName = document.getElementById('studentLastName').value;
    const idparents = document.getElementById('idparents').value;
    const data = {
        usernameStudent,passwordStudent,confirmPasswordStudent,studentFirstName,studentLastName,idparents
    }
    fetch('http://localhost:3000/parentprofile',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    } )
    .then(response => response.text()) 
    .then(data => {
        fetch('http://localhost:3000/parentprofile/showstudent')
        .then((res) => res.json())
        .then((data) => {
          showing_student.innerHTML = data;
        })
        .catch(err=> console.error(err))
    })
    .catch(err => console.log(err))
}

const submitParentSelect = document.getElementById('submitParentSelect');

submitParentSelect.addEventListener('click',addData);

const addData = () => {
         const selectGrade = document.getElementById('selectGrade').value;
         const selectGoal = document.getElementById('selectGoal').value;
         const selectHour = document.getElementById('selectHour').value;
         const date = document.getElementById('date').value;
         const idStudent = document.getElementById('idStudent').value;

         const data2 = {
             selectGoal,selectGrade,selectHour,date,idStudent
         }

         fetch('http://localhost:3000/parentprofile/managegoals/',{
             method:'POST',
             body:JSON.stringify(data2),
             headers: {"Content-type": "application/json;charset=UTF-8"}
             
         })
         .then(response => response.json())
         .catch(err => alert(err))

}