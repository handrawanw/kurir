function haversine(lat1, lon1, lat2, lon2) {
    // Radius bumi dalam kilometer
    const R = 6371.0;

    // Konversi koordinat dari derajat ke radian
    const radLat1 = (Math.PI / 180) * lat1;
    const radLon1 = (Math.PI / 180) * lon1;
    const radLat2 = (Math.PI / 180) * lat2;
    const radLon2 = (Math.PI / 180) * lon2;

    // Selisih koordinat
    const dlon = radLon2 - radLon1;
    const dlat = radLat2 - radLat1;

    // Rumus Haversine
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Jarak dalam kilometer
    const distance = R * c;

    return distance;
}

// Koordinat referensi
const refLat = 52.5200;
const refLon = 13.4050;

// Koordinat lainnya
const pointLat = 52.5100;
const pointLon = 13.4150;

// Radius dalam kilometer
const radius = 5.0;

// Hitung jarak
const distance = haversine(refLat, refLon, pointLat, pointLon);

// Cek apakah dalam radius yang ditentukan
if (distance <= radius) {
    console.log("Lokasi berada dalam radius yang ditentukan.",distance);
} else {
    console.log("Lokasi berada di luar radius yang ditentukan.",distance);
}
