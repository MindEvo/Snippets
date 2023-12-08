<script setup>
</script>

<template>
  <div class="wrapper">
    <img src="/logo.png" alt="Snippets Logo" class="logo"/>
    <RouterLink class="login-link" to="/login">Login</RouterLink>
  </div>

</template>

<style scoped>
.logo {
    width: 500px; /* Adjust the size as needed */
    height: auto;
    display: block;
    margin: 0 auto;
    padding-bottom: 20px;
}
.header {
    text-align: center;
    color: #f8f8ff;
    padding-bottom: 20px;
}
h1.header {
    font-size: 18px;
}
.login {
    display: flex;
    justify-content: center;
    color: #f8f8ff;
}

.login-link {
    display: flex;
    justify-content: center;
    color: #b492ad;
    text-decoration: underline;
}

</style>