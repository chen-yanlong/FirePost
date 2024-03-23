
# test post photo
$ curl -X POST -F "photo=C:\Users\alan9\Desktop\repos\FirePost\packages\backend\src\testphoto\testphoto.jpg" -F "user_address=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" http://localhost:8000/api/post

# test get balance
$ curl "http://localhost:8000/api/balance?user_address=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

# test get posts
$ curl http://localhost:8000/api/posts

# test get likeNum
$ curl "http://localhost:8000/api/likeNum?user_address=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

# test like
$ curl -X POST -H "Content-Type: application/json" -d '{"num": 1, "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"}' http://localhost:8000/api/like  
