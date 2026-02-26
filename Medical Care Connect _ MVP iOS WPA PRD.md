# Medical Care Connect – MVP iOS WPA PRD

### TL;DR

Medical Care Connect addresses the critical challenge of quickly connecting patients and families to emergency medical care by providing real-time info on nearby hospitals, ambulance availability, and directions—all through an iOS Web Progressive App (WPA). The prototype leverages mock data to demonstrate seamless healthcare access, targeting patients, families, ambulance drivers, and hospital admins for quick, decisive action during medical emergencies.

---

## Goals

### Business Goals

* Launch an MVP WPA for iOS, ready for user testing in under 4 weeks.

* Achieve 90% positive feedback on emergency navigation usability in prototype demos.

* Demonstrate reduction of "patient-to-hospital matching time" by at least 50% compared to the local standard process.

* Gather actionable user data and insights to guide the next stage of development and eventual clinical compliance certification.

### User Goals

* Instantly locate the nearest equipped hospital during an emergency.

* Seamlessly request ambulance services and view estimated arrival times.

* Access real-time hospital bed/ER capacity updates.

* Enable family members to receive and share patient updates during transit.

* Hospital admins can efficiently publish capacity and ambulance status for better system visibility.

### Non-Goals

* Integration with live hospital or government health data APIs.

* Support for Android or desktop browsers in this initial prototype.

* Comprehensive electronic health record (EHR) access or patient data storage beyond real-time session data.

---

## User Stories

**Patients**

* As a patient, I want to easily find the nearest hospital with available capacity, so that I receive timely care.

* As a patient, I want to request an ambulance within seconds, so that help arrives quickly.

* As a patient, I want to share my emergency status with my family, so they are aware and can support me.

**Family Members**

* As a family member, I want to check where my loved one is being taken, so I can coordinate and be there when they arrive.

* As a family member, I want ongoing updates while my relative is en route to the hospital, so I'm kept informed during the critical period.

**Ambulance Drivers**

* As an ambulance driver, I want to receive the optimal hospital destination based on both distance and available beds, so I can transport the patient efficiently.

* As an ambulance driver, I want to update my status (available/en route/offline), so dispatch and admins have accurate fleet information.

**Hospital Admins**

* As a hospital admin, I want to update emergency room and bed capacity in real time, so the system reflects current resource availability.

* As a hospital admin, I want to monitor incoming ambulance traffic, so I can allocate resources and alert staff as needed.

---

## Functional Requirements

* **Patient & Family (Priority: High)**

  * **Nearby Hospitals Search:** Display available hospitals, with distance, wait times, and capacity (using mock data).

  * **Ambulance Request:** Simple form or button triggers ambulance dispatch simulation and provides estimated time of arrival (mocked).

  * **Live Updates:** Show mock patient status updates during transit; allow sharing with family links.

  * **Directions/Maps:** Interactive Apple Maps view for real-time routing to hospital (mock routing).

* **Ambulance Driver (Priority: Medium)**

  * **Hospital Assignment:** View suggested destination hospitals based on proximity and (mock) real-time capacity.

  * **Status Update:** Interface for marking availability (available/en route/offline).

* **Hospital Admin (Priority: Medium)**

  * **Capacity Management:** Update mock ER, ICU, and general bed availability.

  * **Ambulance Queue Monitor:** Dashboard showing inbound/outbound ambulances and patient ETA (mock data simulation).

* **Global Features (Priority: High)**

  * **Authentication (Optional/Mock):** Simple session system for role selection (no complex sign-in).

  * **Notifications:** In-app alerts for ambulance arrival, capacity updates, and status changes.

  * **Accessibility:** Large, high-contrast buttons, readable fonts, and VoiceOver support.

---

## User Experience

**Entry Point & First-Time User Experience**

* User downloads/opens the iOS WPA by scanning a QR code or clicking a shared link.

* On launch, users choose their role: Patient, Family, Ambulance, or Hospital Admin.

* Minimal onboarding—one screen explains core features and provides a “Get Started” button.

**Core Experience**

* **Step 1:** Role Selection

  * User selects their persona (Patient, Family, Ambulance, Admin) via large, clear buttons.

  * Guidance/context for each role upon selection.

* **Step 2 (Example: Patient)**

  * Home screen with “Find Nearest Hospital” and “Request Ambulance” options.

  * User taps “Find Nearest Hospital”:

    * Map and hospital cards show (mock) current capacity, wait time, and estimated distance.

    * User taps a hospital for details: Name, address, phone, mock live status, and route.

  * User taps “Request Ambulance”:

    * Simple confirmation; system displays mock ambulance ETA and allows tracking.

* **Step 3:** Updates & Sharing

  * As ambulance is “en route,” user receives progress updates (mocked).

  * User can tap “Share Status” to send a link/SMS to family.

