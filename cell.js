class Cell {
    constructor(a, b) {
        this.pos = {
            x: a,
            y: b
        };
        this.cell = $("#cell-" + this.pos.y + "-" + this.pos.x);
        this.cell.addClass("top");
        this.cell.addClass("right");
        this.cell.addClass("bottom");
        this.cell.addClass("left");
        this.past = false;
    }

    rtop() {this.cell.removeClass("top");}

    rbottom() {this.cell.removeClass("bottom");}

    rright() {this.cell.removeClass("right");}

    rleft() {this.cell.removeClass("left");}

    visited() {
        this.past = true;
        this.cell.addClass("visited");
    }

    isActive() {this.cell.addClass("active");}

    inActive() {this.cell.removeClass("active");}

    checkNeighbour() {
        let neb = [];
        for (let i = -1; i <= 1; i += 2) {
            let b = this.pos.y + i;
            let a = this.pos.x + i;
            if (b >= 0 && b < SIZE) {
                if (!Maze[this.pos.x][this.pos.y + i].past) {
                    neb.push(Maze[this.pos.x][this.pos.y + i]);
                }
            }

            if (a >= 0 && a < SIZE) {
                if (!Maze[this.pos.x + i][this.pos.y].past) {
                    neb.push(Maze[this.pos.x + i][this.pos.y]);
                }
            }
        }

        if (neb.length == 0) {
            return null;
        } else {
            return (neb[Math.floor(Math.random() * neb.length)]);
        }
    }
}