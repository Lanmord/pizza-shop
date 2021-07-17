# pizza-shop

### Как запустить приложение:

1. Инициализировать пакеты в папке backend и frontend, через команду yarn install
2. Создать файл .env в папке backend
3. В файле .env задать следущие переменные:

```
SECRET_KEY= [Секретный ключ (набор символов, предназначенный для формирования токенов и прочей конфиденциальной информации)]
PORT= [Порт, на котором будет запускаться backend]
MONGODB_URL= [URL базы данных mongodDB]

NODEMAILER_HOST= [Хост предоставляющий SMTP соединение]
NODEMAILER_PORT= [Порт хоста]
NODEMAILER_USER= [Логин E-mail]
NODEMAILER_PASS= [Пароль E-mail]
```

4. Вызвать команду yarn start в папке frontend
5. Вызвать команду yarn nodemon в папке backend

### Дополнительная информация:

Чтобы войти в админ-панель

1. Cоздайте администратора, с использованием POST запроса `http://localhost:[порт backend]/admins/register` передав username и password.
   Например:

```
{
    "username": "admin",
    "password": "parol123"
}
```

2. Страница для входа в админ-панель `http://localhost:3000/admin`
