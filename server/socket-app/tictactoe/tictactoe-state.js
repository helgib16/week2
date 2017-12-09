const _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull = false;
        var gameWon = false;
        var gameDraw = false;
        var player1Move = true;
        var gameBoard = [['', '', ''],
                         ['', '', ''],
                         ['', '', '']];


        function processEvent(event) {
            if(event.type === "GameJoined"){
                gamefull = true;
            }
            if(event.type === "MovePlaced"){
                gameBoard[event.x][event.y] = event.side;
                player1Move = !player1Move;
            }
            //console.debug("event: ", event);
        }

        function processEvents(history) {
            //console.debug("history: ", history);
            _.each(history, processEvent);
        }

        function player1Turn(){
            return player1Move;
        }

        function gameFull(){
            return gamefull;
        }

        function squareOccupied(x, y){
            //console.debug("gameboard: ", gameBoard)
            return gameBoard[x][y] != '';
        }

        function retrieveSymbolOnSquare (x, y){
            return gameBoard[x][y]
        }

        processEvents(history);

        return {
            retrieveSymbolOnSquare: retrieveSymbolOnSquare,
            gameFull: gameFull,
            squareOccupied: squareOccupied,
            player1Turn: player1Turn,
            processEvents: processEvents,
        }
    };
};
