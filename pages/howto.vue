<script setup lang="ts">
import tick1 from '../assets/audio/effects/UIMetal1.wav'
import tick2 from '../assets/audio/effects/UIMetal2.wav'
import tick3 from '../assets/audio/effects/UIMetal3.wav'
import tick4 from '../assets/audio/effects/UIMetal4.wav'
import MetalHit from '../assets/audio/effects/UIMetalHit.wav'

    const backDelay = ref(false);

    const uiTick = () => {
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
    };

    const uiBack = () => {
        if(backDelay.value) return;
        new Audio(MetalHit).play();
        // prevent spamming of the back button
        backDelay.value = true;
        setTimeout(() => {
            backDelay.value = false;
        }, 500);
    };
</script>
<template>
    <div>
        <h1 class="text-white text-center font-rodondo text-8xl drop-shadow-sm">How to Play</h1>
        <div class="flex flex-col justify-center items-center mt-10">
            <div class="border-2 w-[40rem] border-white rounded-lg shadow-[0_0_8px_0] shadow-white/50 bg-neutral-900/10 backdrop-blur-md p-5">
                
            </div>
            <div class="flex justify-center relative w-48 items-center mt-6 h-12"><NuxtLink to="/" v-on:mouseenter="uiTick" @click="uiBack" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span >Back</span></UButton></NuxtLink></div>
        </div>
    </div>
</template>