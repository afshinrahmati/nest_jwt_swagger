### BUILD WITH DOCKER ==>
1) docker-compose build
2) docker-compose up
3) config_MONGO 
``` 
       1> docker exec -it my_mongo mongosh -u root -p ooo1qazQAZAFzz --authenticationDatabase admin
       2> use fobix; // that db name
       3> db.getUsers();
       4>if not user
       5> db.createUser({
       user: "root",
       pwd: "ooo1qazQAZAFzz",
       roles: [{ role: "readWrite", db: "fobix" }],
       });
   ```
4) http://localhost/v1/api


### BUILD WITH_OUT DOCKER
1) yarn
2) yarn start:dev