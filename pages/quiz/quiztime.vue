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
        image:'/images/quiz/bluelizard.png',
        options: ['True', 'False'],
        answer: 0,
        correctAnswer: 1,
        timeTaken: 0,
   },{
        id: 1,
        question:'How many spear hits does it normally take for a regular vulture to fly away?',
        image:'/images/quiz/Vulture.png',
        options: ['1', '2', '4', '5'],
        answer: 0,
        correctAnswer: 1,
        timeTaken: 0,
   },{
        id: 2,
        question:'What is the karma requirement to get from Chimney Canopy to sky islands?',
        image:'https://static.miraheze.org/rainworldwiki/thumb/c/c8/Chimney_Canopy_region_screen.png/250px-Chimney_Canopy_region_screen.png',
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
        image:'/images/quiz/Moon.png',
        options: ['4', '5', '6', '7'],
        answer: 0,
        correctAnswer: 1,
        timeTaken: 0,
   },{
        id: 5,
        question:`What is the name of Five Pebbles' pseudonym?`,
        image:'https://static.miraheze.org/rainworldwiki/7/75/Pebbles.png',
        options: ['Grey Wind', 'Pleading Intellect', 'Erratic Pulse', 'Wandering Omen', 'Epoch of Clouds'],
        answer: 0,
        correctAnswer: 2,
        timeTaken: 0,
   },{
        id: 6,
        question:'What is the correct hunger bar for monk',
        image:'/images/quiz/emptypips.png',
        options: ['4 Required, 1 Stored', '3 Required, 4 Stored', '2 Required, 2 Stored', '3 Required, 2 Stored'],
        answer: 0,
        correctAnswer: 3,
        timeTaken: 0,
   },{
        id: 7,
        question:'Which region is this?',
        image:'/images/quiz/monki1-NOCHEATING.png',
        options: ['Industrial Complex', 'Outskirts', 'Shaded Citadel', 'Chimney Canopy'],
        answer: 0,
        correctAnswer: 0,
        timeTaken: 0,
   },{
        id: 8,
        question:'What order in the timeline are the 3 base game campaigns?',
        image:'',
        options: ['Surivor, Monk, Hunter', 'Hunter, Monk, Survivor', 'Monk, Survivor, Hunter', 'Hunter, Survivor, Monk'],
        answer: 0,
        correctAnswer: 3,
        timeTaken: 0,
   },{
        id: 9,
        question:`What region does the track 'Floes' play in?`,
        image:'',
        options: ['Garbage Wastes', 'Underhang', 'Shaded Citadel', 'Subterranean', 'Shoreline'],
        answer: 0,
        correctAnswer: 2,
        timeTaken: 0,
   },
]);

