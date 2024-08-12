// Text glow effect
let glowing_text = document.querySelector(".header");

function glowing_effect() {
    glowing_text.classList.toggle("glow_flicker");
}
setInterval(glowing_effect, 750);

// Border glow effect
function glowing_effect_border() {
    for (let i = 1; i <= 9; i++) {
        document.querySelector(`.div${i}`).classList.toggle("glow_flicker_border");
    }
}
setInterval(glowing_effect_border, 1500);

// Main part
let player_move_decider = true; // true -> player move , false -> computer move

// Generating a matrix so we can keep track of the moves and AI can play the move
let board_matrix = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

// Event listeners that check which div box is clicked
for (let i = 1; i <= 9; i++) {
    document.querySelector(`.div${i}`).addEventListener('click', () => {
        const row = Math.floor((i - 1) / 3);
        const col = (i - 1) % 3;
        main(row, col);
    });
}

// Function that checks if the cell is occupied
function error_input_checker(row_id, col_id) {
    return board_matrix[row_id][col_id] === ' ';
}

// Function that places the moves
function move_placer(row_id, col_id, mover) {
    let move = mover ? 'X' : 'O';
    board_matrix[row_id][col_id] = move;
    document.getElementById(`${row_id}${col_id}`).innerHTML = move;
}

// Function that checks if the player or AI has won
function winner_checker(player, board_matrix) {
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

// Function that checks if it is a draw
function draw_checker(board_matrix) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board_matrix[i][j] === ' ') {
                return false;
            }
        }
    }
    return true;
}

function winner_draw_checker() {
    if (winner_checker('X', board_matrix)) {
        alert("Player won!");
        reset_board();
    } else if (winner_checker('O', board_matrix)) {
        alert("Computer won!");
        reset_board();
    } else if (draw_checker(board_matrix)) {
        alert("It's a draw!");
        reset_board();
    }
}

// Min-max algorithm for AI
function min_max_algorithm(board_matrix, depth, isMaximizing) {
    if (winner_checker('X', board_matrix)) {
        return 1; // Computer wins
    }
    if (winner_checker('O', board_matrix)) {
        return -1; // Player wins
    }
    if (draw_checker(board_matrix)) {
        return 0; // Draw
    }

    if (isMaximizing) {
        let best_score = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board_matrix[i][j] === ' ') {
                    board_matrix[i][j] = 'X';
                    let score = min_max_algorithm(board_matrix, depth + 1, false);
                    board_matrix[i][j] = ' ';
                    best_score = Math.max(score, best_score);
                }
            }
        }
        return best_score;
    } else {
        let best_score = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board_matrix[i][j] === ' ') {
                    board_matrix[i][j] = 'O';
                    let score = min_max_algorithm(board_matrix, depth + 1, true);
                    board_matrix[i][j] = ' ';
                    best_score = Math.min(score, best_score);
                }
            }
        }
        return best_score;
    }
}

function main_min_max_function() {
    let best_score = -Infinity;
    let best_move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board_matrix[i][j] === ' ') {
                board_matrix[i][j] = 'X';
                let score = min_max_algorithm(board_matrix, 0, false);
                board_matrix[i][j] = ' ';
                if (score > best_score) {
                    best_score = score;
                    best_move = { row: i, col: j };
                }
            }
        }
    }
    return best_move;
}

// Function that gets the player move index and generates the AI move
function main(row_id, col_id) {
    if (error_input_checker(row_id, col_id)) {
        move_placer(row_id, col_id, player_move_decider);
        winner_draw_checker();

        // Switch to computer move
        player_move_decider = !player_move_decider;

        if (!draw_checker(board_matrix) && !winner_checker('X', board_matrix) && !winner_checker('O', board_matrix)) {
            let computer_move = main_min_max_function();
            move_placer(computer_move.row, computer_move.col, player_move_decider);
            winner_draw_checker();

            // Switch back to player move
            player_move_decider = !player_move_decider;
        }
    } else {
        alert("Already placed!");
    }
}

function reset_board() {
    board_matrix = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`${i}${j}`).innerHTML = '';
        }
    }
    player_move_decider = true;
}
