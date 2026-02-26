/* ============================================
   Medical Care Connect — Main App
   ============================================ */

import '../css/variables.css';
import '../css/base.css';
import '../css/components.css';
import '../css/pages.css';

import { getState, setState, subscribe, resetState } from './utils/state.js';
import { registerRoute, registerEvents, navigate, renderCurrentPage } from './utils/router.js';
import { showToast } from './components/notification.js';
import {
    hospitals, ambulances, trackingCodes,
    getStatusLabel, getStatusClass, getCapacityColor, getCapacityPercent
} from './data/mockData.js';

// ---- App Container ----
const app = document.getElementById('app');

// ============================================
// HEADER COMPONENT
// ============================================
function renderHeader(title, showBack = false, backPage = null, backParams = {}) {
    return `
    <header class="app-header">
      ${showBack ? `
        <button class="app-header__back" id="header-back" data-page="${backPage}" aria-label="Go back">
          <span>‹</span> Back
        </button>
      ` : `
        <div class="app-header__logo">
          <div class="app-header__logo-icon">🏥</div>
          <span class="app-header__title">${title}</span>
        </div>
      `}
      <div class="app-header__actions">
        <button class="app-header__action-btn" id="btn-notifications" aria-label="Notifications">🔔</button>
      </div>
    </header>
  `;
}

// ============================================
// BOTTOM NAV COMPONENT
// ============================================
function renderBottomNav(role, activePage) {
    const navItems = {
        patient: [
            { id: 'patient-home', icon: '🏠', label: 'Home', page: 'patient-home' },
            { id: 'patient-hospitals', icon: '🏥', label: 'Hospitals', page: 'patient-hospitals' },
            { id: 'patient-tracking', icon: '📍', label: 'Track', page: 'patient-tracking' },
        ],
        family: [
            { id: 'family-home', icon: '🏠', label: 'Home', page: 'family-home' },
            { id: 'family-tracking', icon: '📍', label: 'Track', page: 'family-tracking' },
        ],
        ambulance: [
            { id: 'ambulance-home', icon: '🏠', label: 'Home', page: 'ambulance-home' },
            { id: 'ambulance-assignment', icon: '🗺️', label: 'Assignment', page: 'ambulance-assignment' },
        ],
        admin: [
            { id: 'admin-dashboard', icon: '📊', label: 'Dashboard', page: 'admin-dashboard' },
            { id: 'admin-capacity', icon: '🛏️', label: 'Capacity', page: 'admin-capacity' },
            { id: 'admin-ambulances', icon: '🚑', label: 'Ambulances', page: 'admin-ambulances' },
        ],
    };

    const items = navItems[role] || [];
    return `
    <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
      ${items.map(item => `
        <button class="bottom-nav__item ${activePage === item.page ? 'bottom-nav__item--active' : ''}"
                id="nav-${item.id}" data-page="${item.page}" aria-label="${item.label}">
          <span class="bottom-nav__icon">${item.icon}</span>
          <span class="bottom-nav__label">${item.label}</span>
        </button>
      `).join('')}
    </nav>
    <button class="demo-reset" id="demo-reset-btn" aria-label="Reset demo">🔄</button>
  `;
}

// ============================================
// PAGES
// ============================================

// ---- Role Selection ----
registerRoute('role-select', () => {
    return `
    <div class="role-select">
      <div class="role-select__hero">
        <div class="role-select__logo">🏥</div>
        <h1 class="role-select__title">Medical Care Connect</h1>
        <p class="role-select__tagline">Emergency medical coordination at your fingertips — find hospitals, request ambulances, stay connected.</p>
      </div>

      <div class="role-select__grid">
        <div class="role-card role-card--patient" id="role-patient" role="button" tabindex="0">
          <div class="role-card__icon">🩺</div>
          <span class="role-card__name">Patient</span>
          <span class="role-card__desc">Find care & request help</span>
        </div>
        <div class="role-card role-card--family" id="role-family" role="button" tabindex="0">
          <div class="role-card__icon">👨‍👩‍👧</div>
          <span class="role-card__name">Family</span>
          <span class="role-card__desc">Track your loved one</span>
        </div>
        <div class="role-card role-card--ambulance" id="role-ambulance" role="button" tabindex="0">
          <div class="role-card__icon">🚑</div>
          <span class="role-card__name">Ambulance</span>
          <span class="role-card__desc">Driver assignments</span>
        </div>
        <div class="role-card role-card--admin" id="role-admin" role="button" tabindex="0">
          <div class="role-card__icon">🏫</div>
          <span class="role-card__name">Admin</span>
          <span class="role-card__desc">Manage hospital ops</span>
        </div>
      </div>

      <div class="privacy-banner mt-6">
        <span class="privacy-banner__icon">🔒</span>
        <span class="privacy-banner__text">No real patient or medical data is stored or transmitted in this demo.</span>
      </div>
    </div>
  `;
});

registerEvents('role-select', () => {
    const roles = ['patient', 'family', 'ambulance', 'admin'];
    const homePages = {
        patient: 'patient-home',
        family: 'family-home',
        ambulance: 'ambulance-home',
        admin: 'admin-dashboard',
    };

    roles.forEach(role => {
        const el = document.getElementById(`role-${role}`);
        if (el) {
            el.addEventListener('click', () => {
                setState({ currentRole: role });
                navigate(homePages[role]);
            });
        }
    });
});

