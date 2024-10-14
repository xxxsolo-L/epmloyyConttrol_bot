function haversineDistance(coords1, coords2) {
    const toRad = (value) => (value * Math.PI) / 180;

    const lat1 = coords1.lat;
    const lon1 = coords1.lng;
    const lat2 = coords2.lat;
    const lon2 = coords2.lng;

    const R = 6371e3; // Радиус Земли в метрах

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Расстояние в метрах
    return distance;
}

module.exports = {
    haversineDistance,
};

// const center = { lat: 47.275109, lng: 29.147706 };
// const point = { lat: 47.275500, lng: 29.148000 }; // Ваша точка для проверки
//
// const distance = haversineDistance(center, point);
// const radius = 100; // 100 метров
//
// if (distance <= radius) {
//     console.log('Точка находится в пределах 100 метров.');
// } else {
//     console.log(`Точка находится за пределами радиуса. Расстояние: ${distance.toFixed(2)} м.`);
// }