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
        this.updateCurAuthUser()
        return this.$store.state.signedIn || this.$ls.get('signedIn')
      }
    },
    beforeCreate() {

    },
    created () {
      this.$vuetify.theme.dark = true;
    },
    methods: {
      signOut() {
        this.$ls.remove('signedIn')
        this.$ls.remove('signedInUserPhoneNum')
        this.$store.commit('mutateAuthState', false);
      }, 
      updateCurAuthUser() {

      }
    }
  }
</script>

<style>
#app {
   font-family: 'Roboto Mono', monospace;
 }
</style>
