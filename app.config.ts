export default defineAppConfig({
    ui: {

        primary: 'neutral',
        grey: 'slate',

        button:{
            default:{
                color: 'RW'
            },
            color:{
                "RW": {
                    // green button on light mode, blue button on dark mode
                    "solid": 'bg-transparent text-white font-rodondo text-2xl py-1 px-10 rounded-xl border-2 border-white flex',
                },
            },
        },
    }
})
        