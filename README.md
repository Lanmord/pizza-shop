# pizza-shop

### Как запустить приложение:

1. Инициализировать пакеты в папке backend и frontend, через команду yarn install
2. Создать файл .env в папке backend
3. В файле .env задать следущие переменные:
   *SECRET*KEY= /_Секретный ключ (набор символов предназначенный для формирования токенов и прочей конфиденциальной информации)_/
   *PORT= /*Порт на котором будет запускаться backend*/
   *MONGODB_URL= /\_URL базы данных mongodDB\*/

NODEMAILER*HOST= /\_E-mail откуда будут высылаться письма пользователям для верификации их аккаунтов*/
NODEMAILER*PORT= /*Порт E-mail*/
NODEMAILER_USER= /*Логин E-mail*/
NODEMAILER_PASS= /*Пароль E-mail\_/

2. Вызвать команду yarn start в папке frontend
3. Вызвать команду yarn nodemon в папке backend
