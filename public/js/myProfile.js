export default {
  sockets:{
    connect: function(){
      console.log('socket connected********')
    }
  },
  name: 'sendMessage',
  data () {
    return {
     onlineUsers:this.getOnlineUsers().data,
     message:''
    }
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
      var msgBody={
        message:this.message,
        senderId:'',
        receiverId:''
      }
      this.$socket.on('new message',function(msgBody){
          console.log('hello');
       });

    }
  }
  }
  
