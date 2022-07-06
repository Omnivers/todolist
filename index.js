//Type Writting for the title
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
