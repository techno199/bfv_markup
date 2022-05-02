const APP_CONFIG = {
    loadingTime: 5500,
    enableMusic: true
}

const MOUSE_CLICK_AUDIO_CONFIG = [
    {
        path: 'audio/mouse_click1.mp3',
        volume: 1
    }
];

const MOUSE_TICK_AUDIO_CONFIG = [
    {
        path: 'audio/mouse_click1.mp3',
        volume: 1
    }
]

const BG_AUDIO_CONFIG = [
    {
        path: 'audio/bg_audio1.mp3',
        volume: 0.05
    },
    {
        path: 'audio/bg_audio2.mp3',
        volume: 0.6
    },
    {
        path: 'audio/bg_audio3.mp3',
        volume: 0.24
    },
    {
        path: 'audio/bg_audio4.mp3',
        volume: 0.3
    },
    {
        path: 'audio/bg_audio5.mp3',
        volume: 0.15
    },
];

$.fn.gallery = function() {
    const $this = $(this);
    $this.on('mousewheel', (e) => {
        const { originalEvent } = e;
        const { deltaY } = originalEvent;
        $this.scrollLeft($this.scrollLeft() - deltaY)
    })
}

const pickRandomAudio = audioConfig => {
    const i = Math.floor(Math.random() * audioConfig.length);
    const configItem = audioConfig[i];
    const audio = new Audio(configItem.path);
    audio.volume = configItem.volume;

    return audio;
}

const initButtonsAudio = () => {
    const $buttons = $('.btnSounds');
    
    for (let button of $buttons) {
        $(button).click(() => {
            pickRandomAudio(MOUSE_CLICK_AUDIO_CONFIG).play();
        });

        $(button).hover(() => {
            pickRandomAudio(MOUSE_TICK_AUDIO_CONFIG).play();
        })
    }
}

(function() {
    const $loadingPage = $('#loadingPage');
    const $mainMenuPage = $('#mainMenuPage');
    const $mainPageBgVideo = $('.mainMenuPage_bgVideo');
    let bgAudio;

    const toggleLoader = () => {
        $('.loader').fadeToggle(800);
        $('.backdrop').fadeToggle(800);
    }

    const loopBgAudio = () => {
        const audio = pickRandomAudio(BG_AUDIO_CONFIG);
        audio.onended = () => setTimeout(loopBgAudio, 5000);
        audio.play();
        bgAudio = audio;
    }

    $('.loadingPage_btnPlay').click(() => {
        toggleLoader();

        setTimeout(() => {
            toggleLoader();

            if (APP_CONFIG.enableMusic) {
                loopBgAudio();
            }

            $loadingPage.fadeOut();
            $mainMenuPage.fadeIn();
            $mainPageBgVideo.trigger('play');
            $('.gallery').gallery();
        }, APP_CONFIG.loadingTime);
    });

    $('.mainMenuPage_btnQuit').click(() => {
        $mainMenuPage.fadeOut();
        $loadingPage.fadeIn();
        $mainPageBgVideo.trigger('stop');
        bgAudio.pause();
        bgAudio.currentTime = 0;
        $mainPageBgVideo.trigger('pause')
        $mainPageBgVideo[0].currentTime = 0;
    })

    const init = () => {
        $loadingPage.show();   
    }

    init();
    initButtonsAudio();
})();