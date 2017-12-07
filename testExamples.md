# Test Examples
Here we will give test examples what should happen in curtain states of the game using event based approach.

## Creating a game
 State | Result
:----- | ---
 Given | Empty
 When  | Game is started and no other player has connected
 Then  | GameCreated event is dispatched

## Joining a game
 State | Result
:----- | ---
 Given | Game was created by player A
 When  | Player Bob joins the game
 Then  | GameJoined event is dispatched

## Joining a full game
 State | Result
:----- | ---
 Given | Game has 2 players already
 When  | Alice tries to join the game
 Then  | FullGameJoinAttempted event is dispatched

## Illegal moves
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | 

## Not your turn
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | 

## Game won
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | 

## Game draw
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | 

## name
 State | Result
:----- | ---
 Given | 
 When  | 
 Then  | 

