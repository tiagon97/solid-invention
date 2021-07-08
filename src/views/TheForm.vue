<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="form-control">
      <label for="user-weigth">Twoja waga</label>
      <input
        type="number"
        id="user-weigth"
        name="user-name"
        v-model.number="userWeight"
        min="0"
      />
    </div>
    <div class="form-control">
      <label for="user-height">Twój wzrost</label>
      <input
        type="number"
        id="user-height"
        name="user-height"
        v-model.number="userHeight"
        min="0"
      />
    </div>
    <div class="form-control">
      <label for="user-age">Twój wiek</label>
      <input
        type="number"
        id="user-age"
        name="user-age"
        v-model.number="userAge"
        min="0"
      />
    </div>
    <div class="form-control">
      <label for="activity-level">Wybierz swój rodzaj aktywności:</label>
      <select
        id="activity-level"
        name="activity-level"
        v-model.number="activityLevel"
      >
        <option value="0"
          >Leżący lub siedzący tryb życia, brak aktywności fizycznej</option
        >
        <option value="1">
          Praca siedząca, aktywność fizyczna na niskim poziomie</option
        >
        <option value="2">Praca nie fizyczna, trening 2 razy w tygodniu</option>
        <option value="3"
          >Lekka praca fizyczna, trening 3-4 razy w tygodniu</option
        >
        <option value="4">Praca fizyczna, trening 5 razy w tygodniu</option>
        <option value="5">Ciężka praca fizyczna, codzienny trening</option>
      </select>
    </div>

    <div class="form-control">
      <h2>Wybierz płeć</h2>
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
      <div>
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
      <button>Oblicz moje zapotrzebowanie kaloryczne!</button>
    </div>
    <span class="result" v-if="kcalResult"
      >Twoje zero kaloryczne wynosi {{ kcalResult }}</span
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      userWeight: null,
      userHeight: null,
      userAge: null,
      activityLevel: "none",
      userGender: "",
      kcalResult: null,
    };
  },
  methods: {
    submitForm() {
      const bmr = this.calculateBmr();
      const activityCoefficient = this.specifyActivityCoefficient();
      this.kcalResult = Math.floor(bmr * activityCoefficient);
    },

    calculateBmr() {
      if (this.userGender === "male") {
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
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
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

input[type="checkbox"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type="checkbox"] + label,
input[type="radio"] + label {
  font-weight: normal;
}

[type="radio"]:not(:checked),
[type="radio"]:checked {
  position: relative;
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
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>
