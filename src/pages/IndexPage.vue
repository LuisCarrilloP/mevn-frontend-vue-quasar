<template>
  <q-page padding>
    <!-- <p>Token: {{ userStore.token }} expires in {{ userStore.expiresIn/60 }} minutes</p> -->
    <add-link class="q-mb-xl" />
    <!-- <pre>
      {{ useLink.links }}
    </pre> -->
    <template v-for="link in useLink.links" :key="link._id">
      <LinkCard :link="link" />
    </template>
  </q-page>
</template>

<script setup>
import { useLinkStore } from '../stores/link-store'
import AddLink from 'src/components/AddLink.vue';
import LinkCard from 'src/components/LinkCard.vue';

const useLink = useLinkStore()

//useLink.getLinks()
</script>
