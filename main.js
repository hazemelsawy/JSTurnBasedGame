class Snapshot {
    constructor(array) {
      this.array = array;
    }
    
    restore() {
      return this.array; 
    }
  }
  
  let array = [1, 2];
  var snap = new Snapshot(array);
  array[0] = 3;
  array = snap.restore();
  console.log(array.join()); //It should log "1,2"
  array.push(4);
  array = snap.restore();
  console.log(array.join()); //It should log "1,2"



//containers
const body = document.querySelector('body');
const container = document.querySelector('.container');

// loader
const loader = document.querySelector('.loader');

//form
const formContainer = document.querySelector('.form');
const form = document.querySelector('#names');
const label = document.querySelector('.label1');
const nameInput = document.querySelector('.name');
const nextButton = document.querySelector('.nextButton');
const beginButton = document.querySelector('.beginButton');

//game
const game = document.querySelector('.game');
const board = document.querySelector('.boardTable');
const turnHeading = document.querySelector('.turnHeading');
const pausePlay = document.querySelector('.pausePlay');

//player1
const player1Nickname = document.querySelector('.player1 ul .nickname');
const player1Health = document.querySelector('.player1 ul .health');
const player1Weapon = document.querySelector('.player1 ul .weapon');
const player1Damage = document.querySelector('.player1 ul .damage');

//player2
const player2Nickname = document.querySelector('.player2 ul .nickname');
const player2Health = document.querySelector('.player2 ul .health');
const player2Weapon = document.querySelector('.player2 ul .weapon');
const player2Damage = document.querySelector('.player2 ul .damage');


// Player object
class player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.weapon = 'none';
        this.damage = 0;
        this.status = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    setTimeout(removeLoading, 1);
    function removeLoading() {
        body.removeChild(loader);
        container.style.display = 'block';
        window.setTimeout(function () {
            container.style.opacity = 1;
            container.style.transform = 'scale(1)';
        }, 50);
    }
});


//Next button
nextButton.addEventListener('click', ($event) => {
    $event.preventDefault();
    let name = nameInput.value;
    player1 = new player(name);
    nameInput.value = "Player's #2 nickname..";
    nextPlayer();
    console.log(player1.name);
});

function nextPlayer() {
    label.innerHTML = 'Player #2';
    form.removeChild(nextButton);
    beginButton.style.display = 'block';
}


// Begin button
beginButton.addEventListener('click', ($event) => {
    $event.preventDefault();
    let name = nameInput.value;
    player2 = new player(name);
    begin();
    console.log(player2.name);
});


function begin() {
    playMusic();
    formContainer.innerHTML = '';
    var player1Paragraph = document.createElement("p");
    container.appendChild(player1Paragraph);
    initPlayer1();
    initPlayer2();
    createBoard();
    game.style.display = 'block';
};

// initalize player1 instance
function initPlayer1() {
    const nickname = document.createElement('span');
    nickname.innerHTML = player1.name;
    const weapon = document.createElement('span');
    weapon.innerHTML = player1.weapon;
    const damage = document.createElement('span');
    damage.innerHTML = player1.damage;
    player1Nickname.appendChild(nickname);
    player1Weapon.appendChild(weapon);
    player1Damage.appendChild(damage);
}

// initalize player2 instance
function initPlayer2() {
    const nickname = document.createElement('span');
    nickname.innerHTML = player2.name;
    const weapon = document.createElement('span');
    weapon.innerHTML = player2.weapon;
    const damage = document.createElement('span');
    damage.innerHTML = player2.damage;
    player2Nickname.appendChild(nickname);
    player2Weapon.appendChild(weapon);
    player2Damage.appendChild(damage);
}


