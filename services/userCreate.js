const User = require('../controllers/user.model');

// Экспортируемая функция для обработки и сохранения геолокации
async function userCreate(ctx) {
    try {
        // Проверяем, что геолокация присутствует
            // Создаем новый объект user
             let user = new User({
                user_id: ctx.from.id,
                first_name: ctx.from.first_name,
                last_name: ctx.from.last_name,
                username: ctx.from.username,
                language: ctx.from.language_code,
                is_active: true,
                joined_at: new Date()
            });
            await user.save();
            await ctx.reply('Добро пожаловать в бота! Im employeeConttrol_bot');
    } catch (error) {
        console.error('Ошибка при создании пользователя:', error);
        await ctx.reply('Произошла ошибка при создании пользователя');
    }
}
module.exports = {
    userCreate,
};