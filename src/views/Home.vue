<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <img id="jarImg" src="../assets/discipline-jar-icon.svg" width="400">
        </v-row>
        <v-row v-if="!signedInState" align="center" justify="center">
          <v-btn class="homeBttns" outlined to="/login">Login</v-btn>
          <v-btn class="homeBttns" outlined to="/signup">Signup</v-btn>
          <v-btn class="homeBttns" @click="showInfo = !showInfo" outlined color="error">What is this?</v-btn>
        </v-row>
        <v-row v-else align="center" justify="center">
          <v-btn class="homeBttns" outlined to="/settings">Settings</v-btn>
          <v-btn class="homeBttns" outlined to="/proposecookie" color="deep-orange">Propose Your Own Cookie</v-btn>
        </v-row>
        <br>
        <v-row v-if="showInfo" align="center" justify="center">
          <v-container>
            <p>This app was inspired by David Goggins and the idea of his "Cookie Jar". The Cookie Jar is a place in your mind 
              that you draw from to get you through a hard time.
            </p>
            <p>I liked this concept so I started creating my own version which I saved in my iPhone notes and called "Discpline Jar".
              The idea of the Discipline Jar is slightly different than David's Cookie Jar. The Discipline Jar contains reasons why 
              you should be disciplined and encourages you to keep on the hard path.
            </p>
            <p>Each morning when you wake up you will receive a text message from the Discipline Jar. The text will simply contain 
              a cookie from the Discipline Jar along with a personalized mantra/message that you can configure in your settings once you create an account.
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

export default {
  data() {
    return {
      signedIn: false,
      showInfo: false
    }
  },
  computed: {
      signedInState: function() {
        return this.$store.state.signedIn || this.checkAuthState()
      }
  },
  methods: {
    checkAuthState() {
      if(this.$ls.get('signedIn') === 'true') {
        return true
      }
      else {
        return false
      }
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
  margin: 0 10px 10px 10px;
}

#jarImg {
  margin-bottom: 100px;
}
</style>