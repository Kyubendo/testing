function changeDiv(script){
  let test_div = document.getElementById("test");
  test_div.innerHTML += ` --- ${script} was called `;
}
function myAlert(msg) {
  alert(msg);
}
