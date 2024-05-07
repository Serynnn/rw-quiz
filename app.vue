<script setup lang="ts">
import { ref, onMounted } from 'vue'

useHead({
  title: 'Rain World Trivia',
  meta: [
    {
      property: 'og:title',
      content: 'Rain World Trivia'
    },
    {
      property: 'og:description',
      content: 'When the uhhh trivia is uhhh rain world!'
    },
    {
      property: 'og:image',
      content: 'https://seryn-rwquiz.vercel.app/triviacard.png'
    }
  ]
})

import sundown from 'assets/audio/Sundown.mp3'
import rooftops from 'assets/audio/Rooftops.mp3'

    const audio = ref<HTMLAudioElement>();
    const frontDrops = ref("");
    const backDrops = ref("");
    const currentTrack = ref();

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
    
    const swapTrack = (track) => {
        if(currentTrack.value === track) return;
        audio.value?.pause();
        audio.value = new Audio(track);
        currentTrack.value = track;
        if(track === sundown) audio.value.currentTime = 20;
        audio.value.loop = true;
        audio.value.play();
    };
    
    // const mountMusic = () => {
    //   // get current route, sundown for homepage, rooftops for quiz
    //   audio.value = new Audio(route.value === '/' ? sundown : rooftops);
    //   currentTrack.value = route.value === '/' ? 'sundown' : 'rooftops';
    //   // audio.value?.play();
    // };
  

    // onMounted(() => {
    //   // delay by 5 seconds  
    //   setTimeout(() => {
    //     mountMusic();
    //   }, 5000);
    // });

    defineExpose({ swapTrack });

    makeItRain();
</script>
<template>
  <head><Meta content="https://seryn-rwquiz.vercel.app/triviacard.png" /></head>
  <main class="back-row-toggle h-lvh splat-toggle bg-gradient-to-b from-neutral-950 to-black overflow-y-auto">
    <div v-html="frontDrops" class="rain front-row z-0"></div>
    <div v-html="backDrops" class="rain back-row z-0"></div>
    <div class="container mx-auto z-20 h-fit flex flex-col justify-center relative items-center min-h-svh py-10 mb-40">
      <NuxtPage ref="page" @swapTrack="swapTrack" />
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
