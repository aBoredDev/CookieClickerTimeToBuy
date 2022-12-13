let timeToBuy = {
    init: function () {
        // Register a "check" hook that updates the onmouseover functions that draw the tooltips for the buildings
        Game.registerHook("check", function () {
            
            Object.keys(Game.Objects).forEach(function (i) {
                var me = Game.Objects[i];
                if (document.querySelector(`div#product${me.id}`).onmouseover !== null) {
                    document.querySelector(`div#product${me.id}`).onmouseover = function () {
                        Game.tooltip.dynamic = 1;
                        Game.tooltip.draw(this, function () {
                            var tt = me.tooltip();
                            var text = "";
                            var cookiesRemaining = me.price - Game.cookies;
                            if (cookiesRemaining > 0) {

                                var timeRemaining = cookiesRemaining / Game.cookiesPs;
                                var days = Math.trunc(timeRemaining / 60 / 60 / 24);
                                var hours = Math.trunc((timeRemaining / 60 / 60) % 24);
                                var minutes = Math.trunc((timeRemaining / 60) % 60);
                                var seconds = timeRemaining % 60;
                                console.log("hello?");
                                if (days === 0) {
                                    text = `so far </div><div class=\"descriptionBlock\">You can buy this building in <b>${hours}h ${minutes}m ${seconds}s</b></div>`;
                                } else {
                                    text = `so far </div><div class=\"descriptionBlock\">You can buy this building in <b>${days}d ${hours}h ${minutes}m ${seconds}s</b></div>`;
                                }
                            }
                            else {
                                text = "so far </div><div class=\"descriptionBlock\">You can buy this building <b>now</b></div>";
                            }
                            return tt.replace("so far</div>", text);
                        }, "store");
                        Game.tooltip.wobble();
                    };
                }
            });
        });
    },
    save: function () { return ""; },
    load: function () { }
};

Game.registerMod("TimeToBuy", timeToBuy);