//generate game board
tableCell = [
    [], [], [], [], [], [], [], []
];
//
function createBoard() {
    for (let r = 0; r < 8; r++) {
        let row = document.createElement('tr');
        for (let c = 0; c < 8; c++) {
            let cell = document.createElement('td');
            tableCell[r][c] = cell;
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    addBlocks();
    addWeapons();
    addPlayers();
    turn1();
}

function addBlocks() {
    for (let i = 0; i < 10; i++) {
        let n1 = randomWholeNum();
        let n2 = randomWholeNum();
        if (!tableCell[n1][n2].hasAttribute("class")) {
            tableCell[n1][n2].classList.add('block');
        } else {
            i--;
        }
    }
}

function addWeapons() {
    for (let i = 0; i < 4; i++) {
        let n1 = randomWholeNum();
        let n2 = randomWholeNum();
        if (!tableCell[n1][n2].hasAttribute("class")) {
            switch (i) {
                case 0:
                    tableCell[n1][n2].classList.add('dagger');
                    break;
                case 1:
                    tableCell[n1][n2].classList.add('stick');
                    break;
                case 2:
                    tableCell[n1][n2].classList.add('sword');
                    break;
                case 3:
                    tableCell[n1][n2].classList.add('whip');
                    break;

            }

        } else {
            i--;
        }
    }
}

function addPlayers() {
    for (let i = 0; i < 2; i++) {
        let n1 = randomWholeNum();
        let n2 = randomWholeNum();
        if (!tableCell[n1][n2].hasAttribute("class")) {
            tableCell[n1][n2].classList.add('p' + (i + 1));
        } else {
            i--;
        }
        if (tableCell[n1][n2].classList.contains('p1')) {
            p1Row = n1;
            p1Col = n2;
        } else if (tableCell[n1][n2].classList.contains('p2')) {
            p2Row = n1;
            p2Col = n2;
        }
    }
}



// Player 1 turn
function turn1() {
    turnHeading.innerHTML = 'Player 1 turn';
    var table = document.getElementById("table"), rIndex, cIndex;

    // table rows
    for (var i = 0; i < table.rows.length; i++) {
        // row cells
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            if (table.rows[i].cells[j].classList.contains('p1')) {
                table.rows[i].cells[j].onclick = function () {
                    rIndex = this.parentElement.rowIndex;
                    cIndex = this.cellIndex;
                    console.log("Row : " + rIndex + " , Cell : " + cIndex);

                    for (let i = 0; i < 4; i++) {
                        if (rIndex - i >= 0 && !table.rows[rIndex - i].cells[cIndex].classList.contains('block') && !table.rows[rIndex - i].cells[cIndex].classList.contains('p2')) {
                            table.rows[rIndex - i].cells[cIndex].classList.add('available');
                        } else {
                            i = 5;
                        }
                    }
                    for (let i = 0; i < 4; i++) {
                        if (rIndex + i <= 7 && !table.rows[rIndex + i].cells[cIndex].classList.contains('block') && !table.rows[rIndex + i].cells[cIndex].classList.contains('p2')) {
                            table.rows[rIndex + i].cells[cIndex].classList.add('available');
                        } else {
                            i = 5;
                        }
                    }
                    for (let i = 0; i < 4; i++) {
                        if (cIndex + i <= 7 && !table.rows[rIndex].cells[cIndex + i].classList.contains('block') && !table.rows[rIndex].cells[cIndex + i].classList.contains('p2')) {
                            table.rows[rIndex].cells[cIndex + i].classList.add('available');
                        } else {
                            i = 5;
                        }
                    }
                    for (let i = 0; i < 4; i++) {
                        if (cIndex + i >= 0 && table.rows[rIndex].cells[cIndex - i]) {
                            if (!table.rows[rIndex].cells[cIndex - i].classList.contains('block') && !table.rows[rIndex].cells[cIndex - i].classList.contains('p2')) {
                                table.rows[rIndex].cells[cIndex - i].classList.add('available');
                            } else {
                                i = 5;
                            }
                        } else {
                            i = 5;
                        }
                    }
                    turn1();
                };
            } else if (table.rows[i].cells[j].classList.contains('available')) {
                table.rows[i].cells[j].onclick = function () {
                    if (this.classList.contains('available')) {
                        var availables = document.querySelectorAll('.available');
                        [].forEach.call(availables, function (available) {
                            // do whatever
                            available.classList.remove('available');
                        });
                        moveSound.play();

                        pastrIndex = document.querySelector('.p1').parentElement.rowIndex;
                        pastcIndex = document.querySelector('.p1').cellIndex;

                        document.querySelector('.p1').classList.remove('p1');

                        rIndex = this.parentElement.rowIndex;
                        cIndex = this.cellIndex;
                        table.rows[rIndex].cells[cIndex].classList.add('p1');

                        //pick or swap weapon
                        moveY = rIndex - pastrIndex;
                        moveX = cIndex - pastcIndex;

                        if (moveY == 0) {
                            if (Math.sign(moveX) == -1) {
                                for (let i = moveX; i <= 0; i++) {
                                    let s = table.rows[rIndex].cells[cIndex - i];
                                    if (
                                        s.classList.contains('dagger') || s.classList.contains('stick') ||
                                        s.classList.contains('sword') || s.classList.contains('whip')
                                    ) {
                                        pickUpWeapon(s, 'p1');

                                    }

                                }
                            } else {
                                for (let i = moveX; i >= 0; i--) {
                                    let s = table.rows[rIndex].cells[cIndex - i];
                                    if (
                                        s.classList.contains('dagger') || s.classList.contains('stick') ||
                                        s.classList.contains('sword') || s.classList.contains('whip')
                                    ) {
                                        pickUpWeapon(s, 'p1');
                                    }
                                }
                            }

                        } else {
                            if (Math.sign(moveY) == -1) {
                                for (let i = moveY; i <= 0; i++) {
                                    let s = table.rows[rIndex - i].cells[cIndex];
                                    if (
                                        s.classList.contains('dagger') || s.classList.contains('stick') ||
                                        s.classList.contains('sword') || s.classList.contains('whip')
                                    ) {
                                        pickUpWeapon(s, 'p1');
                                    }
                                }
                            } else {
                                for (let i = moveY; i >= 0; i--) {
                                    let s = table.rows[rIndex - i].cells[cIndex];
                                    if (
                                        s.classList.contains('dagger') || s.classList.contains('stick') ||
                                        s.classList.contains('sword') || s.classList.contains('whip')
                                    ) {
                                        pickUpWeapon(s, 'p1');
                                    }
                                }
                            }
                        }


                        if (rIndex + 1 < 8 && rIndex - 1 >= 0 && cIndex + 1 < 8 && cIndex - 1 >= 0) {
                            if (
                                table.rows[rIndex + 1].cells[cIndex].classList.contains('p2') ||
                                table.rows[rIndex - 1].cells[cIndex].classList.contains('p2') ||
                                table.rows[rIndex].cells[cIndex + 1].classList.contains('p2') ||
                                table.rows[rIndex].cells[cIndex - 1].classList.contains('p2')) {
                                turn2Fight();
                            } else {
                                turn2();
                            }
                        } else if(rIndex == 0){
                            if (
                                table.rows[rIndex + 1].cells[cIndex].classList.contains('p2') ||
                                table.rows[rIndex].cells[cIndex + 1].classList.contains('p2') ||
                                table.rows[rIndex].cells[cIndex - 1].classList.contains('p2')) {
                                turn1Fight();
                            } else {
                                turn1();
                            }
                        } else if(rIndex == 7){
                            if (
                                table.rows[rIndex - 1].cells[cIndex].classList.contains('p2') ||
                                table.rows[rIndex].cells[cIndex + 1].classList.contains('p2') ||
                                table.rows[rIndex].cells[cIndex - 1].classList.contains('p2')) {
                                turn2Fight();
                            } else {
                                turn2();
                            }
                        } else if(cIndex == 0){
                            if (
                                table.rows[rIndex + 1].cells[cIndex].classList.contains('p2') ||
                                table.rows[rIndex - 1].cells[cIndex].classList.contains('p2') ||
                                table.rows[rIndex].cells[cIndex + 1].classList.contains('p2')) {
                                turn2Fight();
                            } else {
                                turn2();
                            }
                        } else if(cIndex == 7){
                            if (
                                table.rows[rIndex + 1].cells[cIndex].classList.contains('p2') ||
                                table.rows[rIndex - 1].cells[cIndex].classList.contains('p2') ||
                                table.rows[rIndex].cells[cIndex - 1].classList.contains('p2')) {
                                turn2Fight();
                            } else {
                                turn2();
                            }
                        }                        
                        else {
                            turn2();
                        }

                    }
                };
            } else {
            }
        }
    }
}

// Player 2 turn
function turn2() {
    turnHeading.innerHTML = 'Player 2 turn';
    var table = document.getElementById("table"), rIndex, cIndex;

    // table rows
    for (var i = 0; i < table.rows.length; i++) {
        // row cells
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            if (table.rows[i].cells[j].classList.contains('p2')) {
                table.rows[i].cells[j].onclick = function () {
                    rIndex = this.parentElement.rowIndex;
                    cIndex = this.cellIndex;
                    console.log("Row : " + rIndex + " , Cell : " + cIndex);

                    for (let i = 0; i < 4; i++) {
                        if (rIndex - i >= 0 && !table.rows[rIndex - i].cells[cIndex].classList.contains('block') && !table.rows[rIndex - i].cells[cIndex].classList.contains('p1')) {
                            table.rows[rIndex - i].cells[cIndex].classList.add('available');
                        } else {
                            i = 5;
                        }
                    }
                    for (let i = 0; i < 4; i++) {
                        if (rIndex + i <= 7 && !table.rows[rIndex + i].cells[cIndex].classList.contains('block') && !table.rows[rIndex + i].cells[cIndex].classList.contains('p1')) {
                            table.rows[rIndex + i].cells[cIndex].classList.add('available');
                        } else {
                            i = 5;
                        }
                    }
                    for (let i = 0; i < 4; i++) {
                        if (cIndex + i <= 7 && !table.rows[rIndex].cells[cIndex + i].classList.contains('block') && !table.rows[rIndex].cells[cIndex + i].classList.contains('p1')) {
                            table.rows[rIndex].cells[cIndex + i].classList.add('available');
                        } else {
                            i = 5;
                        }
                    }
                    for (let i = 0; i < 4; i++) {
                        if (cIndex + i >= 0 && table.rows[rIndex].cells[cIndex - i]) {
                            if (!table.rows[rIndex].cells[cIndex - i].classList.contains('block') && !table.rows[rIndex].cells[cIndex - i].classList.contains('p1')) {
                                table.rows[rIndex].cells[cIndex - i].classList.add('available');
                            } else {
                                i = 5;
                            }
                        } else {
                            i = 5;
                        }
                    }
                    turn2();
                };
            } else if (table.rows[i].cells[j].classList.contains('available')) {
                table.rows[i].cells[j].onclick = function () {
                    if (this.classList.contains('available')) {
                        var availables = document.querySelectorAll('.available');
                        [].forEach.call(availables, function (available) {
                            // do whatever
                            available.classList.remove('available');
                        });

                        moveSound.play();

                        pastrIndex = document.querySelector('.p2').parentElement.rowIndex;
                        pastcIndex = document.querySelector('.p2').cellIndex;

                        document.querySelector('.p2').classList.remove('p2');
                        rIndex = this.parentElement.rowIndex;
                        cIndex = this.cellIndex;
                        table.rows[rIndex].cells[cIndex].classList.add('p2');

                        //pick or swap weapon
                        moveY = rIndex - pastrIndex;
                        moveX = cIndex - pastcIndex;

                        if (moveY == 0) {
                            if (Math.sign(moveX) == -1) {
                                for (let i = moveX; i <= 0; i++) {
                                    let s = table.rows[rIndex].cells[cIndex - i];
                                    if (
                                        s.classList.contains('dagger') || s.classList.contains('stick') ||
                                        s.classList.contains('sword') || s.classList.contains('whip')
                                    ) {
                                        pickUpWeapon(s, 'p2');
                                    }

                                }
                            } else {
                                for (let i = moveX; i >= 0; i--) {
                                    let s = table.rows[rIndex].cells[cIndex - i];
                                    if (
                                        s.classList.contains('dagger') || s.classList.contains('stick') ||
                                        s.classList.contains('sword') || s.classList.contains('whip')
                                    ) {
                                        pickUpWeapon(s, 'p2');
                                    }
                                }
                            }

                        } else {
                            if (Math.sign(moveY) == -1) {
                                for (let i = moveY; i <= 0; i++) {
                                    let s = table.rows[rIndex - i].cells[cIndex];
                                    if (
                                        s.classList.contains('dagger') || s.classList.contains('stick') ||
                                        s.classList.contains('sword') || s.classList.contains('whip')
                                    ) {
                                        pickUpWeapon(s, 'p2');
                                    } else {
                                        continue;
                                    }
                                }
                            } else {
                                for (let i = moveY; i >= 0; i--) {
                                    let s = table.rows[rIndex - i].cells[cIndex];
                                    if (
                                        s.classList.contains('dagger') || s.classList.contains('stick') ||
                                        s.classList.contains('sword') || s.classList.contains('whip')
                                    ) {
                                        pickUpWeapon(s, 'p2');
                                    } else {
                                        continue;
                                    }
                                }
                            }
                        }

                        if (rIndex + 1 < 8 && rIndex - 1 >= 0 && cIndex + 1 < 8 && cIndex - 1 >= 0) {
                            if (
                                table.rows[rIndex + 1].cells[cIndex].classList.contains('p1') ||
                                table.rows[rIndex - 1].cells[cIndex].classList.contains('p1') ||
                                table.rows[rIndex].cells[cIndex + 1].classList.contains('p1') ||
                                table.rows[rIndex].cells[cIndex - 1].classList.contains('p1')) {
                                turn1Fight();
                            } else {
                                turn1();
                            }
                        }else if(rIndex == 0){
                            if (
                                table.rows[rIndex + 1].cells[cIndex].classList.contains('p1') ||
                                table.rows[rIndex].cells[cIndex + 1].classList.contains('p1') ||
                                table.rows[rIndex].cells[cIndex - 1].classList.contains('p1')) {
                                turn1Fight();
                            } else {
                                turn1();
                            }
                        } else if(rIndex == 7){
                            if (
                                table.rows[rIndex - 1].cells[cIndex].classList.contains('p1') ||
                                table.rows[rIndex].cells[cIndex + 1].classList.contains('p1') ||
                                table.rows[rIndex].cells[cIndex - 1].classList.contains('p1')) {
                                turn1Fight();
                            } else {
                                turn1();
                            }
                        } else if(cIndex == 0){
                            if (
                                table.rows[rIndex + 1].cells[cIndex].classList.contains('p1') ||
                                table.rows[rIndex - 1].cells[cIndex].classList.contains('p1') ||
                                table.rows[rIndex].cells[cIndex + 1].classList.contains('p1')) {
                                turn1Fight();
                            } else {
                                turn1();
                            }
                        } else if(cIndex == 7){
                            if (
                                table.rows[rIndex + 1].cells[cIndex].classList.contains('p1') ||
                                table.rows[rIndex - 1].cells[cIndex].classList.contains('p1') ||
                                table.rows[rIndex].cells[cIndex - 1].classList.contains('p1')) {
                                turn1Fight();
                            } else {
                                turn1();
                            }
                        }                        
                        else {
                            turn1();
                        }


                    }
                };
            } else {
            }
        }
    }
}

