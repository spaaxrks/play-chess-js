const root = document.querySelector(".root");

const chessboard = ()=>{
    for(let i=1;i<=8;i++){
        if(i%2!==0){
            for(let j=1;j<=8;j++){

                if(j%2!==0){
                    const blackbox = document.createElement("div");
                    blackbox.classList.add("blackbox");

                    blackbox.id=`${i}${j}`;
                    root.append(blackbox);
                }
                else{
                    
                    const whitebox = document.createElement("div");
                    whitebox.classList.add("whitebox");
                    whitebox.id=`${i}${j}`;
                    root.append(whitebox);
                }

            }
        }
        else{
            for(let j=1;j<=8;j++){

                if(j%2!==0){
                    
                    const whitebox = document.createElement("div");
                    whitebox.classList.add("whitebox");
                    whitebox.id=`${i}${j}`;
                    root.append(whitebox);
                }
                else{
                    
                    const blackbox = document.createElement("div");
                    blackbox.classList.add("blackbox");
                    blackbox.id=`${i}${j}`;
                    root.append(blackbox);
                }

            }
        }
    }
}
chessboard();
// for(let i=1;i)

const pieces ={
    "11":"./pieces/black-rook.png","12":"./pieces/black-knight.png","13":"./pieces/black-bishop.png","14":"./pieces/black-queen.png","15":"./pieces/black-king.png","16":"./pieces/black-bishop.png","17":"./pieces/black-knight.png","18":"./pieces/black-rook.png",
    "21":"./pieces/black-pawn.png","22":"./pieces/black-pawn.png","23":"./pieces/black-pawn.png","24":"./pieces/black-pawn.png","25":"./pieces/black-pawn.png","26":"./pieces/black-pawn.png","27":"./pieces/black-pawn.png","28":"./pieces/black-pawn.png",
    "71":"./pieces/white-pawn.png","72":"./pieces/white-pawn.png","73":"./pieces/white-pawn.png","74":"./pieces/white-pawn.png","75":"./pieces/white-pawn.png","76":"./pieces/white-pawn.png","77":"./pieces/white-pawn.png","78":"./pieces/white-pawn.png",
    "81":"./pieces/white-rook.png","82":"./pieces/white-knight.png","83":"./pieces/white-bishop.png","84":"./pieces/white-queen.png","85":"./pieces/white-king.png","86":"./pieces/white-bishop.png","87":"./pieces/white-knight.png","88":"./pieces/white-rook.png",
};


const putpieces = (pieces)=>{

    for(let id in pieces){
        
        const box = document.getElementById(id);
        const img =document.createElement("img");
        img.src=pieces[id];
        img.width=50;
        img.height=50;
        box.append(img);
    }
}
putpieces(pieces);