// Импортируй модель geoData (предполагается, что это Mongoose или другая ORM-модель)
const geoData = require('../controllers/geoData.model'); // Убедись, что путь к модели правильный

// Экспортируемая функция для обработки и сохранения геолокации
async function saveGeoPoint(ctx, location) {
    try {
        // Проверяем, что геолокация присутствует
        if (location) {
            // Создаем новый объект geoPoint
            let geoPoint = new geoData({
                user_id: ctx.from.id,
                username: ctx.from.username,
                latitude: location.latitude,
                longitude: location.longitude,
                timestamp: new Date()
            });

            // Сохраняем гео-точку в базе данных
            await geoPoint.save();

            // Если объект сохранён (проверка на !undefined не обязательна после await save)
            await ctx.reply('Метка записана 🐪');

            // Обнуляем переменную geoPoint, если это нужно для логики
            geoPoint = undefined;
        }
    } catch (error) {
        console.error('Ошибка при сохранении геолокации:', error);
        await ctx.reply('Произошла ошибка при записи метки.');
    }
}
module.exports = {
    saveGeoPoint,
};