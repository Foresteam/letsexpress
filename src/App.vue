<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useTodoStore } from './stores/todoStore';

useQuasar().dark.set(true);
useTodoStore().loadState();
</script>

<style lang="scss">
html, body {
	position: fixed;
	overflow: hidden;
	width: 100vw;
	height: 100vh;
}

body >* {
	height: 100%;
	overscroll-behavior-y: none;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}

.bg-bg {
	background-color: #2A2A2A !important;
}
</style>