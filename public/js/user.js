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
            // this.$router.push("/myProfile");
	       }
    }
  }
  
}
