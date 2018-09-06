class Users{
    constructor(){
      this.users = [];
    }
  
    addUser(socketId,uid,name,status){
      var user = {socketId,uid,name,status};
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

    setNewStatus(uid,status){
      for(var i = 0 ; i < this.users.length; i++){
        if(this.users[i].uid === uid)
          this.users[i].status = status;
      }
    }
  }
  
  module.exports = {Users};
  