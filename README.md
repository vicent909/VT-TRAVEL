# VT-TRAVEL

![vt-travel](https://github.com/vicent909/VT-TRAVEL/blob/main/vt.gif)

# About

VT-TRAVEL is a website that sold travel package around the world. It's use AI for comparing between 2 destinations that users pick. And use Midtrans service for payment gateway.

VT-TRAVEL built using Express.js for the backend, and React.js for the frontend.

server:
```
cd server 

npm i 

npx sequelize db:migrate

npx sequelize db:seed:all

npx nodemon app.js
```
server endpoint:

```
for user:
post ('/register')
post ('/login')
post ('/google-login')
get ('/:id')
post ('/user-profile')
get ('/:id/user-profile')
put ('/:id/user-profile')

for travel:
get ('/travels')
get ('/travels/categories')
get ('/travels/random')
post ('/travels')
get ('/travels/userTravel')
post ('/travels/userTravel/:id)
delete ('/travels/userTravel/:id')
post ('/travels/generate-midtrans-token/:id')
post ('/travels/gemini')
get ('/travels/:id')
put ('/travels/:id')
delete ('/travels/:id') 
```

client:
```
cd client

npm i 

npm run dev
```
client endpoint: 
``` 
path: '/'
path: '/login'
path: '/register'
path: '/all-travel'
path: '/detail/:id'
path: '/ask-gemini'
path: '/user-profile'
```