// Battle player 1 turn
function turn1Fight() {
    if(player1.damage == 0 && player2.damage == 0){
        turn1();
    } else {
    myMusic.stop();
    battle.play();    
    const tunrActions = document.querySelector('.turnActions');
    const attack = document.querySelector('.attack');
    const defend = document.querySelector('.defend');
    const health = document.querySelector('.player2 ul .health meter');
    tunrActions.style.display = 'block';
    turnHeading.innerHTML = 'Player 1 turn';

    if (player1.health > 0 && player2.health > 0) {
        attack.onclick = function () {
            if (player2.status == 'defend') {
                player2.health -= player1.damage/2;
                player2.status = 'none';
            } else {
                player2.health -= player1.damage;
            }
            blade.play();
            health.value = player2.health;
            turn2Fight();
        }
        defend.onclick = function() {
            player1.status = 'defend';
            stick.play();
            console.log('player 1 status is: ' + player1.status);
            turn2Fight();
        }

        
    } else {
        if(player1.health == 0){
            turnHeading.innerHTML = 'Game over! <br> Player 2 Wins!' ;
            battle.stop();
        } else {
            turnHeading.innerHTML = 'Game over! <br> Player 1 Wins!' ;
            battle.stop();
        }
        
        tunrActions.style.display = 'none';
    }
}
}

