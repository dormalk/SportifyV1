class Users{
    constructor(){
      this.users = [];
    }
  
    addUser(socketId,uid,name){
      var user = {socketId,uid,name};
      this.users.push(user);
      return user;
    }
  
    removeUser(uid){
      var user = this.getUser(uid);
  
      if(user){
        this.users = this.users.filter((user) => user.uid !== uid);
      }
  
      return user;
    }
  
    getUser(uid){
      return this.users.filter((user) => user.uid === uid)[0];
    }
  
    getUserList(){
      return this.users;
    }
  }
  
  module.exports = {Users};
  