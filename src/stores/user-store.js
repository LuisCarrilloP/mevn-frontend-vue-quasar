import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const expiresIn = ref(null)

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
      sessionStorage.setItem('user', "Valor que NO es token")
      setTime()

    } catch (error) {
      console.log(error);

    }
  }

  const logout = async () => {
    try {
      await api.get('/auth/logout')

    } catch (error) {
      console.log(error);

    } finally {
      resetStore()
      sessionStorage.removeItem('user')
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
      sessionStorage.setItem('user', "Valor que NO es token")
      setTime()

    } catch (error) {
      console.log(error);
      sessionStorage.removeItem('user')

    }
  }

  const resetStore = () => {
    token.value = null
    expiresIn.value = null
  }

  return { token, expiresIn, access, refreshToken, logout }
})  