const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitButton = form ? form.querySelector('button[type="submit"]') : null;
const modal = document.getElementById('contact-result-modal');
const modalTitle = document.getElementById('contact-result-title');
const modalMessage = document.getElementById('contact-result-message');
const formFields = form ? form.querySelectorAll('input:not([type="hidden"]), textarea, button') : [];
const originalButtonText = submitButton ? submitButton.textContent.trim() : '';
let bootstrapModal = null;

if (modal) {
    bootstrapModal = new bootstrap.Modal(modal);
}

function showStatus(message, type = 'info') {
    if (!status) {
        return;
    }

    status.textContent = message;
    status.className = '';

    if (type === 'success') {
        status.classList.add('success');
    } else if (type === 'error') {
        status.classList.add('error');
    }
}

function showResultModal(title, message) {
    if (!modal || !modalTitle || !modalMessage) {
        return;
    }

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    bootstrapModal?.show();
}

function setLoading(isLoading) {
    if (!submitButton) {
        return;
    }

    submitButton.disabled = isLoading;
    formFields.forEach((field) => {
        field.disabled = isLoading;
    });

    if (isLoading) {
        submitButton.textContent = 'Enviando mensagem...';
    } else {
        submitButton.textContent = originalButtonText;
        formFields.forEach((field) => {
            field.disabled = false;
        });
    }

    if (!isLoading) {
        status.innerHTML = '';
    }
}

async function parseResponse(response) {
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        return response.json();
    }

    const text = await response.text();

    try {
        return JSON.parse(text);
    } catch {
        return { message: text || `Erro ${response.status}` };
    }
}

form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);

    setLoading(true);
    showStatus('', 'info');

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json'
            }
        });

        const result = await parseResponse(response);

        if (response.ok && result.success !== false) {
            showStatus('Mensagem enviada com sucesso!', 'success');
            showResultModal('Mensagem enviada com sucesso', 'A sua mensagem foi enviada com sucesso. Entraremos em contacto brevemente.');
            form.reset();
        } else {
            const errorMessage = result.message || result.error || `Não foi possível enviar a mensagem (${response.status}).`;
            showStatus(errorMessage, 'error');
            showResultModal('Não foi possível enviar a mensagem', `Tente novamente. ${errorMessage}`);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro inesperado.';
        showStatus(`Erro de rede. Verifique a sua ligação e tente novamente. ${errorMessage}`, 'error');
        showResultModal('Não foi possível enviar a mensagem', `Tente novamente. ${errorMessage}`);
    } finally {
        setLoading(false);
    }
});
