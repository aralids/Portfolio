let mode = "viewing mode";
document.documentElement.className = document.getElementById("logo").getAttribute("username");
console.log(document.documentElement.className)

console.log(document.getElementById("form").getBoundingClientRect());

const canvas = document.getElementById("canvas");
const main = document.getElementById("main");
canvas.height = main.offsetHeight;
canvas.width = main.offsetWidth;
const ctx = canvas.getContext("2d");
let drawing = "#000 ";
let date = "";
let address = $("#canvas").attr("data-url");
let currentModifiableDate = ""
let currentText = "";
let currentImageLinks;
let currentVideoLinks;
let currentImageLinksActual;
let currentVideoLinksActual;

let prevX = null;
let prevY = null;

ctx.lineWidth = 5

let draw = false
let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        console.log("clr backgroundColor", $(clr).css("backgroundColor"));
        ctx.strokeStyle = $(clr).css("backgroundColor");
        if (drawing.split().length !== 1) {
            sendAJAX(ctx.strokeStyle);
        }
        drawing = ctx.strokeStyle + " ";
        console.log("drawing: ", drawing);
    })
})

let drawingModeBtn = document.querySelector(".drawing-mode");
drawingModeBtn.addEventListener("click", () => {
    mode = "drawing mode";
    drawingMode();
})

let viewingModeBtn = document.querySelector(".viewing-mode");
viewingModeBtn.addEventListener("click", () => {
    viewingMode();
})

let editAssociationsModeBtn = document.querySelector(".edit-associations-mode");
editAssociationsModeBtn.addEventListener("click", () => {
    mode = "edit-associations mode";
    editAssociation();
})

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

function drawingMode() {
    unfadeColors();
    document.getElementsByClassName("edit-associations-mode")[0].classList.remove("clicked");
    document.getElementsByClassName("drawing-mode")[0].classList.add("clicked");
    document.getElementsByClassName("viewing-mode")[0].classList.remove("clicked");
    let svgPaths = document.querySelectorAll(".svg-path");
    for (svgPath of svgPaths) {
        svgPath.classList.replace("unhighlighted", "highlighted");
        svgPath.classList.replace("highlighted-modifiable", "highlighted");
    };
    $("#association-shower").css("visibility", "hidden");
    $("#X-button").css("visibility", "hidden");
    $("#save-button").css("visibility", "visible");
    let todayOfficial = new Date(); 
    let dateOfficial =  todayOfficial.getFullYear() + '-' + (todayOfficial.getMonth() + 1) + '-' + todayOfficial.getDate();
    date = $("#input-date").val() == 0 ? dateOfficial : $("#input-date").val();
    $("#input-date").val(date);
    $(".svg-path").removeAttr("onmouseover");
    $(".svg-path").removeAttr("onmouseout");
    $(".svg-path").removeAttr("onclick");

    window.addEventListener("mousedown", function(e) {draw = true; saveBtn.innerHTML = "Save";});
    window.addEventListener("mouseup", (e) => draw = false);

    window.addEventListener("mousemove", (e) => {
        if (prevX == null || prevY == null || !draw) {
            prevX = e.clientX - 70
            prevY = e.clientY - 95
            return
        }

        let currentX = e.clientX - 70
        let currentY = e.clientY - 95

        drawing += `${prevX} ${prevY} ${currentX} ${currentY} `

        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()
    
        prevX = currentX
        prevY = currentY
    })
}

function viewingMode(specificDate="") {
    fadeColors();
    $("#X-button").css("visibility", "visible");
    document.getElementsByClassName("edit-associations-mode")[0].classList.remove("clicked");
    document.getElementsByClassName("drawing-mode")[0].classList.remove("clicked");
    document.getElementsByClassName("viewing-mode")[0].classList.add("clicked");
    $("#save-button").css("visibility", "hidden");
    let paths = document.querySelectorAll("path");
    for (path of paths) {
        path.classList.replace("highlighted-unmodifiable", "highlighted");
        path.classList.replace("unhighlighted", "highlighted");
        path.setAttribute("onmouseover", "unhighlightAllButEntry(this)");
        path.setAttribute("onmouseout", "highlightAll()");
        path.setAttribute("onclick", "showAssociations(this)");
    }

    if (mode === "drawing mode") {
        $(document).ajaxStop(function() { location.reload(true); });
        location.reload(true);
    }

    mode = "viewing mode";
    if (specificDate === "") {  
        let list = document.querySelectorAll(".svg-path");
        for (path of list) {
            path.setAttribute("onmouseover", "unhighlightAllButEntry(this)");
            path.setAttribute("onmouseout", "highlightAll()");
        }
    }
    else {

        let entryInstance = document.querySelector(`path[date="${specificDate}"]`);
        let entryInstances = document.querySelectorAll(`path[date="${specificDate}"]`);
        if (entryInstance === null) {
            unhighlightAll();
        } else {
            console.log(entryInstance);
            showAssociations(entryInstance);
        }
        let nonEntryInstances = document.querySelectorAll(`path:not([date="${specificDate}"])`);
        for (path of nonEntryInstances) {
            path.setAttribute("onmouseover", "highlightEntry(this)");
            path.setAttribute("onmouseout", "unhighlightAll()");
        }
    }
}

