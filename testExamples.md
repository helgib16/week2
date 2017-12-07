# Test Examples
Here we will give test examples what should happen in curtain states of the game using event based approach.

> Given-events
> When-commands
> Then-events

## Create/join a game commands

#### Creating a game
 State | Result
:----- | ---
 Given | Empty
 When  | Game is started and no other player has connected
 Then  | emits GameCreated event

#### Joining a game
 State | Result
:----- | ---
 Given | Game was created by player A
 When  | Player Bob joins the game
 Then  | emits GameJoined event

#### Joining a full game
 State | Result
:----- | ---
 Given | Game has 2 players already
 When  | Alice tries to join the game
 Then  | emits FullGameJoinAttempted event

## Place moves commands

#### First game move
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | emits MovePlaced event

#### Illegal move - Out of bound
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | 

#### Illegal move - Square occupied
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | emits IllegalMove event

#### Not your turn
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | emits NotYourMove event

## Game over commands

#### Game won horizontal
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | emits GameWon event

#### Game won vertical
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | emits GameWon event

#### Game won diagonally
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | emits GameWon event

#### Game draw
 State | Result
:----- | ---
 Given | 
 When  | (last square and not game won)
 Then  | emits GameDraw event

#### name
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | 
