<template>
  <q-page padding>
    <q-btn @click="userStore.access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear link</q-btn>
    <q-btn @click="userStore.logout">Cerrar sesión</q-btn>
    <p>Token: {{ userStore.token }} expires in {{ userStore.expiresIn/60 }} minutes</p>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { useUserStore } from '../stores/user-store'

const userStore = useUserStore()

//userStore.refreshToken()

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
</script>
