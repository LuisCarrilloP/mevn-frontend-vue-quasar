import { useQuasar } from "quasar"

export const useNotify = () => {
  const $q = useQuasar()

  const errorNotify = (message) => {
    $q.notify({
      message,
      type: 'negative',
      icon: 'report_problem'
    })
  }

  const successNotify = (message) => {
    $q.notify({
      message,
      type: 'positive',
      icon: 'announcement'
    })
  }

  const showNotify = (message, color = 'negative', icon = 'report_problem') => {
    $q.notify({
      message,
      type: color,
      icon
    })
  }

  return { showNotify, errorNotify, successNotify }
}