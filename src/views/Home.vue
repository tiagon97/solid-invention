<template>
  <div class="home">
     <img alt="calculator" src="../assets/calculator.png">
    <p>Kalkulator do liczenia kalorii</p>
    <button class="btn-outline" @click="$router.push('register')">Dołącz do nas</button>
  </div>
  
</template>

<style scoped>

div{
    padding:0;
    margin:0;
}

.home{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  height: 90vh;
  
}

.btn-outline{
  outline: none;
  display: block;
  border: 0;
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  padding: 16px 30px;
  border-radius: 30px;
  background: #fb716e;
  color: white;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  margin-top: 150px;
  margin-left: -380px;

}

p{
  color: #fff;
}



</style>
