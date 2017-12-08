let should = require('should');
let _ = require('lodash');

let TictactoeState = require('./tictactoe-state')(inject({}));

let tictactoe = require('./tictactoe-game')(inject({
    TictactoeState
}));

let createEvent = {
    type: "GameCreated",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

let joinEvent = {
    type: "GameJoined",
    user: {
        userName: "Gummi"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};


describe('create game command', function() {


    let given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game created event', function(){

        given = [];
        when =
        {
            id:"123987",
            type: "CreateGame",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
        {
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side:'X'
        }
        ];

    })
});


describe('join game command', function () {


    let given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game joined event...', function () {

        given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }
        ];
        when =
        {
            type: "JoinGame",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
        {
            type: "GameJoined",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side:'O'
        }
        ];

    });

    it('should emit FullGameJoinAttempted event when game full...', function () {

        given = [{
            type: "GameCreated",
            user: {
                userName: "Bob"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29"
        }, 
        {
            type: "GameJoined",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side:'O'
        }];
        when =
        {
            type: "JoinGame",
            user: {
                userName: "Alice"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:33:29"
        };
        then = [
        {
            type: "FullGameJoinAttempted",
            user: {
                userName: "Alice"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:33:29"
        }
        ];

        //expect(true).toBe(false);
    });
});

describe('Place move command', function() {


    let given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit MovePlaced on first move...', function(){

        given = [createEvent, joinEvent];
        when = {
            type: "PlaceMove",
            user: {
                userName: "Bob"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side: 'X',
            x: 1,
            y: 1
        };

        then = [{
            type: "MovePlaced",
            user: {
                userName: "Bob"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side: 'X',
            x: 1,
            y: 1
        }];
    })

    it('should emit IllegalMove when square is already occupied...', function(){

        given = [createEvent, joinEvent,
        {
            type: "MovePlaced",
            user: {
                userName: "Bob"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side: 'X',
            x: 1,
            y: 1
        }];
        when = {
            type: "PlaceMove",
            user: {
                userName: "Alice"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side: 'O',            
            x: 1,
            y: 1
        };

        then = [{
            type: "IllegalMove",
            user: {
                userName: "Alice"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side: 'O',
            x: 1,
            y: 1
        }];
    })
});