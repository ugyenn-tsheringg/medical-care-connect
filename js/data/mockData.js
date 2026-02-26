/* ============================================
   Mock Data — Hospitals near Chandigarh University
   ============================================ */

export const hospitals = [
    {
        id: 'h1',
        name: 'Government Medical College & Hospital',
        shortName: 'GMCH-32',
        address: 'Sector 32, Chandigarh, 160030',
        phone: '+91-172-2665253',
        lat: 30.7434,
        lng: 76.7680,
        distance: 8.5,
        waitTime: 20,
        erCapacity: { total: 40, available: 15 },
        icuCapacity: { total: 20, available: 5 },
        generalBeds: { total: 300, available: 68 },
        departments: ['Emergency', 'Cardiology', 'Neurology', 'Orthopedics', 'Trauma Center'],
        status: 'available',
        rating: 4.3,
    },
    {
        id: 'h2',
        name: 'Post Graduate Institute of Medical Education & Research',
        shortName: 'PGIMER',
        address: 'Sector 12, Chandigarh, 160012',
        phone: '+91-172-2746018',
        lat: 30.7649,
        lng: 76.7756,
        distance: 12.2,
        waitTime: 35,
        erCapacity: { total: 50, available: 8 },
        icuCapacity: { total: 30, available: 4 },
        generalBeds: { total: 500, available: 42 },
        departments: ['Emergency', 'Cardiology', 'Oncology', 'Neurosurgery', 'Pediatrics', 'Burns'],
        status: 'limited',
        rating: 4.7,
    },
    {
        id: 'h3',
        name: 'Fortis Hospital Mohali',
        shortName: 'Fortis Mohali',
        address: 'Phase 8, Industrial Area, Mohali, 160059',
        phone: '+91-172-4692222',
        lat: 30.7130,
        lng: 76.7228,
        distance: 5.3,
        waitTime: 10,
        erCapacity: { total: 25, available: 12 },
        icuCapacity: { total: 15, available: 6 },
        generalBeds: { total: 200, available: 55 },
        departments: ['Emergency', 'Cardiology', 'Orthopedics', 'Oncology', 'General Surgery'],
        status: 'available',
        rating: 4.5,
    },
    {
        id: 'h4',
        name: 'Max Super Speciality Hospital',
        shortName: 'Max Hospital',
        address: 'Civil Hospital Rd, Phase 6, Mohali, 160055',
        phone: '+91-172-6652000',
        lat: 30.7050,
        lng: 76.7170,
        distance: 6.1,
        waitTime: 15,
        erCapacity: { total: 20, available: 9 },
        icuCapacity: { total: 12, available: 3 },
        generalBeds: { total: 150, available: 38 },
        departments: ['Emergency', 'Neurology', 'Cardiology', 'Gastro', 'Urology'],
        status: 'available',
        rating: 4.4,
    },
    {
        id: 'h5',
        name: 'Ivy Hospital Mohali',
        shortName: 'Ivy Hospital',
        address: 'Sector 71, Mohali, Punjab, 160071',
        phone: '+91-172-7170000',
        lat: 30.6980,
        lng: 76.7350,
        distance: 3.8,
        waitTime: 8,
        erCapacity: { total: 15, available: 8 },
        icuCapacity: { total: 8, available: 4 },
        generalBeds: { total: 100, available: 32 },
        departments: ['Emergency', 'Orthopedics', 'General Medicine', 'Pediatrics'],
        status: 'available',
        rating: 4.2,
    },
    {
        id: 'h6',
        name: 'Amandeep Hospital',
        shortName: 'Amandeep',
        address: 'GT Road, Amritsar Bypass, Pathankot, Punjab',
        phone: '+91-186-2220506',
        lat: 30.7260,
        lng: 76.7620,
        distance: 9.7,
        waitTime: 40,
        erCapacity: { total: 18, available: 0 },
        icuCapacity: { total: 6, available: 0 },
        generalBeds: { total: 80, available: 5 },
        departments: ['Emergency', 'General Surgery', 'Dental'],
        status: 'full',
        rating: 3.8,
    },
];

export const ambulances = [
    {
        id: 'a1',
        vehicleNumber: 'PB-10-AB-1234',
        driver: 'Rajveer Singh',
        status: 'available',
        lat: 30.7100,
        lng: 76.7400,
        assignedHospital: null,
        currentPatient: null,
        eta: null,
    },
    {
        id: 'a2',
        vehicleNumber: 'PB-10-CD-5678',
        driver: 'Gurpreet Kaur',
        status: 'en_route',
        lat: 30.7300,
        lng: 76.7550,
        assignedHospital: 'h1',
        currentPatient: 'PAT-2026-003',
        eta: 9,
    },
    {
        id: 'a3',
        vehicleNumber: 'CH-01-EF-9101',
        driver: 'Amit Sharma',
        status: 'available',
        lat: 30.7000,
        lng: 76.7200,
        assignedHospital: null,
        currentPatient: null,
        eta: null,
    },
    {
        id: 'a4',
        vehicleNumber: 'PB-65-GH-2345',
        driver: 'Harpreet Gill',
        status: 'en_route',
        lat: 30.7500,
        lng: 76.7800,
        assignedHospital: 'h2',
        currentPatient: 'PAT-2026-007',
        eta: 14,
    },
    {
        id: 'a5',
        vehicleNumber: 'CH-04-IJ-6789',
        driver: 'Manpreet Sidhu',
        status: 'offline',
        lat: 30.6900,
        lng: 76.7100,
        assignedHospital: null,
        currentPatient: null,
        eta: null,
    },
];

export const trackingCodes = {
    'TRACK-001': {
        patientName: 'Arjun Mehta',
        ambulanceId: 'a2',
        hospitalId: 'h1',
        status: 'en_route',
        eta: 9,
        steps: [
            { label: 'Ambulance dispatched', time: '6:42 PM', completed: true },
            { label: 'Ambulance arrived at location', time: '6:50 PM', completed: true },
            { label: 'Patient picked up', time: '6:55 PM', completed: true },
            { label: 'En route to hospital', time: '6:57 PM', completed: false, active: true },
            { label: 'Arrived at hospital', time: null, completed: false },
        ],
    },
    'TRACK-002': {
        patientName: 'Priya Kaur',
        ambulanceId: 'a4',
        hospitalId: 'h2',
        status: 'en_route',
        eta: 14,
        steps: [
            { label: 'Ambulance dispatched', time: '7:10 PM', completed: true },
            { label: 'Ambulance arrived at location', time: '7:18 PM', completed: true },
            { label: 'Patient picked up', time: null, completed: false, active: true },
            { label: 'En route to hospital', time: null, completed: false },
            { label: 'Arrived at hospital', time: null, completed: false },
        ],
    },
};

// Chandigarh University center coordinates
export const MAP_CENTER = { lat: 30.7100, lng: 76.7400 };
export const MAP_ZOOM = 12;

export function getStatusLabel(status) {
    switch (status) {
        case 'available': return 'Available';
        case 'limited': return 'Limited';
        case 'full': return 'Full';
        default: return status;
    }
}

export function getStatusClass(status) {
    switch (status) {
        case 'available': return 'badge--available';
        case 'limited': return 'badge--limited';
        case 'full': return 'badge--full';
        default: return 'badge--info';
    }
}

export function getCapacityColor(available, total) {
    const pct = available / total;
    if (pct > 0.4) return 'green';
    if (pct > 0.1) return 'yellow';
    return 'red';
}

export function getCapacityPercent(available, total) {
    return Math.round((available / total) * 100);
}
