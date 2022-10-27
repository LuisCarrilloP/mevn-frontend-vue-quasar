<script setup>
import { ref } from 'vue'
import { useLinkStore } from '../stores/link-store'
import { useNotify } from '../composables/notifyHook'

const useLink = useLinkStore()
const { showNotify } = useNotify()

const link = ref('')
const loading = ref(false)

const addLink = async () => {
  try {
    loading.value = true
    await useLink.createLink(link.value)
    showNotify('Link creado', 'positive')
    link.value = ''

  } catch (error) {
    console.log(error.error);
    if (error.error) {
      return error.error.forEach(item => {
        showNotify(item.msg)
      })
    }
    showNotify('negative', 'Agrega un link para continuar', 'report_problem')

  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-form @submit.prevent="addLink">
    <!-- <q-input v-model="link" label="Ingrese link aqui"> -->
    <q-input v-model="link" label="Ingrese link aqui"
      :rules="[val => val && val.trim() !== '' || 'Escribe algo por favor']">
    </q-input>
    <q-btn class="q-mt-sm full-width" label="Agregar" color="primary" type="submit" :loading="loading"></q-btn>
  </q-form>
</template>