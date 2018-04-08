<template>
  <div class="login-wrapper border border-light">
    <form class="form-signup" @submit.prevent="signup">
      <h2 class="form-signup-heading">Please sign up</h2>
      <label for="firstName" class="sr-only">First Name</label>
      <input v-model="firstName" type="text" id="firstName" class="form-control" placeholder="First Name" required>

      <label for="lastName" class="sr-only">Last Name</label>
      <input v-model="lastName" type="text" id="lastName" class="form-control" placeholder="lastName" required>

      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>

      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
    </form>
  </div>
</template>

<script src="../public/js/userRegister">
   
</script>
