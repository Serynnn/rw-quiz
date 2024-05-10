<script setup lang="ts">
import { ref, onMounted } from 'vue'

useSeoMeta({
  title: 'Rain World Trivia',
  ogTitle: 'Rain World Trivia',
  ogDescription: 'When the uhhh trivia is uhhh rain world!',
  ogImage: 'https://seryn-rwquiz.vercel.app/triviacard.png',
  twitterCard: 'summary_large_image',
})

import sundown from 'assets/audio/Sundown.mp3'
import rooftops from 'assets/audio/Rooftops.mp3'
import bioEngineering from 'assets/audio/Bio-Engineering.mp3'
import blackMoonlight from 'assets/audio/Black_Moonlight.mp3'
import deepEnergy from 'assets/audio/Deep_Energy.mp3'
import floes from 'assets/audio/Floes.mp3'
import garbageWorms from 'assets/audio/Garbage_Worms.mp3'
import kayava from 'assets/audio/Kayava.mp3'
import lovelyArps from 'assets/audio/Lovely_Arps.mp3'
import mistEngine from 'assets/audio/Mist_Engine.mp3'
import skySprites from 'assets/audio/Sky_Sprite.mp3'
import swayingFronds from 'assets/audio/Swaying_Fronds.mp3'

import tick1 from '../assets/audio/effects/UIMetal1.wav'
import tick2 from '../assets/audio/effects/UIMetal2.wav'
import tick3 from '../assets/audio/effects/UIMetal3.wav'
import tick4 from '../assets/audio/effects/UIMetal4.wav'
import UIArp from '../assets/audio/effects/UIArp.wav'

    const audio = ref<HTMLAudioElement>();
    const frontDrops = ref("");
    const backDrops = ref("");
    const currentTrack = ref();
    const disclaimer = ref(true);
    const loaded = ref(false);
    const NSA = ref(false);

    const showSongName = ref(false);
    const trackIndex = ref(0);

    const songQueue = ref([{
      track: bioEngineering,
      name: 'Bio Engineeering',
      duration: 146,
    },{
      track: blackMoonlight,
      name: 'Black Moonlight',
      duration: 190,
    },{
      track: deepEnergy,
      name: 'Deep Energy',
      duration: 138,
    },{
      track: floes,
      name: 'Floes',
      duration: 164,
    },{
      track: garbageWorms,
      name: 'Garbage Worms',
      duration: 90,
    },{
      track: kayava,
      name: 'Kayava',
      duration: 219,
    },{
      track: lovelyArps,
      name: 'Lovely Arps',
      duration: 200,
    },{
      track: mistEngine,
      name: 'Mist Engine',
      duration: 157,
    },{
      track: skySprites,
      name: 'Sky Sprites',
      duration: 99,
    },{
      track: swayingFronds,
      name: 'Swaying Fronds',
      duration: 100,
    }])

    const clickDelay = ref(false);
    const tickDelay = ref(false);

    // compute route so that it changes when the route changes
    const route = useRoute();
    
    const enableTimer = ref(false);
    const startTime = ref(60);
    const currentTime = ref(60);
    const numberOfPips = computed(() => startTime.value / 3);

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

    const arenaTrackShuffle = () => {
      songQueue.value.sort(() => Math.random() - 0.5); 
      arenaTrackQueue();
    }

    const arenaTrackQueue = () => {
      trackIndex.value++;
      if(trackIndex.value === songQueue.value.length) trackIndex.value = 0;
      swapTrack(songQueue.value[trackIndex.value].track);
      showSongName.value = true;
      setTimeout(() => {
        showSongName.value = false;
      }, 5000);
      setTimeout(() => {
        arenaTrackQueue();
      }, songQueue.value[trackIndex.value].duration * 1000);
    }

    
    
    const swapTrack = (track) => {
        if(currentTrack.value === track) return;
        audio.value?.pause();
        audio.value = new Audio(track);
        currentTrack.value = track;
        if(track === sundown) audio.value.currentTime = 15;
        audio.value.loop = true;
        audio.value.play();
    };

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

    // rotation increment equal to 360 divided by number of pips, computed
    const rotationIncrement = computed(() => 360 / numberOfPips.value);
    
    
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

    // calculate opacity, so that as the timer ticks down, pips fade out. the first pip should start with 100%, second pip should have 200 etc, each pip ticks down by 20% oer second
      const counting = ref<NodeJS.Timeout | null>(null);
      // count down current time
      const instantiateTimer = (duration) => {
        stopTimer();
        enableTimer.value = true;
        startTime.value = duration;
        currentTime.value = duration;
        counting.value = setInterval(() => {
          if(currentTime.value === 0) {
            stopTimer();
            return;
          }else{
            currentTime.value--;
          }
        }, 1000);
      }

      // function that returns nsa value
      
      const hideDisclaimer = () => {
        if(NSA.value == true) {
          localStorage.setItem('disclaimer', 'false');
        }
        disclaimer.value = false;
      };
     
      const stopTimer = () => {
        clearInterval(counting.value!);
      }

      const closeTimer = () => {
        enableTimer.value = false;
      }

      onMounted(() => {
        swapTrack(sundown);
        if(localStorage.getItem('disclaimer') === 'false') {
          disclaimer.value = false;
        }
        loaded.value = true;
        
      });

    defineExpose({ swapTrack, instantiateTimer, stopTimer, closeTimer});

    makeItRain();
