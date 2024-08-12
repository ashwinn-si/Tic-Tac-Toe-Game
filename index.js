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


//generating a matrix so we can keep track of the moves and ai can play the move

let board_matrix=[[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];


//eventlistener that checks what div box is clicked

document.querySelector(".div1").addEventListener('click',()=>{
    main(0,0);
})
document.querySelector(".div2").addEventListener('click',()=>{
    main(0,1);
})
document.querySelector(".div3").addEventListener('click',()=>{
    main(0,2);
})
document.querySelector(".div4").addEventListener('click',()=>{
    main(1,0);
})
document.querySelector(".div5").addEventListener('click',()=>{
    main(1,1);
})
document.querySelector(".div6").addEventListener('click',()=>{
    main(1,2);
})
document.querySelector(".div7").addEventListener('click',()=>{
    main(2,0);
})
document.querySelector(".div8").addEventListener('click',()=>{
    main(2,1);
})
document.querySelector(".div9").addEventListener('click',()=>{
    main(2,2);
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
            document.getElementById("00").innerHTML =move;
            board_matrix[0][0]=move;
            break;
        case "01":
            document.getElementById("01").innerHTML =move;
            board_matrix[0][1]=move;
             break;
        case "02":
            document.getElementById("02").innerHTML =move;
            board_matrix[0][2]=move;
            break;
        case "10":
            document.getElementById("10").innerHTML =move;
            board_matrix[1][0]=move;
            break;
        case "11":
            document.getElementById("11").innerHTML =move;
            board_matrix[1][1]=move;
            break;
        case "12":
            document.getElementById("12").innerHTML =move;
            board_matrix[1][2]=move;
            break;
        case "20":
            document.getElementById("20").innerHTML =move;
            board_matrix[2][0]=move;
            break;
        case "21":
            document.getElementById("21").innerHTML =move;
            board_matrix[2][1]=move;
            break;
        case "22":
            document.getElementById("22").innerHTML =move;
            board_matrix[2][2]=move;
            break;
        default:
            return false; // Handle unexpected cases

    }
}


// function that checks if the player or ai has won

function winner_checker(player,board_matrix){
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board_matrix[i][0] === player && board_matrix[i][1] === player && board_matrix[i][2] === player) {
                return true;
            }
        }
    
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (board_matrix[0][j] === player && board_matrix[1][j] === player && board_matrix[2][j] === player) {
                return true;
            }
        }
    
        // Check main diagonal
        if (board_matrix[0][0] === player && board_matrix[1][1] === player && board_matrix[2][2] === player) {
            return true;
        }
    
        // Check anti-diagonal
        if (board_matrix[0][2] === player && board_matrix[1][1] === player && board_matrix[2][0] === player) {
            return true;
        }
        // No winner found
        return false;
    
}


//function that checks if it is a draw

function draw_checker(board_matrix){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board_matrix[i][j] == ' '){
                return false;
            }
        }
    }
    return true;
}

function winner_draw_checker(player_move_decider){
    if(player_move_decider){
        if(winner_checker('O',board_matrix)){
            alert("player won");
        }
    }else{
        if(winner_checker('X',board_matrix)){
            alert("comp won");
        }
    }
}

//function for min max algorith
//O-plAyer  || X- computer
function min_max_alogorithm(board_matrix,depth,move){ // move -> true then it is generating cmp move else it is generating human move
    if(winner_checker('X',board_matrix)){ // if computer wins then return +1 as it the highest reward
        return 1;
    }
    else if(winner_checker('O',board_matrix)){ // if player wins then return -1 as it the lowest reward
        return -1; 
    }else if(draw_checker(board_matrix)){ // if the board is full then return 0 as it is a netural value
        return 0;
    }

    if(move){
        let best_score=-1000;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board_matrix[i][j] ==' '){
                    board_matrix[i][j]='X';
                    let score=min_max_alogorithm(board_matrix,depth+1,false);
                    board_matrix[i][j]=' ';
                    if(score>best_score){
                        best_score=score;
                    }
                }
            }
        }
        return best_score;
    }else{
        let best_score=1000;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board_matrix[i][j] ==' '){
                    board_matrix[i][j]='O';
                    score=min_max_alogorithm(board_matrix,depth+1,true);
                    board_matrix[i][j]=' ';
                    if(score<best_score){
                        best_score=score;
                    }
                }
            }
        }
        return best_score;
    }
}

function main_min_max_function(){
    let best_score=-1000;
    let move=[-1,-1];
    for(let i =0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board_matrix[i][j]==' '){
                board_matrix[i][j]='X';
                score=min_max_alogorithm(board_matrix,0,true);
                board_matrix[i][j]=' ';
                if(score>best_score){
                    best_score=score;
                    move=[i,j];
                }
            }
        }
    }
    return move;
}

//function that gets the player move index and generates the ai move 
//O-plAyer  || X- computer
function main(row_id,col_id){
    if(error_input_checker(row_id,col_id)){
        move_placer(row_id,col_id,player_move_decider);
    }else{
        alert("ALREADY PLACED...!")
    }
    winner_draw_checker(player_move_decider);
    if(draw_checker(board_matrix)){
        alert("math is draw");
    }
    //changing the player playing into comp move
    player_move_decider=(player_move_decider)?false:true;
    let computer_move=main_min_max_function();
    move_placer(computer_move[0],computer_move[1],player_move_decider);
    winner_draw_checker(player_move_decider);
    if(draw_checker(board_matrix)){
        alert("math is draw");
    }
    player_move_decider=(player_move_decider)?false:true;
}
