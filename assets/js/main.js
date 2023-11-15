
/* javascript */
var fortunes = [];
window.onload = readData();
var training = [];
learning();

function readData(){
    fortunes = fortuneDB.split("\n");
}

function learning(){
    for (let i = 0; i < fortunes.length; i++ ){
        let words = fortunes[i].split(" ");
        for(let j = 0; j < words.length-2; j++){
            let sq = [words[j], words[j+1]];
            let next = words[j+2]
            // console.log(sq);
            for (let q = 0; q < training.length; q++){
                if(obj.sequnce === sq){
                    obj.rest.push(next);
                    console.log("Added to obj!");
                    break;
                }
                else{
                    training.push({
                        sequence: sq,
                        rest: [next]
                    });
                    console.log("New obj created!");
                    break;
                }
            }
        }
    }
    console.log(training);
}

function generateFortune(){

}

let fortuneButton = document.getElementById("genFortune");
// fortuneButton.addEventListener({

// })
