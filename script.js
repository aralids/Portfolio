function changeLivingState(id) {
    let aliveState = document.getElementById(id).classList[4];
    if (aliveState === "alive") {
        document.getElementById(id).classList.replace("alive", "dead");
    } else {
        document.getElementById(id).classList.replace("dead", "alive");
    }

    var rect = document.getElementById("information").getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    console.log(document.getElementById("information").parentElement.getBoundingClientRect());
}