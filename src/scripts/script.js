document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const prevButton = carousel.querySelector('.carousel-control-prev');
        const nextButton = carousel.querySelector('.carousel-control-next');
        const items = carousel.querySelectorAll('.carousel-item');
        let currentIndex = 0;

        if (items.length <= 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }

        function updateCarousel() {
            items.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
        }

        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = items.length - 1;
            }
            updateCarousel();
        });

        nextButton.addEventListener('click', function() {
            if (currentIndex < items.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        });

        updateCarousel();
    });
});

async function toggleCurtida(cd_publicacao) {
    try {
        const response = await fetch(`/curtir/${cd_publicacao}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        alert(data.message);
        updateCurtidaButton(cd_publicacao);
    } catch (error) {
        console.error('Erro ao curtir/descurtir a publicação:', error);
    }
}

function updateCurtidaButton(cd_publicacao) {
    const button = document.getElementById(`curtida-btn-${cd_publicacao}`);
    if (button) {
        button.textContent = button.textContent === 'Curtir' ? 'Descurtir' : 'Curtir';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const publicacoesContainer = document.getElementById('publicacoes');
    const publicacoes = [
        { cd_publicacao: 1, conteudo: 'Publicação 1' },
        { cd_publicacao: 2, conteudo: 'Publicação 2' },
        { cd_publicacao: 3, conteudo: 'Publicação 3' }
    ];

    publicacoes.forEach(pub => {
        const publiDiv = document.createElement('div');
        publiDiv.classList.add('publicacao-completa');
        publiDiv.innerHTML = `
            <p>${pub.conteudo}</p>
            <button id="curtida-btn-${pub.cd_publicacao}" onclick="toggleCurtida(${pub.cd_publicacao})">Curtir</button>
        `;
        publicacoesContainer.appendChild(publiDiv);
    });
});