// ---- Patient Home ----
registerRoute('patient-home', () => {
    const state = getState();
    return `
    ${renderHeader('MedConnect')}
    <main class="page">
      <div class="patient-hero">
        <p class="patient-hero__greeting">Hello 👋</p>
        <h1 class="patient-hero__title">Need Emergency Care?</h1>
        <div class="patient-hero__actions">
          <button class="emergency-btn emergency-btn--hospitals" id="btn-find-hospitals">
            <div class="emergency-btn__icon">🏥</div>
            <div class="emergency-btn__text">
              <span class="emergency-btn__label">Find Nearest Hospital</span>
              <span class="emergency-btn__sub">${hospitals.filter(h => h.status === 'available').length} hospitals available nearby</span>
            </div>
          </button>
          <button class="emergency-btn emergency-btn--ambulance" id="btn-request-ambulance">
            <div class="emergency-btn__icon">🚑</div>
            <div class="emergency-btn__text">
              <span class="emergency-btn__label">Request Ambulance</span>
              <span class="emergency-btn__sub">${ambulances.filter(a => a.status === 'available').length} ambulances available</span>
            </div>
          </button>
        </div>
      </div>

      <div class="section-title">Quick Status</div>
      <div class="stat-row mb-4">
        <div class="stat">
          <div class="stat__value text-success">${hospitals.filter(h => h.status === 'available').length}</div>
          <div class="stat__label">Available</div>
        </div>
        <div class="stat">
          <div class="stat__value text-warning">${hospitals.filter(h => h.status === 'limited').length}</div>
          <div class="stat__label">Limited</div>
        </div>
        <div class="stat">
          <div class="stat__value text-danger">${hospitals.filter(h => h.status === 'full').length}</div>
          <div class="stat__label">Full</div>
        </div>
      </div>

      <div class="section-title">Nearest Hospitals</div>
      <div class="hospitals-list">
        ${hospitals.slice(0, 3).map(h => renderHospitalCard(h)).join('')}
      </div>

      <button class="btn btn--outline btn--block mt-4" id="btn-view-all-hospitals">View All Hospitals</button>

      ${state.ambulanceRequested ? `
        <div class="section-title">Active Tracking</div>
        <div class="tracking-card" id="active-tracking-card" style="cursor:pointer;">
          <div class="badge badge--info mb-2"><span class="badge__dot"></span> Live Tracking</div>
          <div class="tracking-card__eta">${state.ambulanceEta || 7} min</div>
          <div class="tracking-card__eta-label">Ambulance arriving</div>
          <p class="text-xs text-secondary">Tap to view full tracking</p>
        </div>
      ` : ''}
    </main>
    ${renderBottomNav('patient', 'patient-home')}
  `;
});

registerEvents('patient-home', () => {
    document.getElementById('btn-find-hospitals')?.addEventListener('click', () => navigate('patient-hospitals'));
    document.getElementById('btn-request-ambulance')?.addEventListener('click', () => navigate('patient-ambulance-request'));
    document.getElementById('btn-view-all-hospitals')?.addEventListener('click', () => navigate('patient-hospitals'));
    document.getElementById('active-tracking-card')?.addEventListener('click', () => navigate('patient-tracking'));
    attachNavEvents();
    attachGlobalEvents();
});

// ---- Patient Hospitals List ----
registerRoute('patient-hospitals', () => {
    return `
    ${renderHeader('Nearby Hospitals', true, 'patient-home')}
    <main class="page">
      <h1 class="page__title">Nearby Hospitals</h1>
      <p class="page__subtitle">${hospitals.length} hospitals found near you</p>

      <div class="map-container" id="map-hospitals">
        <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--color-text-muted);font-size:var(--text-sm);">
          🗺️ Map View — ${hospitals.length} hospitals
        </div>
      </div>

      <div class="hospitals-list">
        ${hospitals.map(h => renderHospitalCard(h)).join('')}
      </div>
    </main>
    ${renderBottomNav('patient', 'patient-hospitals')}
  `;
});

registerEvents('patient-hospitals', () => {
    document.querySelectorAll('.hospital-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.hospitalId;
            setState({ selectedHospital: id });
            navigate('patient-hospital-detail');
        });
    });
    attachNavEvents();
    attachGlobalEvents();
});

function renderHospitalCard(h) {
    return `
    <div class="hospital-card hospital-card--${h.status} card--interactive" data-hospital-id="${h.id}" role="button" tabindex="0">
      <div class="hospital-card__top">
        <div>
          <div class="hospital-card__name">${h.shortName || h.name}</div>
          <div class="hospital-card__address">${h.address}</div>
        </div>
        <div class="badge ${getStatusClass(h.status)}">
          <span class="badge__dot"></span>
          ${getStatusLabel(h.status)}
        </div>
      </div>
      <div class="capacity-bar">
        <div class="capacity-bar__fill capacity-bar__fill--${getCapacityColor(h.erCapacity.available, h.erCapacity.total)}"
             style="width: ${getCapacityPercent(h.erCapacity.available, h.erCapacity.total)}%"></div>
      </div>
      <div class="hospital-card__stats">
        <div class="hospital-card__stat">
          <span class="hospital-card__stat-icon">📍</span> ${h.distance} km
        </div>
        <div class="hospital-card__stat">
          <span class="hospital-card__stat-icon">⏱️</span> ~${h.waitTime} min wait
        </div>
        <div class="hospital-card__stat">
          <span class="hospital-card__stat-icon">🛏️</span> ${h.erCapacity.available}/${h.erCapacity.total} ER
        </div>
      </div>
    </div>
  `;
}

