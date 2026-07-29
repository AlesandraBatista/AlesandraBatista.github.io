/*
Formanda: Alesandra Batista
    Linkedin: https://www.linkedin.com/in/alesandranunesbatista/
    Github: https://github.com/alesandrabatista
*/
//window scroll
$(window).on("scroll", function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop >= 100) {
        $('body').addClass('fixed-header');
    } else {
        $('body').removeClass('fixed-header')
    }
});

// Document Ready
$(document).ready(function () {
    //Typing animation
    new Typed('.type-it', {
        strings: ['Designer', 'Developer', 'Creator', 'Freelancer'],
        typeSpeed: 100,
        loop: true
    });

    //One Page Scroll
    $.scrollIt({
        easing: 'linear',
        topOffset: -70
    });

    // Modal de Projeto - preencher com os dados do botão clicado
    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;

            const title = button.getAttribute('data-title') || '';
            const img = button.getAttribute('data-img') || '';
            const tag = button.getAttribute('data-tag') || '';
            const desc = button.getAttribute('data-desc') || '';
            const cliente = button.getAttribute('data-cliente') || '';
            const tipo = button.getAttribute('data-tipo') || '';
            const tecnologias = button.getAttribute('data-tecnologias') || '';
            const link = button.getAttribute('data-link') || '';

            projectModal.querySelector('#projectModalLabel').textContent = title;
            projectModal.querySelector('#projectModalImg').src = img;
            projectModal.querySelector('#projectModalImg').alt = title;
            projectModal.querySelector('#projectModalTag').textContent = tag;
            projectModal.querySelector('#projectModalDesc').textContent = desc;
            projectModal.querySelector('#projectModalCliente').textContent = cliente;
            projectModal.querySelector('#projectModalTipo').textContent = tipo;
            projectModal.querySelector('#projectModalTecnologias').textContent = tecnologias;

            const linkEl = projectModal.querySelector('#projectModalLink');
            if (link) {
                linkEl.href = link;
                linkEl.style.display = 'inline-block';
                linkEl.textContent = 'Ver Projeto';
            } else {
                // ainda não há link/deploy para este projeto
                linkEl.style.display = 'none';
            }
        });
    }
});
