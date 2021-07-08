<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="form-control" :class="{ 'has-error': $v.userWeight.$error }">
      <label for="user-weigth">Twoja waga</label>
      <input
        type="number"
        id="user-weigth"
        name="user-name"
        v-model.number="userWeight"
        min="0"
        @input="$v.userWeight.$touch()"
      />
      <p
        class="form-input-hint"
        v-if="$v.userWeight.$dirty && !$v.userWeight.required"
      >
        Pole jest wymagane
      </p>
      <p
        class="form-input-hint"
        v-if="$v.userWeight.$dirty && !$v.userWeight.between"
      >
        Niepoprawna waga
      </p>
    </div>
    <div class="form-control" :class="{ 'has-error': $v.userHeight.$error }">
      <label for="user-height">Twój wzrost</label>
      <input
        type="number"
        id="user-height"
        name="user-height"
        v-model.number="userHeight"
        min="0"
        @input="$v.userHeight.$touch()"
      />
      <p
        class="form-input-hint"
        v-if="$v.userHeight.$dirty && !$v.userHeight.required"
      >
        Pole jest wymagane
      </p>
      <p
        class="form-input-hint"
        v-if="$v.userHeight.$dirty && !$v.userHeight.between"
      >
        Niepoprawna wzrost
      </p>
    </div>
    <div class="form-control" :class="{ 'has-error': $v.userAge.$error }">
      <label for="user-age">Twój wiek</label>
      <input
        type="number"
        id="user-age"
        name="user-age"
        v-model.number="userAge"
        min="0"
        @input="$v.userAge.$touch()"
      />
      <p
        class="form-input-hint"
        v-if="$v.userAge.$dirty && !$v.userAge.required"
      >
        Pole jest wymagane
      </p>
      <p
        class="form-input-hint"
        v-if="$v.userAge.$dirty && !$v.userAge.between"
      >
        Niepoprawna wiek
      </p>
    </div>
    <div
      class="form-control"
      :class="{
        'has-error': $v.activityLevel.$dirty && $v.activityLevel.$invalid,
      }"
    >
      <label for="activity-level">Wybierz swój rodzaj aktywności:</label>
      <select
        id="activity-level"
        name="activity-level"
        v-model.number="activityLevel"
        @change="$v.activityLevel.$touch()"
      >
        <option disabled value="">Wybierz rodzaj aktywności</option>
        <option value="0">
          Leżący lub siedzący tryb życia, brak aktywności fizycznej
        </option>
        <option value="1">
          Praca siedząca, aktywność fizyczna na niskim poziomie
        </option>
        <option value="2">Praca nie fizyczna, trening 2 razy w tygodniu</option>
        <option value="3">
          Lekka praca fizyczna, trening 3-4 razy w tygodniu
        </option>
        <option value="4">Praca fizyczna, trening 5 razy w tygodniu</option>
        <option value="5">Ciężka praca fizyczna, codzienny trening</option>
      </select>
    </div>

    <div
      class="form-control"
      :class="{ 'has-error': $v.userGender.$dirty && $v.userGender.$invalid }"
    >
      <h5 class="plec">Wybierz płeć</h5>
      <div>
        <input
          id="female"
          name="female"
          type="radio"
          value="female"
          v-model="userGender"
        />
        <label for="female">Kobieta</label>
      </div>
      <div class="spacja">
        <input
          id="male"
          name="male"
          type="radio"
          value="male"
          v-model="userGender"
        />
        <label for="male">Mężczyzna</label>
      </div>
    </div>
    <div>
      <button :disabled="$v.$invalid">
        Oblicz moje zapotrzebowanie kaloryczne!
      </button>
    </div>
    <span class="result" v-if="kcalResult"
      >Twoje zero kaloryczne wynosi {{ kcalResult }}</span
    >
  </form>
</template>

<script>
import firebase from 'firebase';
import { validationMixin } from 'vuelidate';
import { required, between } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  data() {
    return {
      userWeight: null,
      userHeight: null,
      userAge: null,
      activityLevel: '',
      userGender: '',
      kcalResult: null,
    };
  },
  methods: {
    submitForm() {
      const bmr = this.calculateBmr();
      const activityCoefficient = this.specifyActivityCoefficient();
      this.kcalResult = Math.floor(bmr * activityCoefficient);

      var rootRef = firebase.database().ref().child("users");
            var userID = firebase.auth().currentUser.uid;
            var usersRef = rootRef.child(userID);

            usersRef.ref.set({'kcalResult' : this.kcalResult});
    },
    calculateBmr() {
      if (this.userGender === 'male') {
        return (
          66 +
          13.7 * this.userWeight +
          5 * this.userHeight -
          6.76 * this.userAge
        );
      } else {
        return (
          655 +
          9.6 * this.userWeight +
          1.8 * this.userHeight -
          4.7 * this.userAge
        );
      }
    },
    specifyActivityCoefficient() {
      return 1 + this.activityLevel * 0.2;
    },
  },
  validations: {
    userWeight: {
      required,
      between: between(0, 300),
    },
    userHeight: {
      required,
      between: between(0, 300),
    },
    userAge: {
      required,
      between: between(0, 150),
    },
    activityLevel: {
      required,
    },
    userGender: {
      required,
    },
  },
};
</script>

<style scoped>
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
  color: #000;
}
.result {
  color: crimson;
  font-weight: bold;
  font-size: 18px;
  display: block;
  padding-top: 15px;
  text-align: center;
}
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
  color: #000;
}
h5 {
  font-weight: bold;
  font-size: 12px;
  margin-top: 20px;
  color: #000;
}
input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}
select {
  width: auto;
}
input[type='checkbox'] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}
input[type='checkbox'] + label,
input[type='radio'] + label {
  font-weight: normal;
}
[type='radio']:not(:checked),
[type='radio']:checked {
  /* position: relative; */
  width: 20%;
  opacity: 1;
  pointer-events: auto;
}
button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  margin-top: 20px;
  transform: translateX(30%);
}
button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}

label[for='female'] {
  margin-top: 100px;
}

.spacja {
  padding-top: 10px;
}
</style>
