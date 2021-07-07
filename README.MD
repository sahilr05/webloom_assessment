# Domain finder

(built as a part of webloominc assessment)

backend - django-rest-framework

frontend - react

Download Postman API collection from [here](https://drive.google.com/file/d/1YYcB6iCBG3-SWJ1D87jQqvhE8gCYr2qa/view?usp=sharing)

## API collection includes
#### Note: Authorization header required to search domain and view history
##### View all APIs :- ```http://127.0.0.1:8000/swagger-ui/```
* Create Account
* Login
* Search Domain
* View Search History

## Starting up

* Move to backend directory and run the following command to install dependencis and start backend server
```
pip install -r requirements.txt
python manage.py runserver
```
* Move to frontend directory and run the following command to install dependencies and start frontend server
```
npm install
npm start
```
