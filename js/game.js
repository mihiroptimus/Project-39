class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
   
    
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500,100,20);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500,100,20);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 if(allPlayers != null)
                { push()
                     textSize(30)
                     fill(255,230,230)
                     text("Scores",10,30)
                        if(allPlayers.player1.score<allPlayers.player2.score){
                     text(allPlayers.player1.name +" :"+allPlayers.player1.score,10,80); 
                     fill(255,230,230) 
                     text(allPlayers.player2.name +" :"+allPlayers.player2.score,10,60); 
                     }
                     else if(allPlayers.player1.score>allPlayers.player2.score){
                        text(allPlayers.player2.name +" :"+allPlayers.player2.score,10,80); 
                        fill(255,230,230) 
                        text(allPlayers.player1.name +" :"+allPlayers.player1.score,10,60); 
                        }
                 pop() } 
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         push()
                         fill(255,150,200,100)
                         strokeWeight(0)
                         ellipse(x, y+25, 125,65)
                         
                         pop();push()
                         fill("black");
                         textSize(25);
                        
                         text(allPlayers[plr].name ,x-25,y+25);   
                       
                          pop()               
                     }
                     fill("black");
                     textSize(25);
                     text(allPlayers[plr].name ,x-25,y+25);  
                                            
                 }
                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 30 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     fruits.lifetime= (height*1.5)/fruits.velocityY
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                 
                 }
                
                 
                  if (player.index !== null) {
                     //fill code here, to destroy the objects.
                     for (let i = 0; i < fruitGroup.length; i++) {
                         fruitGroup.overlap(players[player.index-1],()=>{player.score+=1;fruitGroup.get(i).destroy()})
                         
                     }
                  }
                

         
         
        
         

    }

    end(){
       console.log("Game Ended");
    }
}
