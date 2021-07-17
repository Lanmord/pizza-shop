# pizza-shop

Как запустить приложение:

1. Инициализировать пакеты в папке backend и frontend, через команду yarn install
2. Создать файл .env в папке backend
3. В файле .env задать следущие переменные:

- SECRET_KEY= [Секретный ключ (набор символов предназначенный для формирования токенов и прочей конфиденциальной информации)]
- PORT= [Порт на котором будет запускаться backend]
- MONGODB_URL= [URL базы данных mongodDB]

- NODEMAILER_HOST= [E-mail откуда будут высылаться письма пользователям для верификации их аккаунтов]
- NODEMAILER_PORT= [Порт E-mail]
- NODEMAILER_USER= [Логин E-mail]
- NODEMAILER_PASS= [Пароль E-mail]

2. Вызвать команду yarn start в папке frontend
3. Вызвать команду yarn nodemon в папке backend