// Battle player 2 turn
function turn2Fight() {
    if(player1.damage == 0 && player2.damage == 0){
        turn2();
    } else {
    myMusic.stop();
    battle.play();

    console.log(battle.play());
    const tunrActions = document.querySelector('.turnActions');
    const attack = document.querySelector('.attack');
    const defend = document.querySelector('.defend');
    const health = document.querySelector('.player1 ul .health meter');
    tunrActions.style.display = 'block';
    turnHeading.innerHTML = 'Player 2 turn';

    if (player1.health > 0 && player2.health > 0) {
        attack.onclick = function () {
            if (player1.status == 'defend') {
                player1.health -= player2.damage/2;
                player1.status = 'none';
            } else {
                player1.health -= player2.damage;
            }
            blade.play();
            health.value = player1.health;
            turn1Fight();
        }
        defend.onclick = function() {
            player2.status = 'defend';
            console.log('player 2 status is: ' + player2.status);
            stick.play();
            turn1Fight();
        }

        
    } else {
        if(player1.health == 0){
            turnHeading.innerHTML = 'Game over! <br> Player 2 Wins!' ;
            battle.stop();
        } else {
            turnHeading.innerHTML = 'Game over! <br> Player 1 Wins!' ;
            battle.stop();
        }
        
        tunrActions.style.display = 'none';
    }
}
}


