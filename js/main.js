const TypeColor = {
    Lost: "red",
    Replied: "green",
    Restored: "yellow",
    Inactive: ""
}

const Type = {
    Lost: "Lost",
    Replied: "Replied",
    Restored: "Restored",
    Inactive: "Inactive"
}

degrees = Degrees();

function setDegreeColor(index, type) {
    if (index < 0 || index >= 21) return;
    degrees[index].style.backgroundColor = TypeColor[type];
}

function setDegreeText(index, text) {
    if (index < 0 || index >= 21) return;
    degrees[index].children[0].innerText = text;
}

function Degrees() {
    const res = [];

    for (let i = 0; i < 21; i++) {
        res[i] = Degree();
    }

    return res;
}

function clearDegrees() {
    for (let i = 0; i < 21; i++) {
        setDegreeColor(i, Type.Inactive);
        setDegreeText(i, '');
    }
}


function Degree() {
    const degree = document.createElement("div");
    const text = document.createElement("span");

    degree.appendChild(text);
    degree.classList.add("degree")
    return degree;
}

function getDegrees() {
    try {
        axios.get("http://192.168.0.129:8080").then(
            response => {
                const degreesResp = response.data;

                clearDegrees();

                for (let i = 0; i < response.data.length; i++) {
                    const deg = degreesResp.at(i);
                    setDegreeColor(i, deg.type);
                    setDegreeText(i, deg.fileName);
                }
            })
    } catch (e) {
        clearDegrees();
    }
}

function main() {
    const degreesPane = document.getElementById("degreesPane");
    degrees.forEach(deg => degreesPane.appendChild(deg));
    setInterval(getDegrees, 100);
}

