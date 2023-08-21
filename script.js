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

    //setters
    const setField=(i,symbol)=>{
        squares[i]=symbol;
    }

    //getters
    const getField=(i,symbol)=>{
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
        displayController.setGameText(`Your turn, ${getCurrentPlayerSymbol()}`);
        numRound++;

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
            if (board.getField(e.target.dataset.index)!=="") return;//prevents user from marking the same square more than once
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

