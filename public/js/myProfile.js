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
      timeStamp:'',
      receiver:'',
      owner_user:''
     },
     messages:[],
     areTyping:[],
     receiverId:'',
     recentMessages:[]
    }
  },
  created: function(){
       //if server emits user joined,update online users array
       this.$socket.on('user joined',function(user){
        console.log('user joined client',user);

            if(this.onlineUsers[user.username] == undefined){
               console.log('inside if');
               //this.onlineUsers[user.id]=user.username;
               var u={
                 username:user.username,
                 id:user.id
               }
             //  this.onlineUsers.push(u);
            }
         
          console.log('this.onlineUsers',this.onlineUsers);
       }.bind(this));


       //if server emits 'chat.message', update messages array
       this.$socket.on('chat.message',function(data){
        console.log('server sends message',data);
          this.messages.push(data.message);
       }.bind(this));



       //if server broadcasts user left, remove leaving user from online users
       this.$socket.on('user left',function(user){
        console.log('user left client',user);
        
          for(var u in this.onlineUsers){
           
             if(this.onlineUsers[u].username === user.username){
              console.log('inside if');
                    //delete this.onlineUsers[u];
                 //   this.onlineUsers.splice(u,1);
             }
                 
          }
           console.log('this.onlineusers',this.onlineUsers);
           
       }.bind(this));
      this.$socket.on('availableusers',function(availableusers){
          this.onlineUsers=availableusers;
           console.log('this.onlineusers',this.onlineUsers);
           
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
      this.message.receiver=this.receiverId;
      this.message.owner_user=this.$store.state.userToken;
      this.$socket.emit('chat.message',this.message);
      this.$axios.post('/api/saveMessage', {
          message:this.message
        })
        .then(function (response) {

        })
        .catch(function (error) {
          
        });
      this.message.type='';
      this.message.user='';
      this.message.timeStamp="";

    },
    sendUserId:function(id){
      console.log('*receiverId',id);
       this.receiverId=id;
       var uniqueId=this.$store.state.userToken+"_"+id;
       
         this.$axios.post('/api/getRecentMessages', {
          uniqueId:uniqueId
        })
        .then(function (response) {
            console.log('this.recentMessages',response.data.response);
            this.recentMessages=response.response.messages;

        })
        .catch(function (error) {
          
        });        


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
    stoppedTyping:function(keycode){
         if(keycode == '13'){
            var index=this.areTyping.indexOf(this.$socket.id);
            if(index >=0){
               this.areTyping.splice(index,1);
            }
         }
    }

  }
  }
  
