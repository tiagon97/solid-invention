<template>
  <div>
    <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel white black-text center">
          <h4>ZALOGUJ SIĘ</h4>
          <form action="index.html">
            <div class="input-field">
              <input type="email" id="email" v-model="email">
              <label class="black-text" for="email">Email:</label>
            </div>
            <div class="input-field">
              <input type="password" id="password" v-model="password">
              <label class="black-text" for="password">Hasło:</label>
            </div>
            <router-link to="Register" class="reg">Nie masz konta? Zarejestruj się</router-link>
            <br>
            <button @click="login" class="btn btn-large white black-text">LOGIN</button>
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
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Jesteś zalogowany jako ${user.user.email}`);
            this.$router.push('/profile');
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

form{
  text-decoration: none;
}


</style>