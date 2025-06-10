const root = document.querySelector(".root");

//inserting Heading
document.body.insertAdjacentHTML("afterBegin",`<div class="headingdiv"></div>`);
const headingdiv = document.querySelector(".headingdiv");

const playchess=document.createElement("h1");
playchess.innerHTML="Play<span>Chess</span>JS";
headingdiv.append(playchess);


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






// const selectpiece = ()=>{ }   //here we are not using arrow function because arrow function are not hoisted therefore we called the function before function def and it wont work
let selectedpiece="";
let selectedpos="";
let newpos =""

function selectbox(event){

    if(selectedpiece === "")   //to check if its the fist selection or not
    {
        selectedpos= event.currentTarget.id;  //I added current so tht if we click the img also the id of div is taken

        const keys = Object.keys(pieces);     //to retrieve the key from the object from value(position)
        for(let i in keys){              //i represnts index(not same as pyhton)
            const key =keys[i];
            if(pieces[key]===selectedpos){
                selectedpiece=key;
            }
        }
        console.log(selectedpos);
        console.log(selectedpiece);
    }
    else{
        newpos = event.currentTarget.id;
        console.log(newpos);
        movepiece();
        selectedpos="";
        selectedpiece="";
    }
    
}




function movepiece(){
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
        console.log("new position is at diff color piece therefore killing");
        killpiece(killkey);
        return;
    }


    //updating object with new pos for selected piece
    pieces[selectedpiece]=newpos;
    console.log(pieces);

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
    root.insertAdjacentElement("afterend",div)

function killpiece(killkey){           //killkey is piece that is to be killed

    killedpieces.push(killkey);
    
    //object manupilation
    delete(pieces[killkey]);        //deleting the killeditem from object
    console.log(pieces);

    pieces[selectedpiece]=newpos;       //changing pos of selected item to new pos

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
    div.append(killedimg);
    
}

