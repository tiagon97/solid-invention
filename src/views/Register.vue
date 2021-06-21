<template>
  <div>
    <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel white black-text center">
          <h4>ZAREJESTRUJ SIĘ</h4>
          <form action="index.html">
            <div class="input-field">
              <input type="email" id="email" v-model="email">
              <label class="black-text" for="email">Email:</label>
            </div>
            <div class="input-field">
              <input type="password" id="password" v-model="password">
              <label class="black-text" for="password">Hasło:</label>
            </div>
            <router-link to="Login" class="reg">Masz już konto? Zaloguj się</router-link>
            <br>
            <button @click="register" class="btn btn-large white black-text">REGISTER</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'register',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Konto stworzone dla ${user.user.email}`);
            this.$router.push('/login');
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style>
div{
    padding:0;
    margin:0;
}

.row{
  margin-top: 100px;
}

.btn{
  font-size: 20px;
  margin-top: 30px;
}

.login{
  height: 400px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}

h4{
  margin-bottom: 50px;
}

.reg{
  font-size: 1rem;
}


</style>