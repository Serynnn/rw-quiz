<script setup lang="ts">

const difficulty = ref("easy");
const timer = ref(0);
const currentID = ref(0);
const hasAnswered = ref(false);
const correctAnswers = ref(0);
const answers = ref([] as number[]);
const showQuestion = ref(true);
const questions = ref(
    [{
        id: 0,
        question:'',
        image:'',
        options: ['','','',''],
        answer: 0,
        correctAnswer: 0,
    }]);

const easyQuestions = ref([
    {
        id: 0,
        question:'How much Karma is required to go from Industrial Complex to Chimney Canopy?',
        image:'https://cdn.discordapp.com/attachments/694951794601885796/1237337034960535622/Chimney_Canopy_region_screen.png?ex=663b4769&is=6639f5e9&hm=6fe33f0a2782d78b42e3757a773dc04531c5563138aff2feae91e5b83fc3ced1&',
        options: [
            'A',
            'B',
            'C',
            'D'
        ],
        answer: 0,
        correctAnswer: 0,
        
    },{
        id: 1,
        question:'How much Karma is required to go from Industrial Complex to Chimney Canopy?',
        image:'https://cdn.discordapp.com/attachments/694951794601885796/1237337034960535622/Chimney_Canopy_region_screen.png?ex=663b4769&is=6639f5e9&hm=6fe33f0a2782d78b42e3757a773dc04531c5563138aff2feae91e5b83fc3ced1&',
        options: [
            'Test1',
            'Test2',
            'Test3',
            'Test4'
        ],
        answer: 0,
        correctAnswer: 2,
    },
]);

    const answerQuestion = (answer) => {
        if(hasAnswered.value) return;
        hasAnswered.value = true;
        questions.value[currentID.value].answer = answer;
        if(answer === questions.value[currentID.value].correctAnswer) {
            correctAnswers.value++;
            answers.value.push(answer);
            console.log(answers.value)
        } else {
            answers.value.push(answer);
            console.log(answers.value)
        }
    };

    const nextQuestion = () => {
        if(currentID.value < questions.value.length - 1) {
            showQuestion.value = false;
            currentID.value++;
            hasAnswered.value = false;
            // delay show question = true by 1 second
            setTimeout(() => {
                showQuestion.value = true;
            }, 1000);
        } else {
            showQuestion.value = false;
        }
    };


    onMounted(() => {
        switch (difficulty.value) {
            case "easy":
                questions.value = easyQuestions.value;
                break;
            // case "medium":
            //     questions.value = mediumQuestions.value;
            //     break;
            // case "hard":
            //     questions.value = hardQuestions.value;
            //     break;
        }

    });

</script>
<template>
    <Transition tag="div" name="fade">

        <div v-if="showQuestion" class="relative">
            <h1 class="text-white text-center font-rodondo text-8xl drop-shadow-sm">Question {{ currentID+1 }}</h1>
            <div class="w-[40rem] mt-5">
                <img v-if="questions[currentID].image" :src="questions[currentID].image"  class="w-auto h-full max-h-80 mx-auto border-2 border-white rounded-lg" />
                <h2 class="text-white text-center font-rodondo text-4xl drop-shadow-sm">{{ questions[currentID].question }}</h2>
                <div class="flex flex-wrap justify-center">

                    <div v-for="(option, index) in questions[currentID].options" :key="index" class="basis-1/2 px-3 mt-6">
                        <div class="h-20 w-full relative flex justify-center items-center">
                            <div @click="answerQuestion(index)" class="border-2 border-w w-full rounded-full absolute hover:opacity-100 hover:scale-105 hover:[&>div]:m-1 hover:[&>div]:!border-white transition-all cursor-pointer " >
                                <div class="p-3 flex items-center transition-all border-2 rounded-full border-transparent" :class="hasAnswered && questions[currentID].correctAnswer == index ? 'bg-emerald-600/75' : questions[currentID].correctAnswer != index && questions[currentID].correctAnswer != questions[currentID].answer && hasAnswered ? 'bg-red-600/50' : 'bg-transparent'">
                                    <div class="w-12 h-12 relative">
                                        <img v-if="questions[currentID].answer != index || hasAnswered == false" src="/images/karma/karmaRing.png" class="absolute w-12 h-12 top-0 left-0" />
                                        <img v-else src="/images/karma/karmaRingReinforced.png" class="absolute w-12 h-12 scale-125 top-0 left-0" />

                                        <!-- i am SO fucking sorry to any actually good web developers looking at the horseshit i'm about to code i SWEAR i had no idea how to do it dynamically IM SORRYYYYY :(((( -->
                                        <NuxtImg v-if="index==0" src="/images/karma/karma1.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 1" src="/images/karma/karma2.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 2" src="/images/karma/karma3.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 3" src="/images/karma/karma4.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 4" src="/images/karma/karma5.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 5" src="/images/karma/karma6.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 6" src="/images/karma/karma7.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 7" src="/images/karma/karma8.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 8" src="/images/karma/karma9.png" class="absolute w-12 h-12 top-0 left-0" />
                                    </div>
                                    <p class="text-white mx-auto font-rodondo text-3xl -mt-2">{{ option }}</p>
                                </div>    
                            </div>
                        </div>
                        
                    </div>
                    
                    <Transition name="fade">
                        <div v-if="hasAnswered && questions[currentID].correctAnswer == questions[currentID].answer" class="w-full mt-6">
                            <p class="text-white text-center font-rodondo text-4xl drop-shadow-sm">Correct!</p>
                            <p class="text-white text-center text-3xl drop-shadow-sm">You have {{ correctAnswers }}/{{ answers.length }}  correct</p>
                        </div>
                        <div v-else-if="hasAnswered && questions[currentID].correctAnswer != questions[currentID].answer" class="w-full mt-6">
                            <p class="text-white text-center font-rodondo text-4xl drop-shadow-sm">Incorrect!</p>
                            <p class="text-white text-center text-xl drop-shadow-sm">You have {{ correctAnswers }}/{{ answers.length }}  correct</p>
                        </div>
                        <div v-else>

                        </div>
                    </Transition>
                </div>
            </div>
        </Div>
        
    </Transition>
</template>