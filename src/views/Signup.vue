<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center row>
          <v-flex>
              <div>
                <v-card class="elevation-12 mx-auto" width="350">
                    <v-card-title>Signup</v-card-title>
                    <v-card-text id="cardForm">
                        <p>All we need is your phone number to get started.</p>
                        <p>We promise not to share it. In fact, you are completely anonymous (we don't even know your name).</p>
                            <v-text-field
                                label="Phone Number (+12223334444)"
                                solo
                                type="text"
                                v-model="signUpForm.phonenumber"
                                outlined
                            ></v-text-field>
                    </v-card-text>

                    

                    <v-container>
                        <v-alert v-if="successPost" type="success">Successfully signed up!</v-alert>
                        <v-alert v-if="errorPost" type="error">Uh oh, there was an issue: {{ errorMessage }}</v-alert>
                        <v-progress-linear v-if="posting" :indeterminate="posting"></v-progress-linear>
                        <v-card-actions>
                            <v-btn v-on:keyup.enter="validation()" @click="validation()" :disabled="(signUpForm.phonenumber === null)">Signup</v-btn>
                        </v-card-actions>
                    </v-container>
                </v-card>
              </div>
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
            signUp(phoneNum) {
                const apiUrl = this.$store.state.baseURL
                const env = this.$store.state.env

                const user = {'phone_number': phoneNum }

                this.posting = true

                axios.post(apiUrl + env + 'user/signup', JSON.stringify(user))
                    .then(response => (console.log(response.data), 
                                        this.posting = false,
                                        this.successPost = true,
                                        setTimeout(() => (this.successPost = false, this.signIn(phoneNum)), 1500)))
                    .catch(error => (console.log(error), this.errorPost = true))

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
                    this.errorPost = true
                    this.errorMessage = 'Your Phone Number already exists, signing you in now.'
                    setTimeout(() => (this.signIn(phoneNum)), 1500)
                }
                else {
                    this.signUp(phoneNum)
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

