<template>
    <nav>
        <div class="nav">
            <div class="container">
                <ul class="right">
                    <li v-if="isLoggedIn"><span class="email black-text">{{currentUser}}</span></li>
                   <li v-if="!isLoggedIn"><router-link to="Login" class='z'>ZALOGUJ SIĘ</router-link></li>
                   <li v-if="isLoggedIn"><button v-on:click="logout" class="logout">Logout</button></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/');
        });
    }
  }
};
</script>

<style scoped>

nav{
    background: #fff;
}

.z{
    color: #000;
}

.logout{
  box-shadow:inset 0px 39px 0px -24px #e67a73;
	background-color:#e4685d;
	border-radius:4px;
	border:1px solid #ffffff;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	padding:6px 15px;
	text-decoration:none;
	text-shadow:0px 1px 0px #fb716e;
  margin-left: 10px;
}


</style>