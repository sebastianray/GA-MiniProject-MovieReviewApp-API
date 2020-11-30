# API Documentation Team C

## Standard Status Response
```
200 - OK                      ---> Call API success
201 - CREATED                 ---> Post success
400 - BAD REQUEST             ---> Error on client side
401 - UNAUTHORIZED            ---> User not authorized to the req.bodyuest
403 - FORBIDDEN               ---> User not allowed to access
404 - NOT FOUND               ---> Req.bodyuest endpoint not found
500 - INTERNAL SERVER ERROR   ---> Error on server side
502 - BAD GATEWAY             ---> Invalid response from another req.bodyuest
```
==============================================================


## Home Page
```
.GET
https://gentle-garden-05760.herokuapp.com/

```
==============================================================


## GROUP: user

**list user**
```
.GET
https://gentle-garden-05760.herokuapp.com/users/

req.header: 
{
   "access_token": <token>
} 

req.body: -

res:
200:  {
         "id": 1,
         "username": "najib@email.com",
         "password": "$2b$05$twh/FXilT/gKABmK1qieIO38ayQxt.pAzsZ0mNw46op4V7TyW8Tna",
         "name": "najib",
         "image": "uploads/1602188451677-22020-10-0614:26:51.jpg",
         "role": "Admin",
         "createdAt": "2020-10-08T20:16:23.803Z",
         "updatedAt": "2020-10-08T20:20:51.924Z"
      }

500:  {error}
```


**login user**
```
.POST
https://gentle-garden-05760.herokuapp.com/users/login

req.body:
{
   "username" : "<username>"
   "password" : "<password>"
}

res:
200:  {
         "access_token": "token"
      }

400:  {
         "Password is not the same." 
      } 

404:  {
         "User is not found." 
      }      

500:  {error}
```


**register user**
```
.POST
https://gentle-garden-05760.herokuapp.com/users/register

req.body:
{
   "username" : "<username>"
   "password" : "<password>"
   "name" : "<name>"
   "image" : "<image yang di upload>"
   "role" : "<Member>" ===> default!!!
}

res:
201:  {
         "access_token": "token" ===> otomatis login!
      }

409:  {
         "Email already registered!"
      }

500:  {error}
```


**profile user**
```
.GET
https://gentle-garden-05760.herokuapp.com/users/profile/

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:  {
         "id": 1,
         "username": "najib@email.com",
         "name": "najib",
         "image": "uploads/1602191403303-32020-10-0614:26:51.jpg",
         "role": "Admin",
         "iat": 1602241227
      }

404:  {
         "User not found."
      } 
 
500:  {error}
```


**edit profile-user**
```
.PUT
https://gentle-garden-05760.herokuapp.com/users/editprofile/

req.header: 
{
   "access_token": <token>
}

req.body:
{
   "name" : "<name>"
   "image" : "<image>"
}

res:
200:  {
         "msg": "This user has been updated!"
      }

500: {error}
```


**delete user**
```
.DELETE
https://gentle-garden-05760.herokuapp.com/users/delete/:id

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
202:  {
         "msg": "This user has been deleted!"
      }

500: {error}
```

==============================================================


## GROUP: movie

**list all movies**
```
.GET
https://gentle-garden-05760.herokuapp.com/movies/

req.body: -

res:
200:  {
         "id": 1,
         "title": "Mulan",
         "synopsis": "A young Chinese maiden disguises herself as a male warrior.",
         "genre": 1,
         "poster": "https://www.joblo.com/assets/images/joblo/posters/2019/12/mulanliveposter913_thumb.jpg",
         "trailer": "https://www.youtube.com/watch?v=KK8FHdFluOQ",
         "rated": "G",
         "voteCount": 0,
         "releaseDate": "4-11-2020",
         "language": "English",
         "createdAt": "2020-10-09T18:30:13.182Z",
         "updatedAt": "2020-10-09T18:30:13.182Z"
      }

500:  {error}
```


