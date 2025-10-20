const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
//API Added
!async function () {
    
    const apiKey = '0363063badd97c1049612cbbac78bf57';
    
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    let data = await fetch(url, options)
        .then((response)=> response.json())
        .then((result) => {return result})
        .catch((error)=> console.error(error));

        console.log(data);

    
    
    
    
    
        //Sign in
}();

//Sign in/Sign up

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// Event listener for switching to login
document.getElementById('toLogin').addEventListener('click', () => {
  flipContainer.classList.remove('show-signup');
});

class User {
  constructor(fullname,email,password){
    this.fullname = fullname;
    this.email = email;
    this.password = password;
  }
  checkPassword(inputPassword){
    return this.password === inputPassword;
  }
}

var caleb = new User("Caleb Nel", "caleb@openwindow.co.za", "1234", 241025);

console.log(caleb.studentNumber);

class Student extends User{
  constructor(fullname, email, password, studentNumber){
    super(fullname,email,password);
    this.studentNumber = studentNumber;
  }
  checkStudentNumber(){
    return this.studentNumber === studentNumber;
  }
}

class Lecturer extends User{
  constructor(fullname, email, password, amountOfSubjects){
  super(fullname, email, password)
  this.amountOfSubjects = amountOfSubjects;
  }
  checkAmountOfSubjects(){
    return this.amountOfSubjects;
  }
}

var systemUser;
var userType;
var fullname;
var email;
var password;
var studentNumber;
var lecturerSub;

function signup(){
  event.preventDefault();
  userType = document.getElementById("role").Value;
  fullname = document.getElementById("fullName").Value;
  email = document.getElementById("signupEmail").Value;
  password = document.getElementById("signupPassword").Value;
  studentNumber = document.getElementById("studentNum").Value;
  lecturerSub = document.getElementById("lecturerSubjects").Value;

  if(!fullname && !email && !password){
    console.log("Please fill out all the required fields");
    return;
  }

  if(userType === "student"){
    if(!studentNumber){
      console.log("Please enter the student number");
      return;
    }
    systemUser = new Student(fullname , email , password , studentNumber);
    console.log("Signup successful")
  }else if(userType === "lecturer"){
    if(!lecturerSub){
      console.log("Please enter the amount of lecturer subjects");
      return;
    }
    systemUser = new Lecturer(fullname , email , password , lecturerSub);
    console.log("Signup successful")
  }  
}


function login(){
  event.preventDefault();
  let checkEmail = document.getElementById("loginEmail").Value;
  let checkPassword = document.getElementById("loginPassword").Value;

  if(checkEmail === systemUser.email && checkPassword === systemUser.password){
    console.log("Login successful");
    console.log(systemUser.checkEmail());
    console.log(systemUser.checkPassword());
  }
}

