/* ============================================
   Toast Notification System — Debounced & Deduplicated
   ============================================ */

let toastContainer = null;
const activeToasts = new Map(); // key → toast element
const MAX_TOASTS = 2;

function ensureContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

function dismissToast(toast, key) {
  if (toast.classList.contains('toast--exit')) return;
  toast.classList.add('toast--exit');
  const onEnd = () => {
    toast.remove();
    if (key) activeToasts.delete(key);
  };
  toast.addEventListener('animationend', onEnd, { once: true });
  // Fallback removal
  setTimeout(onEnd, 400);
}

export function showToast({ title, message, icon = '🔔', type = 'info', duration = 4000 }) {
  const container = ensureContainer();

  // Deduplicate: if same title is already showing, skip
  const key = title;
  if (activeToasts.has(key)) return;

  // Limit max visible toasts — remove oldest
  if (activeToasts.size >= MAX_TOASTS) {
    const oldest = activeToasts.entries().next().value;
    if (oldest) dismissToast(oldest[1], oldest[0]);
  }

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
  activeToasts.set(key, toast);

  // Auto dismiss
  setTimeout(() => dismissToast(toast, key), duration);

  // Tap to dismiss
  toast.addEventListener('click', () => dismissToast(toast, key), { once: true });
}

/**
 * Create a one-shot click handler that ignores rapid/repeated clicks.
 * Returns a wrapped function that only executes once until the page re-renders.
 */
const firedActions = new Set();

export function oneShot(actionId, fn) {
  return (e) => {
    if (firedActions.has(actionId)) return;
    firedActions.add(actionId);
    fn(e);
    // Allow again after 1.5s (covers navigation re-render)
    setTimeout(() => firedActions.delete(actionId), 1500);
  };
}

/**
 * Reset all one-shot action locks (call on page navigation).
 */
export function resetOneShots() {
  firedActions.clear();
}
