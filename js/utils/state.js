/* ============================================
   Simple State Management
   ============================================ */

const state = {
    currentRole: null, // 'patient' | 'family' | 'ambulance' | 'admin'
    currentPage: 'role-select',
    selectedHospital: null,
    trackingCode: null,
    ambulanceRequested: false,
    ambulanceEta: null,
    driverStatus: 'available', // 'available' | 'en_route' | 'offline'
    notifications: [],
};

const listeners = new Set();

export function getState() {
    return { ...state };
}

export function setState(updates) {
    Object.assign(state, updates);
    listeners.forEach((fn) => fn(getState()));
}

export function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

export function resetState() {
    setState({
        currentRole: null,
        currentPage: 'role-select',
        selectedHospital: null,
        trackingCode: null,
        ambulanceRequested: false,
        ambulanceEta: null,
        driverStatus: 'available',
        notifications: [],
    });
}