**list movies - 9 movies per page**
```
.GET
https://gentle-garden-05760.herokuapp.com/movies/:page

req.body: -

res:
200:  {
         "id": 1,
         "title": "Mulan",
         "synopsis": "A young Chinese maiden disguises herself as a male warrior.",
         "genre": 1,
         "poster": "https://www.joblo.com/assets/images/joblo/posters/2019/12/mulanliveposter913_thumb.jpg",
         "trailer": "https://www.youtube.com/watch?v=KK8FHdFluOQ",
         "rated": "G",
         "voteCount": 0,
         "releaseDate": "4-11-2020",
         "language": "English",
         "createdAt": "2020-10-09T18:30:13.182Z",
         "updatedAt": "2020-10-09T18:30:13.182Z"
      }

500:  {error}
```


**search movies**
```
.POST
https://gentle-garden-05760.herokuapp.com/movies/search

req.body:
{
   "title" : "<title>"
}

res:
200:  {
         "id": 1,
         "title": "Mulan",
         "synopsis": "A young Chinese maiden disguises herself as a male warrior.",
         "genre": 1,
         "poster": "https://www.joblo.com/assets/images/joblo/posters/2019/12/mulanliveposter913_thumb.jpg",
         "trailer": "https://www.youtube.com/watch?v=KK8FHdFluOQ",
         "rated": "G",
         "voteCount": 0,
         "releaseDate": "4-11-2020",
         "language": "English",
         "createdAt": "2020-10-09T18:30:13.182Z",
         "updatedAt": "2020-10-09T18:30:13.182Z"
      }

404:  {
         "title not found!"
      }

500:  {error}
```


**detail movie**
```
.GET
https://gentle-garden-05760.herokuapp.com/movies/details/:id

req.body: -

res:
200:  {
         "id": 1,
         "title": "Mulan",
         "synopsis": "A young Chinese maiden disguises herself as a male warrior.",
         "genre": 1,
         "poster": "https://www.joblo.com/assets/images/joblo/posters/2019/12/mulanliveposter913_thumb.jpg",
         "trailer": "https://www.youtube.com/watch?v=KK8FHdFluOQ",
         "rated": "G",
         "voteCount": 0,
         "releaseDate": "4-11-2020",
         "language": "English",
         "createdAt": "2020-10-09T18:30:13.182Z",
         "updatedAt": "2020-10-09T18:30:13.182Z"
      }

404:  {
         "Movie not found!"
      }

500:  {error}
```


**genre movie**
```
.GET
https://gentle-garden-05760.herokuapp.com/movies/genre/:genre

req.body: -

res:
200:  {
         "id": 1,
         "title": "Mulan",
         "synopsis": "A young Chinese maiden disguises herself as a male warrior.",
         "genre": 1,
         "poster": "https://www.joblo.com/assets/images/joblo/posters/2019/12/mulanliveposter913_thumb.jpg",
         "trailer": "https://www.youtube.com/watch?v=KK8FHdFluOQ",
         "rated": "G",
         "voteCount": 0,
         "releaseDate": "4-11-2020",
         "language": "English",
         "createdAt": "2020-10-09T18:30:13.182Z",
         "updatedAt": "2020-10-09T18:30:13.182Z"
      }

404:  {
         "Movie not found!"
      }

500:  {error}

NOTE!!! 
Genre dalam bentuk angka 1 - 5, sebagai berikut:
1 = Action
2 = Animation
3 = Horror
4 = Thriller
5 = Commedy
```


**add movie**
```
.POST
https://gentle-garden-05760.herokuapp.com/movies/add

req.header: 
{
   "access_token": <token>
}

req.body:
{
   "title": "Bad Boys II",
   "synopsis": "Two loose-cannon narcotics cops investigate the flow of Ecstasy into Florida from a Cuban drug cartel.",
   "genre": 1,
   "poster": "https://www.joblo.com/assets/images/oldsite/posters/images/full/2003-bad_boys_two-2_thumb.jpg",
   "trailer": "https://www.youtube.com/watch?v=ZnOQF3hSGk0",
   "rated": "R",
   "voteCount": 0,
   "releaseDate": "18-7-2003",
   "language": "English"
}

res:
201:  {
        "id": 2,
        "title": "Bad Boys II",
        "synopsis": "Two loose-cannon narcotics cops investigate the flow of Ecstasy into Florida from a Cuban drug cartel.",
        "genre": 1,
        "poster": "https://www.joblo.com/assets/images/oldsite/posters/images/full/2003-bad_boys_two-2_thumb.jpg",
        "trailer": "https://www.youtube.com/watch?v=ZnOQF3hSGk0",
        "rated": "R",
        "voteCount": 0,
        "releaseDate": "18-7-2003",
        "language": "English",
        "createdAt": "2020-10-09T18:30:13.182Z",
        "updatedAt": "2020-10-09T18:30:13.182Z"
      }

500:  {error}
```


