<template>
     <v-container>
         <div>
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
            cookieProposal: null,

            proposalPosting: false,
            proposalSuccessPost: false,
            proposalErrorPost: false
        }
    },
    methods: {
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