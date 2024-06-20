
let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newgame=document.querySelector(".newgame");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO =true;//player 0 ,X
let count=0;
const winpatterns=[
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]

const resetgame=()=>{
     turnO=true;
     count=0;
     enableboxes();
     msgContainer.classList.add("hide")
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerHTML="0";
            box.style.color = "blue";
            turnO=false;
        }
        else{
            box.innerHTML="X";
            turnO=true;
            box.style.color = "#b0413e";
        }
        box.disabled=true;
        count++;

        let iswinner=checkwinner();
        if(count===9 && !iswinner){
            draw();
        }
    });
});

const draw=()=>{
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableboxes();
}
const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerHTML="";
    }
}

const showWinner =(winner)=>{
    msg.innerHTML=`Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide")
    disableboxes();
}
const checkwinner =()=>{
    for( let pattern of winpatterns){
        let pos1val= boxes[pattern[0]].innerText;
        let pos2val= boxes[pattern[1]].innerText;
        let pos3val= boxes[pattern[2]].innerText;
        
        if(pos1val !="" && pos2val!="" && pos3val!="" ){
            if(pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
    
}

newgame.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);
