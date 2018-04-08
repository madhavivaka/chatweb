export default {
  name: 'signup',
  data () {
    return {
      firstName: '',
      lastName: '',
      email:'',
      password:''
    }
  },
  methods: {
    async signup () {
      console.log(this.firstName)
      console.log(this.lastName)
      var reqParams={
          firstName:this.firstName,
          lastName:this.lastName,
          email:this.email,
          password:this.password,
          username:this.email
      }
       const {
        data
      } = await this.$axios.post('/api/userRegister',{reqParams:reqParams})
        if (data) {
            console.log('loginData',data);
            return data;
	    }
    }
  }
  
}
