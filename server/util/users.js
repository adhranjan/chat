class Users{
  constructor(){
    this.users = [];
  }

  addUser(id,name,room){
      var user = {id,name,room}
      this.users.push(user)
      return user
  }

  removeUser(id){// return remove that was removed
      var user = this.getUser(id);
      if(user){
          this.users = this.users.filter((user) => user.id !==id)
      }
      return user;
  }

  getUser(id){//return user
      return this.users.filter((user)=> user.id === id)[0]
  }

  getUserList(room){// look for user in given room
    var users = this.users.filter((user)=>{
      return user.room === room
    })
    var namesArray = users.map((user)=>user.name);
    return namesArray;
  }
}


class Rooms{
  constructor(){
    this.rooms = [];
  }

  addRoom(name){
    if(!this.rooms.includes(name)){
      this.rooms.push(name)
    }
  }

  removeRoom(users,name){
    if(users.filter((user)=> user.room === name).length === 0){
          this.rooms = this.rooms.filter((room) => room !==name)
      }
  }

  getAllActiveRoom(){
    return this.rooms
  }


}

module.exports = {Users,Rooms}
