const canvas = document.querySelector('canvas')
const secondsCount = document.querySelector(".seconds")
const rank = document.querySelector(".rank")
const context = canvas.getContext('2d')
const dimensions = {width: 275, height: 319}

const ranks = {
    10: " Seasoned",
    30: " Journeyman",
    50: " Respected",
    90: " Platinum Grade",
    180: " Truly Gifted",
    300: " Truly One of a Kind"

}
const startTime = Date.now()


canvas.width = window.innerWidth
canvas.height = window.innerHeight
context.translate(window.innerWidth/2, window.innerHeight/2)

const image = new Image()
image.src = './assets/god.png'

const loopNum = 40
const offsetDist = 90
let currentOffset = 0

const movementRange = 200
const mouseOffset = {
    x: 0,
    y: 0
}
const movementOffset = {
    x: 0,
    y: 0
}

image.onload = () =>{
    startLooping()
}

window.addEventListener('mousemove', onMouseMove)

function draw(offset, loopCount){

    let currentImages_Percent = (loopNum - loopCount) / loopNum
    context.drawImage(
        image,
        -dimensions.width/2 - offset/2 + (movementOffset.x*currentImages_Percent),
        -dimensions.height/2 - offset/2 + (movementOffset.y*currentImages_Percent),
        dimensions.width + offset,
        dimensions.height + offset)
}

function onMouseMove(e){
    mouseOffset.x = (e.clientX - window.innerWidth / 2)/ window.innerWidth / 2 * movementRange
    mouseOffset.y = (e.clientY - window.innerHeight / 2)/ window.innerHeight / 2 * movementRange
}

function lerp(start, end, amount){
    return start*(1-amount)+end*amount
}

function loopDraw(){
    movementOffset.x = lerp(movementOffset.x, mouseOffset.x, .05)
    movementOffset.y = lerp(movementOffset.y, mouseOffset.y, .05)

    for(let i = loopNum; i >=1; i--){
        draw(i * offsetDist + currentOffset, i)
    }

    draw(offsetDist, 1)
    currentOffset++
    if(currentOffset >= offsetDist){
        currentOffset = 0
    }
    const newTime = Math.floor((Date.now() - startTime) /1000)
    secondsCount.innerText = newTime

    if(ranks[newTime]){
        rank.innerText = ranks[newTime]
    }
    requestAnimationFrame(loopDraw)
}

function startLooping(){
    requestAnimationFrame(loopDraw)

}