var imageurl = new String();  // insert selecting image

var imageurlpointingplace = new String();//used to place index of original place but not yet got 
var imagefirsturl = new String();  //original images with original indexes but not yet done

var currentGame;
var selectedCount = 0;
var selectedCards = [3];

function drawRow(cardData, row) {
    //onClick='checkGameRules("+cardData.imageUrl+")'
    row.append($("<td>" + "<input  type='image' src='" + cardData.imageUrl
            + "' id='" + cardData.id
            + "' width='50' height='50' onclick='checkGameRules(this.id)'>" + "</td>"));
    console.log(cardData.imageUrl);
    var i = 0;
    if (imagefirsturl.length >= 1) {
        i++;
        imageUrl
    }
    imagefirsturl[i] = cardData.imageUrl;
    console.log("this is in the imagefirsturl    " + imagefirsturl[i]);

}
;

function resume(gameId) {
    //$.getJSON("api/game/openExistingGame/?id=" + id)
    currentGame = gameId;
    $.getJSON("api/cardsOnTable/getTableCards/?id=" + gameId)
            .done(function (data) {
               
                showCardsOnTable("#table", data.cards);
            }).fail(function () {
        console.log("Not Found");
    });
}
;

function showCardsOnTable(tableId, cards) {
    // To clear all rows inside the table
    $(tableId).empty();
    // Add row based on return data
    var row = $("<tr />");
    $(tableId).append(row);
    for (var i = 0, il = cards.length; i < il; i++) {
        if (i % 3 === 0) {
            row = $("<tr />");
            $(tableId).append(row);
        }
        drawRow(cards[i], row);
    }
}
;

function checkGameRules(id) {
    selectedCount++;
    selectedCards[selectedCount - 1] = id;
    if (selectedCount === 3) {
        $.getJSON("/SetGameTeam11CA/cardsOnTable/checkTableCards/?id=" + currentGame
// $.getJSON("/SetGameTeam11CA/newMessage/" 
                + "&card1=" + selectedCards[0]
                + "&card1=" + selectedCards[1]
                + "&card1=" + selectedCards[2])
                .done(function (data) {
                    var valid = true;
                    if (valid) {
                        selectedCount = 0;
                        selectedCards = [];
                        // Replace the old cards with new cards
                        alert(data.status);
                        console.log(data.status);
                        //
                        showCardsOnTable("#table",data.cards);
                        showCardsOnTable("#setTable",data.setCards);
                    } else {
                        showCardsOnTable("#setTable",data.setCards);
                    }
                }).fail(function () {
            console.log("Not Found");
        });
    }
}

$(function () {
    $("#btnHint").on("click", function () {
        $.getJSON("api/game/getAllCards/")
                .done(function (data) {
                    // To clear all rows inside the table
                    $("#table").empty();
                    // Add row based on return data
                    var row = $("<tr />")
                    $("#table").append(row);
                    for (var i = 0, il = data.cards.length; i < il; i++) {
                        if (i % 3 === 0) {
                            row = $("<tr />")
                            $("#table").append(row);
                        }
                        drawRow(data.cards[i], row);
                    }
                }).fail(function () {
            Console.log("Not Found");
        });
    });

    $("#btnShuffle").on("click", function () {
        $.getJSON("api/game/getShuffleCards/")
                .done(function (data) {
                    showCardsOnTable("#table",data.cards);
                }).fail(function () {
            Console.log("Not Found");
        });
    });

    $("#btnNewGame").on("click", function () {

        $.getJSON("api/game/createNewGame/")
                .done(function (data) {
                    // Add row based on return data
                    var row = $("<tr id=" + data.id + "/>")
                    $("#games").append(row);
                    row.append($("<td>" + data.id + "</td>"));
                    row.append($("<td>" + data.creator + "</td>"));
                    row.append($("<td>" + data.date + "</td>"));
                    row.append($("<td><button class='btnResume' value='" + data.id + "' onclick='resume(" + data.id + ")'>Resume</button></td>"));
                    console.log (data.id);
                }).fail(function () {
            Console.log("Not Found");
        });
    });
});