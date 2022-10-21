<template>
  <q-page padding>
    <q-btn @click="access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear link</q-btn>
    <p>Token: {{ token }} expires in {{ expiresIn/60 }} minutes</p>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { ref } from 'vue';

let token = ref('')
let expiresIn = ref('')

// const access = () => {
//   api //axios
//     .post('/auth/login', {
//       email: "usuario_mevn1@test.com",
//       password: "12345678"
//     })
//     .then(res => {
//       token.value = res.data.token
//       expiresIn.value = res.data.expiresIn
//     })
//     .catch(e => console.log(e))
//}

const access = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: "usuario_mevn2@test.com",
      password: "12345678"
    })
    token.value = res.data.token
    expiresIn.value = res.data.expiresIn
    setTime()

  } catch (error) {
    console.log(error);

  }
}

const createLink = async () => {
  try {
    const res = await api({
      method: 'POST',
      url: "/links",
      headers: {
        Authorization: "Bearer " + token.value
      },
      data: {
        longLink: "www.facebook.com"
      }
    })
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

const setTime = () => {
  setTimeout(() => {
    refreshToken()
  }, expiresIn.value * 1000 - 6000)
}

const refreshToken = async () => {
  try {
    const res = await api.get("/auth/refresh");
    token.value = res.data.token
    expiresIn.value = res.data.expiresIn
    setTime()

  } catch (error) {
    console.log(error);

  }
}
refreshToken()
</script>
