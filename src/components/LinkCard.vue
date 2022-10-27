<script setup>
import { useLinkStore } from '../stores/link-store'
import { useQuasar } from 'quasar'
import { useNotify } from 'src/composables/notifyHook';

const useLink = useLinkStore()
const $q = useQuasar()
const { errorNotify, successNotify } = useNotify()

defineProps({
  link: Object
})

const deleteLink = async (_id) => {
  $q.dialog({
    title: 'Atención!',
    message: 'Seguro que quires borrar este elemento?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await useLink.removeLink(_id)
      successNotify('Link eliminado!')

    } catch (error) {
      if (error.error) {
        return error.error.forEach(item => {
          errorNotify(item.msg)
        })
      }
      errorNotify(error)

    }
  })
}

const updateLink = (link) => {
  $q.dialog({
    title: 'Actualizar URL',
    message: 'Ingresa el nuevo enlace',
    prompt: {
      model: link.longLink,
      type: 'text' // optional
    },
    cancel: true,
    persistent: true
  }).onOk(async data => {
    try {
      const newLink = { ...link, longLink: data }
      await useLink.modifyLink(newLink)
      successNotify('Link actualizado con éxito!')

    } catch (error) {
      if (error.error) {
        return error.error.forEach(item => {
          errorNotify(item.msg)
        })
      }
      errorNotify(error)
    }
  })
}

const copyLink = async (nanoLink) => {
  try {
    const path = `${process.env.FRONT_URI}/${nanoLink}`
    await navigator.clipboard.writeText(path)
    successNotify('Link copiado')

  } catch (error) {
    console.log(error);
    errorNotify(error)

  }
}
</script>

<template>
  <q-card class="my-card q-mt-sm">
    <q-card-section>
      <div class="text-overline">{{ link.nanoLink }}</div>
      {{ link }}
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="mdi-trash-can-outline" color="red" @click="deleteLink(link._id)" />
      <q-btn flat round icon="mdi-pencil-outline" @click="updateLink(link)" />
      <q-btn flat color="primary" @click="copyLink(link.nanoLink)">
        COPY
      </q-btn>
    </q-card-actions>
  </q-card>
</template>