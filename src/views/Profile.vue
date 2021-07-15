<template>
    <div>
        <!-- <div class="card-container">
            <div class="upper-container">
                <div class="image-container">
                    <img src="../assets/profile.jpg" />
                </div>
            </div>

            <div class="lower-container">
                <div>
                    <h3>
                        {{ currentUser }}
                    </h3>
                    <h5>Pozostało kalorii: {{ kcal }}</h5>
                </div>
            </div>
        </div> -->
        <div class="table">
            <v-table
                :data="ingredients"
                :currentPage.sync="currentPage"
                :pageSize="5"
                @totalPagesChanged="totalPages = $event"
            >
                <thead slot="head">
                    <th>Nazwa produktu</th>
                    <th>Kalorie</th>
                </thead>
                <tbody slot="body" slot-scope="{ displayData }">
                    <tr v-for="row in displayData" :key="row.name">
                        <td>{{ row.name }}</td>
                        <td>{{ row.count }}</td>
                    </tr>
                </tbody>
            </v-table>
            <smart-pagination
                :currentPage.sync="currentPage"
                :totalPages="totalPages"
                :maxPageLinks="5"
            />
        </div>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: "profile",
    data() {
        return {
            currentPage: 1,
            totalPages: 0,
            kcal: null,
            ingredient: {
                name: null,
                count: null,
            },
            ingredients: [],
        };
    },
    created() {
        if (firebase.auth().currentUser) {
            this.currentUser = firebase.auth().currentUser.email;
            this.currentUser = this.currentUser.split("@")[0];

            var rootRef = firebase
                .database()
                .ref()
                .child("users");

            var userID = firebase.auth().currentUser.uid;
            var usersRef = rootRef.child(userID);

            usersRef
                .once("value")
                .then(function(snapshot) {
                    return snapshot.val().kcalResult;
                })
                .then((kcalRes) => (this.kcal = kcalRes));
        }

        firebase
            .database()
            .ref("ingredients")
            .on("value", (snapshot) => {
                this.ingredients = snapshot.val();
                console.log(snapshot.val());
            });
    },
};
</script>

<style>
.table {
    /* background-color: darkkhaki; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 600px;
}

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
