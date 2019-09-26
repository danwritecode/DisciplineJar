<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center" style="height:400px;">
          <h1 id="disciplineHeader">DISCIPLINE JAR</h1>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="3" sm="1"><v-btn v-if="!signedInState" outlined to="/login">Login</v-btn></v-col>
          <v-col cols="3" sm="1"><v-btn v-if="!signedInState" outlined to="/signup">Signup</v-btn></v-col>
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
      signedIn: false
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
