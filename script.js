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

//Gameboard module
const board=(()=>{
    const squares=["","","","","","","","",""];

    console.log("hey");
})();