// ---- Patient Hospital Detail ----
registerRoute('patient-hospital-detail', () => {
    const { selectedHospital } = getState();
    const h = hospitals.find(x => x.id === selectedHospital);
    if (!h) return '<div class="page"><p>Hospital not found</p></div>';

    return `
    ${renderHeader(h.shortName, true, 'patient-hospitals')}
    <main class="page">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="page__title" style="margin-bottom:0">${h.name}</h1>
          <p class="text-sm text-secondary mt-2">${h.address}</p>
        </div>
        <div class="badge ${getStatusClass(h.status)}">
          <span class="badge__dot"></span> ${getStatusLabel(h.status)}
        </div>
      </div>

      <div class="map-container" id="map-detail">
        <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--color-text-muted);font-size:var(--text-sm);">
          🗺️ Directions to ${h.shortName} — ${h.distance} km
        </div>
      </div>

      <div class="stat-row mb-4">
        <div class="stat">
          <div class="stat__value" style="color: var(--color-capacity-${h.status === 'full' ? 'full' : h.status === 'limited' ? 'limited' : 'available'})">${h.erCapacity.available}</div>
          <div class="stat__label">ER Beds</div>
        </div>
        <div class="stat">
          <div class="stat__value" style="color: var(--color-capacity-${h.icuCapacity.available === 0 ? 'full' : h.icuCapacity.available <= 2 ? 'limited' : 'available'})">${h.icuCapacity.available}</div>
          <div class="stat__label">ICU Beds</div>
        </div>
        <div class="stat">
          <div class="stat__value text-success">${h.generalBeds.available}</div>
          <div class="stat__label">General</div>
        </div>
      </div>

      <div class="section-title">Hospital Info</div>
      <div class="hospital-detail__info">
        <div class="info-row">
          <div class="info-row__icon">📞</div>
          <div class="info-row__content">
            <div class="info-row__label">Phone</div>
            <div class="info-row__value">${h.phone}</div>
          </div>
        </div>
        <div class="info-row">
          <div class="info-row__icon">⏱️</div>
          <div class="info-row__content">
            <div class="info-row__label">Estimated Wait</div>
            <div class="info-row__value">~${h.waitTime} minutes</div>
          </div>
        </div>
        <div class="info-row">
          <div class="info-row__icon">⭐</div>
          <div class="info-row__content">
            <div class="info-row__label">Rating</div>
            <div class="info-row__value">${h.rating} / 5.0</div>
          </div>
        </div>
        <div class="info-row">
          <div class="info-row__icon">🏷️</div>
          <div class="info-row__content">
            <div class="info-row__label">Departments</div>
            <div class="info-row__value">${h.departments.join(', ')}</div>
          </div>
        </div>
      </div>

      <div class="section-title">Capacity Breakdown</div>
      ${renderCapacitySection('Emergency Room', h.erCapacity)}
      ${renderCapacitySection('ICU', h.icuCapacity)}
      ${renderCapacitySection('General Beds', h.generalBeds)}

      <div class="flex gap-3 mt-6">
        <button class="btn btn--primary btn--block btn--lg" id="btn-get-directions">
          🗺️ Get Directions
        </button>
      </div>
      <button class="btn btn--outline btn--block mt-2" id="btn-request-ambulance-detail">
        🚑 Request Ambulance Here
      </button>
    </main>
    ${renderBottomNav('patient', 'patient-hospitals')}
  `;
});

registerEvents('patient-hospital-detail', () => {
    document.getElementById('btn-get-directions')?.addEventListener('click', () => {
        showToast({ title: 'Directions', message: 'Opening map directions...', icon: '🗺️', type: 'info' });
    });
    document.getElementById('btn-request-ambulance-detail')?.addEventListener('click', () => {
        navigate('patient-ambulance-request');
    });
    attachNavEvents();
    attachGlobalEvents();
});

function renderCapacitySection(name, cap) {
    const pct = getCapacityPercent(cap.available, cap.total);
    const color = getCapacityColor(cap.available, cap.total);
    return `
    <div class="card mb-2" style="padding: var(--space-4);">
      <div class="flex justify-between items-center">
        <span class="text-sm">${name}</span>
        <span class="text-sm" style="font-weight:600; color: var(--color-capacity-${color === 'green' ? 'available' : color === 'yellow' ? 'limited' : 'full'})">${cap.available} / ${cap.total}</span>
      </div>
      <div class="capacity-bar">
        <div class="capacity-bar__fill capacity-bar__fill--${color}" style="width: ${pct}%"></div>
      </div>
    </div>
  `;
}

// ---- Patient Ambulance Request ----
registerRoute('patient-ambulance-request', () => {
    const state = getState();
    if (state.ambulanceRequested) {
        return `
      ${renderHeader('Ambulance Tracking', true, 'patient-home')}
      <main class="page">
        ${renderTrackingView()}
      </main>
      ${renderBottomNav('patient', 'patient-tracking')}
    `;
    }

    return `
    ${renderHeader('Request Ambulance', true, 'patient-home')}
    <main class="page">
      <div class="text-center" style="padding: var(--space-8) 0;">
        <div style="font-size: 4rem; margin-bottom: var(--space-4);">🚑</div>
        <h1 class="page__title">Request Emergency Ambulance</h1>
        <p class="page__subtitle" style="max-width:300px; margin: var(--space-2) auto var(--space-6);">
          An ambulance will be dispatched to your current location immediately.
        </p>

        <div class="stat-row mb-6">
          <div class="stat">
            <div class="stat__value text-success">${ambulances.filter(a => a.status === 'available').length}</div>
            <div class="stat__label">Available</div>
          </div>
          <div class="stat">
            <div class="stat__value text-warning">${ambulances.filter(a => a.status === 'en_route').length}</div>
            <div class="stat__label">En Route</div>
          </div>
        </div>

        <div class="card mb-4" style="text-align:left;">
          <div class="card__header">
            <div>
              <div class="card__title">Nearest Available Ambulance</div>
              <div class="card__description">${ambulances.find(a => a.status === 'available')?.vehicleNumber || 'None available'}</div>
            </div>
            <div class="badge badge--available"><span class="badge__dot"></span> Ready</div>
          </div>
          <div class="flex gap-4 mt-2">
            <span class="text-xs text-secondary">👤 ${ambulances.find(a => a.status === 'available')?.driver || 'N/A'}</span>
            <span class="text-xs text-secondary">📍 ~${1.2} km away</span>
          </div>
        </div>

        <button class="btn btn--danger btn--block btn--lg" id="btn-confirm-ambulance">
          🚨 Confirm Ambulance Request
        </button>
        <p class="text-xs text-muted mt-4">Estimated arrival: ~7 minutes</p>
      </div>
    </main>
    ${renderBottomNav('patient', 'patient-home')}
  `;
});

