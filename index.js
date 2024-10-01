require ("dotenv").config();
const {Bot, GrammyError, HttpError, Keyboard, InlineKeyboard, DEBUG} = require('grammy')
const User = require('./controllers/User');

// Утилита для создания задержки
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const bot = new Bot(process.env.BOT_API_KEY)

bot.api.setMyCommands([
    {
        command: 'start', description: 'Стартуем!',
    },
    {
        command: 'hello', description: 'Дарова',
    },
])


bot.command('start', async (ctx) => {
    console.log(ctx.chat);
    console.log(ctx.chatId);

    const user = new User(ctx.chatId, ctx.chat.first_name, ctx.chat.last_name | null, ctx.chat.username, 'john.doe@example.com');
    console.log(user);
    user.printInfo();

    //сюда асинхронную функцию аутентификации из БД

    await ctx.reply(`Дарова, ${ctx.chat.first_name}! Im employeeConttrol_bot`)// зашли в старт
    await delay(1000);
    await ctx.reply('Представьтесь по форме: Имя Фамилия')
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

})


// Обработка данных геолокации
bot.on('message:location', async (ctx) => {
    const location = ctx.message.location;

    // Проверяем, что геолокация действительно присутствует
    if (location) {
        const { latitude, longitude } = location;

        // Отправка полученной геолокации в виде текста
        await ctx.reply(`Спасибо! ✍  Ваша геолокация: \n🌏Широта: ${latitude}\n🌎Долгота: ${longitude}`);

        // Отправка геолокации на карте
        await ctx.replyWithLocation(latitude, longitude);
    } else {
        // Обработка ситуации, когда геолокации нет
        await ctx.reply("Пожалуйста, отправьте свою геолокацию, нажав на кнопку.");
    }
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}`);
    const e = err.error;

    if(e instanceof GrammyError) {
        console.error("Error in request: ", e.description);
    } else if (e instanceof HttpError){
        console.error("Could not contact Telegram: ", e);
    } else {
        console.error("Unknown error: ", e);
    }
})


bot.start()