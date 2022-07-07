//Declaration des variables à partir du DOM
domTask=document.getElementById("tasks");
domStatut=document.getElementById("statut");
domPriority=document.getElementById("priority");
domRandom=document.getElementById("random");
domContent=document.querySelector(".random");
domInformation=document.querySelector(".information");
domNew= document.getElementById("new");
domClose=document.querySelector(".bi-x-square");
domCloseTwo=document.querySelector(".iconClose");
domAddtion=document.querySelector(".addtionTask");
domSubmit= document.querySelector(".submit");
domNewText= document.getElementById("text");
domNewStatus= document.getElementById("status");
domNewPriority= document.getElementById("number");
domEditer=document.querySelector(".editTask");
domEditedText=document.getElementById('editedText');
domEditedStatus=document.getElementById('editedStatus');
domEditedPriority=document.getElementById('editedPriority');
domSubmitEdit= document.getElementById('edit');

// Variables de Tasks Values, Priority
let randomValue=["Faire un carré avec la main gauche et un rond avec la main droite","Faire de la méditation","Éternuer les yeux ouverts"];
let randomStatus="To do";
let randomPriority=0;
let min=0;
let max=randomValue.length-1;

//Event listener 
domRandom.addEventListener("click", randomTask);
domNew.addEventListener("click", newTask);
domClose.addEventListener("click", closeTask);
domCloseTwo.addEventListener("click", closeTask);
domSubmit.addEventListener("click", addNewTask);
domSubmitEdit.addEventListener("click", editedTask);

//Class to simplify our tasks creation
class tasks{
  constructor(value,status,priority){
    this.value=value;
    this.status=status;
    this.priority=priority;
  }
};

// functions for random task
function randomTask(){
  domInformation.style.display='none';//To delete the no task saved notification
  randomInteger();
  addToDomRandom();
}
let generatedTask=[""];
let index=0;
let unknownID;

//Functions to add to DOM the tasks
function addToDomRandom(){
    generatedTask[index]= new tasks(randomValue[randomnum],randomStatus,randomPriority);
    domContent.innerHTML = domContent.innerHTML+`   
      <div class="headers DOM" id="tasks"> 
          <p>${generatedTask[index].value}</p>
      </div>
      <div class="headers DOM todo" id="statut"> 
          <span>${generatedTask[index].status}</span>
      </div>
      <div class="headers DOM" id="priority">
          <span>${generatedTask[index].priority}</span>
      </div>
      <div class="headers DOM">
          <i id="edit${index}" class="edit bi bi-pencil-square"></i>
      </div>`
      domEdit=document.querySelectorAll(".edit");
      for(let i=0;i<domEdit.length;i++){
          domEdit[i].addEventListener("click", editTask);
          domEdit[i].addEventListener("click", function(){
            unknownID=domEdit[i].id;
            unknownID=unknownID.split("t");
            unknownID=unknownID[1];
            domEditedText.placeholder=generatedTask[unknownID].value;
            domEditedPriority.value=generatedTask[unknownID].priority;
          });
      }
      index++;
}

function addToDom(){
  domInformation.style.display='none';
  let value= domNewText.value ;
  let status=domNewStatus.value;
  let priority=domNewPriority.value;
  let theNewTask=new tasks(value,status,priority);
  domContent.innerHTML = domContent.innerHTML+`   
    <div class="headers DOM" id="tasks"> 
        <p>${theNewTask.value}</p>
    </div>
    <div class="headers DOM todo" id="statut"> 
        <span>${theNewTask.status}</span>
    </div>
    <div class="headers DOM" id="priority">
        <span>${theNewTask.priority}</span>
    </div>
    <div class="headers DOM edit" id="edit">
        <i class="bi bi-pencil-square"></i>
    </div>`
    domEdit=document.querySelector(".edit");
    domEdit.addEventListener("click", editTask);
}

// Random number generator
function randomInteger() {
    randomnum=Math.floor(Math.random() * (max - min + 1)) + min;
}

// Add a new task 
function newTask() {
    domAddtion.style.display = "block";
}
function closeTask() {
    domAddtion.style.display = "none";  
    domEditer.style.display = "none";
}
function addNewTask() {
   
   let value= domNewText.value 
   let status=domNewStatus.value
   let priority=domNewPriority.value
   theNewTask=new tasks(value,status,priority)
   console.log(theNewTask)

  
}
// Edit tasks
function editTask(){
  domEditer.style.display='block';  
}
function editedTask(){
  domEditer.style.display='none';
    generatedTask[unknownID].value=domEditedText.value;
    generatedTask[unknownID].status=domEditedStatus.value;
    generatedTask[unknownID].priority=domEditedPriority.value;
  domContent.innerHTML=``;
    for(let i=0;i<index;i++){
      domContent.innerHTML = domContent.innerHTML+`
      <div class="headers DOM" id="tasks"> 
          <p>${generatedTask[i].value}</p>
      </div>
      <div class="headers DOM todo" id="statut"> 
          <span>${generatedTask[i].status}</span>
      </div>
      <div class="headers DOM" id="priority">
          <span>${generatedTask[i].priority}</span>
      </div>
      <div class="headers DOM">
          <i id="edit${i}" class="edit bi bi-pencil-square"></i>
      </div>`
      
    }
}

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



