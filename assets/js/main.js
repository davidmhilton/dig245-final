/* javascript */

var fortunes = [];
window.onload = readData();
var training_1 = [];
var training_2 = [];
var training_3 = [];
learning_1();
learning_2();
learning_3();


function readData(){
    fortunes = fortuneDB.split("\n");
}

function learning_1(){

    for (let i = 0; i < fortunes.length; i++ ){
        let words = fortunes[i].split(" ");
        for(let j = 0; j < words.length-1; j++){
            let sq = [words[j]];
            let next = words[j+1]
            let repeat = false
            for (let a = 0; a < training_1.length; a++){
                if(sq[0] === training_1[a].sequence[0]){
                    training_1[a].rest.push(next);
                    repeat = true;
                    break;
                }
            }
            if (repeat === false){
                training_1.push({
                    sequence: sq,
                    rest: [next]
                });
            }
        }
    }
}

function learning_2(){

    for (let i = 0; i < fortunes.length; i++ ){
        let words = fortunes[i].split(" ");
        for(let j = 0; j < words.length-2; j++){
            let sq = [words[j], words[j+1]];
            let next = words[j+2]
            let repeat = false
            for (let a = 0; a < training_2.length; a++){
                if(sq[0] === training_2[a].sequence[0] && sq[1] === training_2[a].sequence[1]){
                    training_2[a].rest.push(next);
                    repeat = true;
                    break;
                }
            }
            if (repeat === false){
                training_2.push({
                    sequence: sq,
                    rest: [next]
                });
            }
        }
    }
}

function learning_3(){

    for (let i = 0; i < fortunes.length; i++ ){
        let words = fortunes[i].split(" ");
        for(let j = 0; j < words.length-3; j++){
            let sq = [words[j], words[j+1], words[j+2]];
            let next = words[j+3]
            let repeat = false
            for (let a = 0; a < training_3.length; a++){
                if(sq[0] === training_3[a].sequence[0] && sq[1] === training_3[a].sequence[1]
                    && sq[2] === training_3[a].sequence[2]){
                    training_3[a].rest.push(next);
                    repeat = true;
                    break;
                }
            }
            if (repeat === false){
                training_3.push({
                    sequence: sq,
                    rest: [next]
                });
            }
        }
    }
}

var fortuneButton = document.getElementById("genFortune");

function generateFortune(dataset){
    let first_word = "";
    while (/[A-Z]/.test(first_word) === false){
        let rand_index = Math.floor(Math.random()*dataset.length);
        let obj = dataset[rand_index]; 
        first_word = obj.sequence[0];
        current_sequence = obj.sequence;
    }
    let generated_fortune = [];
    for (let i = 0; i < current_sequence.length; i++){
        generated_fortune.push(current_sequence[i])
    }
    
    let next_word = "";

    while(location !== -1){
        var location = dataset.findIndex(function(obj) {
            let match = true;
            for(let i = 0; i < current_sequence.length; i++){
                if(obj.sequence[i] !== current_sequence[i]){
                    match = false;
                    break
                }
            }
            if(match){
                return obj;
            }
        });
        if (location === -1){
            continue;
        }
        let object = dataset[location];
        let toPick = object.rest;
        let index = Math.floor(Math.random()*toPick.length);
        next_word = toPick[index];
        generated_fortune.push(next_word);
        let len =  current_sequence.length;
        if(len === 3){
            current_sequence = [current_sequence[1], current_sequence[2], next_word];
        }
        else if(len === 2){
            current_sequence = [current_sequence[1], next_word];
        }
        else{
            current_sequence = [next_word];
        }
    }
    return generated_fortune;
}


function getRandomNum(max) {
    let num = Math.floor(Math.random() * (max - 50) + 50);
    return num;
}

fortuneButton.addEventListener("click", function (){
    var fortune = document.getElementById("fortune");
    fortune.textContent = '';

    var slider = document.getElementById("randomness");
    var my_fortune;
    if(slider.value == 1){
        my_fortune = generateFortune(training_3);
    } else if(slider.value == 2){
        my_fortune = generateFortune(training_2);
    } else {
        my_fortune = generateFortune(training_1);
    }
    let joined_fortune = my_fortune.join(' ');
    let index = 0;

    function display() {
        if(index < joined_fortune.length) {
            fortune.textContent += joined_fortune[index];
            index++;
            setTimeout(display, 75);
        } else {
            fortuneButton.disabled = false;
        }
    }

    fortuneButton.disabled = true;
    display();
});
