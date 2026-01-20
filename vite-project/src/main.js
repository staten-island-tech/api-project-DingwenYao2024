import "./style.css";

const input = document.querySelector("input[type='search']");
const container = document.querySelector(".cards");


async function getData(query) {
  try {
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(
        query
      )}`
    );

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();
    renderCards(data);
  } catch (error) {
    console.error("Fetch failed:", error);
    container.innerHTML = `<p class="error">Error loading data. Try again later.</p>`;
  }
}

function renderCards(games) {
  container.innerHTML = ""; 

  if (!games || games.length === 0) {
    container.innerHTML = `<p>No games found.</p>`;
    return;
  }

  games.forEach((game) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
        <img 
          src="${game.thumb}" 
          alt="${game.external} thumbnail" 
          class="game-thumb"
        />
        <h2 class="name">${game.external}</h2>
        <p class="price">Cheapest: $${game.cheapest}</p>
        <a href="https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}" 
           target="_blank" class="deal-link">
          View Deal
        </a>
      </div>
      `
    );
  });
}

let timeout;
input.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    getData(input.value);
  }, 300);
});

getData("batman");
