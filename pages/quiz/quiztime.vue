<script setup lang="ts">
import tick1 from '../assets/audio/effects/UIMetal1.wav'
import tick2 from '../assets/audio/effects/UIMetal2.wav'
import tick3 from '../assets/audio/effects/UIMetal3.wav'
import tick4 from '../assets/audio/effects/UIMetal4.wav'
import MetalHit from '../assets/audio/effects/UIMetalHit.wav'
import correctSFX from '../assets/audio/effects/Karma_capBell1.wav'
import wrongSFX from '../assets/audio/effects/Karma_capBell2.wav'

const difficulty = ref("easy");
const timer = ref(0);
const tickDelay = ref(false);
const backDelay = ref(false);
const currentID = ref(0);
const hasAnswered = ref(false);
const correctAnswers = ref(0);
const answers = ref([] as number[]);

const rankMsg = ref('straight to rubicon with you');
const rank = ref(0);

const showTab = ref('questions');
const selectedQuestion = ref(0);
const showResults = ref(true);
const totalTime = computed(() => {
    return questions.value.reduce((acc, question) => acc + question.timeTaken, 0);
});
const counting = ref<NodeJS.Timeout | null>(null);

const emit = defineEmits(['instantiateTimer', 'stopTimer', 'closeTimer'])

const questions = ref(
    [{
        id: 0,
        question:'',
        image:'',
        options: ['','','',''],
        answer: 0,
        correctAnswer: 0,
        timeTaken: 0,
    }]);


const easyQuestions = ref([
   {
        id: 0,
        question:'True or False, Blue lizards have more HP than Strawberry lizards',
        image:'',
        options: ['True', 'False'],
        answer: 0,
        correctAnswer: 1,
        timeTaken: 0,
   },{
        id: 1,
        question:'How many spear hits does it normally take for a regular vulture to fly away?',
        image:'',
        options: ['1', '2', '4', '5'],
        answer: 0,
        correctAnswer: 1,
        timeTaken: 0,
   },{
        id: 2,
        question:'What is the karma requirement to get from Chimney Canopy to sky islands?',
        image:'',
        options: ['2', '3', '4', '5'],
        answer: 0,
        correctAnswer: 0,
        timeTaken: 0,
   },{
        id: 3,
        question:'What does this Karma Symbol represent?',
        image:'/images/karma/karma4.png',
        options: ['Violence', 'Lust', 'Companionship', 'Survival'],
        answer: 0,
        correctAnswer: 3,
        timeTaken: 0,
   },{
        id: 4,
        question:'How many neurons does moon start with by default in survivors campaign?',
        image:'',
        options: ['4', '5', '6', '7'],
        answer: 0,
        correctAnswer: 1,
        timeTaken: 0,
   },{
        id: 5,
        question:'What is the name of the slugcat you play as?',
        image:'',
        options: ['Hunter', 'Survivor', 'Monk', 'Rivulet'],
        answer: 0,
        correctAnswer: 0,
        timeTaken: 0,
   },{
        id: 6,
        question:'What is the name of the slugcat you play as?',
        image:'',
        options: ['Hunter', 'Survivor', 'Monk', 'Rivulet'],
        answer: 0,
        correctAnswer: 0,
        timeTaken: 0,
   },{
        id: 7,
        question:'What is the name of the slugcat you play as?',
        image:'',
        options: ['Hunter', 'Survivor', 'Monk', 'Rivulet'],
        answer: 0,
        correctAnswer: 0,
        timeTaken: 0,
   },{
        id: 8,
        question:'What is the name of the slugcat you play as?',
        image:'',
        options: ['Hunter', 'Survivor', 'Monk', 'Rivulet'],
        answer: 0,
        correctAnswer: 0,
        timeTaken: 0,
   }
]);

const mediumQuestions = ref([{
    id: 0,
    question:'What is the name of the slugcat you play as?',
    image:'',
    options: ['Hunter', 'Survivor', 'Monk', 'Rivulet'],
    answer: 0,
    correctAnswer: 0,
    timeTaken: 0,
    },{
        id: 1,
        question:'What is the name of the slugcat you play as?',
        image:'',
        options: ['Hunter', 'Survivor', 'Monk', 'Rivulet'],
        answer: 0,
        correctAnswer: 0,
        timeTaken: 0,
    },
        
])

