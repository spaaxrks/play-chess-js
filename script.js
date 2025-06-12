const root = document.querySelector(".root");

//inserting Heading
document.body.insertAdjacentHTML("afterBegin",`<div class="headingdiv"></div>`);
const headingdiv = document.querySelector(".headingdiv");

const headinglogo=document.createElement("img");
headinglogo.src="pieces/black-king.png"

const playchess=document.createElement("h1");
playchess.innerHTML="Play<span>Chess</span>JS";
headingdiv.append(headinglogo);
headingdiv.append(playchess);

//sound effect definitions
const moveSound = new Audio("./sounds/piecemove.wav");
const invalidSound = new Audio("./sounds/invalidmove.wav");
const killSound = new Audio("./sounds/pieccapture.mp3");

function playMoveSound() {
    moveSound.play();
}
function playInvalidSound() {
    invalidSound.play();
}
function playKillSound() {
    killSound.play();
}


//creating chessboard logic
const chessboard = ()=>{              

    for(let i=1;i<=8;i++){
        if(i%2!==0){
            for(let j=1;j<=8;j++){

                if(j%2!==0){
                    const blackbox = document.createElement("div");
                    blackbox.classList.add("blackbox");

                    blackbox.id=`${i}${j}`;
                    blackbox.onclick= selectbox;              //setting up event listener in HTML tag itself and calling selectpiece() function though through this method the onclick wont be directly shown inside the html but its still there.
                    root.append(blackbox);
                }
                else{
                    
                    const whitebox = document.createElement("div");
                    whitebox.classList.add("whitebox");
                    whitebox.id=`${i}${j}`;
                    whitebox.onclick= selectbox;
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
                    whitebox.onclick= selectbox;
                    root.append(whitebox);
                }
                else{
                    
                    const blackbox = document.createElement("div");
                    blackbox.classList.add("blackbox");
                    blackbox.id=`${i}${j}`;
                    blackbox.onclick= selectbox;
                    root.append(blackbox);
                }

            }
        }
    }

}
chessboard();

//main object for tracking positions.
const pieces ={
    "b-rook1":"11","b-knight1":"12","b-bishop1":"13","b-queen":"14","b-king":"15","b-bishop2":"16","b-knight2":"17","b-rook2":"18",
    "b-pawn1":"21","b-pawn2":"22","b-pawn3":"23","b-pawn4":"24","b-pawn5":"25","b-pawn6":"26","b-pawn7":"27","b-pawn8":"28",
    "w-pawn1":"71","w-pawn2":"72","w-pawn3":"73","w-pawn4":"74","w-pawn5":"75","w-pawn6":"76","w-pawn7":"77","w-pawn8":"78",
    "w-rook1":"81","w-knight1":"82","w-bishop1":"83","w-queen":"84","w-king":"85","w-bishop2":"86","w-knight2":"87","w-rook2":"88",
};

const images =  {
    "b-rook1":"./pieces/black-rook.png","b-knight1":"./pieces/black-knight.png","b-bishop1":"./pieces/black-bishop.png","b-queen":"./pieces/black-queen.png","b-king":"./pieces/black-king.png","b-bishop2":"./pieces/black-bishop.png","b-knight2":"./pieces/black-knight.png","b-rook2":"./pieces/black-rook.png",
    "b-pawn1":"./pieces/black-pawn.png","b-pawn2":"./pieces/black-pawn.png","b-pawn3":"./pieces/black-pawn.png","b-pawn4":"./pieces/black-pawn.png","b-pawn5":"./pieces/black-pawn.png","b-pawn6":"./pieces/black-pawn.png","b-pawn7":"./pieces/black-pawn.png","b-pawn8":"./pieces/black-pawn.png",
    "w-rook1":"./pieces/white-rook.png","w-knight1":"./pieces/white-knight.png","w-bishop1":"./pieces/white-bishop.png","w-queen":"./pieces/white-queen.png","w-king":"./pieces/white-king.png","w-bishop2":"./pieces/white-bishop.png","w-knight2":"./pieces/white-knight.png","w-rook2":"./pieces/white-rook.png",
    "w-pawn1":"./pieces/white-pawn.png","w-pawn2":"./pieces/white-pawn.png","w-pawn3":"./pieces/white-pawn.png","w-pawn4":"./pieces/white-pawn.png","w-pawn5":"./pieces/white-pawn.png","w-pawn6":"./pieces/white-pawn.png","w-pawn7":"./pieces/white-pawn.png","w-pawn8":"./pieces/white-pawn.png",
}





