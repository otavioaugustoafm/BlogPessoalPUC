document.getElementById('next').addEventListener('click', function() {
    slide('next');
});

document.getElementById('prev').addEventListener('click', function() {
    slide('prev');
});

function slide(direction) {
    const container = document.querySelector('.carousel-container');
    const active = document.querySelector('.carousel-item.active');
    let newIndex = [...container.children].indexOf(active) + (direction === 'next' ? 1 : -1);
    if (newIndex >= container.children.length) newIndex = 0;
    if (newIndex < 0) newIndex = container.children.length - 1;
    container.style.transform = `translateX(-${newIndex * 100 / container.children.length}%)`;
    active.classList.remove('active');
    container.children[newIndex].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.github.com/users/otavioaugustoafm/repos')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('repo-container');
            data.forEach(repo => {
                const repoEl = document.createElement('div');
                repoEl.className = 'repo';
                repoEl.innerHTML = `
                    <img src="${repo.owner.avatar_url}" alt="${repo.name}">
                    <h3>${repo.name}</h3>
                    <p>${repo.description}</p>
                    <a href="${repo.html_url}" target="_blank">Acessar Repositório</a>
                `;
                container.appendChild(repoEl);
            });
        })
        .catch(error => console.error('Error loading the repositories:', error));
});