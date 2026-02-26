/* ============================================
   Simple SPA Router
   ============================================ */

import { getState, setState } from './state.js';

const routes = {};

export function registerRoute(name, renderFn) {
    routes[name] = renderFn;
}

export function navigate(pageName, params = {}) {
    setState({ currentPage: pageName, ...params });
}

export function renderCurrentPage(container) {
    const { currentPage } = getState();
    const renderFn = routes[currentPage];
    if (renderFn) {
        container.innerHTML = '';
        const content = renderFn();
        if (typeof content === 'string') {
            container.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            container.appendChild(content);
        }
        // Re-attach event listeners
        attachPageEvents(currentPage);
    }
}

// Page-specific event attachment
const eventHandlers = {};

export function registerEvents(page, handler) {
    eventHandlers[page] = handler;
}

function attachPageEvents(page) {
    const handler = eventHandlers[page];
    if (handler) {
        // Small delay to ensure DOM is ready
        requestAnimationFrame(() => handler());
    }
}
