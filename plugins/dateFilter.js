import Vue from 'vue'

const appointmentDateFilter = (value) => {
  return formatCreatedAt(value)
}
const meetDateFilter = (value) => {
  return formatMeetDate(value)
}

function formatCreatedAt(getDate) {
  const date = new Date(getDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const formattedDate = `${year}年${month}月${day}日 ${hour}:${minutes}`
  return formattedDate
}

function formatMeetDate(getDate) {
  const date = new Date(getDate)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = date.getDay()
  const weekStr = ['日', '月', '火', '水', '木', '金', '土'][week]
  const formattedDate = `${month}月${day}日(${weekStr})`
  return formattedDate
}

Vue.filter('created_at', appointmentDateFilter)
Vue.filter('meet_date', meetDateFilter)
