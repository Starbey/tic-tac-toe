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

    const clear=()=>{
        for(let i=0;i<squares.length;i++){
            squares[i]="";
        }
    }

    return {
        setField,
        getField,
        clear
    }
})();

//Game controller module
const gameController=(()=>{
    let currentPlayer=playerX;
    let numRound=1;
    let isOver=false;
    
    const setCurrentPlayer=(player)=>{
        currentPlayer=player;
    }

    const getCurrentPlayer=()=>{
        return currentPlayer;
    }

    const getCurrentPlayerSymbol=()=>{
        return numRound%2===1?playerX.getSymbol():playerO.getSymbol();
    }

    const playRound=(field,fieldIndex)=>{    
        board.setField(fieldIndex,getCurrentPlayerSymbol());
        displayController.setFieldText(field,getCurrentPlayerSymbol());    
        checkWin();
        numRound++;
        displayController.setGameText(`Your turn, ${getCurrentPlayerSymbol()}`);

    }

    const checkWin=()=>{
        const winCons=[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        winCons.forEach((winCon)=>{
            let greenMarks=[];

            winCon.forEach((fieldIndex)=>{
                if (board.getField(fieldIndex)===getCurrentPlayerSymbol){
                    greenMarks.push(board.getField(fieldIndex));
                }
                
                if (greenMarks.length===3){
                    endRound(true,greenMarks);
                }
            })
        })
    }

    const endRound=(isWinner,greenMarks)=>{
        console.log(`${getCurrentPlayerSymbol()} wins!`);
    }

    return {
        setCurrentPlayer,
        getCurrentPlayer,
        playRound
    }
})();

//Display controller module
const displayController=(()=>{
    gameTextEl=document.querySelector(".game-text");
    fieldsEl=document.querySelectorAll(".field");

    fieldsEl.forEach((field)=>{
        field.addEventListener("click",e=>{
            if (board.getField(e.target.dataset.index)==="")//prevents user from marking the same square more than once
                gameController.playRound(field,parseInt(e.target.dataset.index));        
        })
    })

    const setFieldText=(field,symbol)=>{
        field.textContent=symbol;
    }

    const setGameText=(text)=>{
        gameTextEl.textContent=text;
    }

    return{
        setFieldText,
        setGameText
    }
})();

