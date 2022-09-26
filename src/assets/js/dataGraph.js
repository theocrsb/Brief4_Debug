// debut initialisation de la courbe
let datapoints = [1200, 450, 25, 15, 1800];
const DATA_COUNT = datapoints.length;
const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
  labels.push(i.toString());
}

const data = {
  labels: labels,
  datasets: [
    {
      label: "Compte", // nom de chaque point de la courbe
      data: datapoints, // tableau de point qui evolue avec les montant
      borderColor: "purple", // couleur courbe
      fill: true, // colore le dessous de la courbe
      cubicInterpolationMode: "monotone", // arrondi la courbe
    },
  ],
};
// fin initialisation de la courbe

// debut block config
const config = {
  type: "line",
  data: data,
  options: {
    elements: {
      point: {
        radius: 0, // gere les cercles des points en donnant un rayon
      },
    },
    responsive: true,
    plugins: {
      legend: false,
      // title: {
      // display: true,
      //     text: "Chart.js Line Chart - Cubic interpolation mode",
      // },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  },
};
console.log(config);
/*Le contexte du canevas HTML */
let context = document.getElementById("myChart").getContext("2d");
console.log(context);
/* Création du graphique */
let chart = new Chart(context, config);
console.log(chart);

// mon code :

// let btnallOpe = document.getElementById("allOperation");
// let btncreditOpe = document.getElementById("creditOp");
// let btndebitOpe = document.getElementById("debitOp");
// let debitOpeValue = document.querySelectorAll(".credit");
// let creditOpeValue = document.querySelectorAll(".debit");
// let listeBtn = document.querySelectorAll("a");

// function removeClasslist() {
//   btnallOpe.classList.remove("active");
//   btncreditOpe.classList.remove("active");
//   btndebitOpe.classList.remove("active");
// }

// btncreditOpe.addEventListener("click", () => {
//   removeClasslist();
//   btncreditOpe.classList.add("active");
//   debitOpeValue.forEach((element) => (element.style.display = "block"));
//   creditOpeValue.forEach((element) => (element.style.display = "none"));
//   listeBtn.forEach((element) => (element.style.display = "block"));
// });
// btndebitOpe.addEventListener("click", () => {
//   removeClasslist();
//   btndebitOpe.classList.add("active");
//   creditOpeValue.forEach((element) => (element.style.display = "block"));
//   debitOpeValue.forEach((element) => (element.style.display = "none"));
//   listeBtn.forEach((element) => (element.style.display = "block"));
// });
// btnallOpe.addEventListener("click", () => {
//   removeClasslist();
//   btnallOpe.classList.add("active");
//   creditOpeValue.forEach((element) => (element.style.display = "block"));
//   debitOpeValue.forEach((element) => (element.style.display = "block"));
//    listeBtn.forEach((element) => (element.style.display = "block"));
// });

let ajout = document.querySelector(".btSubmit");
ajout.addEventListener("click", (e) => {
  // let Allope = document.querySelectorAll(".operation");
  let grid = document.getElementById("TrueContainer");
  let montantAjout = document.getElementById("montant");
  let titreAjout = document.getElementById("titre");
  let descAjout = document.getElementById("desc");
  let ValuemontantAjout = montantAjout.value;
  let ValuetitreAjout = titreAjout.value;
  let ValuedescAjout = descAjout.value;
  let ChoixPlusMoins = document.getElementById("operator");
  let ChoixPlusMoinsValue;
  console.log(ValuemontantAjout);
  e.preventDefault();
  const initialValue = parseInt(ValuemontantAjout);

  let sumWithInitial = datapoints.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  let solde = document.getElementById("solde");
  solde.innerHTML = `${sumWithInitial}€`;

  // console.log(sumWithInitial);
  // typeof ValuemontantAjout;

  ChoixPlusMoinsValue = ChoixPlusMoins.value;
  if (ChoixPlusMoinsValue == "credit") {
    addValue();
    return (grid.innerHTML += `
    <div class="operation credit">
       <div class="grid-x grid-padding-x align-middle">
         <div class="cell shrink">
           <div class="picto">
             <img src="./assets/images/sac-dargent.png" alt="credit" />
           </div>
         </div>
         <div class="cell auto">
           <div>
           <h2>${ValuetitreAjout}</h2>
           <small>${ValuedescAjout}</small>
           </div>
         </div>
         <div class="cell small-3 text-right">
           <div>
           <p class="count">${ValuemontantAjout}€</p>
             <small>100%</small>
           </div>
         </div>
       </div>`);
  } else if (ChoixPlusMoinsValue == "debit") {
    // let x = ValuemontantAjout;
    // let result = -Math.abs(x);
    addValue();
    return (grid.innerHTML += `
    <div class="operation debit">
          <div class="grid-x grid-padding-x align-middle">
            <div class="cell shrink">
              <div class="picto">
                <img src="./assets/images/depenses.png" alt="debit" />
              </div>
            </div>
            <div class="cell auto">
              <div>
                <h2>${ValuetitreAjout}</h2>
                <small>${ValuedescAjout}</small>
              </div>
            </div>
            <div class="cell small-3 text-right">
              <div>
                <p class="count">${ValuemontantAjout}€</p>
                <small>37.5%</small>
              </div>
            </div>
           </div>
        </div>`);
  } else {
    return alert("veuillez choisir + ou - ");
  }
  // ValuetitreAjout
  function addValue() {
    /* Ajoute la valeur en X */
    config.data.labels.push(labels.length + 1);
    console.log(ValuemontantAjout);
    /* Ajoute la valeur */
    config.data.datasets[0].data.push(parseInt(ValuemontantAjout));
    /* Rafraichir le graphique */
    chart.update();
  }
});

let btnallOpe = document.getElementById("allOperation");
let btncreditOpe = document.getElementById("creditOp");
let btndebitOpe = document.getElementById("debitOp");
let debitOpeValue = document.querySelectorAll(".credit");
let creditOpeValue = document.querySelectorAll(".debit");
let listeBtn = document.querySelectorAll("a");

function removeClasslist() {
  btnallOpe.classList.remove("active");
  btncreditOpe.classList.remove("active");
  btndebitOpe.classList.remove("active");
}

btncreditOpe.addEventListener("click", () => {
  removeClasslist();
  btncreditOpe.classList.add("active");
  debitOpeValue.forEach((element) => (element.style.display = "block"));
  creditOpeValue.forEach((element) => (element.style.display = "none"));
  listeBtn.forEach((element) => (element.style.display = "block"));
});
btndebitOpe.addEventListener("click", () => {
  removeClasslist();
  btndebitOpe.classList.add("active");
  creditOpeValue.forEach((element) => (element.style.display = "block"));
  debitOpeValue.forEach((element) => (element.style.display = "none"));
  listeBtn.forEach((element) => (element.style.display = "block"));
});
btnallOpe.addEventListener("click", () => {
  removeClasslist();
  btnallOpe.classList.add("active");
  creditOpeValue.forEach((element) => (element.style.display = "block"));
  debitOpeValue.forEach((element) => (element.style.display = "block"));
  listeBtn.forEach((element) => (element.style.display = "block"));
});
