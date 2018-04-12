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
       this.$socket.on('user joined',function(user){
        console.log('user joined client',user);

            if(this.onlineUsers[user.username] == undefined){
               console.log('inside if');
               this.onlineUsers.push(user.username);
            }
         
      
       }.bind(this));


       //if server emits 'chat.message', update messages array
       this.$socket.on('chat.message',function(message){
        console.log('server sends message');
          this.messages.push(message);
       }.bind(this));

       //if server broadcasts user left, remove leaving user from online users
       this.$socket.on('user left',function(user){
        console.log('user left client',user);
         console.log('this.onlineusers',this.onlineUsers);
           var index=this.onlineUsers.indexOf(user.username);
           if(index >= 0){
              this.onlineUsers.splice(index,1);
           }
       }.bind(this));

        this.$socket.on('user typing',function(username){
           this.areTyping.push(username);
        }.bind(this));
  },
  methods: {
    
     sendMessage(){

      this.message.type='chat';
      this.message.user=this.$store.state.userName;
      this.message.timeStamp="Today";
      this.$socket.emit('chat.message',this.message);

      this.message.type='';
      this.message.user='';
      this.message.timeStamp="";

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
         if(keycode == '13'){
            var index=this.areTyping.indexOf(this.$socket.id);
            if(index >=0){
               this.areTyping.splice(index,1);
            }
         }
    }
  }
  }
  
