console.log("--- DETAILS ---");

const api_url = "https://mindhub-xj03.onrender.com/api/amazing";

let data = fetch(api_url)
.then((response) => response.json())
.then(data => {
  let eventos = data.events
  
  let principal = document.getElementById("principal-div");
  const queryString = window.location.search
  const paramsQuery = new URLSearchParams(queryString)
  const idQuery = paramsQuery.get("id")
  const id = eventos.find(eventos => eventos._id == idQuery)

  principal.innerHTML = 
  ` <div class="card card_detail mh-30 m-2" style="">
   <img class="card-img-top card-img_detail" src="${id.image}" alt="img">
   <div class="card-body_detail>
       <h5 class="card-title">${id.name}</h5>
       <p class=" text-detail ">${id.category}</p>
       <p class=" text-detail ">${id.description}</p>
       <p class=" text-detail ">Place: ${id.place}</p>
       <p class=" text-detail ">Capacity: ${id.capacity}</p>
       <p class=" text-detail ">Date: ${id.date}</p>
       <p class="  text-detail">Assistance: ${id.assistance}</p>
       <p class="  text-detail">Estimate: ${id.estimate}</p>
       <p class=" text-detail">Price: ${id.price} $</p>
       <img class="card-img-bottom mb-md-3" style="width: 45px;"
           src="./assets/icons8-boleto-50.png" alt="img">
      
       <a href="./index.html" class="btn btn-card">Back</a>
   </div>
   </div> `

         //return eventos 

})