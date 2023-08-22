//Player factory
const Player =(symbol)=>{
    this.symbol=symbol;

    const getSymbol=()=>{
        return symbol;
    }

    return {getSymbol};
}

let playerX=Player("X");
let playerO=Player("O");

//Gameboard module; created immediately due to module pattern
const board=(()=>{
    const squares=["","","","","","","","",""];

    const setField=(i,symbol)=>{
        squares[i]=symbol;
    }

    const getField=(i)=>{
        return squares[i];
    }

    const reset=()=>{
        for(let i=0;i<squares.length;i++){
            squares[i]="";
        }
    }

    return {
        setField,
        getField,
        reset
    }
})();

//Game controller module
const gameController=(()=>{
    let numRound=1;
    let isOver=false;

    const getCurrentPlayerSymbol=()=>{
        return numRound%2===1?playerX.getSymbol():playerO.getSymbol();
    }

    const playRound=(field,fieldIndex)=>{    
        board.setField(fieldIndex,getCurrentPlayerSymbol());
        displayController.setFieldText(field,getCurrentPlayerSymbol());    
        checkWin();
        checkDraw();

        if(isOver===true) return;
        numRound++;
        displayController.setGameText(`Your turn, ${getCurrentPlayerSymbol()}`);

    }

    const getIsOver=()=>{
        return isOver;
    }

    const checkDraw=()=>{
        if (numRound!==9) return;
        isOver=true;
        endRound(false);
    }

    const checkWin=()=>{
        const winCons=[
            //horizontal
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            //vertical
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            //diagonal
            [0, 4, 8],
            [2, 4, 6],
        ];

        winCons.forEach((winCon)=>{
            let greenMarks=[];

            winCon.forEach((fieldIndex)=>{
                if (board.getField(fieldIndex)===getCurrentPlayerSymbol()){
                    greenMarks.push(fieldIndex);
                }
                
                if (greenMarks.length===3){
                    isOver=true;
                    endRound(true,greenMarks);
                }
            })
        })
    }

    const endRound=(isWinner,greenMarks)=>{
        if (isWinner){
            displayController.setGameText(`${getCurrentPlayerSymbol()} wins!`);
        }
        else {
            displayController.setGameText("Draw!");
        }
        
    }

    const reset=()=>{
        numRound=1;
        isOver=false;
    }

    return {
        getCurrentPlayerSymbol,
        getIsOver,
        playRound,
        reset
    }
})();

//Display controller module
const displayController=(()=>{
    gameTextEl=document.getElementById("game-text");
    fieldsEl=document.querySelectorAll(".field");
    playAgainBtn=document.getElementById("restart-button");

    playAgainBtn.addEventListener("click",(e)=>{
        board.reset();
        gameController.reset();
        reset();
        setGameText("Your turn, X");
    })

    fieldsEl.forEach((field)=>{
        field.addEventListener("click",e=>{
            if (gameController.getIsOver()||board.getField(e.target.dataset.index)!=="") return;//prevents user from marking the same square more than once
                gameController.playRound(field,parseInt(e.target.dataset.index));        
        })
    })

    const setFieldText=(field,symbol)=>{
        field.textContent=symbol;
    }

    const setGameText=(text)=>{
        gameTextEl.textContent=text;
    }

    const setGameTextColor=(color)=>{
        gameTextEl.style.color=color;
    }

    const reset=()=>{
        for (let i=0;i<fieldsEl.length;i++){
            fieldsEl[i].textContent="";
        }
        gameTextEl.style.color="#602179";
    }

    return{
        setFieldText,
        setGameText,
        setGameTextColor
    }
})();

