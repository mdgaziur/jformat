const chevronUp = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" style=\"fill: rgba(255, 255, 255, 1);transform: ;msFilter:;\"><path d=\"m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z\"></path></svg>";
const chevronDown = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" style=\"fill: rgba(255, 255, 255, 1);transform: ;msFilter:;\"><path d=\"M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z\"></path></svg>";

function formatJSON() {
    let raw = document.body.innerText;

    let parsed_json;
    try {
        parsed_json = JSON.parse(raw);
        document.json = raw;
        clearBody();
    } catch(e) {
        return;
    }

    render(parsed_json, 0);
}

function render(json, depth, parentId = "") {
    for (let key of Object.keys(json)) {
        let childId = makeid(10);
        let nodeContainer = document.createElement("div");
        nodeContainer.style.marginLeft = `${depth * 20}px`;
        nodeContainer.classList.add("node-container");
        nodeContainer.className += ` ${parentId}`;

        let close = document.createElement("span");
        close.innerHTML = chevronUp;
        close.classList.add("close-caret");
        nodeContainer.addEventListener("click", () => {
            for (let el of document.getElementsByClassName(childId)) {
                if (el.style.display !== "none") {
                    close.innerHTML = chevronDown;
                    el.style.display = "none";
                } else {
                    close.innerHTML = chevronUp;
                    el.style.display = "flex";
                }
            }
        });

        let node = document.createElement("pre");
        node.innerText = key;
        node.classList.add("json-key");

        nodeContainer.appendChild(close);
        nodeContainer.appendChild(node);

        if (typeof json[key] == "object" && json[key] != null) {
            node.innerText += " {" + Object.keys(json[key]).length + "}";
            document.body.append(nodeContainer);
            render(json[key], depth + 1, `${parentId ? parentId + " ": "" }${childId}`);
        } else {
            node.innerText += ": ";

            let valueType = typeof json[key];
            let value = document.createElement("pre");
            value.innerText = json[key] != null ? JSON.stringify(json[key]) : "null";
            value.classList.add("json-value");
            value.classList.add(valueType);

            close.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            nodeContainer.appendChild(value);
            document.body.appendChild(nodeContainer);
        }
    }
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function clearBody() {
    document.body.innerHTML = "";
}

formatJSON();