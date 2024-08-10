// gives text glow effect
let glowing_text = document.querySelector(".header");

function glowing_effect() {
    glowing_text.classList.toggle("glow_flicker");
}
setInterval(glowing_effect, 750);


// gives border glow effect
function glowing_effect_border() {
    document.querySelector(".div1").classList.toggle("glow_flicker_border");
    document.querySelector(".div2").classList.toggle("glow_flicker_border");
    document.querySelector(".div3").classList.toggle("glow_flicker_border");
    document.querySelector(".div4").classList.toggle("glow_flicker_border");
    document.querySelector(".div5").classList.toggle("glow_flicker_border");
    document.querySelector(".div6").classList.toggle("glow_flicker_border");
    document.querySelector(".div7").classList.toggle("glow_flicker_border");
    document.querySelector(".div8").classList.toggle("glow_flicker_border");
    document.querySelector(".div9").classList.toggle("glow_flicker_border");

}
setInterval(glowing_effect_border, 1500);
// main part
player_move_decider=true; // true -> player move , false -> computer move

//eventlistener that checks what div box is clicked
document.querySelector(".div1").addEventListener('click',()=>{
    player_move_getter(0,0);
})
document.querySelector(".div2").addEventListener('click',()=>{
    player_move_getter(0,1);
})
document.querySelector(".div3").addEventListener('click',()=>{
    player_move_getter(0,2);
})
document.querySelector(".div4").addEventListener('click',()=>{
    player_move_getter(1,0);
})
document.querySelector(".div5").addEventListener('click',()=>{
    player_move_getter(1,1);
})
document.querySelector(".div6").addEventListener('click',()=>{
    player_move_getter(1,2);
})
document.querySelector(".div7").addEventListener('click',()=>{
    player_move_getter(2,0);
})
document.querySelector(".div8").addEventListener('click',()=>{
    player_move_getter(2,1);
})
document.querySelector(".div9").addEventListener('click',()=>{
    player_move_getter(2,2);
})

//function that checks if the col is occupied
function error_input_checker(row_id,col_id){
    const key = `${row_id}${col_id}`;
    switch (key) {
        case "00":
            return document.getElementById("00").innerHTML === "";
        case "01":
            return document.getElementById("01").innerHTML === "";
        case "02":
            return document.getElementById("02").innerHTML === "";
        case "10":
            return document.getElementById("10").innerHTML === "";
        case "11":
            return document.getElementById("11").innerHTML === "";
        case "12":
            return document.getElementById("12").innerHTML === "";
        case "20":
            return document.getElementById("20").innerHTML === "";
        case "21":
            return document.getElementById("21").innerHTML === "";
        case "22":
            return document.getElementById("22").innerHTML === "";
        default:
            return false; // Handle unexpected cases
    }
}

//function that places the moves
function move_placer(row_id,col_id,mover){
    let move=null;
    if(mover){
        move='X';
    }else{
        move='O';
    }
    const key = `${row_id}${col_id}`;
    switch (key) {
        case "00":
            return document.getElementById("00").innerHTML =move;
        case "01":
            return document.getElementById("01").innerHTML =move;
        case "02":
            return document.getElementById("02").innerHTML =move;
        case "10":
            return document.getElementById("10").innerHTML =move;
        case "11":
            return document.getElementById("11").innerHTML =move;
        case "12":
            return document.getElementById("12").innerHTML =move;
        case "20":
            return document.getElementById("20").innerHTML =move;
        case "21":
            return document.getElementById("21").innerHTML =move;
        case "22":
            return document.getElementById("22").innerHTML =move;
        default:
            return false; // Handle unexpected cases

}
        

}

//function that gets the player move index
function player_move_getter(row_id,col_id){
    if(error_input_checker(row_id,col_id)){
        move_placer(row_id,col_id,player_move_decider);
    }else{
        alert("ALREADY PLACED...!")
    }
    
}





if(player_move_decider){
    player_move_decider=false;
}else{
    alert("comp move");
    player_move_decider=true;
}
