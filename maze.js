const SIZE = 25;
let Maze;
let active;
let bag = [];
let sID;
let started = false;

$(document).ready(function() {
    setUpMaze();
});


function setUpMaze() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            let $cell = $("<div>", { class: "cell", id: "cell-" + i + "-" + j });
            $(".Maze").append($cell);
        }
    }

    Maze = new Array(SIZE);

    for (let i = 0; i < SIZE; i++) {
        Maze[i] = new Array(SIZE);
    }
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            Maze[i][j] = new Cell(i, j);
        }
    }
    first = Maze[0][0];
    active = Maze[0][0];
    active.isActive();

}

function play() {
    active.visited();
    let next = active.checkNeighbour();
    active.inActive();
    if (next) {
        bag.push(active);
        removeWall(active, next);
        active = next;
    } else {
        active = bag.pop();
    }
    active.isActive();

    if (active == first) {
        active.inActive();
        stop();
        $(".reload").removeClass("hidden");
        $(".start").addClass("hidden");
    }
}

function removeWall(first, second) {
    let f = first.pos;
    let s = second.pos;
    if (f.y < s.y) {
        first.rbottom();
        second.rtop();
    }
    if (f.y > s.y) {
        first.rtop();
        second.rbottom();
    }
    if (f.x < s.x) {
        first.rright();
        second.rleft();
    }
    if (f.x > s.x) {
        first.rleft();
        second.rright();
    }
}

$(".start").click(() => {
    sID = setInterval(play, 100);
    $(".start").addClass("hidden");
    $(".stop").removeClass("hidden");
});

$(".stop").click(() => {
    stop();
});

function stop() {
    clearInterval(sID);
    $(".stop").addClass("hidden");
    $(".start").removeClass("hidden");
}

$(".reload").click(() => {
    $(".Maze *").remove();
    setUpMaze();
    $(".start").removeClass("hidden");
    $(".reload").addClass("hidden");
});