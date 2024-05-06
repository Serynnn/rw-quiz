<script setup lang="ts">
    const difficulty = ref("medium");
    
</script>
<template>
    <div>
        <h1 class="text-white text-center font-rodondo text-8xl drop-shadow-sm">Quiz</h1>
        <div class="w-[40rem] mt-20">
            <div class="flex justify-center items-center gap-x-4 ">
                <div @click="difficulty = 'easy'" class="border-2 border-w p-3 rounded-lg hover:opacity-100 hover:scale-105 transition-all cursor-pointer" :class="difficulty == 'easy' ? 'scale-105' : 'opacity-75'">
                    <img src="../../assets/images/Monk_portrait.webp" class="w-24 h-24" />
                </div>
                <div @click="difficulty = 'medium'" class="border-2 border-w p-3 rounded-lg hover:opacity-100 hover:scale-105 transition-all cursor-pointer" :class="difficulty == 'medium' ? 'scale-105' : 'opacity-75'">
                    <img src="../../assets/images/Survivor_portrait.webp" class="w-24 h-24" />
                </div>
                <div @click="difficulty = 'hard'" class="border-2 border-w p-3 rounded-lg hover:opacity-100 hover:scale-105 transition-all cursor-pointer" :class="difficulty == 'hard' ? 'scale-105' : 'opacity-75'">
                    <img src="../../assets/images/Hunter.webp" class="w-24 h-24" />
                </div>
            </div>
        </div>
    </div>
</template>