registerEvents('patient-ambulance-request', () => {
    document.getElementById('btn-confirm-ambulance')?.addEventListener('click', () => {
        setState({ ambulanceRequested: true, ambulanceEta: 7, trackingCode: 'TRACK-001' });
        showToast({ title: 'Ambulance Dispatched! 🚑', message: 'ETA: ~7 minutes. You can track in real-time.', icon: '✅', type: 'success', duration: 5000 });
        navigate('patient-tracking');
    });
    attachNavEvents();
    attachGlobalEvents();
});

// ---- Patient Tracking ----
registerRoute('patient-tracking', () => {
    const state = getState();
    if (!state.ambulanceRequested) {
        return `
      ${renderHeader('Tracking', true, 'patient-home')}
      <main class="page text-center" style="padding-top:var(--space-16);">
        <div style="font-size:4rem;margin-bottom:var(--space-4);">📍</div>
        <h2 class="page__title">No Active Tracking</h2>
        <p class="page__subtitle">Request an ambulance to start live tracking.</p>
        <button class="btn btn--primary btn--lg mt-4" id="btn-request-from-tracking">Request Ambulance</button>
      </main>
      ${renderBottomNav('patient', 'patient-tracking')}
    `;
    }

    return `
    ${renderHeader('Live Tracking', true, 'patient-home')}
    <main class="page">
      ${renderTrackingView()}
      <button class="btn btn--outline btn--block mt-4" id="btn-share-status">
        📤 Share Status with Family
      </button>
    </main>
    ${renderBottomNav('patient', 'patient-tracking')}
  `;
});

registerEvents('patient-tracking', () => {
    document.getElementById('btn-request-from-tracking')?.addEventListener('click', () => navigate('patient-ambulance-request'));
    document.getElementById('btn-share-status')?.addEventListener('click', () => {
        const code = getState().trackingCode || 'TRACK-001';
        showToast({ title: 'Share Code: ' + code, message: 'Share this code with your family members to track your status.', icon: '📤', type: 'info', duration: 6000 });
    });
    attachNavEvents();
    attachGlobalEvents();
});

function renderTrackingView() {
    const state = getState();
    const code = state.trackingCode || 'TRACK-001';
    const tracking = trackingCodes[code];
    const h = hospitals.find(x => x.id === tracking?.hospitalId);

    return `
    <div class="map-container map-container--large" style="margin-bottom:var(--space-4);">
      <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--color-text-muted);font-size:var(--text-sm);flex-direction:column;gap:var(--space-2);">
        <span style="font-size:2rem;">🚑</span>
        <span>Live ambulance tracking</span>
        <span class="text-xs">En route to ${h?.shortName || 'Hospital'}</span>
      </div>
    </div>

    <div class="tracking-card">
      <div class="badge badge--info mb-2"><span class="badge__dot"></span> En Route</div>
      <div class="tracking-card__eta">${state.ambulanceEta || tracking?.eta || 7} min</div>
      <div class="tracking-card__eta-label">Estimated arrival</div>
    </div>

    <div class="card mt-4" style="padding:var(--space-4);">
      <div class="text-xs text-muted mb-2">TRACKING CODE</div>
      <div style="font-size:var(--text-lg);font-weight:700;letter-spacing:0.1em;color:var(--color-brand-light);">${code}</div>
    </div>

    <div class="section-title">Status Updates</div>
    <div class="tracking-steps">
      ${tracking?.steps.map(step => `
        <div class="tracking-step ${step.completed ? 'tracking-step--completed' : ''} ${step.active ? 'tracking-step--active' : ''}">
          <div class="tracking-step__indicator">
            ${step.completed ? '✓' : step.active ? '●' : '○'}
          </div>
          <div class="tracking-step__content">
            <div class="tracking-step__title">${step.label}</div>
            ${step.time ? `<div class="tracking-step__time">${step.time}</div>` : ''}
          </div>
        </div>
      `).join('') || ''}
    </div>

    <div class="card mt-4" style="padding:var(--space-4);">
      <div class="text-xs text-muted mb-2">DESTINATION</div>
      <div style="font-weight:600;">${h?.name || 'Hospital'}</div>
      <div class="text-xs text-secondary mt-1">${h?.address || ''}</div>
    </div>
  `;
}

