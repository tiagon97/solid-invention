<template>
  <div>
    <header>
      <router-link to="Login" class="button">ZALOGUJ SIĘ</router-link>
    </header>
  <div class="home">
    Home
  </div>
  </div>
</template>

<style scoped>

.home{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}

header{
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
}

.button{
  text-decoration: none;
}


</style>