//pick up weapon

function pickUpWeapon(s, p) {
    if (p == 'p1') {
        const weaponSpan = document.querySelector('.player1 ul .weapon span');
        if (player1.weapon == 'none') {
            player1.weapon = s.className.split(" ")[0];
            if (!s.classList.contains(p)) {
                s.className = '';
            } else {
                s.classList.remove(player1.weapon);
            }
            setDamage(player1.weapon, 'player1');
            console.log(player1.weapon + ' none');
            moveSound.stop();
            pickWeaponSound.play();
            weaponTemp1 = player1.weapon;
            weaponSpan.innerHTML = player1.weapon;
        } else if (s.classList.contains(p)) {
            s.className == p;
            s.classList.add(player1.weapon);
            weaponTemp1 = player1.weapon;
            player1.weapon = s.className.split(" ")[0];
            setDamage(player1.weapon, 'player1');
            console.log(player1.weapon + ' p');
            weaponSpan.innerHTML = player1.weapon;
            moveSound.stop();
            pickWeaponSound.play();
        } else {
            player1.weapon = s.className.split(" ")[0];
            setDamage(player1.weapon, 'player1');
            console.log(player1.weapon + ' else');
            s.className = weaponTemp1;
            weaponTemp1 = player1.weapon;
            weaponSpan.innerHTML = player1.weapon;
            moveSound.stop();
            pickWeaponSound.play();
        }
    } else if(p == 'p2'){
        const weaponSpan = document.querySelector('.player2 ul .weapon span');
        if (player2.weapon == 'none') {
            player2.weapon = s.className.split(" ")[0];
            if (!s.classList.contains(p)) {
                s.className = '';
            } else {
                s.classList.remove(player2.weapon);
            }
            setDamage(player2.weapon, 'player2');
            console.log(player2.weapon + ' none');
            weaponTemp2 = player2.weapon;
            weaponSpan.innerHTML = player2.weapon;
            moveSound.stop();
            pickWeaponSound.play();
        } else if (s.classList.contains(p)) {
            s.className == p;
            s.classList.add(player2.weapon);
            weaponTemp2 = player2.weapon;
            player2.weapon = s.className.split(" ")[0];
            setDamage(player2.weapon, 'player2');
            console.log(player1.weapon + ' p');
            weaponSpan.innerHTML = player2.weapon;
            moveSound.stop();
            pickWeaponSound.play();
        } else {
            player2.weapon = s.className.split(" ")[0];
            setDamage(player2.weapon, 'player2');
            console.log(player2.weapon + ' else');
            s.className = weaponTemp2;
            weaponTemp2 = player2.weapon;
            weaponSpan.innerHTML = player2.weapon;
            moveSound.stop();
            pickWeaponSound.play();
        }
    }
}
//random integer
function randomWholeNum() {
    return Math.floor(Math.random() * 7) + 1;
}

//set damage 
function setDamage(weapon, player){
    switch(weapon){
        case 'stick':
        eval(player).damage = '5';
            break;
        case 'whip':
        eval(player).damage = '5';
            break;
        case 'sword':
        eval(player).damage = '10';
            break;
        case 'dagger':
        eval(player).damage = '10';
            break;
    }

    const damageSpan1 = document.querySelector('.player1 ul .damage span');
    const damageSpan2 = document.querySelector('.player2 ul .damage span');
    if(player == 'player1'){
        damageSpan1.innerHTML = eval(player).damage;
    } else {
        damageSpan2.innerHTML = eval(player).damage;
    }
    
}
//play sound
function playMusic() {
    myMusic = new sound("sounds/bgmusic.mp3");
    moveSound = new sound("sounds/moveSound.mp3");
    pickWeaponSound = new sound("sounds/pickWeapon.mp3");
    myMusic.sound.setAttribute("loop", "true");
    myMusic.play();
    battle = new sound("sounds/battle.mp3");
    blade = new sound("sounds/blade.mp3");
    stick = new sound("sounds/stick.mp3");
    whip = new sound("sounds/whip.mp3");
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    console.log(src);
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("id", "myAudio");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
