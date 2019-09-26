<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center row>
          <v-flex>
              <div v-if="formState === 'signUp'">
                <v-card class="elevation-12 mx-auto" width="350">
                    <v-card-title>Login</v-card-title>

                    <v-card-text id="cardForm">
                            <v-text-field
                                label="Phone Number"
                                solo
                                type="text"
                                v-model="signUpForm.username"
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                solo
                                type="password"
                                v-model="signUpForm.password"
                            ></v-text-field>
                            <v-text-field
                                label="Email"
                                solo
                                type="email"
                                v-model="signUpForm.email"
                                v-on:keyup.enter="signUp()"
                            ></v-text-field>
                    </v-card-text>

                    <v-alert v-if="errorPost" type="error">Uh oh, there was an issue: {{ errorMessage }}</v-alert>

                    <v-container>
                        <v-card-actions>
                                            <v-btn v-on:keyup.enter="signUp()" @click="signUp()" :disabled="(signUpForm.username === null || signUpForm.password === null || signUpForm.email === null)">Signup</v-btn>
                        </v-card-actions>
                    </v-container>
                </v-card>
              </div>

              <div v-if="formState === 'confirmSignUp'">
                  <v-card class="elevation-12 mx-auto" width="350">
                      <v-card-title>Confirm Email Code</v-card-title>

                      <v-card-text id="cardForm">
                            <v-text-field
                                label="Confirmation Code"
                                solo
                                type="text"
                                v-model="signUpForm.code"
                                @click="resetCodeResentAlert()"
                                v-on:keyup.enter="confirmSignUp()"
                            ></v-text-field>
                    </v-card-text>
                    <v-alert v-if="confirmSuccess" type="success">Email confirmed!</v-alert>
                    <v-alert v-if="confirmCodeResent" type="success">Code Resent!</v-alert>
                    <v-alert v-if="errorPost" type="error">Uh oh, there was an issue: {{ errorMessage }}</v-alert>

                    <v-container>
                        <v-card-actions>
                            <v-btn text @click="resendCode()">Resend Code</v-btn>
                            <v-btn v-on:keyup.enter="confirmSignUp()" :disabled="signUpForm.code === null" @click="confirmSignUp()">Continue</v-btn>
                        </v-card-actions>
                    </v-container>
                  </v-card>
              </div>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex';

export default {
    name: 'home',
    data() {
        return {
            signUpForm: {
                username: null,
                password: null,
                email: null,
                code: null
            },
            confirmSuccess: false,
            confirmCodeResent: false,
            errorPost: false,
            errorMessage: null,
            formState: 'signUp',
        }
    },
    methods: {
            resetCodeResentAlert() {
                this.confirmCodeResent = false
            },
            signUp() {
                const {username, password, email  } = this.signUpForm
                Auth.signUp({
                    username,
                    password,
                    attributes: {email}
                })
                .then(response => (console.log('Data logged: ' + response), this.formState = 'confirmSignUp', this.errorPost = false, this.errorMessage = ''))
                .catch(error => (console.log(error), this.errorPost = true, this.errorMessage = error));
            },
            confirmSignUp() {
                const {username, code } = this.signUpForm
                console.log(code)
                Auth.confirmSignUp(username, code)
                .then(response => (console.log(response), 
                        this.confirmSuccess = true,
                        this.errorPost = false, this.errorMessage = '',
                        this.signIn()))
                .catch(error => (console.log(error), this.errorPost = true, this.errorMessage = error.message));
            },
            resendCode() {
                const username = this.signUpForm.username

                Auth.resendSignUp(username)
                .then(response => (this.confirmCodeResent = true,
                                    setTimeout(() => (this.confirmCodeResent = false), 15000)))
                .catch(error => (console.log('Error: ' + error), this.errorPost = true, this.errorMessage = error.message))
            },
            signIn() {
                const {username, password } = this.signUpForm
                Auth.signIn({username, password})
                    .then(user => (console.log(user), 
                            this.$store.commit('mutateAuthState', true),
                            setTimeout(() => (this.$router.push('/')), 1500)))
                    .catch(err => (console.log(err)));
            },
        }
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

