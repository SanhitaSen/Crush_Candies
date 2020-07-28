
let play = false;
 let score;
 let chancesLeft;
 let step;
 let counter; 
let action2; //used for counterSetting
 let action; //used for setInterval function of lives or chancesLeft.
 let candies=['candy1','candy2','candy3','candy4','candy5','candy6','candy8','candy9','candy10','candy11','candy12'];
 $(function()
 {
   $("#submit").click(function()
   {
     // If playing:
      if (play==true)
      {
         location.reload();
      }
      //If not initially playing:
      else
      {
         play=true; //Game started.
         //set Score to 0.
         score = 0;
         $("#plusScore").html(score);
         //show chances Left.
         $("#chancesLeft").show();
         //Show counter
         counter=60;
         $("#time").html(counter);
         $("#timeRem").show();
         chancesLeft=3;
        addHearts();
        $("#over").hide();
        //change text of submit button to reset game
        $("#submit").html('Reset Game');
        startCountdown();
        if (counter>0)
       {
         startSendingCandy();
       }
      
      }
      // Start sending fruits

   });

   //crush candies
   $("#candy1").mouseover(function()
   {
      score++;
      //update score;
      $("#plusScore").html(score);
      //play sound
      $("#crushing")[0].play();
      //when mouse hovers over candy, stop candy from going further down and hide it. 
      clearInterval(action);
      //hide fruit through aniimation
      //crushing the candy
      $("#candy1").hide("explode",500);
      //send new Candy again
      setTimeout(startSendingCandy,1000);

   });

 function addHearts()
 {
   $("#chancesLeft").empty();  
   if (counter!=0){
   for (let i=0;i<chancesLeft;i++)
   {
      $("#chancesLeft").append('<img src="./Images/heart.png" class="hearts">');
   }
   }
 }
 function startSendingCandy()
 {
    //generate a random candy
    $("#candy1").show();
    chooseCandy();
    //Random position:
    $("#candy1").css({'left':Math.round(Math.random()*540), 'top':0});
    //Generate random step:
    step=1+Math.round(Math.random()*5);
    //Move fruit by one step of random height every 10ms.
    action =setInterval(function(){
      $("#candy1").css('top',$("#candy1").position().top+ step);
      //check if the candy is too low.
      if ($("#candy1").position().top > $("#candyContainer").height())
      {
          //check if any chances or lives left
          if(chancesLeft>1 && counter!=0)
          {
            $("#candy1").show();
            chooseCandy();
            //Random position:
            $("#candy1").css({'left':Math.round(Math.random()*550), 'top':0});
            //Generate random step:
            step=1+Math.round(Math.random()*5);
            chancesLeft--;
            //Populate chancesLeft with right number of hearts. 
            addHearts();
          }
          else
          {
             play = false;
             $("#submit").html('Start Game');
            $("#over").show();
           // $("#timeRem").hide();
           stopCounter();
           scoreRemarks();
            
          stopAction();  
          }
      }

    },15);
 }
 function chooseCandy()
 {
    let  i=Math.floor(Math.random()*11);
   $("#candy1").attr('src','./Images/'+ candies[i]+'.png');
   console.log(i);
 }

 function stopAction()
 {
    //stop dropping candies.
    clearInterval(action);
    $("#candy1").hide();
    $("#chancesLeft").hide();
 }


 function startCountdown()
{
    action2 = setInterval(function()
    {
        counter -=1;
        $("#time").html(counter);
        if (counter==0) // game over should be shown
        {
         stopCounter();
         $("#chancesLeft").hide();
         play = false;
         $("#submit").html('Start Game');
        $("#over").show();
      //  $("#over").html('<p>Game over!</p><p>Your score is:'+score+'</p>');
      //clearInterval(action);
         $("#timeRem").hide();
          scoreRemarks();
        }
    },1000)
    //scoreData.push(recSCore);
}
function stopCounter()
{
    clearInterval(action2);
}
function scoreRemarks()
{
  if (score>45)
  {
      $("#over").html("<p>Game over!</p>Your score is: " + score + ". <p>You genius piece of shit!</p>");
  }
  else if (score>35)
  {
    $("#over").html("<p>Game over!</p>Your score is: " + score+ ". <p>You are quite good at this!</p>");
  }
  else if (score>25)
  {
    $("#over").html("<p>Game over!</p>Your score is: " + score+ ". <p>Better luck next time!</p>");
  }
  else if (score>15)
  {
    $("#over").html("<p>Game over!</p>Your score is: " + score+ ". <p>You really suck at this!</p>");
  }
  else
  {
    $("#over").html("<p>Game over!</p>Your score is: " + score+ ". <p>Ughh, seriously?!</p>");
  }
}
});
