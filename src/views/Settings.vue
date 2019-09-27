<template>
     <v-container>
         <v-progress-linear v-if="loading" :indeterminate="loading"></v-progress-linear>
         <div v-else>
            <v-row align-content="center" justify="center">
                <v-col>
                    <v-card>
                        <v-card-title>Settings</v-card-title>
                        <v-card-text>
                            <p>Modify what things you want to receive in your text. Also add a personal touch by including a mantra or reminder that is important to you.</p>
                            <v-checkbox v-model="disciplineJar" label=" A Cookie from the Discipline Jar (You'll always get this)" disabled></v-checkbox>
                            <v-checkbox v-model="form.Receive_MotivtnlVid_Bool" label="Motivational Video (Coming Soon)" disabled></v-checkbox>
                            <v-checkbox v-model="form.Receive_Workout_Bool" label="Workout Plan (Coming Soon)" disabled></v-checkbox>
                            <v-textarea v-model="form.Personal_Message_Tx" label="Enter a personalized mantra..." outlined></v-textarea>
                        </v-card-text>
                        <v-container>
                            <v-alert v-if="settingsSuccessPost" type="success">Settings successfully saved!</v-alert>
                            <v-alert v-if="settingsSuccessPost" type="error">Uh oh, there was an issue</v-alert>
                            <v-progress-linear v-if="settingsPosting" :indeterminate="settingsPosting"></v-progress-linear>
                            <v-card-actions>
                                <v-btn outlined @click="saveSettings()">Save</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
            <v-row align-content="center" justify="center">
                <v-col>
                    <v-card>
                        <v-card-title>Submit your own cookie</v-card-title>
                        <v-card-text>
                            <p>Have a cookie idea for the Discipline Jar? Submit it and we'll work it into the rotation.</p>
                            <p>Follow the format: Do you want..... Discipline and sacrifice now.</p>
                            <v-textarea v-model="cookieProposal" label="Enter a cookie suggestion..." outlined></v-textarea>
                        </v-card-text>
                        <v-container>
                            <v-alert v-if="proposalSuccessPost" type="success">Settings successfully saved!</v-alert>
                            <v-alert v-if="proposalErrorPost" type="error">Uh oh, there was an issue</v-alert>
                            <v-progress-linear v-if="proposalPosting" :indeterminate="proposalPosting"></v-progress-linear>
                            <v-card-actions>
                                <v-btn outlined @click="submitCookie()">Submit</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
         </div>
      </v-container>
</template>

<script>

export default {
    data() {
        return {
            form: {
                Personal_Message_Tx: null,
                Receive_MotivtnlVid_Bool: false,
                Receive_Workout_Bool: false
            },
            cookieProposal: null,
            disciplineJar: true,
            authedUser: {
                user: null,
                userId: null, 
                jwtToken: null
            },
            loading: true,

            settingsPosting: false,
            settingsSuccessPost: false,
            settingsErrorPost: false,

            proposalPosting: false,
            proposalSuccessPost: false,
            proposalErrorPost: false
        }
    },
    mounted() {
        this.getSettings();
    },
    methods: {
        saveSettings() {
            this.settingsPosting = true

            const apiUrl = this.$store.state.baseURL
            const env = this.$store.state.env
            const phoneNum = this.$ls.get('signedInUserPhoneNum')
            
            const userSettings = {'PhoneNum': phoneNum,
                                    'Settings': {
                                        'ReceiveMotivationalVideo': this.form.Receive_MotivtnlVid_Bool,
                                        'ReceiveWorkoutPlan': this.form.Receive_Workout_Bool,
                                        'PersonalizedMessage': this.form.Personal_Message_Tx
                                    }}

            axios.post(apiUrl + env + 'user/settings', JSON.stringify(userSettings))
                .then(response => (console.log(response.data), 
                                    this.settingsPosting = false,
                                    this.settingsSuccessPost = true,
                                    setTimeout(() => (this.settingsSuccessPost = false), 1500)))
                .catch(error => (console.log(error), this.settingsSuccessPost = true))
        },
        getSettings() {
            const apiUrl = this.$store.state.baseURL
            const env = this.$store.state.env
            const phoneNum = this.$ls.get('signedInUserPhoneNum')

            axios.get(apiUrl + env + 'user/settings?PhoneNum='+phoneNum)
                .then(response => (console.log(response.data), this.form = response.data, this.loading = false))
                .catch(error => (console.log(error)))
        },
        submitCookie() {
            this.proposalPosting = true

            const apiUrl = this.$store.state.baseURL
            const env = this.$store.state.env
            
            const cookieProposal = {'Proposal_Tx': this.cookieProposal}

            axios.post(apiUrl + env + 'cookieproposal', JSON.stringify(cookieProposal))
                .then(response => (console.log(response.data), 
                                    this.proposalPosting = false,
                                    this.proposalSuccessPost = true,
                                    setTimeout(() => (this.proposalSuccessPost = false, this.cookieProposal = null), 1500)))
                .catch(error => (console.log(error), this.proposalErrorPost = true))
        }
    }
}
</script>

<style scoped>

</style>