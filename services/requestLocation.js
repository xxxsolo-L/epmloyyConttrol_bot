// Функция для отправки запроса на геолокацию
async function requestLocation(ctx) {
    try {
        await ctx.reply('Отправьте вашу геолокацию, нажав на кнопку ниже.', {
            reply_markup: {
                keyboard: [
                    [
                        { text: "Отправить геолокацию", request_location: true }, // Кнопка для запроса геолокации
                    ],
                ],
                resize_keyboard: true,  // Изменение размера клавиатуры
                one_time_keyboard: true,  // Клавиатура исчезает после использования
            },
        });
    } catch (error) {
        console.error('Ошибка при отправке запроса геолокации:', error);
    }
}

module.exports = {
    requestLocation,
};