const testQuestions = ref([{
        id: 0,
        question:'What is your favourite slugcat?',
        image:'https://static.miraheze.org/rainworldwiki/c/c8/Chimney_Canopy_region_screen.png',
        options: [
            'Hunter',
            'Survivor',
            'Monk',
            'Rivulet',
            'Artificer',
            'Gourmand',
            'Spearmaster',
            'Saint',
        ],
        answer: 0,
        correctAnswer: 6,
        timeTaken: 0,
    },{
        id: 1,
        question:'Who is the silliest',
        image:'https://static.miraheze.org/rainworldwiki/c/c8/Chimney_Canopy_region_screen.png',
        options: [
            'Rivulet',
            'Saint',
            'Gourmand',
            'Blue Lizards'
        ],
        answer: 0,
        correctAnswer: 3,
        timeTaken: 0,
    },{
        id: 2,
        question:'The Rot Consumes',
        image:'https://static.miraheze.org/rainworldwiki/thumb/e/e9/The_Rot_region_screen.png/250px-The_Rot_region_screen.png',
        options: [
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
            'Rot',
        ],
        answer: 0,
        correctAnswer: 5,
        timeTaken: 0,
    },{
        id: 3,
        question:'Hiiii',
        image:'https://static.miraheze.org/rainworldwiki/c/c8/Chimney_Canopy_region_screen.png',
        options: [
            'Hiiiiiiiiii',
            'Heya',
            'I hate you',
            '<:'
        ],
        answer: 0,
        correctAnswer: 2,
        timeTaken: 0,
    },
    
]);

const timeDuration = computed(() => {
    const params = new URLSearchParams(window.location.search);
    switch (params.get('difficulty')) {
        case "easy":
            return 120;
        case "medium":
            return 60;
        case "hard":
            return 30;
        case "test":
            return 30;
        default:
            return 60;
    }
 })

    const answerQuestion = (answer) => {
        if(hasAnswered.value) return;
        hasAnswered.value = true;
        questions.value[currentID.value].answer = answer;
        questions.value[currentID.value].timeTaken = timeDuration.value - timer.value;
        if(answer === questions.value[currentID.value].correctAnswer) {
            correctAnswers.value++;
            uiCorrect();
            stopTimer();
            answers.value.push(answer);
        } else {
            stopTimer();
            uiWrong();
            answers.value.push(answer);
        }
        // setTimeout(() => {
        //     scrollTo('next');
        // }, 100);
        
    };

    const nextQuestion = () => {
        if(backDelay.value) return;
        if(currentID.value < questions.value.length - 1) {
            showTab.value = '';
            emit('closeTimer');
            currentID.value++;
            hasAnswered.value = false;
            // delay show question = true by 1 second
            setTimeout(() => {
                showTab.value = 'questions';
                instantiateTimer(timeDuration.value);
            }, 500);
        } else {
            emit('closeTimer');
            calculateRank();
            showTab.value = 'results';
        }
        scrollTo('top');
        new Audio(MetalHit).play();
        // prevent spamming of the back button
        backDelay.value = true;
        setTimeout(() => {
            backDelay.value = false;
        }, 500);
    };
    
    const instantiateTimer = (duration) => {
        timer.value = duration;
        counting.value = setInterval(() => {
          if(timer.value === 0) {
            answerQuestion(-1);
            stopTimer();
            return;
          }else{
            timer.value--;
          }
        }, 1000);
        emit('instantiateTimer', duration);
    };

    const calculateRank = () => {
        const percentage = correctAnswers.value / answers.value.length;
        if(percentage === 1){
            rankMsg.value = "Actual rain world brainrot";
            rank.value = 9;
        }else if(percentage >= 0.8){
            rankMsg.value = "Rain world lives rent free in your head doesn't it";
            rank.value = 5;
        }else if(percentage >= 0.6){
            rankMsg.value = "Massive rain world fan spotted";
            rank.value = 4;
        }else if(percentage >= 0.4){
            rankMsg.value = "You know quite a bit about the funny rain game";
            rank.value = 3;
        }else if(percentage >= 0.2){
            rankMsg.value = "You know a little bit about rain world";
            rank.value = 2;
        }else if(percentage > 0){
            rankMsg.value = "You should look through the wiki theres some cool info there <:";
            rank.value = 1;
        }else{
            rankMsg.value = "straight to rubicon with you";
            rank.value = 0;
        }
    };

    const stopTimer = () => {
        clearInterval(counting.value!);
        emit('stopTimer');
    };

    const swapQuestion = (id) => {
        showResults.value = false;
        selectedQuestion.value = id;
        setTimeout(() => {
            showResults.value = true;
        }, 500);
    };

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

    const uiCorrect = () => {
        new Audio(correctSFX).play();
    };

    const uiWrong = () => {
        new Audio(wrongSFX).play();
    };

    function scrollTo(id: string) {
        let el = document.getElementById(id);
        
        if(el){
            
            el.scrollIntoView({ behavior: 'smooth' }) 
        }
        
    }

    onMounted(() => {
        // get current route, there is a query string for difficulty
        const params = new URLSearchParams(window.location.search);
        switch (params.get('difficulty')) {
            case "test":
                questions.value = testQuestions.value;
                break;
            // case "medium":
            //     questions.value = mediumQuestions.value;
            //     break;
            // case "hard":
            //     questions.value = hardQuestions.value;
            //     break;
        }
        instantiateTimer(timeDuration.value);

    });

    // on unmounted 
    onUnmounted(() => {
        stopTimer();
        emit('closeTimer');
    });