//logic for putting pieces in chessboard
const putpieces = (pieces)=>{

    for(let piecename in pieces){
        
        const box = document.getElementById(pieces[piecename]);
        const img =document.createElement("img");
        img.src=images[piecename];
        box.append(img);
        
    }
}
putpieces(pieces);





let currentTurn = "w";              //for playerbased game //initialize current lement as w first

const CurrentTurnDiv = document.createElement("div"); //for displaying turn
CurrentTurnDiv.classList.add("CurrentTurnDiv");
CurrentTurnDiv.innerText="White's Turn!";
headingdiv.insertAdjacentElement("afterend",CurrentTurnDiv);

function updateTurndiv(){       //function to update UI display of Turn
    CurrentTurnDiv.innerText=currentTurn === "w"? "White's Turn!":"Black's Turn!";
    CurrentTurnDiv.style.color=currentTurn === "w"?"white":"black"
}




// const selectpiece = ()=>{ }   //here we are not using arrow function because arrow function are not hoisted therefore we called the function before function def and it wont work
let selectedpiece="";
let selectedpos="";
let newpos =""

function selectbox(event){
    
    const clickedpos=event.currentTarget.id;        //I added current so tht if we click the img also the id of div is taken

    if(selectedpiece === "")   //to check if its the fist selection or not
    {
        selectedpos= clickedpos;  //updating selected pos variable outside

        //for css purpose
        document.querySelectorAll(".selected").forEach((el)=>{      //for removing class=selected from all div before every on click
            el.classList.remove("selected");
        });

        event.currentTarget.classList.add("selected");   //for adding class=selected in onclicked element
        

        const keys = Object.keys(pieces);     //to retrieve the key from the object from value(position)
        for(let i in keys){              //i represnts index(not same as pyhton)
            const key =keys[i];
            if(pieces[key]===selectedpos){
                selectedpiece=key;
            }
        }
        console.log(selectedpos);
        console.log(selectedpiece);

        if(selectedpiece === ""||selectedpiece[0]!=currentTurn){     //for coming out of function if not the current Turn or slected box has no piece
            console.log("Not your Turn");
            selectedpiece="";
            document.querySelectorAll(".selected").forEach((el)=>{      //for removing class=selected from all div before every on click
                el.classList.remove("selected");
            });
            return;
        }

    }
    else{
        newpos = event.currentTarget.id;
        console.log(newpos);
        movepiece();
        selectedpos="";
        selectedpiece="";

        //for css purposes
        document.querySelectorAll(".selected").forEach((el)=>{      //for removing class=selected from all div before every on click
            el.classList.remove("selected");
        });
    }
    
}