// ---- Family Home ----
registerRoute('family-home', () => {
    return `
    ${renderHeader('MedConnect')}
    <main class="page">
      <div class="patient-hero">
        <p class="patient-hero__greeting">Family Portal 👨‍👩‍👧</p>
        <h1 class="patient-hero__title">Track Your Loved One</h1>
        <p class="text-sm text-secondary mb-4">Enter the tracking code shared by the patient to receive live updates.</p>
      </div>

      <div class="section-title">Enter Tracking Code</div>
      <div class="family-code-input">
        <input type="text" id="family-tracking-input" placeholder="e.g., TRACK-001" value="TRACK-001"
               style="text-transform:uppercase; letter-spacing:0.1em; font-weight:600;" />
        <button class="btn btn--primary" id="btn-family-track" style="flex-shrink:0;">Track</button>
      </div>

      <div class="privacy-banner">
        <span class="privacy-banner__icon">ℹ️</span>
        <span class="privacy-banner__text">The patient will share a tracking code after requesting an ambulance. Enter it above to see live updates.</span>
      </div>

      <div class="section-title">Demo Codes</div>
      <div class="card card--interactive mb-2" id="demo-code-1" role="button" tabindex="0" style="padding:var(--space-4);">
        <div class="flex justify-between items-center">
          <div>
            <div style="font-weight:600;font-size:var(--text-sm);">TRACK-001</div>
            <div class="text-xs text-secondary">Dorji Wangchuk — En route to JDWNRH</div>
          </div>
          <div class="badge badge--info"><span class="badge__dot"></span> Live</div>
        </div>
      </div>
      <div class="card card--interactive" id="demo-code-2" role="button" tabindex="0" style="padding:var(--space-4);">
        <div class="flex justify-between items-center">
          <div>
            <div style="font-weight:600;font-size:var(--text-sm);">TRACK-002</div>
            <div class="text-xs text-secondary">Tshering Yangzom — Pickup in progress</div>
          </div>
          <div class="badge badge--warning"><span class="badge__dot"></span> Pending</div>
        </div>
      </div>
    </main>
    ${renderBottomNav('family', 'family-home')}
  `;
});

registerEvents('family-home', () => {
    document.getElementById('btn-family-track')?.addEventListener('click', () => {
        const code = document.getElementById('family-tracking-input')?.value.trim().toUpperCase();
        if (trackingCodes[code]) {
            setState({ trackingCode: code });
            navigate('family-tracking');
        } else {
            showToast({ title: 'Code Not Found', message: 'Please try TRACK-001 or TRACK-002', icon: '⚠️', type: 'warning' });
        }
    });

    document.getElementById('demo-code-1')?.addEventListener('click', () => {
        setState({ trackingCode: 'TRACK-001' });
        navigate('family-tracking');
    });

    document.getElementById('demo-code-2')?.addEventListener('click', () => {
        setState({ trackingCode: 'TRACK-002' });
        navigate('family-tracking');
    });

    attachNavEvents();
    attachGlobalEvents();
});