</script>
<template>
    <div class="w-full">
        <Transition tag="div" class="w-full flex flex-col items-center justify-center" name="fade" mode="out-in">

            <div v-if="showTab == 'questions'" class="relative">
                <!-- <div id="next" class="absolute bottom-0"></div> -->
                <h1 id="top" class="text-white text-center font-rodondo text-6xl md:text-8xl drop-shadow-sm">Question {{ currentID+1 }}</h1>
                <div class="w-full md:w-[40rem] mt-5">
                    <img v-if="questions[currentID].image" :src="questions[currentID].image"  class="w-auto h-full max-h-80 mx-auto border-2 border-white rounded-lg" />
                    <h2 class="text-white text-center font-rodondo text-4xl drop-shadow-sm">{{ questions[currentID].question }}</h2>
                    <div class="flex flex-wrap justify-center">

                        <div v-for="(option, index) in questions[currentID].options" :key="index" class="basis-full md:basis-1/2 px-3 mt-6">
                            <div class="h-20 w-full relative flex justify-center items-center">
                                <div @mouseenter="uiTick" @click="answerQuestion(index)" class="border-2 border-w w-full rounded-full absolute hover:opacity-100 hover:scale-105 hover:[&>div]:animate-border-pulse-slow hover:[&>div]:m-1  transition-all cursor-pointer " >
                                    <div class="p-3 flex items-center transition-all border-2 rounded-full border-transparent" :class="hasAnswered && questions[currentID].correctAnswer == index ? 'bg-emerald-600/75' : questions[currentID].correctAnswer != index && questions[currentID].correctAnswer != questions[currentID].answer && hasAnswered ? 'bg-red-600/50' : 'bg-transparent'">
                                        <div class="w-12 h-12 relative">
                                            <img v-if="questions[currentID].answer != index || hasAnswered == false" src="/images/karma/karmaRing.png" class="absolute w-12 h-12 top-0 left-0" />
                                            <img v-else src="/images/karma/karmaRingReinforced.png" class="absolute w-12 h-12 scale-125 top-0 left-0" />

                                            <!-- i am SO fucking sorry to any actually good web developers looking at the horseshit i'm about to code i SWEAR i had no idea how to do it dynamically IM SORRYYYYY :(((( -->
                                            <NuxtImg v-if="index==0" src="/images/karma/karma0.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 1" src="/images/karma/karma1.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 2" src="/images/karma/karma2.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 3" src="/images/karma/karma3.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 4" src="/images/karma/karma4.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 5" src="/images/karma/karma5.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 6" src="/images/karma/karma6.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 7" src="/images/karma/karma7.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 8" src="/images/karma/karma8.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else src="/images/karma/karma9.png" class="absolute w-12 h-12 top-0 left-0" />
                                        </div>
                                        <p class="text-white mx-auto font-rodondo text-3xl">{{ option }}</p>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        
                        <div class="w-full min-h-64 flex mt-10">
                            <Transition name="fade">
                                <div v-if="hasAnswered && questions[currentID].correctAnswer == questions[currentID].answer" class="w-full">
                                    <p class="text-white text-center font-rodondo text-4xl drop-shadow-sm">Correct!</p>
                                    <p class="text-white font-semibold text-center text-lg drop-shadow-sm">You have gotten {{ correctAnswers }}/{{ answers.length }} correct</p>
                                    <div class="flex justify-center w-full relative items-center mt-6 h-12"><NuxtLink v-on:mouseenter="uiTick" @click="nextQuestion" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span >Next Question</span></UButton></NuxtLink></div>
                                </div>
                                <div v-else-if="questions[currentID].answer == -1" class="w-full">
                                    <p class="text-white text-center font-rodondo text-4xl drop-shadow-sm">The rain arrived...</p>
                                    <p class="text-white font-semibold text-center text-lg drop-shadow-sm">You have gotten {{ correctAnswers }}/{{ answers.length }} correct</p>
                                    <div class="flex justify-center w-full relative items-center mt-6 h-12"><NuxtLink v-on:mouseenter="uiTick" @click="nextQuestion" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span >Next Question</span></UButton></NuxtLink></div>
                                </div>
                                <div v-else-if="hasAnswered && questions[currentID].correctAnswer != questions[currentID].answer" class="w-full">
                                    <p class="text-white text-center font-rodondo text-4xl drop-shadow-sm">Incorrect!</p>
                                    <p class="text-white font-semibold text-center text-lg drop-shadow-sm">You have gotten {{ correctAnswers }}/{{ answers.length }} correct</p>
                                    <div class="flex justify-center w-full relative items-center mt-6 h-12"><NuxtLink v-on:mouseenter="uiTick" @click="nextQuestion" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span >Next Question</span></UButton></NuxtLink></div>
                                </div>
                                <div v-else>

                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="showTab == 'results'">
                <div class="w-full flex flex-wrap justify-center items-center">
                    <div class="basis-full md:basis-1/2 flex flex-col items-center p-10">
                        <h1 class="text-white text-center font-rodondo text-8xl drop-shadow-sm">Results</h1>
                        <div class="flex justify-between w-60">
                            <p class="text-white text-left text-lg drop-shadow-sm">Difficulty:</p>
                            <p class="text-white text-right text-lg drop-shadow-sm capitalize">{{ difficulty }}</p>
                        </div>
                        <div class="flex justify-between w-60">
                            <p class="text-white text-left text-lg drop-shadow-sm">Correct:</p>
                            <p class="text-white text-right text-lg drop-shadow-sm">{{ correctAnswers }}/{{ questions.length }}</p>
                        </div>
                        <div class="flex justify-between w-60">
                            <p class="text-white text-left text-lg drop-shadow-sm">Time Taken:</p>
                            <p class="text-white text-right text-lg drop-shadow-sm">{{ totalTime }}s</p>
                        </div>
                        <div class="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent my-8 rounded-full"></div>
                        <h2 class="text-white text-center font-rodondo text-4xl drop-shadow-sm">Rank: {{ correctAnswers / questions.length * 100 }}%</h2>
                        <!-- base rank from karma 1 to 5, based on percentage of correct answers, if all answers correct, karma 9 -->
                        <div class="w-full relative flex justify-center items-center">
                            <div class="relative w-20 h-20 mt-6">
                                <div class="absolute">
                                    <img src="/images/karma/karmaRing.png" class="w-20 h-20 mx-auto" />
                                </div>
                                <!-- again, sorry to any web developers, i really am -->
                                <div class="absolute">
                                    <img v-if="rank == 0 || rank == 1" src="/images/karma/karma0.png" class="w-20 h-20 mx-auto" />
                                    <img v-else-if="rank == 2" src="/images/karma/karma1.png" class="w-20 h-20 mx-auto" />
                                    <img v-else-if="rank == 3" src="/images/karma/karma2.png" class="w-20 h-20 mx-auto" />
                                    <img v-else-if="rank == 4" src="/images/karma/karma3.png" class="w-20 h-20 mx-auto" />
                                    <img v-else-if="rank == 5" src="/images/karma/karma4.png" class="w-20 h-20 mx-auto" />
                                    <img v-else-if="rank == 9" src="/images/karma/karma9.png" class="w-20 h-20 mx-auto" />
                                </div>
                            </div>
                        </div>
                       

                        <p class="text-white text-center font-rodondo mt-6 text-2xl drop-shadow-sm">{{ rankMsg }}</p>

                        <div class="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent my-8 rounded-full"></div>
                        <h2 class="text-white text-center font-rodondo text-4xl drop-shadow-sm">Questions</h2>
                        <h3 class="text-gray-300 text-center text-md drop-shadow-sm">Select a question to view your answer</h3>
                        <div class="flex flex-wrap">
                            <p @click="swapQuestion(index)" v-for="(question, index) in questions" :key="index" class="mt-4 text-white text-center font-semibold text-lg drop-shadow-sm basis-1/2 cursor-pointer hover:text-gray-200 px-2">Q{{ question.id + 1 }}: <span v-if="question.answer == question.correctAnswer">Correct</span> <span v-else>Incorrect</span></p>
                        </div>
                        <!-- back button -->
                        <div class="flex justify-center w-full relative items-center mt-6 h-12"><NuxtLink v-on:mouseenter="uiTick" @click="uiBack" to="/" class="rw-btn-wrapper"><UButton color="RW" class="rw-btn" ><span >Back</span></UButton></NuxtLink></div>
                    </div>
                    <div class="basis-full md:basis-1/2 scale-90 md:scale-75">
                        <transition tag="div" name="fade" mode="out-in" class="sticky">
                            <div v-if="showResults">
                                <h2 class="text-white text-center font-rodondo text-4xl drop-shadow-sm">{{ questions[selectedQuestion].question }}</h2>
                                <div class="flex flex-wrap">
                                    <div v-for="(option, index) in questions[selectedQuestion].options" :key="index" class="basis-full lg:basis-1/2 px-3 mt-6">
                                        <div class="h-20 w-full relative flex justify-center items-center">
                                            <div @click="answerQuestion(index)" class="border-2 border-w w-full rounded-full absolute hover:opacity-100 hover:scale-105 hover:[&>div]:m-1 hover:[&>div]:!border-white transition-all cursor-pointer " >
                                                <div class="p-3 flex items-center transition-all border-2 rounded-full border-transparent" :class="hasAnswered && questions[selectedQuestion].correctAnswer == index ? 'bg-emerald-600/75' : questions[selectedQuestion].correctAnswer != index && questions[selectedQuestion].correctAnswer != questions[selectedQuestion].answer && hasAnswered ? 'bg-red-600/50' : 'bg-transparent'">
                                                    <div class="w-12 h-12 relative">
                                                        <img v-if="questions[selectedQuestion].answer != index || hasAnswered == false" src="/images/karma/karmaRing.png" class="absolute w-12 h-12 top-0 left-0" />
                                                        <img v-else src="/images/karma/karmaRingReinforced.png" class="absolute w-12 h-12 scale-125 top-0 left-0" />

                                                        <!-- i am SO fucking sorry to any actually good web developers looking at the horseshit i'm about to code i SWEAR i had no idea how to do it dynamically IM SORRYYYYY :(((( -->
                                                        <NuxtImg v-if="index==0" src="/images/karma/karma0.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 1" src="/images/karma/karma1.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 2" src="/images/karma/karma2.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 3" src="/images/karma/karma3.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 4" src="/images/karma/karma4.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 5" src="/images/karma/karma5.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 6" src="/images/karma/karma6.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 7" src="/images/karma/karma7.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else-if="index == 8" src="/images/karma/karma8.png" class="absolute w-12 h-12 top-0 left-0" /><NuxtImg v-else src="/images/karma/karma9.png" class="absolute w-12 h-12 top-0 left-0" />
                                                    </div>
                                                    <p class="text-white mx-auto font-rodondo text-3xl">{{ option }}</p>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                        
                    </div>
                </div>
            </div>
        
        </Transition>
    </div>
</template>