function movepiece(){

    if(isValidmove(selectedpiece,selectedpos,newpos)!=true){        //to check move validation we use isValidmove() function and if it is false exit the function
        playInvalidSound();
        console.log(`Not  a valid move for ${selectedpiece}`);
        return;             //to exit the function
    }




    //the move function should not work if the new pos has a piece of same color 
    let samecolorpos = false;    //to check if new pos has piece with same color
    let diffcolorpos = false;    //to check if new pos has piece with diff color and if so kill
    let killkey="";             //to store the piece if diffcolorpos is true

    const selectedcolor =selectedpiece.charAt(0); //returns b or w
    
    
    const keys = Object.keys(pieces);
    for(let i in keys){             
        const key =keys[i];
        if(pieces[key]===newpos){                    //if any key{pieces} have same value(pos) as newpos in object
            if(key.charAt(0)===selectedcolor){          //if the color of any key is same as selected piece color 
                samecolorpos=true;                                         
            }
            else{
                diffcolorpos=true;                      //if the color of any key is diff as selected piece color 
                killkey=key;
            }
        }
      
    }

    if(samecolorpos === true){           //ie-if the new pos has no piece of same color
        console.log("invaild move: same color piece already present");
        return;      //to exit function
    }

    if( diffcolorpos===true){

        if(killkey.includes("king")){

            playInvalidSound();   
            console.log("invalid move:cannot kill king");
            return;                                 //exits function
        }

        console.log("new position is at diff color piece therefore killing");
        killpiece(killkey);
        return;
    }


    //updating object with new pos for selected piece
    pieces[selectedpiece]=newpos;
    console.log(pieces);
    playMoveSound();
    currentTurn= currentTurn === "w"? "b":"w";   //if current turn is white change to black after moving
    console.log("Turn Changed to:",currentTurn);
    updateTurndiv();            //updating UI


    //updating html
    const moving = document.getElementById(selectedpos);  //selecting and removing at old position
    moving.innerHTML="";

    const moved = document.getElementById(newpos);      //adding the peice to new pos
    const img =document.createElement("img");
    img.src=images[selectedpiece];
    moved.append(img)
    
    
}








let killedpieces =[];                           //to store killed pieces

const div = document.createElement("div");      //we are creating a div to display images of kiled pieces
div.classList.add("pieceskilled");

const whitepiecesdiv=document.createElement("div");
whitepiecesdiv.classList.add("whitepiecesdiv");
div.append(whitepiecesdiv);

const blackpiecesdiv=document.createElement("div");
blackpiecesdiv.classList.add("blackpiecesdiv");
div.append(blackpiecesdiv);

root.insertAdjacentElement("afterend",div)


function killpiece(killkey){           //killkey is piece that is to be killed

    killedpieces.push(killkey);
    
    //object manupilation
    delete(pieces[killkey]);        //deleting the killeditem from object
    console.log(pieces);

    pieces[selectedpiece]=newpos;       //changing pos of selected item to new pos
    playKillSound();

    currentTurn= currentTurn === "w"? "b":"w";   //if current turn is white change to black after killing
    console.log("Turn Changed to:",currentTurn);
    updateTurndiv();            //updating UI

    //html manupilation
    const killed = document.getElementById(newpos);         //removing image of killed item
    killed.innerHTML="";

    const moving = document.getElementById(selectedpos);       //removing selected piece image from old pos
    moving.innerHTML="";

    const moved = document.getElementById(newpos);          //adding selectd piece image to new pos
    const img = document.createElement("img")
    img.src=images[selectedpiece];
    moved.append(img);
    

    
    //adding deleted piece images to html div to display
    const killedimg = document.createElement("img");
    killedimg.src=images[killkey];
    if(killkey[0]=="w"){
        whitepiecesdiv.append(killedimg);
    }
    else{
        blackpiecesdiv.append(killedimg);
    }
    
}









function getcoords(pos){
    return [parseInt(pos[0]),parseInt(pos[1])];      //converts whatever position it takes into array of intergers [1,2] //needed for mathematical calculations
}


