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
                            v-model="signUpForm.phonenumber"
                        ></v-text-field>
                </v-card-text>

                <v-alert v-if="errorPost" type="error">Uh oh, there was an issue: {{ errorMessage }}</v-alert>
                <v-progress-linear v-if="posting" :indeterminate="posting"></v-progress-linear>

                <v-card-actions>
                    <v-card-text>
                        <router-link to="/signup">Don't have an account? Sign up!</router-link>
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-btn v-on:keyup.enter="validation" @click="validation" :disabled="(signUpForm.phonenumber === null)">Login</v-btn>
                </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
var PhoneNumber = require( 'awesome-phonenumber' );

export default {
    name: 'home',
    data() {
        return {
            signUpForm: {
                phonenumber: null
            },
            posting: false,
            successPost: false,
            errorPost: false,
            errorMessage: null,
            bindProps: {
                enabledCountryCode: true,
                onlyCountries: ['US'],
                disabledFormatting: true,
                validCharactersOnly: true
            }
        }
    },
    methods: {
            validation() {
                var pn = new PhoneNumber(this.signUpForm.phonenumber);

                if(pn.isValid() === true) {
                    this.errorPost = false
                    const e164Formatted = pn.getNumber('e164')
                    //check if user exists already
                    this.checkIfUserAlreadyExists(e164Formatted)
                }
                else {
                    this.errorPost = true
                    this.errorMessage = 'Incorrect format, please follow this formatting: +12223334444'
                }
            },
            signIn(phoneNum) {
              this.posting = true
              this.$ls.set('signedIn', true)
              this.$ls.set('signedInUserPhoneNum', phoneNum)
              this.$store.commit('mutateAuthState', true),
              setTimeout(() => (this.$router.push('/')), 1500)
            },
            checkIfUserAlreadyExists(phoneNum) {
                const apiUrl = this.$store.state.baseURL
                const env = this.$store.state.env

                console.log('Phone number is: ' + phoneNum)

                axios.get(apiUrl + env + 'user/exists?phoneNum=' + phoneNum)
                    .then(response => (console.log(response.data), this.determineSignUpOrSignIn(response.data, phoneNum)))
                    .catch(error => (console.log(error)))
            },
            determineSignUpOrSignIn(exists, phoneNum) {
                if(exists === true) {
                  this.signIn(phoneNum)
                }
                else {
                    this.errorPost = true
                    this.errorMessage = 'This phone number does not exist. Please Signup.'
                }
            }
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