**delete movie**
```
.DELETE
https://gentle-garden-05760.herokuapp.com/movies/delete/:id

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:  {
         "Movie deleted"
      }

500:  {error}
```


**edit movie**
```
.PUT
https://gentle-garden-05760.herokuapp.com/movies/edit/:id

req.header: 
{
   "access_token": <token>
}

req.body:
{
   "title" : "<title>"
   "synopsis" : "<synopsis>"
   "genre" : "<genre>"
   "poster" : "<poster>"
   "trailer" : "<trailer>"
   "rated" : "<rated>"
   "vouteCount" : "<vouteCount>"
   "releaseDate" : "<releaseDate>"
   "language" : "<language>"
}

res:
200:  {
         "This Movie Updated"
      }

500:  {error}
```

==============================================================


## GROUP: review

**list review**
```
.GET
https://gentle-garden-05760.herokuapp.com/review/list

req.header: 
{
   "access_token": <token>
}

req.body: - 

res:
200:  {
        "id": 1,
        "UserId": 1,
        "MovieId": 2,
        "rating": 9,
        "comment": "will smith mantap!",
        "createdAt": "2020-10-09T18:52:17.407Z",
        "updatedAt": "2020-10-09T18:52:17.407Z"
      }

500:  {error}
```


**add review**
```
.POST
https://gentle-garden-05760.herokuapp.com/review/movie/:MovieId

req.header: 
{
   "access_token": <token>
}

req.body:
{
   "rating" : "<rating>"
   "comment" : "<comment>"
}

res:
201:  {
         "id": 1,
         "UserId": 1,
         "MovieId": 1,
         "rating": 7,
         "comment": "Mulan cantik",
         "updatedAt": "2020-10-09T18:52:54.739Z",
         "createdAt": "2020-10-09T18:52:54.739Z"
      }

409:  {
         "Can't review this movie again!"
      }

500:  {error}
```


**list review in movie**
```
.GET
https://gentle-garden-05760.herokuapp.com/review/movie=:MovieId/:page

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:  {
         "Movie": "Mulan",
         "Rating": {
            "avgrating": "7.0000000000000000"
         },
         "votecount": {
            "votecount": "1"
         },
         "Comment": [
            {
                  "rating": 7,
                  "comment": "Mulan cantik",
                  "User": null
            }
         ]
      }

404:  {
         "Movie not found"
      }

500:  {error}
```

**list review in user**
```
.GET
https://gentle-garden-05760.herokuapp.com/review/user/:UserId

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:  {
         "user": {
            "name": najib,
            "image": "/uploads/1602270067179-02020-10-0209:01:05.jpg"
         },
         "reviews": [
            {
                  "id": 1,
                  "rating": 9,
                  "comment": "will smith mantap!",
                  "Movie": {
                     "title": "Bad Boys II"
                  }
            },
            {
                  "id": 2,
                  "rating": 7,
                  "comment": "Mulan cantik",
                  "Movie": {
                     "title": "Mulan"
                  }
            }
         ]
      }

404:  {
         "User not found"
      }

500:  {error}
```


**delete review**
```
.DELETE
https://gentle-garden-05760.herokuapp.com/review/:id

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:  {
         "Review deleted"
      }

500:  {error}
```

**edit review**
```
.PUT
https://gentle-garden-05760.herokuapp.com/review/:id

req.header: 
{
   "access_token": <token>
}

req.body:
{
   "rating" : "<rating>"
   "comment" : "<comment>"
}

res:
200:  {
         "Update done!"
      }

(jika update belum diterima)
200:  {
         "Update not done!"
      }

500:  {error}
```

==============================================================
