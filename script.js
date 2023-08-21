//Player factory
const Player =(symbol)=>{
    this.symbol=symbol;

    const getSymbol=()=>{
        return symbol;
    }

    const getSign = () => {
        return sign;
      };

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
    
    const setCurrentPlayer=(player)=>{
        currentPlayer=player;
    }

    const getCurrentPlayer=()=>{
        return currentPlayer;
    }

    return {
        setCurrentPlayer,
        getCurrentPlayer
    }
})();

//Display controller module
const displayController=(()=>{
    fields=document.querySelectorAll(".field");

    fields.forEach((field)=>{
        field.addEventListener("click",e=>{
            console.log()
            field.textContent=gameController.getCurrentPlayer().getSymbol();
        })
    })
})();

