/**
 * S N O W D R I N K S
 */

const init = () => {
    // setup back buttons
    document.querySelectorAll(".back-button").forEach((element) => {
        element.addEventListener("click", () => showScreen("#title-screen"))
    })

    /**
     * setup title screen
     */

    /// title screen play button
    setupButton("#ts-play", () => showScreen("#level-select"))

    //title screen settings
    setupButton("#ts-settings", () => showScreen("#settings-screen"))
    //title screen credits
    setupButton("#ts-credits", () => showScreen("#credits-screen"))

    /**
     * Setup Level Select
     */

    setupButton("#select-lvl1", () => showScreen("#lvl1"))
    setupButton("#select-lvl2", () => showScreen("#lvl2"))
    setupButton("#select-lvl3", () => showScreen("#lvl3"))


}

const setupButton = (id, callback) => {
    document.querySelector(id).addEventListener("click", () => callback())
}

const showScreen = (id) => {
    const mains = document.querySelectorAll("main")

    for(m of mains){
        m.classList.add("hidden")
    }

    document.querySelector(id).classList.remove("hidden")
}


init();