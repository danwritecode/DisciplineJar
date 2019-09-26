<template>
     <v-container>
         <v-row align-content="center" justify="center">
             <v-col>
                 <v-card>
                     <v-card-title>Settings</v-card-title>
                     <v-card-text>
                         <p>Modify what things you want to receive in your text. Also add a personal touch by including a mantra or reminder that is important to you.</p>
                         <v-checkbox v-model="disciplineJar" label="Discipline Jar" disabled></v-checkbox>
                         <v-checkbox v-model="motivationalVideo" label="Motivational Video"></v-checkbox>
                         <v-checkbox v-model="workout" label="Workout Plan"></v-checkbox>
                         <v-textarea v-model="customMessage" label="Enter a personalized mantra..." outlined></v-textarea>
                     </v-card-text>
                     <v-container>
                         <v-card-actions>
                             <v-btn outlined @click="saveSettings()">Save</v-btn>
                         </v-card-actions>
                     </v-container>
                 </v-card>
             </v-col>
         </v-row>
      </v-container>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
    data() {
        return {
            disciplineJar: true,
            motivationalVideo: false,
            workout: false,
            customMessage: null,
            authedUser: {
                user: null,
                userId: null, 
                jwtToken: null
            }
        }
    },
    beforeCreate() {
        Auth.currentAuthenticatedUser()
            .then(user => {
                this.authedUser.user = user,
                this.authedUser.jwtToken = user.signInUserSession.idToken.jwtToken,
                this.authedUser.userId = this.tactUserId = user.attributes.sub
                // this.getSettings()
            })
            .catch(err => console.log(err))
    },
    methods: {
        saveSettings() {
            const apiUrl = this.$store.state.baseURL
            const env = this.$store.state.env

            const config = {
                headers: {
                    'Authorization': this.authedUser.jwtToken
                    }
                }

            axios.post(apiUrl + env + 'marketplace/listings', config)
                .then(response => (console.log(response.data)))
                .catch(error => (console.log(error)))
        },
        getSettings() {
            const apiUrl = this.$store.state.baseURL
            const env = this.$store.state.env

            const config = {
                headers: {
                    'Authorization': this.authedUser.jwtToken
                    }
                }

            axios.get(apiUrl + env + 'marketplace/listings', config)
                .then(response => (console.log(response.data)))
                .catch(error => (console.log(error)))
        }
    }
}
</script>

<style scoped>

</style>