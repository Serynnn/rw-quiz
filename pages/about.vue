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
        <h1 class="text-white text-center font-rodondo text-5xl md:text-8xl drop-shadow-sm">About uhh me i think</h1>
        <div class="flex flex-col justify-center items-center mt-10">
            <div class="border-2 w-full md:w-[40rem] border-white rounded-lg shadow-[0_0_8px_0] shadow-white/50 bg-neutral-900/10 p-5">
                <h2 class="text-white font-rodondo text-4xl drop-shadow-sm">Who???</h2>
                <p class="text-white font-segoue text-lg">Hiii i am a web developer who also is trying to draw. <NuxtLink to="https://twitter.com/Serynnnnn" class="font-bold underline">@Serynnnnn</NuxtLink> on twitter :))<br/> <img src="../assets/images/meifyouevencare.png" class="rounded-lg border-2 shadow-[0_0_8px_0] shadow-white/50 border-white w-auto h-40 mt-4 mx-auto" /><span class="text-gray-500 text-xs mx-auto block mt-1 w-fit">(me if you even care...)</span></p>
                <h2 class="text-white font-rodondo text-4xl drop-shadow-sm mt-4">What???</h2>
                <p class="text-white font-segoue text-lg">A quiz with no real purpose. i initally wanted to create GeoGeussr for rain world but i realized someone someone had already made it half way through so i pivoted to this. <br/> <NuxtLink to="https://rwgg.isaacelenbaas.com/RWGG.html" class="font-bold underline">Go check out their website!</NuxtLink></p>
                <h2 class="text-white font-rodondo text-4xl drop-shadow-sm mt-4">Why???</h2>
                <p class="text-white font-segoue text-lg">Mostly just for fun and to mess about with trying to recreate rain world's style and UI in a website</p>
                <h2 class="text-white font-rodondo text-4xl drop-shadow-sm mt-4">How???</h2>
                <p class="text-white font-segoue text-lg">Made using Vue3 and Nuxt.</p>
                <h2 class="text-white font-rodondo text-4xl drop-shadow-sm mt-4">When???</h2>
                <p class="text-white font-segoue text-lg">Uhh idk like may 2024?</p>
            </div>
            <div class="flex justify-center relative w-48 items-center mt-6 h-12"><NuxtLink to="/" v-on:mouseenter="uiTick" @click="uiBack" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span >Back</span></UButton></NuxtLink></div>
        </div>
    </div>
</template>