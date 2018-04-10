export default {
  /**sockets:{
    connect: function(){
      console.log('socket connected********')
      //this.$socket.emit('chat message', this.message);
    }
  },*/
  name: 'sendMessage',
  data () {
    return {
     onlineUsers:[],
     message:{
      type:'',
      action:'',
      user:'',
      text:'',
      timeStamp:''
     },
     messages:[],
     areTyping:[]
    }
  },
  created: function(){
       //if server emits user joined,update online users array
       this.$socket.on('user joined',function(socketId){
        console.log('user joined client',socketId);
        this.$axios.post('/api/getOnlineUsers').then(function(response){
          console.log('users response',response.data.data);
          for(var i in response.data.data){
            //if(this.onlineUsers.indexOf(response.data[i].username) <= -1){
              console.log('username',response.data.data[i].username)
               //this.onlineUsers.push(response.data.data[i].username);
            //}
          }
        }.bind(this));
         
        this.onlineUsers.push(socketId);
       }.bind(this));


       //if server emits 'chat.message', update messages array
       this.$socket.on('chat.message',function(message){
        console.log('server sends message');
          this.messages.push(message);
       }.bind(this));

       //if server broadcasts user left, remove leaving user from online users
       this.$socket.on('user left',function(socketId){
        console.log('user left client',socketId);
         console.log('this.onlineusers',this.onlineUsers);
           var index=this.onlineUsers.indexOf(socketId);
           if(index >= 0){
              this.onlineUsers.splice(index,1);
           }
       }.bind(this));
  },
  methods: {
    async getOnlineUsers(){
      console.log('*&&&&&&&&&&&&&&&&&');
       const {
        data
      } = await this.$axios.post('/api/getOnlineUsers')
        if (data) {
            console.log('users',data.data);
            this.onlineUsers=data.data;
           // return data;
         }
    },
     sendMessage(){
      console.log('this.message',this.message);
      this.message.type='chat';
      this.message.user=this.$socket.id;
      this.message.timeStamp="Today";
      this.$socket.emit('chat.message',this.message);

       this.message.type='';
      this.message.user='';
      this.message.timeStamp="";

      var msgBody={
        message:this.message,
        senderId:'',
        receiverId:''
      }
    
    

    },
    sendUserId:function(id){
      console.log('*8888888888888888',id);
    },
    userIsTyping:function(username){
      if(this.areTyping.indexOf(username)){
        console.log('areTyping');
        return true;
      }
       return false;
    },
    usersAreTyping:function(){
      console.log('usersAreTyping')
      if(this.areTyping.indexOf(this.$socket.id) <= -1){
        this.areTyping.push(this.$socket.id);
        this.$socket.emit('user typing',this.$socket.id);
      }
    },
    stoppedTyping:function(){

    }
  }
  }
  
