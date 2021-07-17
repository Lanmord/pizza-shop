# pizza-shop

Как запустить приложение:

1. Инициализировать пакеты в папке backend и frontend, через команду yarn install
2. Создать файл .env в папке backend
3. В файле .env задать следущие переменные:
   SECRET_KEY= /_Секретный ключ (набор символов предназначенный для формирования токенов и прочей конфиденциальной информации)_/
   PORT= /_Порт на котором будет запускаться backend_/
   MONGODB_URL= /_URL базы данных mongodDB_/

NODEMAILER_HOST= /_E-mail откуда будут высылаться письма пользователям для верификации их аккаунтов_/
NODEMAILER_PORT= /_Порт E-mail_/
NODEMAILER_USER= /_Логин E-mail_/
NODEMAILER_PASS= /_Пароль E-mail_/

2. Вызвать команду yarn start в папке frontend
3. Вызвать команду yarn nodemon в папке backend
