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
            mini-variant-width="50"
          >
            <v-list dense>
              <v-list-item to="/">
                <v-list-item-action>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/settings">
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

  export default {
    data() {
      return {
        signedIn: false
      }
    },
    computed: {
      signedInState: function() {
        return this.$store.state.signedIn || this.checkAuthState()
      }
    },
    created () {
      this.$vuetify.theme.dark = true;
    },
    methods: {
      signOut() {
        console.log('Signout Called')
        this.$store.commit('mutateAuthState', false);
        this.$ls.set('signedIn', false)
        this.$ls.remove('signedInUserPhoneNum')
        this.$router.push('/')
      }, 
      checkAuthState() {
        if(this.$ls.get('signedIn') === 'true') {
          return true
        }
        else {
          return false
        }
      }
    }
  }
</script>

<style>
#app {
   font-family: 'Roboto Mono', monospace;
 }
</style>