function editAssociationsMode(specificDate="") {
    fadeColors();
    document.getElementsByClassName("edit-associations-mode")[0].classList.add("clicked");
    document.getElementsByClassName("drawing-mode")[0].classList.remove("clicked");
    document.getElementsByClassName("viewing-mode")[0].classList.remove("clicked");
}

function showDate(entry) {
    let entryDate = $(entry).attr("date");;
    dateShower.firstChild.data = entryDate;
    document.onmousemove = handleMouseMove;
}

function hideDate(e) {
    document.onmousemove = () => (console.log("highlightAll"));
    $(dateShower).css("visibility", "hidden");
}

function highlightEntry(entry) {
    let entryDate = $(entry).attr("date");;
    dateShower.firstChild.data = entryDate;
    document.onmousemove = handleMouseMove;
    let list = document.querySelectorAll(`path[date="${entryDate}"]`);
    for (path of list) {
        path.classList.replace("unhighlighted", "highlighted");
    }
}

let dateShower = document.getElementById("date-shower");

function unhighlightAllButEntry(entry, unmodifiable=0) {
    let entryDate = $(entry).attr("date");
    dateShower.firstChild.data = entryDate;
    document.onmousemove = handleMouseMove;
    let list = document.querySelectorAll(`path:not([date="${entryDate}"])`);
    for (path of list) {
        path.classList.replace("highlighted", "unhighlighted");
    }
    if (unmodifiable) {
        let list2 = document.querySelectorAll(`path[date="${entryDate}"]`);
        for (path of list2) {
            path.classList.replace("highlighted", "highlighted-unmodifiable");
        }
    }
}

function highlightAll() {
    hideDate();
    let list = document.querySelectorAll(".unhighlighted");
    for (path of list) {
        path.classList.replace("unhighlighted", "highlighted");
    }
}

function unhighlightAll() {
    hideDate();
    let list = document.querySelectorAll(".highlighted");
    for (path of list) {
        path.classList.replace("highlighted", "unhighlighted");
    }
}

function countClicks() {
    date = document.getElementById("input-date").value;
    if (mode === "viewing mode") {
        viewingMode(date);
    }
    if (mode === "drawing mode") {
        sendAJAX();
        drawingMode();
    }
}

function showAssociations(entry) {
    let address = $("#canvas").attr("get-associations-url");
    let entryDate = $(entry).attr("date");
    
    console.log("entryDate: ", entryDate);
    $("#input-date").val(entryDate);
    $("#association-shower").css("visibility", "visible");
    $("#association-shower h3").text(entryDate);
    let username = document.getElementById("logo").getAttribute("username");
    $.ajax({
        method: 'POST',
        url: address,
        data: {user: username, day: entryDate},
        datatype: "text",
        headers: {
            "X-CSRFToken": csrftoken,
        },
        success: function (response) {
            if (response["text"].length > 0) { 
                $("#association-text").html(`<p>${response["text"].replaceAll(/\n\n/g, "<br> <br>")}</p>`);
                console.log("$(#text).text(response[text]): ", $("#association-text").html());
            } else {
                $("#association-text").html("<p>Nothing has been written about this day.</p>");
            }
            if (response["imagesActual"].length > 0) {
                $("#files").html(`<a href=${response["imagesActual"][0]} target="_blank"><img id="image" src=${response["imagesActual"][0]} /></a>`);
                console.log("response[imagesActual].length > 0")
                
                for (let i=1; i<response["imagesActual"].length; i++) {
                    $("#files").append(`<a href=${response["imagesActual"][i]} target="_blank"><img id="image" src=${response["imagesActual"][i]} /></a>`);
                }
            } else {
                $("#files").html("<p>No images for this day.</p>");
            }
            if (response["videosActual"].length > 0) {
                $("#videos").html(`<iframe id="video" src=${response["videosActual"][0]}></iframe>`)
                
                for (let i=1; i<response["videosActual"].length; i++) {
                    $("#videos").append(`<iframe id="video" src=${response["videosActual"][i]}></iframe>`);
                }
            } else {
                $("#videos").html("<p>No videos or music for this day.</p>"); 
            }
            currentModifiableDate = entryDate;
            currentText = response["text"];
            currentImageLinks = response["images"].join(" ");
            currentVideoLinks = response["videos"].join(" ");
            currentImageLinksActual = response["imagesActual"];
            currentVideoLinksActual = response["videosActual"];
            console.log("get_associations: ", response)
            console.log("$(#text).text(response[text])222: ", $("#text").text())
        },
        error: function (response) {
            console.log("ERROR", response);
        }
    })
}

