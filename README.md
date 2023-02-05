**Valorant XP Bot**

Valorant XP Discord Bot was developed to create a space for players, to queue with other competitive players to help build their skillset.


## Usage Instructions
 
 * Register using command /register (Valorant API to validate users Riot ID's)
 * Players are then placed in an Unrated rank and given 190xp points
 * Players must play 5 unrated games at the beginning of each season reset to recieve on our ranks (S,A,B,C,D,E,F). 
    Players will still have the option to queue in the unrated channel, but win's and loses are not recorded here so this will not affect placements
 * Players start the queue process with /q or /queue. A dialogue box will pop up asked players to join the queue. 
    A timer will also start, giving players a time period to join before the queue time expires and forfeits the queue (queue's are region based)
 * Once queue has ten players, players will be asked to join a voice channel. from there the bot will ask players to select captains or the bot will choose
    Captains will then proceed to ban two maps each allowng the bot to select a map, from the remaining selections
 * when captains have been decided, the bot will move everyone to newly created voice channels for each team and send the captain Riot ID to his/her team
 * after the game has been completed, captains will submit score in the match-completed channel (Enter number of rounds won vs number or rounds lost
 * points will be distributed accordingly based on points metric
