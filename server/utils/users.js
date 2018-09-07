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

    setNewStatus(uid,status){
      for(var i = 0 ; i < this.users.length; i++){
        if(this.users[i].uid === uid)
          this.users[i].status = status;
      }
    }


  }
  
  module.exports = {Users};
  