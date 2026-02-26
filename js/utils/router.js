/* ============================================
   Simple SPA Router
   ============================================ */

import { getState, setState } from './state.js';
import { resetOneShots } from '../components/notification.js';

const routes = {};

export function registerRoute(name, renderFn) {
    routes[name] = renderFn;
}

export function navigate(pageName, params = {}) {
    resetOneShots();
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
        attachPageEvents(currentPage);
    }
}

const eventHandlers = {};

export function registerEvents(page, handler) {
    eventHandlers[page] = handler;
}

function attachPageEvents(page) {
    const handler = eventHandlers[page];
    if (handler) {
        requestAnimationFrame(() => handler());
    }
}
