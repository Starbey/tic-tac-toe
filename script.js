//Player factory
const Player =(symbol)=>{
    this.symbol=symbol;

    const getSymbol=()=>{
        return symbol;
    }

    return {
        getSymbol
    };
}

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

    const clear()=>{
        for(let i=0;i<squares.length;i++){
            squares[i]="";
        }
    }
})();