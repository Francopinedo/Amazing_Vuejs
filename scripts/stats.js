console.log("--- DETAILS ---");
const api_url = "https://mindhub-xj03.onrender.com/api/amazing";
const table1 = document.getElementById("Table1");
const table2 = document.getElementById("Table2");
const table3 = document.getElementById("Table3");

// async function getData(api_url) {
//   try {
//     const response = await fetch(api_url);
//     const data = await response.json();
//     arrayData = data.events;
//     return data.events;
//   } catch (error) {
//     console.log(error);
//   }
// }
// getData(api_url);

// let data = fetch(api_url)
// .then(response => response.json())
// .then (data => {
//  let arrayData = data.event
//showTable(arrayData);

let arrayData;
fetch(api_url)
  .then((response) => response.json())
  .then((data) => {
    arrayData = data.events;

    function highestAtttendance(arrayData) {
      let high = 0;
      let name = "";
      let p = 0;
      arrayData.forEach((element) => {
        p = (element.assistance / element.capacity) * 100;
        if (p > high) {
          high = p;
          name = element.name;
        }
      });
      console.log("High Attendance : " + high + "% -- NAME " + name);
      return name + " : " + high + "% ";
    }

    function lowestAtttendance(arrayData) {
      let low = 1000;
      let name = "";
      let p = 0;
      arrayData.forEach((element) => {
        p = (element.assistance / element.capacity) * 100;
        if (p < low) {
          low = p;
          name = element.name;
        }
      });
      console.log("Low Attendance : " + low + "% -- NAME " + name);
      return name + " : " + low + "%  ";
    }

    function largerCapacity(arrayData) {
      let larger = 0;
      let name = "";
      arrayData.forEach((element) => {
        if (element.capacity > larger) {
          larger = element.capacity;
          name = element.name;
        }
      });
      console.log("Larger Capacity : " + larger + "spectators -- NAME " + name);
      return name + " :" + larger + " spectators ";
    }

    function statsByCategory_Upcoming(array, data) {
      let arrayFiltered = array.map((elemento) => elemento.category);
      let setFiltred = new Set(
        arrayFiltered.sort((a, b) => {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        })
      );

      let total = 0;
      let cont = 0;
      let totalCapacity = 0;
      let totalAssistence = 0;
      let assistanceCategory = 0;
      let t2;
      setFiltred.forEach((element) => {
        array.forEach((e) => {

          if (data.currentDate < e.date) {
            if (element == e.category) {
              total = e.price * e.estimate;
              cont += 1;
              totalAssistence += e.estimate;
              totalCapacity += e.capacity;

              //table

            }
          }
        });
        assistanceCategory = (totalAssistence / totalCapacity) * 100

        t2 += `<tr>
        <td scope="row">${element}</td>
        <td>${total}</td> 
        <td>${assistanceCategory} %</td> 
        </tr>`;

        totalCapacity = 0;
        totalAssistence = 0;
        total = 0;
        cont = 0;
      });
      //showTable
      table2.innerHTML = t2;
    }

    function statsByCategory_Past(array, data) {
      let arrayFiltered = array.map((elemento) => elemento.category);
      let setFiltred = new Set(
        arrayFiltered.sort((a, b) => {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        })
      );

      let total = 0;
      let totalCapacity = 0;
      let totalAssistence = 0;
      let assistanceCategory = 0;
      let t3;
      setFiltred.forEach((element) => {
        array.forEach((e) => {

          if (data.currentDate > e.date) {
            if (element == e.category) {
              total = e.price * e.assistance;
              totalAssistence += e.assistance;
              totalCapacity += e.capacity;
            }
          }
        });
        assistanceCategory = (totalAssistence / totalCapacity) * 100


        t3 += `<tr>
        <td scope="row">${element}</td>
        <td>${total}</td> 
        <td>${assistanceCategory} %</td> 
        </tr>`;

        totalCapacity = 0;
        totalAssistence = 0;
        total = 0;

      });
      //showTable
      table3.innerHTML = t3;
    }

    function showTable1(d1, d2, d3) {
      table1.innerHTML = `<tr>
    <td scope="row">${d2}</td>
    <td>${d3}</td> 
    <td>${d1}</td> 
    </tr>`;
    }

    //t1
    showTable1(
      largerCapacity(arrayData),
      highestAtttendance(arrayData),
      lowestAtttendance(arrayData)
    );

    //t2 stat futuros
    statsByCategory_Upcoming(arrayData, data);

    //t3 stat pasados
    statsByCategory_Past(arrayData, data)
  });
