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
          :age.sync="age"
          :name.sync="name"
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
          :age="age"
          :name="name"
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
  async asyncData({ params, $axios, query }) {
    const currentStep = query.step
    const officeId = params.id
    const selectedStaff = JSON.parse(query.staff || '{}')
    const comment = query.comment || ''
    const name = query.name || ''
    const age = query.age
    try {
      const res = await $axios.$get(`offices/${officeId}`)
      return {
        office: res.office,
        staffs: res.staffs,
        step: currentStep,
        selectedStaff,
        comment,
        age,
        name,
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
      name: '',
      age: null,
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
      const age = obj.age || ''
      const name = obj.name || ''
      const step = obj.step
      this.step = step
      this.$router.push({
        path: `/offices/${this.office.id}/thanks/new`,
        query: {
          step,
          staff,
          comment,
          name,
          age,
        },
      })
    },
    async createThank() {
      try {
        const thankParameter = {}
        thankParameter.staff_id = this.selectedStaff.id
        thankParameter.office_id = this.office.id
        thankParameter.comments = this.comment
        thankParameter.name = this.name
        thankParameter.age = this.extractNumberForAge(this.age)
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
        return error
      }
    },
    extractNumberForAge(string) {
      const ageNumber = string.match(/[0-9]{2}/)
      return Number(ageNumber[0])
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
