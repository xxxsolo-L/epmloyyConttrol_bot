require ("dotenv").config();
const {Bot, GrammyError, HttpError, Keyboard, InlineKeyboard, DEBUG} = require('grammy')
const User = require('./controllers/user.model');
const geoData = require('./controllers/geoData.model');
const mongoose = require ('mongoose');
const mongoURI = process.env.MONGO_URI;
const { haversineDistance } = require ('./services/geoCheck');
const { saveGeoPoint } = require ('./services/geoService');
const { userCreate } = require ('./services/userCreate');
const { requestLocation } = require ('./services/requestLocation');


mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Утилита для создания задержки
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const bot = new Bot(process.env.BOT_API_KEY)

bot.api.setMyCommands([
    {
        command: 'start', description: 'Стартуем!',
    },
    // {
    //     command: 'hello', description: 'Дарова',
    // },
])


bot.command('start', async (ctx) => {
    console.log(ctx.chat);
    console.log(ctx.chatId);

    const userId=ctx.from.id;
    console.log(userId);

    let user = await User.findOne({ user_id: userId });
    if (!user) {
        await userCreate(ctx);
        await requestLocation(ctx);
    } else {
        // Если пользователь уже есть в базе данных
        await ctx.reply(`С возвращением ${ctx.chat.first_name}!`);
        await requestLocation(ctx);
    }

    //сюда асинхронную функцию аутентификации из БД

});


// Обработка данных геолокации
bot.on('message:location', async (ctx) => {
    const location = ctx.message.location;
    console.log(ctx.message.location);

    // Проверяем, что геолокация действительно присутствует
    if (location) {
        // Сохраняем в БД отметку
        await saveGeoPoint(ctx, location);

        const center = { lat: 47.275109, lng: 29.147706 };

        const { latitude, longitude } = location;
        const point = { lat: location.latitude, lng: location.longitude };
        // Ваша точка для проверки
        const distance = haversineDistance(center, point)
        console.log(`Расстояние: ${distance} м`);

        // Отправка полученной геолокации в виде текста
        await ctx.reply(`Спасибо! ✍  Ваша геолокация: \n🌏Широта: ${latitude}\n🌎Долгота: ${longitude}`);
        //Отправка геолокации на карте
        await ctx.replyWithLocation(latitude, longitude);
        if (distance <= 100) {
            await delay(1000);
        await ctx.reply('Вы в пределе хаба.');
    } else {
            await delay(1000);
            await ctx.reply(`Вы не в хабе! Расстояние: ${distance.toFixed(2)} м.`);
    }
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