function sendAJAX(nextColor="") {
    let username = document.getElementById("logo").getAttribute("username");
    if (username != "admin") {
        $.ajax({
            method: 'POST',
            url: address,
            data: {line: drawing, day: date, username: username},
            datatype: "text",
            headers: {
                "X-CSRFToken": csrftoken,
            },
            success: function (response) {
                console.log("get_associations(): ", response);
            },
            error: function (response) {
                console.log("ERROR", response);
            }
        })
    }
}


let saveBtn = document.getElementById("save-button");
saveBtn.style.top = String(document.getElementById("viewing-mode").getBoundingClientRect().top - 5) + "px";
saveBtn.style.left = String(document.getElementById("form").getBoundingClientRect().right + 10) + "px";
saveBtn.addEventListener("click", () => {
    sendAJAX();
    saveBtn.innerHTML = "Saved!";
})

let associationXBtn = document.getElementById("association-X-button");
associationXBtn.addEventListener("click", () => {
    $("#input-date").val("");
    $("#association-shower").css("visibility", "hidden");
    location.reload();
    $("#edit-save-button").html("Save");
})

let cursorX = 0;
let cursorY = 0;
function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }
    
    $(dateShower).css("left", `calc(${event.pageX}px + 2px)`);
    $(dateShower).css("top", `calc(${event.pageY}px - 42px)`);
    $(dateShower).css("visibility", "visible");
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

$("#color").change(function(event) {
    console.log($(this).val());
    $("#color-picker").css('background-color',$(this).val());
});

$("#color-picker").click(function(event) {
    $("#color").click();
});

function fadeColors() {
    let colors = document.querySelectorAll(".clr");
    for (color of colors) {
        color.classList.add("clr-faded");
    }
}

function unfadeColors() {
    let colors = document.querySelectorAll(".clr");
    for (color of colors) {
        color.classList.remove("clr-faded");
    }
}

function showInfo() {
    document.getElementById("info-section").classList.remove("hidden");
}

function hideInfo() {
    document.getElementById("info-section").classList.add("hidden");
}

function editAssociation() {
    $("#association-shower").css("visibility", "hidden");
    $("#edit-associations").css("visibility", "visible");
    $("#edit-associations h3").text(currentModifiableDate);
    $("#edit-textarea").text(currentText);
    $("#edit-image").attr("value", currentImageLinks);
    $("#edit-video").attr("value", currentVideoLinks);
    if (currentImageLinksActual.length > 0) {
        $("#add-files").html(`<a href=${currentImageLinksActual[0]} target="_blank"><img id="image" src=${currentImageLinksActual[0]} /></a>`);
        
        for (let i=1; i<currentImageLinksActual.length; i++) {
            $("#add-files").append(`<a href=${currentImageLinksActual[i]} target="_blank"><img id="image" src=${currentImageLinksActual[i]} /></a>`);
        }
    } else {
        $("#add-files").html("<p>No images for this day. Host them on imgbb.com!!! The link should look like this: https://ibb.co/YN0cJs1</p>");
    }
    if (currentVideoLinksActual.length > 0) {
        $("#add-videos").html(`<iframe id="video" src=${currentVideoLinksActual[0]}></iframe>`)
        console.log("currentVideoLinksActual[0]: ", currentVideoLinksActual[0])
        
        for (let i=1; i<currentVideoLinksActual.length; i++) {
            $("#add-videos").append(`<iframe id="video" src=${currentVideoLinksActual[i]}></iframe>`);
        }
    } else {
        $("#add-videos").html("<p>No videos or music for this day.</p>"); 
    }
}

function saveAssociations() {
    let username = document.getElementById("logo").getAttribute("username");
    let newText = document.getElementById("edit-textarea").value;

    let newImages = document.getElementById("edit-image").value;
    let newVideos = document.getElementById("edit-video").value;
    console.log("newImages: ", newImages);
    if (username != "admin") {
        $.ajax({
            method: 'POST',
            url: '/save_associations/',
            data: {username: username, new_text: newText, day: currentModifiableDate, new_images: newImages, new_links: newVideos},
            datatype: "text",
            headers: {
                "X-CSRFToken": csrftoken,
            },
            success: function (response) {
                console.log("save_associations(): ", response);
                $("#edit-save-button").html("Saved!");
                console.log($("#edit-save-button").html());
            },
            error: function (response) {
                console.log("ERROR", response);
            }
        })
    }
}

function hideEditAssociations() {
    $("#input-date").val("");
    $("#edit-associations").css("visibility", "hidden");
    viewingMode();
    $("#edit-save-button").html("Save");
}