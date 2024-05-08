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
        <h1 class="text-white text-center font-rodondo text-8xl drop-shadow-sm">Credits</h1>
        <div class="flex flex-col justify-center items-center mt-10">
            <h2 class="text-white font-rodondo text-4xl drop-shadow-sm">Thank you to the following:</h2>
            <p class="text-white text-lg"><NuxtLink to="https://twitter.com/RivuletSlugcat" class="font-semibold underline">@RivuletSlugcat</NuxtLink> for helping with questions</p>
            <p class="text-white text-lg"><NuxtLink to="https://twitter.com/rredjk7" class="font-semibold underline">@rredjk7</NuxtLink> for helping with questions</p>
            <p class="text-white text-lg">My irl friend for helping me out with various things despite knowing i will never credit them <NuxtLink to="https://twitter.com/EggsLeggs_" class="text-sm text-gray-500">jk</NuxtLink></p>
            <p class="text-white text-lg">The awesome people at <NuxtLink to="https://discord.gg/6TX2Vm9V5d" class="font-semibold underline">The Sanctuary</NuxtLink> for putting up with me posting my progress</p>

            <div class="flex justify-center relative w-48 items-center mt-6 h-12"><NuxtLink to="/" v-on:mouseenter="uiTick" @click="uiBack" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span >Back</span></UButton></NuxtLink></div>
        </div>
    </div>
</template>