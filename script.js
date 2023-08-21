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

let playerOne=Player("X");

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

//Display controller module
const displayController=(()=>{
    fields=document.querySelectorAll(".field");

    fields.forEach((field)=>{
        field.addEventListener("click",e=>{
            field.textContent=playerOne.getSymbol();
        })
    })
})();