</script>
<template>
  <head><Meta content="https://seryn-rwquiz.vercel.app/triviacard.png" /></head>
  <Transition name="song">
    <h2 v-show="showSongName" class="text-white text-center font-rodondo text-4xl absolute bottom-0 left-0 drop-shadow-sm">{{ songQueue[trackIndex].name }}</h2>
  </Transition>
  <Transition name="fade" >
    <div v-if="enableTimer && route.path == '/quiz/quiztime'" class="absolute z-40 bg-black/75 bottom-10 left-10 border-4 border-white w-16 h-16 rounded-full flex justify-center items-center">
        <span class="text-white font-rodondo text-4xl align-middle drop-shadow-sm">{{ currentTime }}</span>
        <div class="w-24 h-2 absolute rotate-90 flex justify-center items-center">
          <div v-for="n in numberOfPips" class="w-24 h-2 absolute pip-rotate rotate-[30deg]" :style="'--tw-rotate:' + (n * rotationIncrement) + 'deg; opacity:' + ((n * 100) - ((startTime - currentTime)*33.333)) +'%;'"><img src="/images/Circle20.png" class="h-full w-auto" /></div>
          
        </div>
    </div>
  </Transition>
  <main class="back-row-toggle h-lvh splat-toggle bg-gradient-to-b from-neutral-950 to-black overflow-y-auto overflow-x-hidden">
    <div v-html="frontDrops" class="rain front-row z-0 overflow-hidden"></div>
    <div v-html="backDrops" class="rain back-row z-0 overflow-hidden"></div>
    <div class="container mx-auto z-20 h-fit flex flex-col justify-center relative items-center min-h-svh py-10 px-3">
      <div v-if="loaded">
      <Transition name="fade" mode="out-in">
        <div v-if="disclaimer" class="text-center font-light">
          <h1 class="text-orange-300 text-center font-rodondo text-6xl md:text-8xl drop-shadow-sm">Disclaimer</h1>
          <span class="text-white text-xl drop-shadow-s mx-auto ">This site contains spoilers for both Rain World and Rain World: Downpour<br/><br/>This site is also made purely for fun and probably isnt perfect<br/><br/>Note: refreshing in the middle of a quiz will reset your progress<br/>I'm to lazy to make it save sorryy <:<br/><br/>Rain World is the property of Videocult</span>
          <div class="flex w-fit items-center justify-center mx-auto mt-6"><div @click="NSA = !NSA; uiTick()" class="w-8 h-8 border-2 rounded-lg border-white hover:scale-110 transition-all ease-out duration-150 cursor-pointer"><UIcon v-if="NSA" name="i-heroicons-check-solid" class="text-white w-full h-full" /></div><span class="text-white text-md font-light drop-shadow-s mx-auto ml-2"> Do not show again</span></div>
          <div class="flex justify-center w-48 items-center mx-auto h-12 mt-6"><div v-on:mouseenter="uiTick" @click="hideDisclaimer(); uiClick()" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span >I Understand</span></UButton></div></div>
        </div>
        <div v-else>
          <NuxtPage ref="page" @swapTrack="swapTrack" @instantiateTimer="instantiateTimer" @stopTimer="stopTimer" @closeTimer="closeTimer" @arenaSongs="arenaTrackShuffle" />
        </div>
      </Transition>
      </div>
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
