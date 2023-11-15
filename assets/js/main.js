
/* javascript */
var fortunes = [];
var test = [];
window.onload = readData();
var training = [];
learning();

function readData(){
    fortunes = fortuneDB.split("\n");
    test = testDB;
}

function learning(){
    
    let first_fortune = fortuneDB[0].split(" ");
    training.push({
        sequence: [first_fortune[0], first_fortune[1]],
        rest: [first_fortune[2]]
    })

    for (let i = 0; i < fortunes.length; i++ ){
        let words = fortunes[i].split(" ");
        for(let j = 0; j < words.length-2; j++){
            let sq = [words[j], words[j+1]];
            let next = words[j+2]
            let repeat = false
            for (let a = 0; a < training.length; a++){
                if(sq[0] === training[a].sequence[0] && sq[1] === training[a].sequence[1]){
                    training[a].rest.push(next);
                    console.log("Added to obj!");
                    repeat = true;
                    break;
                }
            }
            if (repeat === false){
                training.push({
                    sequence: sq,
                    rest: [next]
                });
                console.log("New obj created!");
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
