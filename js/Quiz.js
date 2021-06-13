class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    //question.hideques()
    question.hide()


    //write code to change the background color here
    background("yellow")

    //write code to show a heading for showing the result of Quiz
    textSize(35)
    fill("black")
    text("Results of the quiz", 280, 45)

    textSize(50)
    fill("black")
    text("--------------------", 255, 70)


    //call getContestantInfo( ) here
    Contestant.getPlayerInfo()


    //write condition to check if contestantInfor is not undefined
    if(allContestants != undefined)
    {
      fill("black")
      textSize(22)

      //write code to add a note here
      text("*Note: Contestants who answered correct are highlighted in green colour", 90,230)
      var textY = 300
    

      //write code to highlight contest who answered correctly
      for(var plr in allContestants){
        var correctAnswer = "2"
        if(correctAnswer === allContestants[plr].answer)
           fill("green")
           else
            fill("red")
            
          text(allContestants[plr].name + " : "+ allContestants[plr].answer,width/2,textY)
          textY = textY + 20;}
      }
  }

}
