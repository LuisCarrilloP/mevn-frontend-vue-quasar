<script setup>
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { useUserStore } from '../stores/user-store'

const $q = useQuasar()
const router = useRouter()

const userStore = useUserStore()
const email = ref('') //deben ir vacios, datos solo para test
const password = ref('')
const repassword = ref('')

const handleSubmit = async () => {
  try {
    console.log('paso las validaciones');
    await userStore.register(email.value, password.value, repassword.value)
    router.push('/')
    email.value = ""
    password.value = ""
  } catch (error) {
    console.log('error', error);
    alertDialogBackend(error.error)

  }
}

const alertDialogBackend = (message = "Error en el servidor") => {
  $q.dialog({
    title: 'Error',
    message,
  })
}
</script>

<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Register</h3>
      <q-form @submit.prevent="handleSubmit">
        <q-input v-model="email" type="text" label="Ingrese email" :rules="[ 
          val => val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val) || 'Please type a valid email'
        ]">
        </q-input>
        <q-input v-model="password" type="password" label="Ingrese contraseña" :rules="[
          val => val && val.length > 5 || 'Enter a valid password'
        ]">
        </q-input>
        <q-input v-model="repassword" type="password" label="Repita contraseña" :rules="[
          val => val && val === password || 'No coinciden las contraseñas'
        ]">
        </q-input>
        <div>
          <q-btn label="Register" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

