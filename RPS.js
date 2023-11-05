let thisAutoPlay = false;
let thisIntervalId;
    
const autoPlay =  
       document.querySelector('.auto-play');
const resetBtn = 
       document.querySelector('.reset-btn'); 
const block = 
       document.querySelector('.message');
const yesBtn = 
       document.querySelector('.yes-btn');
const noBtn = 
       document.querySelector('.no-btn');
       
const score = JSON.parse(localStorage
              .getItem('score')) || {
                 daog: 0,
                 patas: 0,
                 perdi: 0
               };
                                
ScoreUpdate();

document.body
  .addEventListener('click',(event) => {
      if (event.target === resetBtn) {
         block.classList.add('block');
     } else if (event.target === yesBtn) {
         score.daog = 0;
         score.patas = 0;
         score.perdi = 0;
         localStorage.removeItem('score');
         ScoreUpdate();
         block.classList.remove('block');
     } else if (event.target === noBtn) {
         block.classList.remove('block');
     }
  });
    
document.body
  .addEventListener('keydown',(event) => {
     if(event.key === 'r' || 
        event.key === 'R') {       
          PlayGame('Rock');
     } else if (event.key === 'p' || 
                event.key === 'P') {
                  PlayGame('Paper');
     } else if (event.key === 's' || 
                event.key === 'S') {
                  PlayGame('Scissor');
     } else if(event.key === 'a' || 
               event.key === 'A' )  {
                 autoPlay();
     } else if(event.key === 'Backspace') {
                 resetBtn();
     }
    });
    
    document.querySelector('.rock-btn')
    .addEventListener('click',() => {
       PlayGame('Rock');
    });
    
    document.querySelector('.paper-btn')
    .addEventListener('click',() => {
       PlayGame('Paper');
    });
    
    document.querySelector('.scissor-btn')
    .addEventListener('click',() => {
       PlayGame('Scissor');
    });
      
autoPlay.addEventListener('click',() => {
  if(!thisAutoPlay) {
     thisIntervalId = setInterval(() => {
       const enemyChoose = ComputerChoose();      
         PlayGame(enemyChoose);       
     }, 1000);
        thisAutoPlay = true;
        autoPlay.innerHTML = 'Stop Playing';      
     } else {
      clearInterval(thisIntervalId);
      thisAutoPlay = false;
      autoPlay.innerHTML = 'Auto Play';
     }
  });
    
        
function PlayGame(PlayerPick) {
  const ComputerPick = ComputerChoose();     
    let Result = ''; 
      
      if (PlayerPick === 'Scissor') {
         if (ComputerPick === 'Rock') {
          Result = 'You Lose.';
      } else if (ComputerPick === 'Paper') {
          Result = 'You Win.';
      } else if (ComputerPick === 'Scissor') {
          Result = 'Draw.';
       }  
             
     } else if (PlayerPick === 'Paper') {
            if (ComputerPick === 'Rock') {
                  Result = 'You Win.';
     } else if (ComputerPick === 'Paper') {
                  Result = 'Draw.';
     } else if (ComputerPick === 'Scissor') {
                  Result = 'You Lose.'; 
     }    
     } else if (PlayerPick === 'Rock') {
            if (ComputerPick === 'Rock') {
                  Result = 'Draw.';     
     } else if (ComputerPick === 'Paper') {
                Result = 'You Lose.';
     } else if (ComputerPick === 'Scissor') {
               Result = 'You Win.';
       }
     }
     
     if (Result === 'You Win.') {
         score.daog += 1;
     } else if (Result === 'Draw.') {
         score.patas += 1;
     } else if (Result === 'You Lose.') {
         score.perdi += 1;
     }
     
        localStorage.setItem
        ('score',JSON.stringify(score));
        
        document.querySelector('.js-result')
        .innerText = Result;
        
        document.querySelector('.js-pick')
        .innerHTML = `You:
         <img src="${PlayerPick}.png" class="img-icon"><span>Vs.</span>
         <img src="${ComputerPick}.png" class="img-icon">
         :Computer
`
        ScoreUpdate();
          
}        
  
function ScoreUpdate() {
  document.querySelector('.js-score')
    .innerHTML = `Win: ${score.daog} | Draw: ${score.patas} | Loss: ${score.perdi}`
  };
          

function ComputerChoose() {
  const RandomNum = Math.random();         
    let ComputerPick = '';    
                
     if (RandomNum >= 0 && RandomNum < 1/3) {
          ComputerPick = 'Rock';
     } else if 
      (RandomNum >= 1/3 && RandomNum < 1/2) {
          ComputerPick = 'Paper';
    } else if 
     (RandomNum >= 1/2 && RandomNum <= 1 ) {
          ComputerPick = 'Scissor';
    }
      return ComputerPick;
};
