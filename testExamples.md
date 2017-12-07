# Test Examples
Here we will give test examples what should happen in curtain states of the game using event based approach.

> Given-events
> When-commands
> Then-events

## Create/join a game commands

#### Creating a game
 State | Result
:----- | ---
 Given | Player is not a part of a created game
 When  | Game is started and no other player has connected
 Then  | Game has been created and the program emits GameCreated event

#### Joining a game
 State | Result
:----- | ---
 Given | Game was created by player A
 When  | Player Bob joins the game
 Then  | Game is full and ready to be played, emits GameJoined event

#### Joining a full game
 State | Result
:----- | ---
 Given | Game has 2 players already
 When  | Alice tries to join the game
 Then  | Alice won't be able to join, game emits FullGameJoinAttempted event

## Place moves commands

#### First game move
 State | Result
:----- | ---
 Given | Two players are in a fresh game and no moves have been played
 When  | Player1 makes his first move
 Then  | Game emits MovePlaced event

#### Illegal move - Out of bound
 State | Result
:----- | ---
 Given | Alice and Bob are in a game playing
 When  | Alice makes a move which ends up out of the gameboard
 Then  | Game emits OutOfBound event and Alice needs to redo her move

#### Illegal move - Square occupied
 State | Result
:----- | ---
 Given | Bob and Alice are in a game playing
 When  | Alice makes a move on a square which is already occupied
 Then  | Game emits IllegalMove event and Alice needs to redo her move

#### Not your turn
 State | Result
:----- | ---
 Given | Alice and Bob are in a game playing and it is Bob's turn
 When  | Alice makes a move when it is not her turn
 Then  | Game emits NotYourMove event and Alice needs to wait her turn

## Game over commands

#### Game won horizontal
 State | Result
:----- | ---
 Given | Alice and Bob are playing and it is Bob's turn
 When  | Bob makes a move which ends up making his signs (character) in a horizontal line
 Then  | Game emits GameWon event and Bob has won the game

#### Game won vertical
 State | Result
:----- | ---
 Given | Alice and Bob are playing and it is Bob's turn
 When  | Bob makes a move which ends up making his signs (character) in a vertical line
 Then  | Game emits GameWon event and Bob has won the game

#### Game won diagonally
 State | Result
:----- | ---
 Given | Alice and Bob are playing and it is Bob's turn
 When  | Bob makes a move which ends up making his signs (character) in a diagonally line, which could look like / or \
 Then  | Game emits GameWon event and Bob won the game

#### Game draw
 State | Result
:----- | ---
 Given | Alice and Bob are playing and there is only 1 square remaining
 When  | Alice fills the last square, if it does not emit GameWon event
 Then  | Game emits GameDraw event and no one won
