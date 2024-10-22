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
get ('/')
get ('/categories') 
get ('/random') 
post ('/') 
get ('/userTravel') 
post ('/userTravel/:id) 
delete ('/userTravel/:id') 
post ('/generate-midtrans-token/:id')
post ('/gemini') 
get ('/:id') 
put ('/:id')  
delete ('/:id')  
```

client:
```
cd client

npm i 

npm run dev
```
