export default {
  sockets:{
    connect: function(){
      console.log('socket connected********')
      //this.$socket.emit('chat message', this.message);
    }
  },
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
        this.$axios.get('/onlineusers').then(function(response){
          for(var i in response.data){
            if(this.onlineUsers.indexOf(i) <= -1){
               this.onlineusers.push(i);
            }
          }
        }.bind(this));
         
        this.onlineUsers.push(socketId);
       }.bind(this));


       //if server emits 'chat.message', update messages array
       this.$socket.on('chat.message',function(message){
          this.messages.push(message);
       }.bind(this));

       //if server broadcasts user left, remove leaving user from online users
      /* this.$socket.on('user left',function(socketId){
        console.log('user left client',socketId);
         console.log('this.onlineusers',this.onlineusers);
           var index=this.onlineusers.indexOf(socketId);
           if(index >= 0){
              this.onlineusers.splice(index,1);
           }
       }.bind(this));*/
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
    
     // this.$socket.emit('chat message', this.message);

    },
    sendUserId:function(id){
      console.log('*8888888888888888',id);
    },
    userIsTyping:function(username){

    },
    usersAreTyping:function(){

    },
    stoppedTyping:function(){

    }
  }
  }
  
