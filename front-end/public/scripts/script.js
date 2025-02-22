// Função para carregar as receitas da API
function loadRecipes() {
    fetch('http://localhost:3000/api/recipes')  // Chama a rota do backend para obter as receitas
        .then(response => response.json())
        .then(data => {
            const recipesList = document.getElementById('recipesList');
            recipesList.innerHTML = '';  // Limpa a lista de receitas

            data.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');
                recipeCard.innerHTML = `
                    <img src="${recipe.imageUrl}" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                `;
                recipesList.appendChild(recipeCard);
            });
        });
}
// Ação para o botão de negrito
document.getElementById('bold-btn').addEventListener('click', function() {
    document.execCommand('bold');
});

// Ação para o botão de itálico
document.getElementById('italic-btn').addEventListener('click', function() {
    document.execCommand('italic');
});

// Ação para o botão de sublinhado
document.getElementById('underline-btn').addEventListener('click', function() {
    document.execCommand('underline');
});

// Função para criar uma nova receita
document.getElementById('createRecipeForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Evita o envio do formulário

    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('image', document.getElementById('image').files[0]);

    // Envia a receita para o backend via POST
    fetch('http://localhost:3000/api/recipes', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadRecipes();  // Recarrega a lista de receitas
    });
});

// Chama a função para carregar as receitas ao carregar a página
loadRecipes();
