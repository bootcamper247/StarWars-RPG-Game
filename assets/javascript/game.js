$(document).ready(function () {

    //Set Global Variables
    var players = ["obi", "luke", "darth", "yoda"];
    var attacker = "";
    var defender = "";
    var defender_CP = 0;
    var defender_HP = 0;
    var attacker_HP = 0;
    var attacker_AP = 0;
    var defenderCount = 3;


    // initialize attributes for all 4 players
    initPlayerVals();

    $(".charBtn").on("click", function () {

        if ($(this).attr("data-role") == 0) {   //No role assigned as yet

            //This player becomes attacker and moves to Your Character
            setAsAttacker(this);

            // All others become enemies and move to enemies available
            for (i = 0; i < players.length; i++) {
                if ($(this).attr("data-name") != players[i]) {
                    setAsEnemy(i);
                }
            }
        }
        else if ($(this).attr("data-role") == 2 && defender == "") {
            //Pick defender from enemies available only if no defender exists
            setAsDefender(this);    
            hideText();
        }
    });

    $(".charBtn").mouseenter(function () {
        $(this).css("cursor", "pointer");
    });

    $(".charBtn").mouseleave(function () {
        $(this).css("cursor", "default");
    });

    $("#reset").on("click", function () {
        attacker = "";
        defender = "";
        defender_CP = 0;
        defender_HP = 0;
        attacker_HP = 0;
        attacker_AP = 0;
        defenderCount = 3;
        initPlayerVals();
        initPlayerLocations();
        hideText();
    });


    $("#attack").on("click", function () {

        if (defender != "") {
            $(this).css("color", "red");
            $("#line1").text(attacker + " attacked " + defender + " for a damage of " + attacker_AP);
            $("#line2").text(defender + " attacked " + attacker + " for a damage of " + defender_CP);

            // set and display new HP vals for attacker/defender
            displayNewHP();

            //change attack power for attacker
            incrAttackerAP();

            if (attacker_HP <= 0) {
                $("#line1").text("GAME OVER -- YOU LOST");
                $("#line2").text("");
                defender = "";
                $("#reset").show();
            }
            else if (defender_HP <= 0) {
                $("#line1").text("You have defeated the defender. Pick another enemy to continue");
                $("#line2").text("");
                $("#reset").hide();
                $("#" + defender).hide();
                defender = "";
                defenderCount--;
                if (defenderCount <= 0) {
                    $("#line1").text("GAME OVER!! -- YOU WON!!");
                    $("#line2").text("");
                    $("#reset").show();
                }
            }
        }

    });

    function initPlayerVals() {

        var name = "";

        for (i = 0; i < players.length; i++) {
            name = "#" + players[i];
            $(name).attr("data-name", players[i]);
            $(name).attr("data-role", 0);       //No role assigned yet
            $(name).attr("data-HP", getRandom(100, 200));
            $(name).attr("data-AP", getRandom(5, 10));
            $(name).attr("data-CP", getRandom(10, 30));

            //display health power
            $("#hp_" + players[i]).text(($("#" + players[i]).attr("data-HP")));
        }
        //hide reset Button
        $("#reset").hide();
    }

    function getRandom(x, y) {
        var num = Math.floor(Math.random() * y + x);
        return num;
    }

    function initPlayerLocations() {
        var names = "";
        for (i = 0; i < players.length; i++) {
            name = "#" + players[i];
            $(name).css("background-color", "white");
            $(name).css("border", "2px solid rgb(8, 136, 8)");
            $(name).css("color", "black");
            $(name).appendTo("#topRow");
            $(name).show();
        }
    }

    function hideText() {
        $("#line1").text("");
        $("#line2").text("");
    }

    function setAsAttacker(objThis) {
        $(objThis).attr("data-role", 1);  //role selected - attacker
        attacker = $(objThis).attr("data-name");
        attacker_AP = $(objThis).attr("data-AP");
        attacker_HP = $(objThis).attr("data-HP");
        $(objThis).attr("data-incr", attacker_AP);
        $(objThis).appendTo("#available");
    }

    function setAsEnemy(indx) {
        $("#" + players[indx]).attr("data-role", 2);  //role selected - enemies
        $("#" + players[indx]).css("background-color", "rgb(214,7,7)");
        $("#" + players[indx]).css("border", "2px solid black");
        $("#" + players[indx]).appendTo("#fightSection");
    }

    function setAsDefender(objThis) {
        $(objThis).attr("data-role", 3);  //role selected - defender
        $(objThis).css("background-color", "black");
        $(objThis).css("border", "2px solid rgb(8, 136, 8)");
        $(objThis).css("color", "white");
        defender = $(objThis).attr("data-name");
        defender_CP = $(objThis).attr("data-CP");
        defender_HP = $(objThis).attr("data-HP");
        $(objThis).appendTo("#defender");
    }

    function displayNewHP() {
        var temp = 0;
        temp = $("#" + attacker).attr("data-HP") - defender_CP;
        attacker_HP = temp;
        $("#" + attacker).attr("data-HP", temp);
        $("#hp_" + attacker).text(temp);
        temp = $("#" + defender).attr("data-HP") - attacker_AP;
        defender_HP = temp;
        $("#" + defender).attr("data-HP", temp);
        $("#hp_" + defender).text(temp);
    }

    function incrAttackerAP() {
        var temp = 0;
        temp = parseInt($("#" + attacker).attr("data-AP")) + parseInt($("#" + attacker).attr("data-incr"));
        $("#" + attacker).attr("data-AP", temp);
        attacker_AP = $("#" + attacker).attr("data-AP");
    }

});         //End of document-ready function









