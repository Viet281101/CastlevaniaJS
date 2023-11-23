
///// Scroll text on credits page /////

class CreditMenu {
    constructor() {
    
    };

    show() {
        document.body.innerHTML = "";

        let transition = document.createElement("script");
        transition.setAttribute("type", "text/javascript");
        transition.setAttribute("src", "./js/effects/transition.js");
        document.body.appendChild(transition);

        let creditContainer = document.createElement("div");
        creditContainer.setAttribute("id", "creditContainer");
        creditContainer.setAttribute("class", "container");
        document.body.appendChild(creditContainer);

        this.addBackButton();
    };

    addBackButton() {
        let backButton = document.createElement("button");
        backButton.setAttribute("id", "backButton");
        backButton.setAttribute("class", "button");
        backButton.innerHTML = "Back";
        backButton.addEventListener("click", function() {
            startTransition(function() {
                window.location.reload();
            })
        });
        document.body.appendChild(backButton);
    };
};
