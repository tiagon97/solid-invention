<template>
  <div>
    <div class="card-container">
      <div class="upper-container">
        <div class="image-container">
          <img src="../assets/profile.jpg" />
        </div>
      </div>

<<<<<<< HEAD
      <div class="lower-container">
        <div>
          <h3>
            {{ currentUser }}
          </h3>
          <h5>Pozostało kalorii: {{ kcal }}</h5>
        </div>
=======
    <div class="lower-container">
      <div>
        <h3>
          {{ currentUser }}
        </h3>
        <h5>Pozostało kalorii: {{ kcal }}</h5>
>>>>>>> 3a51567af6e228a01642e2fb86be23b152081c9a
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Nazwa produktu</th>
            <th>Ilosc kalorii</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="ingredient in ingredients" :key="ingredient">
            <td>
              <th>{{ingredient.name}}</th>
              <th>{{ingredient.count}}</th>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import firebase from 'firebase';
=======
import firebase from "firebase";
>>>>>>> 3a51567af6e228a01642e2fb86be23b152081c9a

export default {
  name: "profile",
  data() {
    return {
      kcal: null,
<<<<<<< HEAD
      ingredient: {
        name: null,
        count: null
      },
      ingredients: [],
=======
>>>>>>> 3a51567af6e228a01642e2fb86be23b152081c9a
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser.email;
      this.currentUser = this.currentUser.split("@")[0];

      var rootRef = firebase
        .database()
        .ref()
<<<<<<< HEAD
        .child('users');
=======
        .child("users");
>>>>>>> 3a51567af6e228a01642e2fb86be23b152081c9a

      var userID = firebase.auth().currentUser.uid;
      var usersRef = rootRef.child(userID);

<<<<<<< HEAD
      usersRef
        .once('value')
=======
      console.log(userID);
      console.log(usersRef);

      usersRef
        .once("value")
>>>>>>> 3a51567af6e228a01642e2fb86be23b152081c9a
        .then(function(snapshot) {
          return snapshot.val().kcalResult;
        })
        .then((kcalRes) => (this.kcal = kcalRes));
    }

    firebase
      .database()
      .ref('ingredients')
      .on('value', (snapshot) => {
        this.ingredients = snapshot.val();
      });
  },
};
</script>

<style>
.card-container {
  width: 500px;
  height: 350px;
  background: #fff;
  border-radius: 6px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  overflow: hidden;
  display: inline-block;
}
.card-container .upper-container {
  height: 120px;
  background-color: #e4685d;
}
.card-container .image-container {
  background: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  transform: translate(200px, 60px);
}
.card-container .image-container img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.card-container .lower-container {
  height: 280px;
  background: #fff;
  padding: 20px;
  padding-top: 40px;
  text-align: center;
}

.card-container .lower-container h3 {
  color: #000000;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 30px;
  margin-top: 50px;
}

.card-container .lower-container h5 {
  color: #000000;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 20px;
}
</style>
