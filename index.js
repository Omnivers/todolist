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
domRemove= document.getElementById("remove");
domFilter= document.getElementById("filter");

// Variables

  //Variables pour le random generator
  let randomValue=["Faire un carré avec la main gauche et un rond avec la main droite","Faire de la méditation","Éternuer les yeux ouverts"];
  let randomStatus="To do";
  let randomPriority=0;
  let min=0;
  let max=randomValue.length-1;
  //Variables pour les tasks
  let generatedTask=[""];
  let index=0;
  let unknownID; //Pour identifier les IDS qu'on veut edit en event listenner 

//Events listeners
domRandom.addEventListener("click", randomTask);
domNew.addEventListener("click", newTask);
domClose.addEventListener("click", closeTask);
domCloseTwo.addEventListener("click", closeTask);
domSubmit.addEventListener("click", addNewTask);
domSubmitEdit.addEventListener("click", editedTask);
domRemove.addEventListener("click", remove);

//Class to simplify our tasks creation
class tasks{
  constructor(value,status,priority){
    this.value=value;
    this.status=status;
    this.priority=priority;
  }
};

//Function for random task
function randomTask(){
  domInformation.style.display='none';//To delete the no task saved notification
  randomInteger();
  addToDomRandom();
}


//Functions to add to DOM the tasks
function addToDomRandom(){
    generatedTask[index]= new tasks(randomValue[randomnum],randomStatus,randomPriority);
    domInnerHtml(generatedTask,index);
    index++;
}

function addToDom(){
  domInformation.style.display='none';
  let value= domNewText.value ;
  let status=domNewStatus.value;
  let priority=domNewPriority.value;
  generatedTask[index]= new tasks(value,status,priority)
  domInnerHtml(generatedTask,index);
  index++;
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
  addToDom();
  closeTask();
}

// Edit tasks
function editTask(){
  domEditer.style.display='block';  
}
function editedTask(){
  domEditer.style.display='none';
    if(domEditedText.value === ''){
      generatedTask[unknownID].value=generatedTask[unknownID].value;
    }
    else{
      generatedTask[unknownID].value=domEditedText.value;
    }
    generatedTask[unknownID].status=domEditedStatus.value;
    generatedTask[unknownID].priority=domEditedPriority.value;
    domContent.innerHTML=``;
  domInnerHtmlEdited();
}

// Remove task
function remove(){
  domEditer.style.display='none';
  generatedTask.splice(unknownID,unknownID);
  index--;
  domInnerHtmlEdited();
    if(index===0){
      domInformation.style.display='block';
    }
}

// Filter the DOM
function Filter(){
  let done=[];
  let todo=[];
  let doing=[];
  let filtredGeneratedTask= generatedTask.filter(function(filter){
    if(domFilter.value === "All"){
      domContent.innerHTML=``
      for(let i=0;i<generatedTask.length;i++){
        domInnerHtmlEdited();
      } 
    }
    else if(domFilter.value ==="Done" && filter.status==="Done"){
      domContent.innerHTML=``
      done.push(filter);
      for(let i=0;i<done.length;i++){
        domInnerHtml(done,i)
      }
    }
    else if(domFilter.value ==="To do" && filter.status ==="To do") {
      domContent.innerHTML=``
      todo.push(filter);
      for(let i=0;i<todo.length;i++){
        domInnerHtml(todo,i)
      }
    }
    else if(domFilter.value ==="Doing" && filter.status === "Doing"){
      domContent.innerHTML=``
      doing.push(filter);
      for(let i=0;i<doing.length;i++){
        domInnerHtml(doing,i)
      }
    }
  })
}

//Function for innerHTML
function domInnerHtml(parameter,index){
  domContent.innerHTML = domContent.innerHTML+`   
  <div class="headers DOM" id="tasks"> 
      <p>${parameter[index].value}</p>
  </div>
  <div class="headers DOM todo" id="statut"> 
      <span>${parameter[index].status}</span>
  </div>
  <div class="headers DOM" id="priority">
      <span>${parameter[index].priority}</span>
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
        domEditedText.placeholder=parameter[unknownID].value;
        domEditedPriority.value=parameter[unknownID].priority;
      });
  }
}
function domInnerHtmlEdited(){
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