// ---- Family Tracking ----
registerRoute('family-tracking', () => {
    const state = getState();
    const code = state.trackingCode;
    const tracking = trackingCodes[code];

    if (!tracking) {
        return `
      ${renderHeader('Tracking', true, 'family-home')}
      <main class="page text-center" style="padding-top:var(--space-16);">
        <div style="font-size:4rem;margin-bottom:var(--space-4);">🔍</div>
        <h2 class="page__title">No Tracking Active</h2>
        <p class="page__subtitle">Enter a valid tracking code on the home screen.</p>
        <button class="btn btn--primary mt-4" id="btn-go-family-home">Go to Home</button>
      </main>
      ${renderBottomNav('family', 'family-tracking')}
    `;
    }

    const h = hospitals.find(x => x.id === tracking.hospitalId);

    return `
    ${renderHeader('Tracking: ' + code, true, 'family-home')}
    <main class="page">
      <div class="card mb-4" style="padding:var(--space-4);">
        <div class="text-xs text-muted mb-1">PATIENT</div>
        <div style="font-weight:700;font-size:var(--text-lg);">${tracking.patientName}</div>
      </div>

      <div class="map-container map-container--large">
        <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--color-text-muted);font-size:var(--text-sm);flex-direction:column;gap:var(--space-2);">
          <span style="font-size:2rem;">🚑</span>
          <span>Live tracking — ${tracking.patientName}</span>
          <span class="text-xs">Heading to ${h?.shortName || 'Hospital'}</span>
        </div>
      </div>

      <div class="tracking-card">
        <div class="badge badge--info mb-2"><span class="badge__dot"></span> ${tracking.status === 'en_route' ? 'En Route' : 'In Progress'}</div>
        <div class="tracking-card__eta">${tracking.eta} min</div>
        <div class="tracking-card__eta-label">Estimated arrival at hospital</div>
      </div>

      <div class="section-title">Status Updates</div>
      <div class="tracking-steps">
        ${tracking.steps.map(step => `
          <div class="tracking-step ${step.completed ? 'tracking-step--completed' : ''} ${step.active ? 'tracking-step--active' : ''}">
            <div class="tracking-step__indicator">
              ${step.completed ? '✓' : step.active ? '●' : '○'}
            </div>
            <div class="tracking-step__content">
              <div class="tracking-step__title">${step.label}</div>
              ${step.time ? `<div class="tracking-step__time">${step.time}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="card mt-4" style="padding:var(--space-4);">
        <div class="text-xs text-muted mb-2">DESTINATION HOSPITAL</div>
        <div style="font-weight:600;">${h?.name || 'Hospital'}</div>
        <div class="text-xs text-secondary mt-1">${h?.address || ''}</div>
        <div class="text-xs text-secondary mt-1">📞 ${h?.phone || ''}</div>
      </div>
    </main>
    ${renderBottomNav('family', 'family-tracking')}
  `;
});

registerEvents('family-tracking', () => {
    document.getElementById('btn-go-family-home')?.addEventListener('click', () => navigate('family-home'));
    attachNavEvents();
    attachGlobalEvents();
});

// ---- Ambulance Driver Home ----
registerRoute('ambulance-home', () => {
    const state = getState();
    const statuses = ['available', 'en_route', 'offline'];
    const statusLabels = { available: 'Available', en_route: 'En Route', offline: 'Offline' };
    const statusEmojis = { available: '🟢', en_route: '🟡', offline: '🔴' };

    const assignedHospital = hospitals[0]; // Mock assignment

    return `
    ${renderHeader('MedConnect Driver')}
    <main class="page">
      <h1 class="page__title">Welcome, Driver 🚑</h1>
      <p class="page__subtitle">Manage your availability and view assignments.</p>

      <div class="driver-status">
        <div class="driver-status__info">
          <span style="font-size:1.5rem;">${statusEmojis[state.driverStatus]}</span>
          <div>
            <div class="driver-status__label">Your Status</div>
            <div class="driver-status__value">${statusLabels[state.driverStatus]}</div>
          </div>
        </div>
        <select id="driver-status-select" style="width: auto; padding: var(--space-2) var(--space-3); font-size: var(--text-sm);">
          ${statuses.map(s => `<option value="${s}" ${state.driverStatus === s ? 'selected' : ''}>${statusLabels[s]}</option>`).join('')}
        </select>
      </div>

      ${state.driverStatus !== 'offline' ? `
        <div class="section-title">Your Next Assignment</div>
        <div class="assignment-card">
          <div class="assignment-card__label">🔔 New Assignment</div>
          <div class="assignment-card__hospital">${assignedHospital.shortName}</div>
          <div class="assignment-card__address">${assignedHospital.address}</div>
          <div class="assignment-card__meta">
            <div class="assignment-card__meta-item">📍 ${assignedHospital.distance} km</div>
            <div class="assignment-card__meta-item">🛏️ ${assignedHospital.erCapacity.available} ER beds</div>
            <div class="assignment-card__meta-item">⏱️ ~${Math.round(assignedHospital.distance * 4)} min</div>
          </div>
        </div>

        <div class="map-container mt-4" id="map-driver">
          <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--color-text-muted);font-size:var(--text-sm);flex-direction:column;gap:var(--space-2);">
            <span style="font-size:2rem;">🗺️</span>
            <span>Route to ${assignedHospital.shortName}</span>
          </div>
        </div>

        <button class="btn btn--primary btn--block btn--lg mt-4" id="btn-start-navigation">
          🗺️ Start Navigation
        </button>
        <button class="btn btn--success btn--block mt-2" id="btn-complete-trip">
          ✅ Mark Trip Complete
        </button>
      ` : `
        <div class="text-center" style="padding:var(--space-12) 0;">
          <div style="font-size:3rem;margin-bottom:var(--space-4);">😴</div>
          <h3 style="font-size:var(--text-lg);font-weight:600;">You're Offline</h3>
          <p class="text-sm text-secondary mt-2">Change your status to "Available" to receive assignments.</p>
        </div>
      `}

      <div class="section-title">Fleet Status</div>
      <div class="stat-row">
        <div class="stat">
          <div class="stat__value text-success">${ambulances.filter(a => a.status === 'available').length}</div>
          <div class="stat__label">Available</div>
        </div>
        <div class="stat">
          <div class="stat__value text-warning">${ambulances.filter(a => a.status === 'en_route').length}</div>
          <div class="stat__label">En Route</div>
        </div>
        <div class="stat">
          <div class="stat__value text-danger">${ambulances.filter(a => a.status === 'offline').length}</div>
          <div class="stat__label">Offline</div>
        </div>
      </div>
    </main>
    ${renderBottomNav('ambulance', 'ambulance-home')}
  `;
});

registerEvents('ambulance-home', () => {
    document.getElementById('driver-status-select')?.addEventListener('change', (e) => {
        setState({ driverStatus: e.target.value });
        const labels = { available: 'Available', en_route: 'En Route', offline: 'Offline' };
        showToast({ title: 'Status Updated', message: `You are now: ${labels[e.target.value]}`, icon: '✅', type: 'success' });
        navigate('ambulance-home'); // Re-render
    });
    document.getElementById('btn-start-navigation')?.addEventListener('click', () => {
        showToast({ title: 'Navigation Started', message: 'Follow the route to the assigned hospital.', icon: '🗺️', type: 'info' });
    });
    document.getElementById('btn-complete-trip')?.addEventListener('click', () => {
        showToast({ title: 'Trip Completed! ✅', message: 'Great job! Ready for next assignment.', icon: '🎉', type: 'success' });
    });
    attachNavEvents();
    attachGlobalEvents();
});

// ---- Ambulance Assignment ----
registerRoute('ambulance-assignment', () => {
    const assignedHospital = hospitals[0];
    return `
    ${renderHeader('Assignment Details', true, 'ambulance-home')}
    <main class="page">
      <div class="assignment-card mb-4">
        <div class="assignment-card__label">Current Assignment</div>
        <div class="assignment-card__hospital">${assignedHospital.name}</div>
        <div class="assignment-card__address">${assignedHospital.address}</div>
        <div class="assignment-card__meta mt-4">
          <div class="assignment-card__meta-item">📍 ${assignedHospital.distance} km</div>
          <div class="assignment-card__meta-item">🛏️ ${assignedHospital.erCapacity.available} ER beds</div>
          <div class="assignment-card__meta-item">📞 ${assignedHospital.phone}</div>
        </div>
      </div>

      <div class="map-container map-container--large">
        <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--color-text-muted);font-size:var(--text-sm);flex-direction:column;gap:var(--space-2);">
          <span style="font-size:2rem;">🗺️</span>
          <span>Detailed route to ${assignedHospital.shortName}</span>
        </div>
      </div>

      <div class="section-title">Hospital Capacity</div>
      ${renderCapacitySection('Emergency Room', assignedHospital.erCapacity)}
      ${renderCapacitySection('ICU', assignedHospital.icuCapacity)}
      ${renderCapacitySection('General Beds', assignedHospital.generalBeds)}

      <button class="btn btn--primary btn--block btn--lg mt-6" id="btn-navigate">
        🗺️ Open Navigation
      </button>
    </main>
    ${renderBottomNav('ambulance', 'ambulance-assignment')}
  `;
});

