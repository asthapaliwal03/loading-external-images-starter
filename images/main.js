let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) =>{
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

let imagePath = (frameNumber,animation) => {
    return animation+"/"+ frameNumber + ".png";
};

let frame={
    idle:[1, 2, 3, 4, 5, 6, 7, 8],
    kick:[1, 2, 3, 4, 5, 6, 7],
    punch:[1, 2, 3, 4, 5, 6, 7],
    backward:[1,2,3,4,5,6],
    forward:[1,2,3,4,5,6],
    block:[1,2,3,4,5,6,7,8,9]
};

let loadImages = (callback) => {
    let images = {idle:[],kick:[],punch:[],backward:[],forward:[],block:[]};
    let imagesToLoad = 0; 

    ["idle","kick","punch","block","backward","forward"].forEach((animation) => {
        let aniframes=frame[animation];
        imagesToLoad=imagesToLoad+aniframes.length;
        aniframes.forEach((frameNumber)=>{
            let path = imagePath(frameNumber,animation);

            loadImage(path, (image) => {
                images[animation][frameNumber - 1] = image;
                imagesToLoad = imagesToLoad - 1;    
    
                if(imagesToLoad === 0){
                    callback(images);
                }
        })

        });
    });
};


let animate = (ctx, images,animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(()=>{
            ctx.clearRect(0, 0, 600, 700);
            ctx.drawImage(image, 0, 0, 500, 500);
        }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
    let queue=[];
    let selectedanimation;
    let aux=()=>{
        
        if(queue.length === 0){
            selectedanimation="idle";
        }else{
            selectedanimation=queue.shift();
        }
        animate(ctx,images,selectedanimation,aux);
    }
    /*animate(ctx, images,"punch", ()=>{
        console.log("Done!");
    });*/
    aux();
    document.getElementById("kick").onclick=()=>{
        queue.push("kick");
    }
    document.getElementById("punch").onclick=()=>{
        queue.push("punch");
}
document.getElementById("backward").onclick=()=>{
    queue.push("backward");
}
document.getElementById("forward").onclick=()=>{
    queue.push("forward");
}
document.getElementById("block").onclick=()=>{
    queue.push("block");
}
    document.addEventListener("keyup",(event)=>
    {
        const key=event.key;
        if(key === "ArrowRight"){
            queue.push("kick");  
        }else if(key === "ArrowLeft"){
            queue.push("punch");
        }else if(key === "Enter"){
            queue.push("block");
        }else if(key ==="ArrowUp"){
            queue.push("forward");
        }else if(key ==="ArrowDown"){
            queue.push("backward");
        }
    })
});

/*loadImages((images)=>
 {
   ctx.drawImage(images[0],0, 0,500,500);
 });*/