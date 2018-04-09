<template>
  <div class="login-wrapper border border-light" >
     

    Welcome madhavi
    <ul id="onlineUsers" >
        <li v-for="user in onlineUsers" :key="user.id" >
       <a @click="sendUserId(user._id)"> {{ user }}</a> 
        </li>
    </ul>
    
    <ul class="" id="messages">
    <li v-for="message in messages" :key="message.id"> {{message.user}} {{message.text}} </li>
    </ul>
    
    
   <form class="form-sendmsg" @submit.prevent="sendMessage()">
   <textarea  v-model="message.text" type="text" id="message" class="form-control" placeholder="Type your message here" required autofocus />
    <button class="btn btn-lg btn-primary btn-block" type="submit" >Send</button>
    </form>
  </div>

</template>

<script src="../public/js/myProfile">
   
</script>
