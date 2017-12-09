
module.exports = function(injected){
    let TictactoeState = injected('TictactoeState');

    return function(history){

        let gameState = TictactoeState(history);

        return {
            executeCommand: function(cmd, eventHandler){
                function applyEvents(events, moreEvents){
                    gameState.processEvents(events);

                    //Checking for win conditions
                    for (var i = 0; i < 3; i++){
                        if (gameState.retrieveSymbolOnSquare(i,0) != '' && gameState.retrieveSymbolOnSquare (i,0) == gameState.retrieveSymbolOnSquare(i,1) && gameState.retrieveSymbolOnSquare(i,1) == gameState.retrieveSymbolOnSquare(i,2)){
                            applyEvents( [{
                                gameId: cmd.gameId,
                                type: "GameWon",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp:cmd.timeStamp
                            }]);
                        }
                        if (gameState.retrieveSymbolOnSquare(0,i) != '' && gameState.retrieveSymbolOnSquare (0,i) == gameState.retrieveSymbolOnSquare(1,i) && gameState.retrieveSymbolOnSquare(1,i) == gameState.retrieveSymbolOnSquare(2,i)){
                            applyEvents( [{
                                gameId: cmd.gameId,
                                type: "GameWon",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp:cmd.timeStamp
                            }]);
                        }
                    }
                    if ((gameState.retrieveSymbolOnSquare (0,0) == gameState.retrieveSymbolOnSquare(1,1) && gameState.retrieveSymbolOnSquare(1,1) == gameState.retrieveSymbolOnSquare(2,2)) || (gameState.retrieveSymbolOnSquare (0,2) == gameState.retrieveSymbolOnSquare(1,1) && gameState.retrieveSymbolOnSquare(1,1) == gameState.retrieveSymbolOnSquare(2,0))) {
                        applyEvents( [{
                                gameId: cmd.gameId,
                                type: "GameWon",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp:cmd.timeStamp
                        }]);
                    }
                    //Check here for game state that may result in additional events
                    eventHandler(events);
                }

                let cmdHandlers = {
                    "CreateGame": function (cmd) {
                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameCreated",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'X'
                        }]);

                    },
                    "JoinGame": function (cmd) {
                        if(gameState.gameFull()){
                            applyEvents( [{
                                gameId: cmd.gameId,
                                type: "FullGameJoinAttempted",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            }]);
                            return;
                        }

                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameJoined",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'O'
                        }]);
                    },
                    "LeaveGame": function (cmd) {
                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameLeft",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }]);
                    },
                    "PlaceMove": function(cmd){

                        //console.debug("cmd: ", cmd);
                        if(gameState.player1Turn() && cmd.side === 'O' || !gameState.player1Turn() && cmd.side === 'X'){
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "NotYourMove",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                                side: cmd.side,
                                x: cmd.x,
                                y: cmd.y
                            }]);
                            return;
                        };

                        if(gameState.squareOccupied(cmd.x, cmd.y)){
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "IllegalMove",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                                side: cmd.side,
                                x: cmd.x,
                                y: cmd.y
                            }]);
                            return;
                        }
                        else{
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "MovePlaced",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                                side: cmd.side,
                                x: cmd.x,
                                y: cmd.y
                            }]);
                        }

                    },
                    "RequestGameHistory": function(cmd){
                        // Game does not handle this query command, is declared here for making tests more robust.
                    }
                };

                if(!cmdHandlers[cmd.type]){
                    throw new Error("I do not handle command of type " + cmd.type)
                }
                cmdHandlers[cmd.type](cmd);
            }
        }
    }
};