const mediumQuestions = ref([{
        id: 0,
        question:'Which of these does NOT have an albino variant?',
        image:'',
        options: ['Vulture', 'Jetfish', 'Green Lizard', 'King Vulture'],
        answer: 0,
        correctAnswer: 2,
        timeTaken: 0,
    },{
        id: 1,
        question:'What is the karma requirement to get from drainage to subterranean?',
        image:'https://static.miraheze.org/rainworldwiki/9/9d/Drainage_System_region_screen.png',
        options: ['2', '3', '4', '5'],
        answer: 0,
        correctAnswer: 2,
        timeTaken: 0,
    },{
        id: 2,
        question:'True or False, Monk has access to an extra shelter in shoreline',
        image:'',
        options: ['True', 'False'],
        answer: 0,
        correctAnswer: 0,
        timeTaken: 0,
    },{
        id: 3,
        question:'How many food pips does eating a red lizard give for hunter',
        image:'/images/quiz/redlizard.png',
        options: ['10', '9', '6', '4.5'],
        answer: 0,
        correctAnswer: 1,
        timeTaken: 0,
    },{
        id: 4,
        question:'True or False, Spearmaster starts the campaign with the mark of communication',
        image:'https://static.miraheze.org/rainworldwiki/a/af/Spearmaster_select_screen_%28Messenger%29.png',
        options: ['True', 'False'],
        answer: 0,
        correctAnswer: 1,
        timeTaken: 0,
    },{
        id: 5,
        question:'Which is the most valuable to scavengers out of the following;',
        image:'',
        options: ['Beehive', 'Vulture Mask', 'Karma Flower', 'Explosive Spear', 'Overseer Eye'],
        answer: 0,
        correctAnswer: 4,
        timeTaken: 0,
    },{
        id: 6,
        question:'What region gate is this?',
        image:'/images/quiz/survi1-NOCHEATING.png',
        options: ['SH - SL', 'HI - SH', 'SB - SL', 'LF - SU'],
        answer: 0,
        correctAnswer: 3,
        timeTaken: 0,
    },{
        id: 7,
        question:'Besides Snails, how can you remove attached jungle leeches',
        image:'/images/quiz/jungleleech.png',
        options: ['Worm Grass', 'Sporepuff', 'Hazer', 'Cherry Bomb'],
        answer: 0,
        correctAnswer: 0,
        timeTaken: 0,
    },{
        id: 8,
        question:'Elite scavenger masks come in how many variants?',
        image:'https://static.miraheze.org/rainworldwiki/1/12/Elite_Scavenger_infobox_image.png',
        options: ['2', '3', '4', '5'],
        answer: 0,
        correctAnswer: 1,
        timeTaken: 0,
    },{
        id: 9,
        question:`What region does the track 'White Lizard' play in?`,
        image:'',
        options: ['Subterranean', 'Sky Islands', 'Chimney Canopy', 'The Wall', 'The Leg'],
        answer: 0,
        correctAnswer: 4,
        timeTaken: 0,
    },{
        id: 10,
        question:`What color are the slugpups in Arti's flashbacks?`,
        image:'',
        options: ['Yellow and Red', 'Green and Blue', 'Blue and Turquoise', 'Orange and Purple'],
        answer: 0,
        correctAnswer: 2,
        timeTaken: 0,
    },{
        id: 11,
        question:`In saint's campaign, what region does not get renamed?`,
        image:'',
        options: ['Pipeyard', 'Farm Arrays', 'Drainage System', 'Submerged Superstructure'],
        answer: 0,
        correctAnswer: 3,
        timeTaken: 0,
    },{
        id: 12,
        question:`Which of these campaigns has the least rot infested variant of Five pebbles?`,
        image:'https://static.miraheze.org/rainworldwiki/a/a8/Five_Pebbles_region_screen.png',
        options: ['Hunter', 'Survivor', 'Monk', 'Gourmand'],
        answer: 0,
        correctAnswer: 0,
        timeTaken: 0,
    },{
        id: 13,
        question:`Which passage is this?`,
        image:'/images/quiz/survi2-NOCHEATING.webp',
        options: ['The Hunter', 'The Outlaw', 'The Chieftan', 'The Dragon Slayer'],
        answer: 0,
        correctAnswer: 3,
        timeTaken: 0,
    },{
        id: 14,
        question:`Where is the the echo 'Six Grains of Gravel, Mountains Abound' found?`,
        image:'',
        options: ['Chimney Canopy', 'The Wall', 'Shaded Citadel', 'Farm Arrays', 'Subterranean', 'Sky Islands'],
        answer: 0,
        correctAnswer: 1,
        timeTaken: 0,
    }
        
])

