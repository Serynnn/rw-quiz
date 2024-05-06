<script setup lang="ts">
import { ref, onMounted } from 'vue'

import sundown from 'assets/audio/Sundown.mp3'
import rooftops from 'assets/audio/Rooftops.mp3'

    const audio = ref<HTMLAudioElement>();
    const frontDrops = ref("");
    const backDrops = ref("");

    const makeItRain = () => {
      let increment = 0;
      

      while (increment < 100) {
        const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
        const randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
        increment += randoFiver;

        frontDrops.value += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        backDrops.value += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      }
    };
    
    

    
    
    const mountMusic = () => {
      // get current route, sundown for homepage, rooftops for quiz
      const route = window.location.pathname;
      audio.value = new Audio(route === '/' ? sundown : rooftops);
      audio.value?.play();
    };


    onMounted(() => {
      // delay by 5 seconds  
      setTimeout(() => {
        mountMusic();
      }, 5000);
    });

    makeItRain();
</script>
<template>
  <main class="back-row-toggle h-lvh splat-toggle bg-gradient-to-b from-neutral-950 to-black overflow-y-auto">
    <div v-html="frontDrops" class="rain front-row z-0"></div>
    <div v-html="backDrops" class="rain back-row z-0"></div>
    <div class="container mx-auto z-20 h-fit flex flex-col justify-center items-center min-h-svh py-40">
      <NuxtPage />
    </div>
  </main>
</template>
<style>

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* trannsparaent scroll bar background with grey rounded thumb */
::-webkit-scrollbar {
  width: 12px;
  background-color: transparent;
  padding: 2px;
}
::-webkit-scrollbar-thumb {
  background-color: #2e2e2ec7;
  border-radius: 6px;
  width: 6px;
}
</style>
