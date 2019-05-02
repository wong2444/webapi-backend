# youtube
> https://www.youtube.com/watch?v=4Sjap9Pw9Ng
# webapi-backend
>This is a blog restful api
>>http://127.0.0.1:3000 is the request link
# api manual
+ `GET 127.0.0.1:3000/articles` to get all articles
+ `GET 127.0.0.1:3000/articles/:articleId` to get detail article
+ `POST 127.0.0.1:3000/articles`to create a new article `String title, String body` is needed
+ `PUT 127.0.0.1:3000/articles/:articleId` to update a artcle `String title, String body` is needed
+ `DELETE 127.0.0.1:3000/articles/:articleId` to delete a artcle
+ `POST 127.0.0.1:3000/comments`to create a new comment `String body` is needed
+ `PUT 127.0.0.1:3000/comments/:commentId` to update a comment
+ `DELETE 127.0.0.1:3000/comments/:articleId` to delete a comment
+ `POST 127.0.0.1:3000/user/login` to login `String email, String password` is needed
+ `POST 127.0.0.1:3000/user/signup` to signup `String email, String name, String password` is needed
+ `POST 127.0.0.1:3000/user/` to add user favour 
+ `DELETE 127.0.0.1:3000/user/` to delete user favour
+ `GET 127.0.0.1:3000/user/` to get user favour
