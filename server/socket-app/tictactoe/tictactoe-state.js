const _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull = false;
        var gameWon = false;
        var gameDraw = false;
        var gameBoard = [['', '', ''],
                         ['', '', ''],
                         ['', '', '']];


        function processEvent(event) {
            if(event.type === "GameJoined"){
                gamefull = true;
            }
            if(event.type === "MovePlaced"){
                gameBoard[event.x][event.y] = event.side;
            }
            //console.debug("event: ", event);
        }

        function processEvents(history) {
            //console.debug("history: ", history);
            _.each(history, processEvent);
        }

        function gameFull(){
            return gamefull;
        }

        function squareOccupied(x, y){
            //console.debug("gameboard: ", gameBoard)
            return gameBoard[x][y] != '';
        }

        processEvents(history);

        return {
            gameFull: gameFull,
            squareOccupied: squareOccupied,
            processEvents: processEvents,
        }
    };
};
