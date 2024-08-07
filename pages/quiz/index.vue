<script setup lang="ts">
    import { ref, computed } from 'vue';
    import rooftops from 'assets/audio/Rooftops.mp3';
    import tick1 from '../assets/audio/effects/UIMetal1.wav'
    import tick2 from '../assets/audio/effects/UIMetal2.wav'
    import tick3 from '../assets/audio/effects/UIMetal3.wav'
    import tick4 from '../assets/audio/effects/UIMetal4.wav'
    import pitch1 from '../assets/audio/effects/UI_UIPitch1.wav'
    import pitch2 from '../assets/audio/effects/UI_UIPitch2.wav'
    import MetalHit from '../assets/audio/effects/UIMetalHit.wav'
    import impact from '../assets/audio/effects/UIImpact2.wav'

    const tickDelay = ref(false);
    const backDelay = ref(false);
    const emit = defineEmits(['arenaSongs']);
    
    const difficulty = ref("monk");

    const monkSettings = {
        title: "Monk",
        description: "A selection of easier trivia that you will likely know from playing the game",
        questions: 10,
        timePerQuestion: 60,
    };

    const survSettings = {
        title: "Survivor",
        description: "A selection of more specific trivia with some harder questions thrown in",
        questions: 15,
        timePerQuestion: 45,
    };

    const hunterSettings = {
        title: "Hunter",
        description: "A selection of more obscure trivia and hard to remember facts about the game. Good luck!",
        questions: 20,
        timePerQuestion: 30,
    };

    const testSettings = {
        title: "Test quiz",
        description: "Full of placeholders, will be the only one that contains questions for now",
        questions: 5,
        timePerQuestion: 9999,
    };

    const settings = computed(() => {
        switch (difficulty.value) {
            case "monk":
                return monkSettings;
            case "survivor":
                return survSettings;
            case "hunter":
                return hunterSettings;
            case "test":
                return testSettings;
            default:
                return monkSettings;
        }
    });

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

    const uiPitch = () => {
        if(tickDelay.value) return;
        // play between 2 sound effects, give a 1 in 2 chance of playing a sound, use placeholder url for now
        const soundEffect = Math.floor(Math.random() * 2) + 1;
    
        // case statment to play sound effect
        switch (soundEffect) {
            case 1:
            new Audio(pitch1).play();
            break;
            case 2:
            new Audio(pitch2).play();
            break;
        }
        tickDelay.value = true;
        setTimeout(() => {
            tickDelay.value = false;
        }, 50);
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

    const uiImpact = () => {
        if(backDelay.value) return;
        new Audio(impact).play();
        // prevent spamming of the back button
        backDelay.value = true;
        setTimeout(() => {
            backDelay.value = false;
        }, 500);
    };

    const changeDifficulty = (diff) => {
        difficulty.value = diff;
        uiPitch();
    };

    onMounted(() => {
      // delay by 5 seconds  
     emit('arenaSongs');
    });
    
</script>
<template>
    <div class="relative">
        <h1 class="text-white text-center font-rodondo text-8xl drop-shadow-sm">Quiz</h1>
        <div class="flex mx-auto justify-center md:absolute w-28 items-center top-6 left-0 h-12"><NuxtLink to="/" v-on:mouseenter="uiTick" @click="uiBack" class="!w-28 hover:!w-[7.5rem] rw-btn-wrapper "><UButton color="RW" class="rw-btn !w-28" ><span >Back</span></UButton></NuxtLink></div>
        <div class="w-full md:w-[40rem] mt-20">
            <h2 class="text-white text-center font-rodondo text-4xl drop-shadow-sm">Select Quiz</h2>
            <div class="flex flex-wrap justify-center items-center gap-x-4 mt-3 [&_*]:select-none">
                <div v-on:mouseenter="uiTick" @click="changeDifficulty('monk')" class="border-2 border-w rounded-xl hover:opacity-100 hover:scale-105 transition-all hover:[&>*]:m-1 hover:[&>*]:animate-border-pulse cursor-pointer mt-3" :class="difficulty == 'monk' ? 'scale-105' : 'opacity-75'">
                    <div class="p-3 border-2 border-transparent transition-all ease-out rounded-xl">
                        <img src="/images/Monk_portrait.webp" draggable="false" class="w-24 h-24 pointer-events-none" />
                    </div>
                </div>
                <div v-on:mouseenter="uiTick" @click="changeDifficulty('survivor')" class="border-2 border-w rounded-xl hover:opacity-100 hover:scale-105 transition-all hover:[&>*]:m-1 hover:[&>*]:animate-border-pulse cursor-pointer mt-3" :class="difficulty == 'survivor' ? 'scale-105' : 'opacity-75'">
                    <div class="p-3 border-2 border-transparent transition-all ease-out rounded-xl">
                        <img src="/images/Survivor_portrait.webp" draggable="false" class="w-24 h-24 pointer-events-none" />
                    </div>    
                </div>
                <div v-on:mouseenter="uiTick" @click="changeDifficulty('hunter')" class="border-2 border-w rounded-xl hover:opacity-100 hover:scale-105 transition-all hover:[&>*]:m-1 hover:[&>*]:animate-border-pulse cursor-pointer mt-3" :class="difficulty == 'hunter' ? 'scale-105' : 'opacity-75'">
                    <div class="p-3 border-2 border-transparent transition-all ease-out rounded-xl">
                        <img src="/images/Hunter.webp" draggable="false" class="w-24 h-24 pointer-events-none" />
                    </div>
                </div>
                <!-- <div v-on:mouseenter="uiTick" @click="changeDifficulty('test')" class="border-2 border-w rounded-xl hover:opacity-100 hover:scale-105 transition-all hover:[&>*]:m-1 hover:[&>*]:animate-border-pulse cursor-pointer mt-3" :class="difficulty == 'test' ? 'scale-105' : 'opacity-75'">
                    <div class="p-3 border-2 border-transparent transition-all ease-out rounded-xl">
                        <img src="/images/Nightcat.webp" draggable="false" class="w-24 h-24 pointer-events-none" />
                    </div>
                </div> -->
            </div>
            <div class="text-white text-center mt-4 w-fit mx-auto">
                <div class="px-4">
                    <h3 class="font-rodondo text-4xl">{{ settings.title }}</h3>
                    <span class="text-md text-gray-200">{{ settings.description }}</span>
                </div>
                <!-- line break -->
                <div class="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent my-8 rounded-full"></div>
                <div class="text-lg px-4">
                    <p><span class="font-bold">Questions:</span> {{ settings.questions }}</p>
                    <p><span class="font-bold">Time Limit:</span> {{ settings.timePerQuestion }} seconds</p>
                </div>
            </div>
            <div class="mx-auto flex justify-center w-48 items-center h-48 mt-10 relative">
                <NuxtLink :to="{ path:'/quiz/quiztime', query:{difficulty: difficulty}}" @click="uiImpact" class="w-48 h-48 rounded-full border-2 border-white p-4 cursor-pointer hover:[&>*]:[&>*]:animate-border-pulse-slow hover:w-[12.5rem] hover:h-[12.5rem] transition-all duration-300 absolute [&>*]:hover:p-2 [&_*]:hover:border-white ease-out">
                    <div class="w-full h-full rounded-full border-2 border-white transition-all duration-300 ease-out">
                        <div class="border-2 border-transparent w-full h-full rounded-full transition-all duration-300 flex justify-center items-center ease-out">
                            <h3 class="text-white text-center font-rodondo text-3xl drop-shadow-sm">Start</h3>
                        </div>
                    </div>
                </NuxtLink>
            </div>
                
        </div>
    </div>
</template>