function isValidmove(selectedpiece,selectedpos,newpos){
    
    const [fx, fy]=getcoords(selectedpos);  //to get from x axis and from yaxis
    const [tx, ty]=getcoords(newpos);       //to get to x axis and to yaxis

    const dx = Math.abs(tx-fx);     //to get how many boxes in x axis the piece is to move
    const dy =Math.abs(ty-fy)       //to get how many boxes in y axis the piece is to move 

   
   
    if(selectedpiece.includes("rook")){

        if(fx===tx || fy===ty){       //if the from pos and to pos are in the same x axis or if the from and to is in the same y  //ie-if it is moved to the same x or y axis(staight line)                
           
            if(isPathClear(fx,fy,tx,ty,pieces)===true){             //checks if there is any pieces in between its path
                return true;     
            }          
        }
        else{
            return false;
        }
    }


    if(selectedpiece.includes("bishop")){
        
        if(dx===dy){       //if the dif in x and y axis are same(which means diagonal)

            if(isPathClear(fx,fy,tx,ty,pieces)===true){            //checks if there is any pieces in between its path
                return true;     
            }                    
        }
        else{
            return false;
        }
    }


    if(selectedpiece.includes("queen")){
        
        if(dx===dy || fx===tx || fy===ty){       //combines rook and bishop

            if(isPathClear(fx,fy,tx,ty,pieces)===true){             //checks if there is any pieces in between its path
                return true;     
            }      
                
        }
        else{
            return false;
        }
    }


    if(selectedpiece.includes("king")){
        
        if(dx<=1 && dy<=1){       //it can move in any direction but it should be only 1 move
            return true;          //as it only moves 1 block it does not have path   
        }
        else{
            return false;
        }
    }

    if(selectedpiece.includes("knight")){
        
        if((dx===2 && dy===1) || (dx===1 && dy===2)){       //it can move in only move in L shape
            return true;                                    //knight also does not have a path as it can jump over pieces
        }
        else{
            return false;
        }
    }

    if(selectedpiece.includes("pawn")){
        
        const direction = selectedpiece[0]==="w"? -1:1 ;   //if sected piece first char is w then direction=-1 else 1(as white need to go upwards so -1 and it cannot go downwards)
        const startrow = selectedpiece[0]==="w"? 7:2 ;   //if selected piece is white its starting row is 7 else 2(as pawn in starting row can go 2 boxes)


        if((tx === fx+direction && dy ===0 && Object.values(pieces).includes(newpos)!==true)){       //if (To pos) is exactly (From pos + 1) for black from (pos -1)for white and y axis does not change and if the new pos has no pieces present(if there any piece present it cant move as it can only kill diagonally)
            return true;        //exits function
        }


        const middlepos = `${fx+direction}${fy}`;          
        if( fx === startrow && tx === fx + 2 * direction && dy===0 &&       //if start row - pawn can move 2 blocks froward and if new pos has no pieces and if middle block also has no pieces
            Object.values(pieces).includes(newpos)!==true &&
            Object.values(pieces).includes(middlepos)!==true)
        {      
            return true;
        }


        if(tx===fx+direction && dy===1){            //if it is one pos forward and 1 pos towards left or right(ie exactly 1 box diagonal forward)
            
            const selectedcolor = selectedpiece[0];     //this parts checks if the diagonal box has same color or diff and only allows diff color
            const keys = Object.keys(pieces);
            for(let i in keys){
                const key = keys[i];
                if (pieces[key]===newpos)
                {
                    if(key[0]!== selectedcolor){
                        return true;
                    }
                }
            }

        }
        
        return false;               //if none of the above condition matches returns false

    }

}



function isPathClear(fx,fy,tx,ty,pieces){

    const dirx=Math.sign(tx-fx);              //gives direction of x movement (1 or -1 or 0)
    const diry=Math.sign(ty-fy);              //gives direction of y movement (1 or -1 or 0)

    let x=fx+dirx;          //assigning x as 1 box forward in x axis
    let y=fy+diry;          //assigning y as 1 box forward in y axis

    while(x!==tx || y!==ty){         //while x or y doees not reach the target

        const pos = `${x}${y}`;         //creating a string of x and y in this format 14 to compare with vlues in obj

        if(Object.values(pieces).includes(pos)===true){          //if there is any piece present in any of the box in its path
            return false;
        }
        
        x=x+dirx;
        y=y+diry;
    }

    return true;


}