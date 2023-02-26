<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useTodoStore } from './stores/todoStore';

useQuasar().dark.set(true);
useTodoStore().loadState();
</script>
