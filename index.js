//Type Writting for the title just for style
const txtAnim=document.querySelector('.title');
var txt = 'To do list';
var i=0;
var speed = 100;

function typeWriter() {
    if (i < txt.length) {
        txtAnim.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, 500);
      }
}
window.onload=typeWriter();


//Declaration des variables à partir du DOM
domTask=document.getElementById("tasks");
domStatut=document.getElementById("statut");
domPriority=document.getElementById("priority");
domEdit=document.getElementById("edit");
domRandom=document.getElementById("random");
domContent=document.querySelector(".random");
domInformation=document.querySelector(".information");
domNew= document.getElementById("new")
domClose=document.querySelector(".bi-x-square")
domAddtion=document.querySelector(".addtionTask")
domSubmit= document.querySelector(".submit")
domNewText= document.getElementById("text")
domNewStatus= document.getElementById("status")
domNewPriority= document.getElementById("number")


// Variables de Tasks Values, Priority
let randomValue=["Faire un carré avec la main gauche et un rond avec la main droite","Faire de la méditation","Éternuer les yeux ouverts"];
let randomStatus="To do";
let randomPriority=0;
let min=0;
let max=randomValue.length-1;

//Event listener 
domRandom.addEventListener("click", randomTask);
domNew.addEventListener("click", newTask)
domClose.addEventListener("click", closeTask)
domSubmit.addEventListener("click", addNewTask)



//Class to simplify our tasks creation
class tasks{
  constructor(value,status,priority){
    this.value=value;
    this.status=status;
    this.priority=priority;
  }
}

// functions for random task
function randomTask(){
  domInformation.style.display='none';//To delete the no task saved notification
  randomInteger();
  addToDomRandom();
}

function addToDomRandom(){
  let generatedTask= new tasks(randomValue[randomnum],randomStatus,randomPriority);
    domContent.innerHTML = domContent.innerHTML+`   
      <div class="headers DOM" id="tasks"> 
          <p>${generatedTask.value}</p>
      </div>
      <div class="headers DOM todo" id="statut"> 
          <span>${generatedTask.status}</span>
      </div>
      <div class="headers DOM" id="priority">
          <span>${generatedTask.priority}</span>
      </div>
      <div class="headers DOM edit" id="edit">
          <i class="bi bi-pencil-square"></i>
      </div>`
}

// Random number generator

function randomInteger() {
    randomnum=Math.floor(Math.random() * (max - min + 1)) + min;
}



//add new task 

function newTask() {
    domAddtion.style.display = "block"
}
function closeTask() {
    domAddtion.style.display = "none"
     
}
function addNewTask() {
   
   let value= domNewText.value 
   let status=domNewStatus.value
   let priority=domNewPriority.value
   theNewTask=new tasks(value,status,priority)
   console.log(theNewTask)

  
}




