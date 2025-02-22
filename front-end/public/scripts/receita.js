document.addEventListener("DOMContentLoaded", fetchRecipes);

async function fetchRecipes(page = 1) {
    try {
        const searchQuery = document.getElementById("search").value;
        const category = document.getElementById("categoryFilter").value;

        const response = await fetch(`http://seu-backend.com/receitas?page=${page}&search=${searchQuery}&category=${category}`);
        const data = await response.json();

        const recipeList = document.getElementById("recipe-list");
        recipeList.innerHTML = "";

        data.receitas.forEach(receita => {
            const card = document.createElement("div");
            card.classList.add("recipe-card");
            card.innerHTML = `
                <h2>${receita.title}</h2>
                <p>${receita.description}</p>
                <button onclick="verDetalhes(${receita.id})">Ver Detalhes</button>
            `;
            recipeList.appendChild(card);
        });

        renderPagination(data.totalPages, page);
    } catch (error) {
        console.error("Erro ao buscar receitas:", error);
    }
}

function verDetalhes(id) {
    window.location.href = `detalhes.html?id=${id}`;
}

function renderPagination(totalPages, currentPage) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.classList.add(i === currentPage ? "active" : "");
        btn.onclick = () => fetchRecipes(i);
        pagination.appendChild(btn);
    }
}
