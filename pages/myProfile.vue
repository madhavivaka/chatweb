<template>
  <div class="login-wrapper border border-light" >
      <form class="form-sendmsg" @submit.prevent="sendMessage">

    Welcome madhavi
    <ul id="onlineUsers" >
        <li v-for="user in onlineUsers" :key="user.id">
       <a> {{ user.username }}</a> 
        </li>
    </ul>
    <textarea  v-model="message" type="text" id="message" class="form-control" placeholder="Type your message here" required autofocus />
    <button class="btn btn-lg btn-primary btn-block" type="submit" >Send</button>
    </form>
  </div>

</template>

<script src="../public/js/myProfile">
   
</script>
