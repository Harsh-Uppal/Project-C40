class Game{
    
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

        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
    
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);

        players=[player1,player2];

    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);;
        var x = 100;
        var y = 200;
        var index = 0;
        drawSprites();
        for(var plr in allPlayers){
                    
                    
            index = index + 1;
            x = 500 - allPlayers[plr].distance;
            y = 500;
                     
            players[index - 1].x = x;
            players[index - 1].y = y;
                       
            fill("black");
            textSize(25);
            text(allPlayers[plr].name, x - 25, y + 25);
            text(allPlayers[plr].name + " : " + allPlayers[plr].score,50,50 * index);
        }

            for (var i = 0; i < fruitGroup.length; i++) {
                if (fruitGroup[i] == null) {
                    continue;
                }

                if (this.playerIsTouching(fruitGroup[i])) {
                    fruitGroup[i] = null;
                    player.score++;
                    player.update();
                }
            }
                      

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }

                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 == 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     switch (round(random(1, 5))){
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
                     fruitGroup[fruitGroup.length] = fruits;
                     
                 }
                 
                  if (player.index !== null) {
                     //fill code here, to destroy the objects.
                  }
    }

    end(){
       console.log("Game Ended");
    }

    playerIsTouching(b2) {
        var p;

        switch (parseInt(player.index)) {
            case 1:
                p = player1.x;
                this.mv = 1;
            case 2:
                p = player2.x;
        }

        if (this.mv == 1) {
            p = player1.x;
        }

        if (b2.y > 490 && b2.y < 540) {
            if (b2.x + 50 > p - 70 && b2.x - 50 < p + 70) {
                return true;
            }
        }

        return false;
    }
}