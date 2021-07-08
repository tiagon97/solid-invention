<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel white black-text center">
            <h4>ZALOGUJ SIĘ</h4>
            <form action="index.html">
              <div
                class="input-field"
                :class="{ 'has-error': $v.email.$dirty && $v.email.$invalid }"
              >
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  @input="$v.email.$touch()"
                />
                <label class="black-text" for="email">Email:</label>
                <p
                  class="form-input-hint"
                  v-if="$v.email.$dirty && !$v.email.required"
                >
                  Pole jest wymagane
                </p>
                <p
                  class="form-input-hint"
                  v-if="$v.email.$dirty && !$v.email.email"
                >
                  Adres email jest niepoprawny
                </p>
              </div>
              <div
                class="input-field"
                :class="{
                  'has-error': $v.password.$dirty && $v.password.$invalid,
                }"
              >
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  @input="$v.password.$touch()"
                />
                <label class="black-text" for="password">Hasło:</label>
                <p
                  class="form-input-hint"
                  v-if="$v.password.$dirty && !$v.password.required"
                >
                  Pole jest wymagane
                </p>
                <p
                  class="form-input-hint"
                  v-if="$v.password.$dirty && !$v.password.minLength"
                >
                  Hasło musi mieć minimalnie 3 znaki
                </p>
                <p
                  class="form-input-hint"
                  v-if="$v.password.$dirty && !$v.password.maxLength"
                >
                  Hasło może mieć maksymalnie 20 znaków
                </p>
              </div>
              <router-link to="Register" class="reg"
                >Nie masz konta? Zarejestruj się</router-link
              >
              <br />
              <button @click="login" class="btn btn-large white black-text">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { validationMixin } from 'vuelidate';
import {
  required,
  minLength,
  maxLength,
  email,
} from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  name: 'login',
  data: function() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            alert(`Jesteś zalogowany jako ${user.user.email}`);
            console.log(user);
            this.$router.push('/profile');
          },
          (err) => {
            alert(err.message);
          }
        );
      e.preventDefault();
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(20),
    },
  },
};
</script>

<style>
div {
  padding: 0;
  margin: 0;
}

.row {
  margin-top: 100px;
}

.btn {
  font-size: 20px;
  margin-top: 30px;
}

.login {
  height: 460px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}

h4 {
  margin-bottom: 50px;
}

.reg {
  font-size: 1rem;
}

form {
  text-decoration: none;
}
</style>
