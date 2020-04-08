<template>
  <div id="app">
    <transition>
      <router-view />
    </transition>
  </div>
</template>

<style>
  * {
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }
  #app {
    height: 100%;
    overflow: hidden;
  }
</style>
