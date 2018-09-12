class Users{
    constructor(){
      this.users = [];
    }
  
    addUser(socketId,uid,name){
      var user = {socketId,uid,name};
      this.users.push(user);
      return user;
    }
  
    removeUser(socketId){
      var user = this.getUserBySocket(socketId);
  
      if(user){
        this.users = this.users.filter((user) => user.socketId !== socketId);
      }
  
      return user;
    }
  
    getUserBySocket(socketId){
      return this.users.filter((user) => user.socketId === socketId)[0];
    }

    getUserById(uid){
      return this.users.filter((user) => user.uid === uid)[0];
    }


    getUserList(){
      return this.users;
    }

  }
  
  module.exports = {Users};
  