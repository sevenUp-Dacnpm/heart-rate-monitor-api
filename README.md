# Command    
```npm start```
>[Host](https://heart-rate-monitor-api.herokuapp.com) 
# API
## Verify User
GET [/verify_token]()
**Require Header 'Authorization'**
* Response
```json
{
    "user": {
        "profile": {
            "dob": "2021-01-01T00:00:00.000Z",
            "fullName": "Danh Phi Long",
            "gender": "male",
            "weight": 100,
            "height": 100
        },
        "_id": "60a29be96b48020f0ceeb155",
        "username": "long9ka",
        "password": "$2b$10$E8d...",
        "__v": 0
    }
}
```
* Error (401 Unauthorized)
```json
{
    "msg": "authorization denied"
}
```
## Register
POST [/register]()
* Request
```json
{
	"username": "long9ka",
	"password": "123456",
	"profile": {
		"fullName": "Danh Phi Long",
		"gender": "male",
		"weight": 100,
		"height": 100,
		"dob": "2021-01-01"
	}
}
```
* Response
```json
{
    "user": {
        "profile": {
            "dob": "2021-01-01T00:00:00.000Z",
            "fullName": "Danh Phi Long",
            "gender": "male",
            "weight": 100,
            "height": 100
        },
        "_id": "60a29be96b48020f0ceeb155",
        "username": "long9ka",
        "password": "$2b$10$...",
        "__v": 0
    }
}
```
* Error (500 Server Error)
```json
{
    "msg": "server error"
}
```
## Login
POST [/login]()
* Request
```json
{
	"username": "long9ka",
	"password": "123456"
}
```
* Response
```json
{
    "user": {
        "profile": {
            "dob": "2021-01-01T00:00:00.000Z",
            "fullName": "Danh Phi Long",
            "gender": "male",
            "weight": 100,
            "height": 100
        },
        "_id": "60a29be96b48020f0ceeb155",
        "username": "long9ka",
        "password": "$2b$10$E8d...",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
* Error (400 Bad Request)
```json
{
    "msg": "invalid credentials"
}
```
## Get Users
GET[/users]()
**Require Header 'Authorization'**
* Response
```json
{
    "users": [
        {
            "profile": {
                "dob": "2021-01-01T00:00:00.000Z",
                "fullName": "Danh Phi Long",
                "gender": "male",
                "weight": 100,
                "height": 100
            },
            "_id": "60a29be96b48020f0ceeb155",
            "username": "long9ka",
            "password": "$2b$10$E8d...",
            "__v": 0
        }
    ]
}
```
## Get User By ID
GET[/users/:id]()
**Require Header 'Authorization'**
* Response
```json
{
    "user": {
        "profile": {
            "dob": "2021-01-01T00:00:00.000Z",
            "fullName": "Danh Phi Long",
            "gender": "male",
            "weight": 100,
            "height": 100
        },
        "_id": "60a29be96b48020f0ceeb155",
        "username": "long9ka",
        "password": "$2b$10$E8d...",
        "__v": 0
    }
}
```
## Create Record
POST [/heart_rate_records]()
**Require Header 'Authorization'**
* Request
```json
{
	"heartRate": 100,
	"state": "ok"
}
```
* Response
```json
{
    "heartRate": {
        "date": "2021-05-17T16:52:54.550Z",
        "_id": "60a29f698ff6de0fb9f12a12",
        "userId": "60a29be96b48020f0ceeb155",
        "heartRate": 100,
        "__v": 0
    }
}
```
## Get Records
GET [/heart_rate_records]()
**Require Header 'Authorization'**
* Response
```json
{
    "heartRates": [
        {
            "date": "2021-05-17T16:52:54.550Z",
            "_id": "60a29f698ff6de0fb9f12a12",
            "userId": "60a29be96b48020f0ceeb155",
            "heartRate": 100,
            "__v": 0
        },
        {
            "date": "2021-05-17T16:56:34.241Z",
            "_id": "60a2a052a94b710fe761953e",
            "userId": "60a29be96b48020f0ceeb155",
            "heartRate": 200,
            "__v": 0
        }
    ]
}
```
## Get Record By ID
GET [/heart_rate_records/:id]()
**Require Header 'Authorization'**
* Response
```json
{
    "heartRate": {
        "date": "2021-05-17T16:56:34.241Z",
        "_id": "60a2a052a94b710fe761953e",
        "userId": "60a29be96b48020f0ceeb155",
        "heartRate": 200,
        "__v": 0
    }
}
```
## Get Record By ID
GET [/users/profile]()
**Require Header 'Authorization'**
* Response
```json
{
	"fullName": "Quan Hai 8",
	"gender": "female"
}
```
```json
{
    "profile": {
        "dob": "2021-06-15T15:40:32.740Z",
        "fullName": "Quan Hai 8",
        "gender": "female"
    },
    "_id": "60c8c49ddaaea80015a08c83",
    "username": "quanghai29",
    "password": "$2b$10$vVyK6MbY4bT32Q82Gwxh0.QxpM/cssx5ZOy5yYOGRcR/NyINws9Q.",
    "__v": 0
}
```
