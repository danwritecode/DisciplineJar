<template>
  <div>
    <v-app>
      <v-navigation-drawer
            v-if="signedInState"
            app
            clipped
            mini-variant
            permanent
            bottom
          >
            <v-list dense>
              <v-list-item @click="">
                <v-list-item-action>
                  <v-icon>mdi-settings</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Settings</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="signOut">
                <v-list-item-action>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>

      <v-content>

        <router-view :key="$route.path"></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { Auth } from 'aws-amplify'
  import { AmplifyEventBus } from 'aws-amplify-vue'

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
          this.signedIn = true,
          this.tactUserNm = user.username,
          this.tactUserType = user.attributes['custom:UserType']
        })
        .catch(() => (this.signedIn = false, console.log(this.signedIn)))
    },
    created () {
      this.$vuetify.theme.dark = true;
    },
    methods: {
      signOut() {
        Auth.signOut({ global: true })
        .then(data => (this.$store.commit('mutateAuthState', false), this.signedIn = false, this.$router.push('/'), console.log('Signout Pushed')))
        .catch(err => console.log(err));
      }, 
      updateCurAuthUser() {
        Auth.currentAuthenticatedUser()
          .then(user => {
            this.signedIn = true,
            this.tactUserNm = user.username
          })
          .catch(() => (this.signedIn = false, console.log(this.signedIn)))
      }
    }
  }
</script>

<style>
#app {
   font-family: 'Roboto Mono', monospace;
 }

 #disciplineHeader {
   font-weight: 700;
   font-size: 3rem;
 }
</style>