const hunterQuestions = ref([{
    id: 0,
    question:'Besides flashbangs, what other item can be used to blind miros birds?',
    image:'https://static.miraheze.org/rainworldwiki/7/76/Miros_Bird_infobox_image.png',
    options: ['Hazer','Jellyfish','Electric Spear','Sporepuff'],
    answer: 0,
    correctAnswer: 0,
    timeTaken: 0,
},{
    id: 1,
    question:'Which of these regions have the least amount of rooms? (Downpour rooms included)',
    image:'',
    options: ['Drainage System','Sky Islands',' Metropolis','Outskirts'],
    answer: 0,
    correctAnswer: 1,
    timeTaken: 0,
},{
    id: 2,
    question:'True or False, Spearmaster has not been sent to five pebbles before the events of their campaign',
    image:'https://static.miraheze.org/rainworldwiki/7/71/SpearmasterSleepingSprite.png',
    options: ['True','False'],
    answer: 0,
    correctAnswer: 1,
    timeTaken: 0,
},{
    id: 3,
    question:'Which of these regions spawn albino jetfish?',
    image:'https://static.miraheze.org/rainworldwiki/d/d0/Albino_Jetfish.png',
    options: ['Pipeyard','Sunken Pier','The Gutter','Silent Construct'],
    answer: 0,
    correctAnswer: 0,
    timeTaken: 0,
},{
    id: 4,
    question:'How many food pips does the Giant Jellyfish give when speared by Spearmaster?',
    image:'https://static.miraheze.org/rainworldwiki/2/2c/Giant_Jellyfish_infobox_image.png',
    options: ['0.5','3','5','10'],
    answer: 0,
    correctAnswer: 3,
    timeTaken: 0,
},{
    id: 5,
    question:'Which of these passages can be progressed without having earned the survivor passage?',
    image:'/images/quiz/No survivor.png',
    options: ['The Wanderer','The Dragon Slayer','The Pilgrim','The Nomad'],
    answer: 0,
    correctAnswer: 2,
    timeTaken: 0,
},{
    id: 6,
    question:'Which is the correct hunger bar for hunter',
    image:'/images/quiz/emptypips.png',
    options: ['5 Required, 4 Stored','6 Required, 4 Stored','5 Required, 3 Stored','6 Required, 3 Stored'],
    answer: 0,
    correctAnswer: 3,
    timeTaken: 0,
},{
    id: 7,
    question:'What is the highest amount of karma Arti can borrow from a scavenger?',
    image:'',
    options: ['4','5','6','8'],
    answer: 0,
    correctAnswer: 1,
    timeTaken: 0,
},{
    id: 8,
    question:'Which of these regions does NOT have a scavenger toll',
    image:'https://static.miraheze.org/rainworldwiki/9/9e/12.png',
    options: ['Undergrowth','Pipeyard','Farm Arrays','Outer Expanse'],
    answer: 0,
    correctAnswer: 1,
    timeTaken: 0,
},{
    id: 9,
    question:'What region is this?',
    image:'/images/quiz/hunter-roomsc.png',
    options: ['Metropolis','Subterranean','Outer Expanse','Silent Construct'],
    answer: 0,
    correctAnswer: 0,
    timeTaken: 0,
},{
    id: 10,
    question:'What is the most valuable item to scavengers?',
    image:'',
    options: ['Pearl','King Vulture Mask','Inspector Eye','Singularity Bomb'],
    answer: 0,
    correctAnswer: 2,
    timeTaken: 0,
},{
    id: 11,
    question:'How many different types of lizards are there? (Includes downpour lizards)',
    image:'/images/quiz/GreenLizard.webp',
    options: ['9','10','12','13'],
    answer: 0,
    correctAnswer: 3,
    timeTaken: 0,
},{
    id: 12,
    question:'True or False, It is possible for Arti to die to regular explosives if hit by enough',
    image:'',
    options: ['True','False'],
    answer: 0,
    correctAnswer: 1,
    timeTaken: 0,
},{
    id: 13,
    question:'What does this scavenger marking represent?',
    image:'/images/quiz/hunteri1-NOCHEATING.png',
    options: ['Treasury','Toll','Echo','Companionship'],
    answer: 0,
    correctAnswer: 0,
    timeTaken: 0,
},{
    id: 14,
    question:'Which item can be regurgitated by gourmand?',
    image:'/images/quiz/gourmand.jpg',
    options: ['Karma Flower','Flashbang','Beehive','Noodlefly Egg'],
    answer: 0,
    correctAnswer: 2,
    timeTaken: 0,
},{
    id: 15,
    question:`Where is the echo 'Rhinestones beneath Shattered Glass' located?`,
    image:'',
    options: ['Metropolis','Shoreline','Shaded Citadel','Undergrowth'],
    answer: 0,
    correctAnswer: 3,
    timeTaken: 0,
},{
    id: 16,
    question:'What is the karma requirement to get from Undergrowth to Glacial Wasteland?',
    image:'https://static.miraheze.org/rainworldwiki/thumb/4/42/Undergrowth_region_screen.png/250px-Undergrowth_region_screen.png',
    options: ['1','2','3','4','5'],
    answer: 0,
    correctAnswer: 0,
    timeTaken: 0,
},{
    id: 17,
    question:'What song plays in the west bridge in Shaded Citadel?',
    image:'/images/quiz/hunteri2-NOCHEATING.png',
    options: ['Floes','Black Moonlight','Lack of Comfort','Lonesound'],
    answer: 0,
    correctAnswer: 1,
    timeTaken: 0,
},{
    id: 18,
    question:`Which of these are not a part of Gourmand's food quest?`,
    image:'',
    options: ['Grapple Worm','Snail','Eggbug Egg','Black Lizard'],
    answer: 0,
    correctAnswer: 2,
    timeTaken: 0,
},{
    id: 19,
    question:'Which of these creatures give the most amount of food pips when eaten by hunter?',
    image:'/images/quiz/emptypips.png',
    options: ['MLL','Miros Vulture','Red Lizard','King Vulture'],
    answer: 0,
    correctAnswer: 3,
    timeTaken: 0,
}
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
        case "monk":
            return 60;
        case "survivor":
            return 45;
        case "hunter":
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
            case "monk":
                difficulty.value = "monk";
                questions.value = easyQuestions.value;
                break;
            case "survivor":
                difficulty.value = "survivor";
                questions.value = mediumQuestions.value;
                break;
            case "hunter":
                difficulty.value = "hunter";
                questions.value = hunterQuestions.value;
                break;
            case "test":
                difficulty.value = "test";
                questions.value = testQuestions.value;
                break;
            default:
                questions.value = easyQuestions.value;
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
                <div class="w-full md:w-[60rem] mt-5">
                    <NuxtImg preload v-if="questions[currentID].image" :src="questions[currentID].image"  class="w-auto h-full max-h-80 mx-auto border-2 select-none border-white rounded-lg" />
                    <h2 class="text-white text-center font-rodondo text-4xl drop-shadow-sm mt-2">{{ questions[currentID].question }}</h2>
                    <div class="flex flex-wrap justify-center">

                        <div v-for="(option, index) in questions[currentID].options" :key="index" class="basis-full md:basis-1/2 px-3 mt-6 select-none">
                            <div class="h-20 w-full relative flex justify-center items-center">
                                <div @mouseenter="uiTick" @click="answerQuestion(index)" class="border-2 border-w w-full rounded-full absolute hover:opacity-100 hover:scale-105 hover:[&>div]:animate-border-pulse-slow hover:[&>div]:m-1  transition-all cursor-pointer " >
                                    <div class="p-3 flex items-center transition-all border-2 rounded-full border-transparent" :class="hasAnswered && questions[currentID].correctAnswer == index ? 'bg-emerald-600/75' : questions[currentID].correctAnswer != index && questions[currentID].correctAnswer != questions[currentID].answer && hasAnswered ? 'bg-red-600/50' : 'bg-transparent'">
                                        <div class="w-12 h-12 relative">
                                            <NuxtImg preload v-if="questions[currentID].answer != index || hasAnswered == false" src="/images/karma/karmaRing.png" class="absolute w-12 h-12 top-0 left-0 select-none" />
                                            <NuxtImg preload v-else src="/images/karma/karmaRingReinforced.png" class="absolute w-12 h-12 scale-125 top-0 left-0 select-none" />

                                            <!-- i am SO fucking sorry to any actually good web developers looking at the horseshit i'm about to code i SWEAR i had no idea how to do it dynamically IM SORRYYYYY :(((( -->
                                            <NuxtImg preload v-if="index==0" src="/images/karma/karma0.png" class="absolute w-12 h-12 top-0 left-0 select-none" /><NuxtImg preload v-else-if="index == 1" src="/images/karma/karma1.png" class="absolute w-12 h-12 top-0 left-0 select-none" /><NuxtImg preload v-else-if="index == 2" src="/images/karma/karma2.png" class="absolute w-12 h-12 top-0 left-0 select-none" /><NuxtImg preload v-else-if="index == 3" src="/images/karma/karma3.png" class="absolute w-12 h-12 top-0 left-0 select-none" /><NuxtImg preload v-else-if="index == 4" src="/images/karma/karma4.png" class="absolute w-12 h-12 top-0 left-0 select-none" /><NuxtImg preload v-else-if="index == 5" src="/images/karma/karma5.png" class="absolute w-12 h-12 top-0 left-0 select-none" /><NuxtImg preload v-else-if="index == 6" src="/images/karma/karma6.png" class="absolute w-12 h-12 top-0 left-0 select-none" /><NuxtImg preload v-else-if="index == 7" src="/images/karma/karma7.png" class="absolute w-12 h-12 top-0 left-0 select-none" /><NuxtImg preload v-else-if="index == 8" src="/images/karma/karma8.png" class="absolute w-12 h-12 top-0 left-0 select-none" /><NuxtImg preload v-else src="/images/karma/karma9.png" class="absolute w-12 h-12 top-0 left-0 select-none" />
                                        </div>
                                        <p class="text-white mx-auto font-rodondo text-3xl text-center">{{ option }}</p>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        
                        <div id="bottomCard" class="w-full min-h-60 py-10 flex">
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
                    <div class="basis-full md:basis-1/3 flex flex-col items-center p-10">
                        <h1 class="text-white text-center font-rodondo text-8xl drop-shadow-sm">Results</h1>
                        <div class="flex justify-between w-60">
                            <p class="text-white text-left text-lg drop-shadow-sm">Quiz:</p>
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
                        <h2 class="text-white text-center font-rodondo text-4xl drop-shadow-sm">Rank: {{ Math.round(correctAnswers / questions.length * 100) }}%</h2>
                        <!-- base rank from karma 1 to 5, based on percentage of correct answers, if all answers correct, karma 9 -->
                        <div class="w-full relative flex justify-center items-center">
                            <div class="relative w-20 h-20 mt-6">
                                <div class="absolute">
                                    <NuxtImg preload src="/images/karma/karmaRing.png" class="w-20 h-20 mx-auto" />
                                </div>
                                <!-- again, sorry to any web developers, i really am -->
                                <div class="absolute">
                                    <NuxtImg preload v-if="rank == 0 || rank == 1" src="/images/karma/karma0.png" class="w-20 h-20 mx-auto" />
                                    <NuxtImg preload v-else-if="rank == 2" src="/images/karma/karma1.png" class="w-20 h-20 mx-auto" />
                                    <NuxtImg preload v-else-if="rank == 3" src="/images/karma/karma2.png" class="w-20 h-20 mx-auto" />
                                    <NuxtImg preload v-else-if="rank == 4" src="/images/karma/karma3.png" class="w-20 h-20 mx-auto" />
                                    <NuxtImg preload v-else-if="rank == 5" src="/images/karma/karma4.png" class="w-20 h-20 mx-auto" />
                                    <NuxtImg preload v-else-if="rank == 9" src="/images/karma/karma9.png" class="w-20 h-20 mx-auto" />
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
                    <div class="basis-full md:basis-2/3 scale-90 md:scale-75">
                        <transition tag="div" name="fade" mode="out-in" class="sticky">
                            <div v-if="showResults">
                                <h2 class="text-white text-center font-rodondo text-4xl drop-shadow-sm">{{ questions[selectedQuestion].question }}</h2>
                                <div class="flex flex-wrap">
                                    <div v-for="(option, index) in questions[selectedQuestion].options" :key="index" class="basis-full lg:basis-1/2 px-3 mt-6">
                                        <div class="h-20 w-full relative flex justify-center items-center">
                                            <div @click="answerQuestion(index)" class="border-2 border-w w-full rounded-full absolute hover:opacity-100 hover:scale-105 hover:[&>div]:m-1 hover:[&>div]:!border-white transition-all cursor-pointer " >
                                                <div class="p-3 flex items-center transition-all border-2 rounded-full border-transparent" :class="hasAnswered && questions[selectedQuestion].correctAnswer == index ? 'bg-emerald-600/75' : questions[selectedQuestion].correctAnswer != index && questions[selectedQuestion].correctAnswer != questions[selectedQuestion].answer && hasAnswered ? 'bg-red-600/50' : 'bg-transparent'">
                                                    <div class="w-12 h-12 relative">
                                                        <NuxtImg preload v-if="questions[selectedQuestion].answer != index || hasAnswered == false" src="/images/karma/karmaRing.png" class="absolute w-12 h-12 top-0 left-0" />
                                                        <NuxtImg preload v-else src="/images/karma/karmaRingReinforced.png" class="absolute w-12 h-12 scale-125 top-0 left-0" />

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