* **Other Roles:**

  * **Family:** Enter tracking code from patient; see live transit updates and hospital arrival ETA.

  * **Ambulance:** Landing page shows “Your Next Pickup” hospital assignment (mocked based on proximity/capacity), with map and directions.

  * **Admin:** Dashboard with capacity sliders, ability to mark beds and ER open/closed, and see ambulance list.

**Advanced Features & Edge Cases**

* Basic error handling: For example, if no hospitals in range (mock message).

* If roles are not selected, prompt user to choose.

* In rare cases (e.g., capacity all zero), fallback “Contact Emergency Line” button.

* Demo mode to reset mock data for repeated prototype testing.

**UI/UX Highlights**

* Optimized for iPhone screens (not landscape/tablet).

* High tap targets, minimal text entry.

* Color-coded status bars: green (capacity), yellow (limited), red (full).

* Native “Add to Home Screen” prompt for WPA usage.

* Support for VoiceOver and basic dynamic font scaling.

---

## Narrative

On a typical evening, a patient suddenly experiences severe chest pain at home. Panic sets in as family members scramble for information—nearby hospitals, ambulance numbers, which ER is open? Calling random numbers wastes precious minutes, and confusion mounts with conflicting info.

With Medical Care Connect’s iOS WPA prototype available, the family member opens the app and selects “Find Nearest Hospital.” Within seconds, the app displays nearby options, instantly signaling which hospitals have open beds. A single tap requests an ambulance, with an ETA and live position on the map. The patient’s status is shareable via a secure link, keeping anxious relatives informed as the ambulance speeds toward the optimal hospital.

By the time they arrive, notifications have already alerted the ER staff, and the family knows exactly where to go. Stress is lowered, confusion is eliminated, and the system’s clarity means precious time has been saved for everyone involved. The prototype’s real-time, accessible platform proves that with the right tool, emergency medical access can be made swift, transparent, and reassuring for everyone in the chain of care.

---

## Success Metrics

### User-Centric Metrics

* Session completion rate for patients and family scenarios

* User-reported clarity and ease-of-use via mini-surveys

### Business Metrics

* Number of prototype demo sessions completed

* Usability issues discovered and resolved per week

### Technical Metrics

* WPA load time on iPhone (target <2 seconds on WiFi)

* Uptime and bug/crash incidence during demo (<2% session errors)

### Tracking Plan

* Role selection event

* “Request Ambulance” button taps

* “Find Nearest Hospital” searches

* Capacity update events (admin side)

* Patient/family status shares

* Error dialogs triggered

---

## Technical Considerations

### Technical Needs

* Front-end: Responsive web app optimized for iOS WPA behaviors (PWA manifest, service workers).

* Mock data layer: Local in-memory data for hospitals, ambulances, admin.

* State-based navigation: Session-controlled flows per role.

* Map integration: Apple Maps embedding (mock routing, no real GPS).

* No persistent user accounts; session-only for prototype.

### Integration Points

* None—prototype uses only mock/local data.

* Apple Maps API for map rendering with sample/mock routes.

### Data Storage & Privacy

* All user and hospital data is mock/simulation only (no real PHI).

* No backend server for MVP; data resets on session/app reload.

* Privacy banner: “No real patient or medical data is stored or transmitted in this demo.”

### Scalability & Performance

* Designed for single-user prototype testing (up to 5 concurrent sessions for demos).

* Performance priority: Fast initial load and smooth transitions on iOS devices.

### Potential Challenges

* WPA limitations on iOS (e.g., Add to Home Screen quirks, push notifications not supported).

* Ensuring accessibility and readability on various iPhone screen sizes.

* Data sync and state management during rapid mock updates.

* Clear demo reset paths for repeated prototype use.

---

## Milestones & Sequencing

### Project Estimate

* Small: 1–2 weeks for functional iOS WPA prototype with defined feature set.

### Team Size & Composition

* Small Team (2 total):

  * 1 Full-Stack Developer (front-end, data, light UI/UX)

  * 1 Product/UX Designer (flows, clickable demo loops, iOS-centric design)

### Suggested Phases

**Phase 1: Planning & Wireframes (2 days)**

* Key Deliverables: Product/UX Designer drafts role-based wireframes and journeys.

* Dependencies: None.

**Phase 2: Core Build (5 days)**

* Key Deliverables: Developer implements WPA shell, navigation, and key UI per wireframes.

* Dependencies: Wireframe approval.

**Phase 3: Mock Data & State Management (2 days)**

* Key Deliverables: Integrated mock hospital, ambulance, and admin data flows.

* Dependencies: Core app shell.

**Phase 4: QA, Demos, and Adjustments (2 days)**

* Key Deliverables: Internal team validation, live demos, usability tweaks, accessibility pass.

* Dependencies: Full flow functional.

Total expected duration: **2 weeks from kickoff to deliverable demo WPA** (iOS optimized, prototype-ready).