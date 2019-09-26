<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center" style="height:400px;">
          <h1 id="disciplineHeader">DISCIPLINE JAR</h1>
        </v-row>
        <v-row v-if="!signedInState" align="center" justify="center">
          <v-btn class="homeBttns" outlined to="/login">Login</v-btn>
          <v-btn class="homeBttns" outlined to="/signup">Signup</v-btn>
          <v-btn class="homeBttns" @click="showInfo = !showInfo" outlined color="error">Info</v-btn>
        </v-row>
        <v-row v-else align="center" justify="center">
          <v-btn outlined to="/settings">Settings</v-btn>
        </v-row>
        <br>
        <v-row v-if="showInfo" align="center" justify="center">
          <v-container>
            <p>This app was inspired by David Goggins and the idea of his "Cookie Jar". The Cookie Jar is a place you go to mentally
              where you draw some sort of inspiration to keep moving through a hard time.
            </p>
            <p>I liked this concept so I started creating my own version which I saved in my iPhone notes and called "Discpline Jar".
              The focus of the Discipline Jar is slightly different than David's Cookie Jar. The Discipline Jar contains reasons why 
              you should be disciplined.
            </p>
            <p>
              This is app was created by and is maintained by Dan Nelson. You can find/follow me on twitter at @danatdev.
            </p>
          </v-container>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  data() {
    return {
      signedIn: false,
      showInfo: false
    }
  },
  computed: {
      signedInState: function() {
        this.updateCurAuthUser()
        return this.$store.state.signedIn || this.signedIn
      }
  },
  beforeCreate() {
      Auth.currentAuthenticatedUser()
        .then(user => {
          this.signedIn = true
        })
        .catch(() => (this.signedIn = false, console.log(this.signedIn)))
  },
  methods: {
    updateCurAuthUser() {
      Auth.currentAuthenticatedUser()
        .then(user => {
          this.signedIn = true,
          this.tactUserNm = user.username
        })
        .catch(() => (this.signedIn = false, console.log(this.signedIn)))
    }
  }
};
</script>

<style scoped>
@media only screen and (min-width: 575px) {
  #disciplineHeader {
    font-weight: 700;
    font-size: 3rem;
  }
}

.homeBttns {
  margin: 0 10px 0 10px;
}
</style>