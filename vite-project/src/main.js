import "./style.css";

async function getData() {
  try {
    const response = await fetch(
      "https://www.cheapshark.com/api/1.0/games?title=batman"
    );

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();
    renderCards(data);
  } catch (error) {
    console.error(error);
  }
}

function renderCards(games) {
  const container = document.querySelector(".cards");

  games.forEach((game) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
        <h2 class="name">${game.external}</h2>
        <p>Cheapest: $${game.cheapest}</p>
      </div>
      `
    );
  });
}


getData();
