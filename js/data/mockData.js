/* ============================================
   Mock Data — Medical Care Connect
   ============================================ */

export const hospitals = [
    {
        id: 'h1',
        name: 'Jigme Dorji Wangchuck National Referral Hospital',
        shortName: 'JDWNRH',
        address: 'Gongphel Lam, Thimphu, Bhutan',
        phone: '+975-2-322496',
        lat: 27.4712,
        lng: 89.6339,
        distance: 1.2,
        waitTime: 15,
        erCapacity: { total: 30, available: 12 },
        icuCapacity: { total: 15, available: 3 },
        generalBeds: { total: 200, available: 45 },
        departments: ['Emergency', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'],
        status: 'available',
        rating: 4.5,
        image: null,
    },
    {
        id: 'h2',
        name: 'Khesar Gyalpo University of Medical Sciences',
        shortName: 'KGUMSTH',
        address: 'Semtokha, Thimphu, Bhutan',
        phone: '+975-2-351001',
        lat: 27.4498,
        lng: 89.6806,
        distance: 3.8,
        waitTime: 25,
        erCapacity: { total: 20, available: 5 },
        icuCapacity: { total: 10, available: 1 },
        generalBeds: { total: 150, available: 22 },
        departments: ['Emergency', 'General Surgery', 'Internal Medicine', 'Obstetrics'],
        status: 'limited',
        rating: 4.3,
        image: null,
    },
    {
        id: 'h3',
        name: 'Thimphu General Hospital',
        shortName: 'TGH',
        address: 'Lungtenphu, Thimphu, Bhutan',
        phone: '+975-2-341002',
        lat: 27.4385,
        lng: 89.6507,
        distance: 5.1,
        waitTime: 10,
        erCapacity: { total: 15, available: 8 },
        icuCapacity: { total: 6, available: 2 },
        generalBeds: { total: 80, available: 30 },
        departments: ['Emergency', 'General Medicine', 'Pediatrics'],
        status: 'available',
        rating: 4.1,
        image: null,
    },
    {
        id: 'h4',
        name: 'City Medical Center',
        shortName: 'CMC',
        address: 'Chang Lam, Thimphu, Bhutan',
        phone: '+975-2-336789',
        lat: 27.4735,
        lng: 89.6412,
        distance: 0.8,
        waitTime: 35,
        erCapacity: { total: 10, available: 0 },
        icuCapacity: { total: 4, available: 0 },
        generalBeds: { total: 50, available: 3 },
        departments: ['Emergency', 'Orthopedics', 'Dental'],
        status: 'full',
        rating: 3.9,
        image: null,
    },
    {
        id: 'h5',
        name: 'Motithang Community Hospital',
        shortName: 'MCH',
        address: 'Motithang, Thimphu, Bhutan',
        phone: '+975-2-322150',
        lat: 27.4850,
        lng: 89.6250,
        distance: 2.5,
        waitTime: 8,
        erCapacity: { total: 8, available: 5 },
        icuCapacity: { total: 3, available: 2 },
        generalBeds: { total: 40, available: 18 },
        departments: ['Emergency', 'Family Medicine', 'Pediatrics'],
        status: 'available',
        rating: 4.4,
        image: null,
    },
];

export const ambulances = [
    {
        id: 'a1',
        vehicleNumber: 'BT-AMB-101',
        driver: 'Karma Dorji',
        status: 'available',
        lat: 27.4700,
        lng: 89.6350,
        assignedHospital: null,
        currentPatient: null,
        eta: null,
    },
    {
        id: 'a2',
        vehicleNumber: 'BT-AMB-102',
        driver: 'Tshering Penjor',
        status: 'en_route',
        lat: 27.4620,
        lng: 89.6450,
        assignedHospital: 'h1',
        currentPatient: 'PAT-2024-003',
        eta: 8,
    },
    {
        id: 'a3',
        vehicleNumber: 'BT-AMB-103',
        driver: 'Sonam Wangmo',
        status: 'available',
        lat: 27.4550,
        lng: 89.6700,
        assignedHospital: null,
        currentPatient: null,
        eta: null,
    },
    {
        id: 'a4',
        vehicleNumber: 'BT-AMB-104',
        driver: 'Kinley Zangmo',
        status: 'en_route',
        lat: 27.4400,
        lng: 89.6520,
        assignedHospital: 'h3',
        currentPatient: 'PAT-2024-007',
        eta: 12,
    },
    {
        id: 'a5',
        vehicleNumber: 'BT-AMB-105',
        driver: 'Pema Tshewang',
        status: 'offline',
        lat: 27.4800,
        lng: 89.6200,
        assignedHospital: null,
        currentPatient: null,
        eta: null,
    },
];

export const trackingCodes = {
    'TRACK-001': {
        patientName: 'Dorji Wangchuk',
        ambulanceId: 'a2',
        hospitalId: 'h1',
        status: 'en_route',
        eta: 8,
        steps: [
            { label: 'Ambulance dispatched', time: '6:42 PM', completed: true },
            { label: 'Ambulance arrived at location', time: '6:50 PM', completed: true },
            { label: 'Patient picked up', time: '6:55 PM', completed: true },
            { label: 'En route to hospital', time: '6:57 PM', completed: false, active: true },
            { label: 'Arrived at hospital', time: null, completed: false },
        ],
    },
    'TRACK-002': {
        patientName: 'Tshering Yangzom',
        ambulanceId: 'a4',
        hospitalId: 'h3',
        status: 'en_route',
        eta: 12,
        steps: [
            { label: 'Ambulance dispatched', time: '7:10 PM', completed: true },
            { label: 'Ambulance arrived at location', time: '7:18 PM', completed: true },
            { label: 'Patient picked up', time: null, completed: false, active: true },
            { label: 'En route to hospital', time: null, completed: false },
            { label: 'Arrived at hospital', time: null, completed: false },
        ],
    },
};

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
