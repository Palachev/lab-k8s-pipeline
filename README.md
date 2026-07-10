# Pod Frontend 1

Минимальное веб-приложение, которое показывает имя pod/hostname.

## Запуск локально

```bash
npm start
```

Откройте http://localhost:3000

## Сборка Docker-образа

```bash
docker build -t pod-frontend:latest .
```

## Запуск контейнера

```bash
docker run -p 3000:3000 -e POD_NAME=my-pod pod-frontend:latest
```