registerEvents('ambulance-assignment', () => {
    document.getElementById('btn-navigate')?.addEventListener('click', () => {
        showToast({ title: 'Navigation', message: 'Opening maps application...', icon: '🗺️', type: 'info' });
    });
    attachNavEvents();
    attachGlobalEvents();
});

// ---- Admin Dashboard ----
registerRoute('admin-dashboard', () => {
    const totalER = hospitals.reduce((sum, h) => sum + h.erCapacity.total, 0);
    const availableER = hospitals.reduce((sum, h) => sum + h.erCapacity.available, 0);
    const totalICU = hospitals.reduce((sum, h) => sum + h.icuCapacity.total, 0);
    const availableICU = hospitals.reduce((sum, h) => sum + h.icuCapacity.available, 0);
    const activeAmbulances = ambulances.filter(a => a.status !== 'offline').length;

    return `
    ${renderHeader('Admin Dashboard')}
    <main class="page">
      <h1 class="page__title">Hospital Operations</h1>
      <p class="page__subtitle">Real-time overview of all facilities</p>

      <div class="admin-grid">
        <div class="admin-stat-card">
          <div class="admin-stat-card__value text-success">${availableER}</div>
          <div class="admin-stat-card__label">ER Beds Free</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-card__value text-warning">${availableICU}</div>
          <div class="admin-stat-card__label">ICU Beds Free</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-card__value" style="color:var(--color-brand);">${activeAmbulances}</div>
          <div class="admin-stat-card__label">Active Ambulances</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-card__value">${hospitals.length}</div>
          <div class="admin-stat-card__label">Hospitals</div>
        </div>
      </div>

      <div class="section-title">Hospital Status</div>
      <div class="hospitals-list">
        ${hospitals.map(h => `
          <div class="hospital-card hospital-card--${h.status}" style="cursor:default;">
            <div class="hospital-card__top">
              <div>
                <div class="hospital-card__name">${h.shortName}</div>
                <div class="hospital-card__address">${h.address}</div>
              </div>
              <div class="badge ${getStatusClass(h.status)}">
                <span class="badge__dot"></span> ${getStatusLabel(h.status)}
              </div>
            </div>
            <div class="capacity-bar">
              <div class="capacity-bar__fill capacity-bar__fill--${getCapacityColor(h.erCapacity.available, h.erCapacity.total)}"
                   style="width: ${getCapacityPercent(h.erCapacity.available, h.erCapacity.total)}%"></div>
            </div>
            <div class="hospital-card__stats">
              <div class="hospital-card__stat">
                <span class="hospital-card__stat-icon">🛏️</span> ER: ${h.erCapacity.available}/${h.erCapacity.total}
              </div>
              <div class="hospital-card__stat">
                <span class="hospital-card__stat-icon">🏥</span> ICU: ${h.icuCapacity.available}/${h.icuCapacity.total}
              </div>
              <div class="hospital-card__stat">
                <span class="hospital-card__stat-icon">🛌</span> Gen: ${h.generalBeds.available}/${h.generalBeds.total}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </main>
    ${renderBottomNav('admin', 'admin-dashboard')}
  `;
});

registerEvents('admin-dashboard', () => {
    attachNavEvents();
    attachGlobalEvents();
});

// ---- Admin Capacity Management ----
registerRoute('admin-capacity', () => {
    return `
    ${renderHeader('Capacity Management', true, 'admin-dashboard')}
    <main class="page">
      <h1 class="page__title">Manage Capacity</h1>
      <p class="page__subtitle">Update bed availability for each hospital</p>

      ${hospitals.map(h => `
        <div class="capacity-control" data-hospital-id="${h.id}">
          <div class="flex justify-between items-center mb-4">
            <div style="font-weight:700;">${h.shortName}</div>
            <div class="badge ${getStatusClass(h.status)}">${getStatusLabel(h.status)}</div>
          </div>

          <div class="mb-4">
            <div class="capacity-control__header">
              <span class="capacity-control__name">🚨 Emergency Room</span>
              <span class="capacity-control__count">${h.erCapacity.available} / ${h.erCapacity.total}</span>
            </div>
            <input type="range" class="range-slider" min="0" max="${h.erCapacity.total}" value="${h.erCapacity.available}"
                   data-type="er" data-hospital="${h.id}" />
          </div>

          <div class="mb-4">
            <div class="capacity-control__header">
              <span class="capacity-control__name">🏥 ICU</span>
              <span class="capacity-control__count">${h.icuCapacity.available} / ${h.icuCapacity.total}</span>
            </div>
            <input type="range" class="range-slider" min="0" max="${h.icuCapacity.total}" value="${h.icuCapacity.available}"
                   data-type="icu" data-hospital="${h.id}" />
          </div>

          <div>
            <div class="capacity-control__header">
              <span class="capacity-control__name">🛌 General Beds</span>
              <span class="capacity-control__count">${h.generalBeds.available} / ${h.generalBeds.total}</span>
            </div>
            <input type="range" class="range-slider" min="0" max="${h.generalBeds.total}" value="${h.generalBeds.available}"
                   data-type="general" data-hospital="${h.id}" />
          </div>
        </div>
      `).join('')}
    </main>
    ${renderBottomNav('admin', 'admin-capacity')}
  `;
});

registerEvents('admin-capacity', () => {
    document.querySelectorAll('.range-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
            const hospitalId = e.target.dataset.hospital;
            const type = e.target.dataset.type;
            const value = parseInt(e.target.value);
            const hospital = hospitals.find(h => h.id === hospitalId);

            if (hospital) {
                if (type === 'er') hospital.erCapacity.available = value;
                if (type === 'icu') hospital.icuCapacity.available = value;
                if (type === 'general') hospital.generalBeds.available = value;

                // Update status
                const totalAvail = hospital.erCapacity.available + hospital.icuCapacity.available;
                const totalCap = hospital.erCapacity.total + hospital.icuCapacity.total;
                const pct = totalAvail / totalCap;
                hospital.status = pct > 0.3 ? 'available' : pct > 0 ? 'limited' : 'full';
            }

            // Update displayed count
            const control = e.target.closest('.capacity-control');
            if (control) {
                const countEl = e.target.parentElement.querySelector('.capacity-control__count');
                const max = e.target.max;
                if (countEl) countEl.textContent = `${value} / ${max}`;
            }
        });
    });
    attachNavEvents();
    attachGlobalEvents();
});

// ---- Admin Ambulances ----
registerRoute('admin-ambulances', () => {
    const statusEmojis = { available: '🟢', en_route: '🟡', offline: '🔴' };
    const statusLabels = { available: 'Available', en_route: 'En Route', offline: 'Offline' };
    const statusBadgeClass = { available: 'badge--available', en_route: 'badge--limited', offline: 'badge--full' };

    return `
    ${renderHeader('Ambulance Fleet', true, 'admin-dashboard')}
    <main class="page">
      <h1 class="page__title">Ambulance Queue</h1>
      <p class="page__subtitle">Monitor all ambulances and their status</p>

      <div class="stat-row mb-6">
        <div class="stat">
          <div class="stat__value text-success">${ambulances.filter(a => a.status === 'available').length}</div>
          <div class="stat__label">Available</div>
        </div>
        <div class="stat">
          <div class="stat__value text-warning">${ambulances.filter(a => a.status === 'en_route').length}</div>
          <div class="stat__label">En Route</div>
        </div>
        <div class="stat">
          <div class="stat__value text-danger">${ambulances.filter(a => a.status === 'offline').length}</div>
          <div class="stat__label">Offline</div>
        </div>
      </div>

      <div class="ambulance-queue">
        ${ambulances.map(a => {
        const destHospital = a.assignedHospital ? hospitals.find(h => h.id === a.assignedHospital) : null;
        return `
            <div class="queue-item">
              <div class="queue-item__icon" style="background: ${a.status === 'available' ? 'var(--color-success-bg)' : a.status === 'en_route' ? 'var(--color-warning-bg)' : 'var(--color-danger-bg)'}">
                ${statusEmojis[a.status]}
              </div>
              <div class="queue-item__info">
                <div class="queue-item__name">${a.vehicleNumber}</div>
                <div class="queue-item__detail">
                  👤 ${a.driver}
                  ${destHospital ? ` · → ${destHospital.shortName}` : ''}
                </div>
              </div>
              ${a.eta ? `<div class="queue-item__eta">${a.eta} min</div>` : `
                <div class="badge ${statusBadgeClass[a.status]}">${statusLabels[a.status]}</div>
              `}
            </div>
          `;
    }).join('')}
      </div>
    </main>
    ${renderBottomNav('admin', 'admin-ambulances')}
  `;
});

registerEvents('admin-ambulances', () => {
    attachNavEvents();
    attachGlobalEvents();
});

// ============================================
// GLOBAL EVENT HELPERS
// ============================================
function attachNavEvents() {
    // Bottom nav
    document.querySelectorAll('.bottom-nav__item').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            if (page) navigate(page);
        });
    });

    // Header back
    const backBtn = document.getElementById('header-back');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            const page = backBtn.dataset.page;
            if (page) navigate(page);
        });
    }
}

function attachGlobalEvents() {
    // Demo reset
    document.getElementById('demo-reset-btn')?.addEventListener('click', () => {
        if (confirm('Reset all demo data and return to role selection?')) {
            // Restore original hospital data
            hospitals.forEach(h => {
                const original = originalHospitals.find(o => o.id === h.id);
                if (original) {
                    h.erCapacity = { ...original.erCapacity };
                    h.icuCapacity = { ...original.icuCapacity };
                    h.generalBeds = { ...original.generalBeds };
                    h.status = original.status;
                }
            });
            resetState();
            renderCurrentPage(app);
            showToast({ title: 'Demo Reset', message: 'All data has been restored to defaults.', icon: '🔄', type: 'info' });
        }
    });

    // Notifications button
    document.getElementById('btn-notifications')?.addEventListener('click', () => {
        showToast({ title: 'Notifications', message: 'No new notifications at this time.', icon: '🔔', type: 'info' });
    });
}

// Store original hospital data for reset
const originalHospitals = hospitals.map(h => ({
    id: h.id,
    erCapacity: { ...h.erCapacity },
    icuCapacity: { ...h.icuCapacity },
    generalBeds: { ...h.generalBeds },
    status: h.status,
}));

// ============================================
// BOOTSTRAP
// ============================================
subscribe(() => renderCurrentPage(app));

// Initial render
renderCurrentPage(app);

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => { });
}
