const url = "https://pokeapi.co/api/v2/pokemon/";
let results = null

async function getPokemon(url) {
  const response = await fetch(url);
  try {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    doStuff(data);
  }
  catch (error) {
    console.error("Error");
  }
}

function doStuff(data) {
    results = data;
    console.log("first: ", results);
    results.results.forEach((pokemon) => {
        const div = document.createElement("div");
        div.textContent = pokemon.name;
        document.querySelector("body").appendChild(div)
    })
}

getPokemon(url);
console.log("second: ", results);