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
      var user = this.getUser(socketId);
  
      if(user){
        this.users = this.users.filter((user) => user.socketId !== socketId);
      }
  
      return user;
    }
  
    getUser(socketId){
      return this.users.filter((user) => user.socketId === socketId)[0];
    }
  
    getUserList(){
      return this.users;
    }
  }
  
  module.exports = {Users};
  