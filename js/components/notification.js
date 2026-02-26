/* ============================================
   Toast Notification System
   ============================================ */

let toastContainer = null;

function ensureContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

export function showToast({ title, message, icon = '🔔', type = 'info', duration = 4000 }) {
    const container = ensureContainer();

    const bgColors = {
        info: 'var(--color-info-bg)',
        success: 'var(--color-success-bg)',
        warning: 'var(--color-warning-bg)',
        danger: 'var(--color-danger-bg)',
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
    <div class="toast__icon" style="background: ${bgColors[type] || bgColors.info}">
      ${icon}
    </div>
    <div class="toast__content">
      <div class="toast__title">${title}</div>
      ${message ? `<div class="toast__message">${message}</div>` : ''}
    </div>
  `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast--exit');
        toast.addEventListener('animationend', () => toast.remove());
    }, duration);

    // Tap to dismiss
    toast.addEventListener('click', () => {
        toast.classList.add('toast--exit');
        toast.addEventListener('animationend', () => toast.remove());
    });
}
