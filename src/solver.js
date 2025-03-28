MAX_MOVES = 8

function testSol(cube, moves, instructionHandler, textviewHandler, count) {

    var count2 = count

    if (moves.length == 1) {
        textviewHandler("Testing : " + moves.join(" "))
    }

    if (cube.isCrossOK()) {
        instructionHandler(moves)
        return count + 1
    }

    if ((4 - cube.getPlacedCubies()) + moves.length > MAX_MOVES)
        return count

    if (moves.length == MAX_MOVES)
        return count

    var lastmove = ' '
    if (moves.length > 0)
        lastmove = moves[moves.length - 1][0]

    var lastlastmove = ' '
    if (moves.length > 1)
        lastlastmove = moves[moves.length - 2][0]


    if (!(lastmove == 'U' || (lastmove == 'D' && lastlastmove == 'U'))) {
        cube.doU()
        count2 = testSol(cube, moves.concat(["U"]), instructionHandler, textviewHandler, count2)
        cube.doU()
        count2 = testSol(cube, moves.concat(["U2"]), instructionHandler, textviewHandler, count2)
        cube.doU()
        count2 = testSol(cube, moves.concat(["Up"]), instructionHandler, textviewHandler, count2)
        cube.doU()
    }
    if (!(lastmove == 'R' || (lastmove == 'L' && lastlastmove == 'R'))) {
        cube.doR()
        count2 = testSol(cube, moves.concat(["R"]), instructionHandler, textviewHandler, count2)
        cube.doR()
        count2 = testSol(cube, moves.concat(["R2"]), instructionHandler, textviewHandler, count2)
        cube.doR()
        count2 = testSol(cube, moves.concat(["Rp"]), instructionHandler, textviewHandler, count2)
        cube.doR()
    }
    if (!(lastmove == 'F' || (lastmove == 'B' && lastlastmove == 'F'))) {
        cube.doF()
        count2 = testSol(cube, moves.concat(["F"]), instructionHandler, textviewHandler, count2)
        cube.doF()
        count2 = testSol(cube, moves.concat(["F2"]), instructionHandler, textviewHandler, count2)
        cube.doF()
        count2 = testSol(cube, moves.concat(["Fp"]), instructionHandler, textviewHandler, count2)
        cube.doF()
    }
    if (!(lastmove == 'L' || (lastmove == 'R' && lastlastmove == 'L'))) {
        cube.doL()
        count2 = testSol(cube, moves.concat(["L"]), instructionHandler, textviewHandler, count2)
        cube.doL()
        count2 = testSol(cube, moves.concat(["L2"]), instructionHandler, textviewHandler, count2)
        cube.doL()
        count2 = testSol(cube, moves.concat(["Lp"]), instructionHandler, textviewHandler, count2)
        cube.doL()
    }
    if (!(lastmove == 'D' || (lastmove == 'U' && lastlastmove == 'D'))) {
        cube.doD()
        count2 = testSol(cube, moves.concat(["D"]), instructionHandler, textviewHandler, count2)
        cube.doD()
        count2 = testSol(cube, moves.concat(["D2"]), instructionHandler, textviewHandler, count2)
        cube.doD()
        count2 = testSol(cube, moves.concat(["Dp"]), instructionHandler, textviewHandler, count2)
        cube.doD()
    }
    if (!(lastmove == 'B' || (lastmove == 'F' && lastlastmove == 'B'))) {
        cube.doB()
        count2 = testSol(cube, moves.concat(["B"]), instructionHandler, textviewHandler, count2)
        cube.doB()
        count2 = testSol(cube, moves.concat(["B2"]), instructionHandler, textviewHandler, count2)
        cube.doB()
        count2 = testSol(cube, moves.concat(["Bp"]), instructionHandler, textviewHandler, count2)
        cube.doB()
    }

    return count2 + 1

}

