<template>
     <v-container>
         <v-progress-linear v-if="loading" :indeterminate="loading"></v-progress-linear>
         <v-row v-else align-content="center" justify="center">
             <v-col>
                 <v-card>
                     <v-card-title>Settings</v-card-title>
                     <v-card-text>
                         <p>Modify what things you want to receive in your text. Also add a personal touch by including a mantra or reminder that is important to you.</p>
                         <v-checkbox v-model="disciplineJar" label="Discipline Jar" disabled></v-checkbox>
                         <v-checkbox v-model="form.Receive_MotivtnlVid_Bool" label="Motivational Video"></v-checkbox>
                         <v-checkbox v-model="form.Receive_Workout_Bool" label="Workout Plan"></v-checkbox>
                         <v-textarea v-model="form.Personal_Message_Tx" label="Enter a personalized mantra..." outlined></v-textarea>
                     </v-card-text>
                     <v-container>
                        <v-alert v-if="successPost" type="success">Settings successfully saved!</v-alert>
                        <v-alert v-if="errorPost" type="error">Uh oh, there was an issue</v-alert>
                        <v-progress-linear v-if="posting" :indeterminate="posting"></v-progress-linear>
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

export default {
    data() {
        return {
            form: {
                Personal_Message_Tx: null,
                Receive_MotivtnlVid_Bool: false,
                Receive_Workout_Bool: false
            },
            disciplineJar: true,
            authedUser: {
                user: null,
                userId: null, 
                jwtToken: null
            },
            posting: false,
            loading: true,
            successPost: false,
            errorPost: false
        }
    },
    mounted() {
        this.getSettings();
    },
    methods: {
        saveSettings() {
            this.posting = true

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
                                    this.posting = false,
                                    this.successPost = true,
                                    setTimeout(() => (this.successPost = false), 1500)))
                .catch(error => (console.log(error), this.errorPost = true))
        },
        getSettings() {
            const apiUrl = this.$store.state.baseURL
            const env = this.$store.state.env
            const phoneNum = this.$ls.get('signedInUserPhoneNum')

            axios.get(apiUrl + env + 'user/settings?PhoneNum='+phoneNum)
                .then(response => (console.log(response.data), this.form = response.data, this.loading = false))
                .catch(error => (console.log(error)))
        }
    }
}
</script>

<style scoped>

</style>