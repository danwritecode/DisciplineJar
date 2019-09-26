<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center row>
          <v-flex>
            <v-card class="elevation-12 mx-auto" width="350">
                <v-card-title>Login</v-card-title>

                <v-card-text id="cardForm">
                        <v-text-field
                            label="Phone Number (+12223334444)"
                            outlined
                            type="text"
                            v-model="form.username"
                        ></v-text-field>
                        <v-text-field
                            label="Password"
                            outlined
                            type="password"
                            v-model="form.password"
                            v-on:keyup.enter="signIn"
                        ></v-text-field>
                </v-card-text>

                <v-alert v-if="errorPost" type="error">Uh oh, there was an issue: {{ errorMessage }}</v-alert>
                <v-progress-linear v-if="posting" :indeterminate="posting"></v-progress-linear>

                <v-card-actions>
                    <v-card-text>
                        <router-link to="/signup">Don't have an account? Sign up!</router-link>
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-btn v-on:keyup.enter="signIn" @click="signIn" :disabled="(form.username === null || form.password === null)">Login</v-btn>
                </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
import { mapMutations } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      form: {
        username: null,
        password: null
      },
      errorPost: false,
      errorMessage: null,
      posting: false
    }
  },
  methods: {
    signIn() {
        this.errorPost = false;
        this.posting = true;

        const {username, password } = this.form
        Auth.signIn({username, password})
            .then(user => (console.log(user),
                            this.$store.commit('mutateAuthState', true),
                            setTimeout(() => (this.$router.push('/')), 1500)))
            .catch(err => (console.log(err), this.errorMessage = err.message, this.errorPost = true, this.posting = false));
    }
  },
}
</script>

<style scoped>
#cardForm {
    margin-top: 10px;
}

a {
    text-decoration: none;
}
</style>

