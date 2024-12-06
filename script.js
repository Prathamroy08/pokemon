document.getElementById("btn").addEventListener('click', fetchPokemon);

function fetchPokemon() {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Pokémon not found');
            }
            return res.json();
        })
        .then((data) => {
            document.getElementById("pokemonNotFound").style.display = "none";
            document.getElementById("pokemon").style.display = "block";
            printPokemon(data);
        })
        .catch((err) => {
            console.error("Error fetching Pokémon data:", err);
            document.getElementById("pokemonNotFound").style.display = "block";
            document.getElementById("pokemon").style.display = "none";
        });
}

function printPokemon(data) {
    const pokemonDiv = document.getElementById("pokemon");
    pokemonDiv.innerHTML = `
        <h3>${data.name.toUpperCase()}</h3>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Type(s):</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
        <p><strong>Height:</strong> ${data.height / 10} m</p>
        <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
        <img src="${data.sprites.front_default}" alt="${data.name}" style="width:100px; border-radius:50%; border: 2px solid #333;">
    `;
}