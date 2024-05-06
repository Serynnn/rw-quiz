<script setup lang="ts">
import tick1 from '../assets/audio/effects/UIMetal1.wav'
import tick2 from '../assets/audio/effects/UIMetal2.wav'
import tick3 from '../assets/audio/effects/UIMetal3.wav'
import tick4 from '../assets/audio/effects/UIMetal4.wav'
import sundown from 'assets/audio/Sundown.mp3'
import UIArp from '../assets/audio/effects/UIArp.wav'

    const emit = defineEmits(['swapTrack']);
    const clickDelay = ref(false);
    const tickDelay = ref(false);

    const uiTick = () => {
      if(tickDelay.value) return;
      // play between 4 sound effects, give a 1 in 4 chance of playing a sound, use placeholder url for now
      const soundEffect = Math.floor(Math.random() * 4) + 1;
      
      // case statment to play sound effect
      switch (soundEffect) {
        case 1:
          new Audio(tick1).play();
          break;
        case 2:
          new Audio(tick2).play();
          break;
        case 3:
          new Audio(tick3).play();
          break;
        case 4:
          new Audio(tick4).play();
          break;
      }
      tickDelay.value = true;
      setTimeout(() => {
        tickDelay.value = false;
      }, 50);
    };

    const uiClick = () => {
      if(clickDelay.value) return;
      new Audio(UIArp).play();
      clickDelay.value = true;
      setTimeout(() => {
        clickDelay.value = false;
      }, 500);
    };

    onMounted(() => {
      // delay by 5 seconds  
      emit('swapTrack', sundown);
    });

    

</script>
<template>
  <div>
      <h1 class="text-white text-center font-rodondo text-8xl drop-shadow-sm">Rain World Trivia</h1>
      <div class="flex flex-col items-center justify-center py-10 space-y-5">
        <div class="flex justify-center w-48 items-center h-12"><NuxtLink to="/quiz" v-on:mouseenter="uiTick" @click="uiClick" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span class="-mt-[5px]">Start</span></UButton></NuxtLink></div>
        <div class="flex justify-center w-48 items-center h-12"><NuxtLink to="/" v-on:mouseenter="uiTick" @click="uiClick" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span class="-mt-[5px]">Settings</span></UButton></NuxtLink></div>
        <div class="flex justify-center w-48 items-center h-12"><NuxtLink to="/" v-on:mouseenter="uiTick" @click="uiClick" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span class="-mt-[5px]">How to Play</span></UButton></NuxtLink></div>
        <div class="flex justify-center w-48 items-center h-12"><NuxtLink to="/about" v-on:mouseenter="uiTick" @click="uiClick" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span class="-mt-[5px]">About</span></UButton></NuxtLink></div>
    </div>
  </div>
</template>