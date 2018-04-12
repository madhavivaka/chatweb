export default {
  name: 'Login',
  name:'onlineUsers',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      console.log(this.email)
      console.log(this.password)
       const {
        data
      } = await this.$axios.post('/api/userLogin',{uname:this.email,password:this.password})
        if (data) {
            console.log('loginData',data);
             var user={
              username:this.email,
              id:data.data._id
             }
            this.$store.commit('SET_USER', user);

             this.$socket.emit('user joined',user);
             this.$router.push("/myProfile");
	       }
    }
  }
  
}
