/**
 * S N O W D R I N K S
 */
var pan = [] // brewing will take place here
const ingredients = [
    {id:0, name:"honey"},
    {id:0, name:"garlic"},
    {id:0, name:"fire"},
    {id:0, name:"water"},
    {id:0, name:"herbs"},
    {id:0, name:"rum"},
    {id:0, name:"cinnamon"},
]

var curLevel = 1
var bgm
var log = document.getElementById("feedback-log")


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

    setupButton("#select-lvl1", () => {
        showScreen("#lvl1")
        playLevel(1)
    })
    setupButton("#select-lvl2", () => {
        showScreen("#lvl2")
        playLevel(2)
    })
    setupButton("#select-lvl3", () => {
        showScreen("#lvl3")
        playLevel(3)
    })

    /* Setup Settings Screen*/
    
    document.getElementById("music-toggle").addEventListener("click", onMusicToggle)


    /* Setup Gameplay buttons*/

    for(let i = 0; i<ingredients.length; i++){
        const btns = document.querySelectorAll(".btn"+i)

        for(let btn of btns){
            btn.addEventListener("click", () => {
                addIngredientToPan(i)
                btn.disabled = true
                
            })
        }
    }
    
    const restartButtons = document.querySelectorAll(".restart-level")

    for(rb of restartButtons){
        rb.addEventListener("click", () => {
            playLevel(curLevel)
        })
    }


    // music
    playMusic()
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
    log.innerText = ""
}

playLevel = (levelNum) => {
    const ingBtns = document.querySelectorAll(".ingredient-button")

    for(btn of ingBtns){
        btn.disabled = false
    }
    log.innerText = ""

    pan = []
    curLevel = levelNum
    console.log("play cur level as ", curLevel)
}

const addIngredientToPan = (ingredientId) =>{
    for(key of Object.keys(pan)){
        pan[key]++
    }

    pan[ingredients[ingredientId].name] = 0
    showIngredientLog(ingredients[ingredientId].name)
    checkBrew()
}

const showIngredientLog = (ingredient) => {
    if(ingredient == 'fire'){
        log.innerText += "\nTurned fire on"
    } else {
        log.innerText += "\nAdded " + ingredient
    }
}

const logThis = (msg) => {
    log.innerText += "\n\n" + msg
}
const checkBrew = () => {

    console.log(Object.keys(pan).length)
    console.log(getCurLevelIngredientCount())
    if(Object.keys(pan).length >= getCurLevelIngredientCount()){
        evaluateBrew();
    }
}
const evaluateBrew = () => {
    var review = "\n\n=== BREW STATUS ===\n\n"
    var issues = false
    
    if(pan["honey"] > pan["fire"] && pan["water"] < pan["fire"]){
        review += "Honey got burned\n"
        issues = true
    }

    if(pan["fire"] > pan["garlic"] && (pan["garlic"] - pan["water"]) < 2){
        review += "Garlic got burned\n"
        issues = true
    }

    if(pan["fire"] > pan["garlic"] && (pan["garlic"] - pan["water"]) > 2){
        review += "Garlic got undercooked\n"
        issues = true
    }

    if(pan["rum"] > 2){
        review += "Rum evaporated\n"
        issues = true
    }

    if(pan["fire"] == 0){
        review += "It did not cook properly"
        issues = true
    }

    if(pan["cinnamon"] > 0){
        review += "Cinnamon lost its flavor"
        issues = true
    }

    if(!issues){
        review += "Perfect brew!"
    }

    logThis(review)
}

const playMusic = () => {
    if (bgm){
        bgm.pause()
    }
    bgm = new Audio('gameplay.ogg')
    bgm.loop = true
    bgm.play()
}

const stopMusic = () => {
    bgm.pause()
}

const onMusicToggle = () => {
    console.log("on music toggle")
    const tgl = document.getElementById("music-toggle")

    if(tgl.checked){
        playMusic()
    } else {
        stopMusic()
    }

}

const getCurLevelIngredientCount = () => {
    switch(curLevel){
        case 1:
            return 4
        case 2:
            return 5
        case 3:
            return 7
        default:
            return -1
    }
}



init();