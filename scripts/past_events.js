
let principal = document.getElementById("principal-div-past");
const checkContainer = document.getElementById("filter-div");

//MAIN JS
fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then (data => {
 let arrayData = data.events;
 let dDate = data.currentDate;
  
 showPastCards(arrayData);
crearCheckboxes(arrayData)


const input = document.querySelector("input");
const bar = document.getElementById("search");
input.addEventListener('change',superFiltro)
checkContainer.addEventListener("change",superFiltro);

function superFiltro(){
  let primerFiltro = filtrarPorTexto(arrayData,bar.value)
  let segundoFiltro = categoryFilter(primerFiltro)
  
  principal.innerHTML=" ";
  showPastCards(segundoFiltro)
}


function crearCheckboxes(array){
  let arrayFiltered = array.map(elemento => elemento.category)
  
  let setFiltred = new Set(arrayFiltered.sort((a,b)=>{
      if(a<b){
          return -1
      }
      if(a>b){
          return 1
      }
      return 0
  }))

  let checks = ''
 setFiltred.forEach(element => {
  checks += `<div class="input-group-text h-1">
  <input id="${element}" class="form-check-input mt-0" type="checkbox" value="${element}" aria-label="${element}">
  <label for="${element}">${element}</label>
  </div> `//id elemento , label forr"elemento" value"elemento"  
 })
 let bar = `<div class="form-control d-flex justify-content-center align-items-center text-top">
 <input type="text" class="form-control" id="search" placeholder="Search">
 <label class=" " for="floatingInput"></label>
</div>`
 checkContainer.innerHTML = checks + bar;
}


 //Mostrar todas las tarjetas
 function showPastCards(data) {
  let principal = document.getElementById("principal-div-past");
  let list = "";
    for (const id of data) {
      if (dDate > id.date ){
        list +=  ` <div class="card mh-30 m-2" style="width: 18rem;">
   <img class="card-img-top card-img" src="${id.image}" alt="img">
   <div class="card-body">
       <h5 class="card-title">${id.name}</h5>
       <p class="card-text ">${id.description}</p>
       <img class="card-img-bottom mb-md-3" style="width: 45px;"
           src="./assets/icons8-boleto-50.png" alt="img">
      
           <a href="./details.html?id=${id._id}" class="btn btn-card">Details</a>
   </div>
   </div> `;
      }     
    };
  principal.innerHTML += list;
}

//showPastCards(data);


function filtrarPorTexto(array, texto){
  let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayFiltrado
}

function categoryFilter(array){
  let checkboxes = Array.from(document.querySelectorAll("input[type='checkbox']"))  //selecc los checks
  let checksTrue = checkboxes.filter(check => check.checked) //filtra los ON
  
  if(checksTrue.length == 0){
    return array
}
let categ = checksTrue.map(check => check.value)
  let arrayFiltred = array.filter(elemento => categ.includes(elemento.category))
  return arrayFiltred
  }

})