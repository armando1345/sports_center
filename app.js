document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    const hero = document.getElementById('hero-content');
    const underline = document.getElementById('underline-path');
    const storyImage = document.getElementById('story-image');

    if (hero) {
        setTimeout(() => {
            hero.classList.remove('opacity-0');
            hero.classList.add('animate-fade-in-up');
        }, 100);
    }

    if (underline) {
        setTimeout(() => {
            underline.classList.add('animate-draw');
        }, 600);
    }

    if (storyImage) {
        setTimeout(() => {
            storyImage.classList.add('reveal-color-active');
        }, 500);
    }

    initFundraiserProgress();
});

// Barra de progreso de lectura
window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = totalScroll / windowHeight;

    const progress = document.getElementById('scroll-progress');
    if (progress) progress.style.width = `${scrollPercent * 100}%`;
});

function initFundraiserProgress() {
    const fundraiserSection = document.getElementById('fundraiser');
    if (!fundraiserSection) return;

    const goalRaw = Number(fundraiserSection.dataset.goal);
    const raisedRaw = Number(fundraiserSection.dataset.raised);

    const goal = Number.isFinite(goalRaw) && goalRaw > 0 ? goalRaw : 400000;
    const raised = Number.isFinite(raisedRaw) && raisedRaw >= 0 ? raisedRaw : 0;
    const remaining = Math.max(0, goal - raised);
    const percent = goal > 0 ? Math.min(100, Math.max(0, (raised / goal) * 100)) : 0;

    const percentEl = document.getElementById('fundraiser-percent');
    const raisedEl = document.getElementById('fundraiser-raised');
    const goalEl = document.getElementById('fundraiser-goal');
    const remainingEl = document.getElementById('fundraiser-remaining');
    const barEl = document.getElementById('fundraiser-bar');
    const progressEl = fundraiserSection.querySelector('[role="progressbar"]');

    const formatAmount = (value) => {
        const formatter = new Intl.NumberFormat('es-CR', { maximumFractionDigits: 0 });
        return formatter.format(value).replace(/\u00A0/g, ' ');
    };

    if (percentEl) percentEl.textContent = String(Math.round(percent));
    if (raisedEl) raisedEl.textContent = formatAmount(raised);
    if (goalEl) goalEl.textContent = formatAmount(goal);
    if (remainingEl) remainingEl.textContent = formatAmount(remaining);

    if (progressEl) progressEl.setAttribute('aria-valuenow', String(Math.round(percent)));
    if (barEl) requestAnimationFrame(() => (barEl.style.width = `${percent}%`));
}

// Modales
const modalDonation = document.getElementById('modal-donation');
const modalThankYou = document.getElementById('modal-thank-you');

function openModal() {
    modalDonation.classList.remove('hidden-modal');
}

function closeModal() {
    modalDonation.classList.add('hidden-modal');
}

function handleTransferComplete() {
    closeModal();
    modalThankYou.classList.remove('hidden-modal');
}

function closeThankYouModal() {
    modalThankYou.classList.add('hidden-modal');
}

// Copiar al portapapeles
function copyToClipboard() {
    const account = '34140100032769';

    navigator.clipboard.writeText(account).then(() => {
        const iconCopy = document.getElementById('icon-copy');
        const iconCheck = document.getElementById('icon-check');
        const msg = document.getElementById('copy-msg');

        iconCopy.classList.add('hidden');
        iconCheck.classList.remove('hidden');
        msg.classList.remove('opacity-0');

        setTimeout(() => {
            iconCopy.classList.remove('hidden');
            iconCheck.classList.add('hidden');
            msg.classList.add('opacity-0');
        }, 2000);
    });
}

// Exponer funciones a los manejadores inline del HTML
window.openModal = openModal;
window.closeModal = closeModal;
window.handleTransferComplete = handleTransferComplete;
window.closeThankYouModal = closeThankYouModal;
window.copyToClipboard = copyToClipboard;
