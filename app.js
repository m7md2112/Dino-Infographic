// Dino Constructor
function AllDino(dinoData) {
  this.species = dinoData.species;
  this.weight = dinoData.weight;
  this.height = dinoData.height;
  this.diet = dinoData.diet;
  this.where = dinoData.where;
  this.when = dinoData.when;
  this.fact = dinoData.fact;
}

// Dino Objects
const dinos = [];

// get all dino from json file and instantiate it. 
fetch("dino.json")
  .then((res) => res.json())
  .then((dinosData) =>
    dinosData.Dinos.map((dino) => {
      dinos.push(new AllDino(dino));
    })
  );

// Human Object
const human = {};

(function buildHumanObject() {
  const form = document.getElementById("dino-compare");
  form.addEventListener("change", getHumanData);

  function getHumanData() {
    const name = document.getElementById("name").value.toString();
    const feet = document.getElementById("feet").value;
    const inches = document.getElementById("inches").value;
    const height = (feet + "." + inches) * 1;
    const weight = document.getElementById("weight").value * 1;
    const diet = document.getElementById("diet").value;

    human.name = name;
    human.weight = weight;
    human.height = height;
    human.diet = diet;
  }
})();

// Dino Compare weight Method.
AllDino.prototype.compareWeight = function (human) {
  this.fact = `${human.name}'s weight is ${(
    (human.weight / this.weight) *
    100
  ).toFixed(2)}% of ${this.species}.`;
};

// Dino Compare height Method.
AllDino.prototype.compareHeight = function (human) {
  this.fact = `${human.name}'s height is ${(
    (human.height / this.height) *
    100
  ).toFixed(2)}% of ${this.species}.`;
};

// Dino Compare diet Method.
AllDino.prototype.compareDiet = function (human) {
  this.fact = `${human.name} is ${human.diet} and ${this.species} are ${this.diet}.`;
};

// generate random init.
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Get one fact Randomly Method.
function compare(human) {
  for (let dino = 0; dino < dinos.length - 1; dino++) {
    switch (getRandomInt(4)) {
      case 0:
        dinos[dino].compareDiet(human);
        break;
      case 1:
        dinos[dino].compareHeight(human);
        break;
      case 2:
        dinos[dino].compareWeight(human);
        break;
      case 3:
        break;
    }
  }
}

// Generate and Add tiles to DOM for each Dino in Array
function generateTiles(creatures) {
  compare(human);
  const tilesGrid = document.getElementById("grid");
  for (let creature = 0; creature < creatures.length; creature++) {
    if (creature === 4) {
      tilesGrid.insertAdjacentHTML(
        "beforeend",
        `
      <div class="grid-item">
      <h3>${human.name}</h3>
      <img src="/images/human.png" alt="${human.name}">
      </div>
      `
      );
    }
    tilesGrid.insertAdjacentHTML(
      "beforeend",
      `
    <div class="grid-item">
    <h3>${creatures[creature].species}</h3>
    <img src="/images/${creatures[creature].species.toLowerCase()}.png" alt="${
        creatures[creature].species
      }">
    <p>${creatures[creature].fact}</p>
    </div>
    `
    );
  }
}

// Remove form from screen
function removeForm() {
  document.getElementById("dino-compare").remove();
}

// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", function () {
  if (human.name && human.weight && human.height && human.diet) {
    removeForm();
    generateTiles(dinos);
  } else {
    alert("Please fill out all fields");
  }
});
