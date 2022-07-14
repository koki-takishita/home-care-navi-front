<template>
  <v-stepper v-model="step" class="mb-4 mx-auto" max-width="750" outlined>
    <v-stepper-items>
      <v-stepper-content step="1" class="pa-0">
        <ThankBackLink
          class="mt-8 mb-4"
          :object="office"
          :text="linkText"
          icon
          @movePage="backPage"
        />
        <ThankNew
          :office="office"
          :staffs="staffs"
          :selected-staff.sync="selectedStaff"
          :comment.sync="comment"
          @moveConfirmPage="changeStep"
        />
      </v-stepper-content>
      <v-stepper-content step="2" class="pa-0">
        <ThankBackLink
          class="mt-8 mb-4"
          :object="office"
          :text="linkText"
          icon
          @movePage="backPage"
        />
        <ThankConfirm
          :office="office"
          :staff="selectedStaff"
          :comment="comment"
          @moveConfirmPage="changeStep"
          @createThank="createThank"
        />
      </v-stepper-content>
      <v-stepper-content step="3">
        <ThankSuccess :object="office" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
export default {
  layout: 'application',
  middleware: 'auth',
  async asyncData({ params, $axios, query }) {
    const currentStep = query.step
    const officeId = params.id
    const selectedStaff = JSON.parse(query.staff || '{}')
    const comment = query.comment || ''
    try {
      const res = await $axios.$get(`offices/${officeId}`)
      return {
        office: res.office,
        staffs: res.staffs,
        step: currentStep,
        selectedStaff,
        comment,
      }
    } catch (error) {
      return error
    }
  },
  data() {
    return {
      step: 1,
      office: {},
      staffs: [],
      selectedStaff: {},
      comment: '',
    }
  },
  computed: {
    linkText() {
      return `${this.office.name}に戻る`
    },
  },
  methods: {
    backPage() {
      this.$router.push(`/offices/${this.office.id}`)
    },
    changeStep(obj) {
      const staff = JSON.stringify(obj.staff) || '{}'
      const comment = obj.comment || ''
      const step = obj.step
      this.step = step
      this.$router.push({
        path: `/offices/${this.office.id}/thanks/new`,
        query: {
          step,
          staff,
          comment,
        },
      })
    },
    async createThank() {
      try {
        const thankParameter = {}
        thankParameter.staff_id = this.selectedStaff.id
        thankParameter.office_id = this.office.id
        thankParameter.comments = this.comment
        await this.$axios.$post(`offices/${this.office.id}/thanks`, {
          thank: thankParameter,
        })
        this.step = 3
        this.$router.push({
          path: `/offices/${this.office.id}/thanks/new`,
          query: {
            step: this.step,
          },
        })
      } catch (error) {
        const msg = error.response.data.message
        this.$store.commit('catchErrorMsg/setType', 'error')
        this.$store.commit('catchErrorMsg/setMsg', [msg])
        return error
      }
    },
  },
}
</script>
<style scoped>
/* stylelint-disable */
.v-stepper.mb-4.mx-auto.v-sheet.v-sheet--outlined.theme--light {
  border: 0px;
  background: none;
}
/* stylelint-enable */
</style>
