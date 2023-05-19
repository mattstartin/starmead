// Materiizecss Modal
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
  });


panelBlank = resetPanel();
previewVisible = false;

function resetPanel() {
    return {
        height: 0,
        width: 0,
        return:0, 
        holes: []
    } 
}

function calculate() {

    panelBlank = resetPanel();
    let inputs = getInputs();
    kfactor(inputs);
    calculateHoles(inputs);
    let poly = buildPolygonFromNet(inputs)
    drawPolygon(poly);
    fillTechSpec(poly);
}


function getInputs() {
    


    return {
        kFactor: getNumberElement("kFactor"),
        kFactorThickness: getNumberElement("kFactorThickness"),
        innerRadius: getNumberElement("innerRadius"),
        angle: 90, 
        faceWidth: doSums(document.getElementById("faceWidth").value),
        faceHeight: doSums(document.getElementById("faceHeight").value),
        returnRight: document.getElementById("returnRight").checked,
        returnLeft: document.getElementById("returnLeft").checked,
        returnTop: document.getElementById("returnTop").checked,
        returnBottom: document.getElementById("returnBottom").checked,
        faceReturn: getNumberElement("faceReturn"),
        endOffset: getNumberElement("endOffset"),
        approxPitch: getNumberElement("approxPitch"),
        jobNumber: document.getElementById("jobNumber").value,
        upstand: getNumberElement("upstand"),
        downstand: getNumberElement("downstand"),
        holeDiameter: getNumberElement("holeDiameter"),
        holeOffset: getNumberElement("holeOffset"),
        customReturns: {
            selected: document.getElementById("returnType").checked,
            leftOn:  document.getElementById("customLeftOn").checked,
            left:  document.getElementById("leftReturn").checked,
            rightOn:  document.getElementById("customRightOn").checked,
            right:  document.getElementById("rightReturn").checked,
            topOn:  document.getElementById("customTopOn").checked,
            top:  document.getElementById("topReturn").checked,
            bottomOn:  document.getElementById("customBottomOn").checked,
            bottom:  document.getElementById("bottomReturn").checked,
        }
    }
}

function getNumberElement(id) {
    return document.getElementById(id).value - 0;
}
function setElementValue(id,value) {
    document.getElementById(id).innerHTML = value;
}

function kfactor(inputs) {
    
    // Calculate
    let horizontalReturnCount = [inputs.returnLeft,inputs.returnRight].filter(x=>x).length;
    let verticalReturnCount = [inputs.returnTop,inputs.returnBottom].filter(x=>x).length;
console.log(horizontalReturnCount,verticalReturnCount)
    let kFactorT = inputs.kFactor * inputs.kFactorThickness;
    let bendMaterial = (inputs.angle * Math.PI / 360) * (2 * (inputs.innerRadius + kFactorT))
    let widthInner = inputs.faceWidth - horizontalReturnCount * (inputs.innerRadius+inputs.kFactorThickness)
    let heightInner = inputs.faceHeight - verticalReturnCount * (inputs.innerRadius+inputs.kFactorThickness)
    let returnsInner = inputs.faceReturn - (inputs.innerRadius+inputs.kFactorThickness)
    
    // Set Panel Values
    panelBlank.width = Number(widthInner + (horizontalReturnCount * returnsInner) + (horizontalReturnCount * bendMaterial)).toFixed(4);
    panelBlank.height = Number(heightInner + (verticalReturnCount * returnsInner) + (verticalReturnCount * bendMaterial)).toFixed(4)
    // panelBlank.return = returnsInner;

    let cornerCutout = Number(returnsInner) + Number(bendMaterial) - Number(inputs.innerRadius);
    panelBlank.return = cornerCutout;
    
}

function calculateHoles(inputs) {
   
   //Calculate
   let distanceToFill = inputs.faceWidth - 2*inputs.endOffset;
   let guessedPitch = distanceToFill/inputs.approxPitch;
   let pitch = guessedPitch < 0.5 ? 1 : Math.round(distanceToFill/inputs.approxPitch);
   let totalHoles = pitch+1;
   let actualPitch = distanceToFill / pitch;

   // Set Holes
   for (let i=0;i<totalHoles;i++) {
       let holeOffset = inputs.returnLeft ? inputs.endOffset-inputs.kFactorThickness : inputs.endOffset

       if(inputs.returnTop) {
        let hole = { x: Number(i*actualPitch+holeOffset), y: Number(panelBlank.height - Number(inputs.holeOffset))}
        panelBlank.holes.push(hole)
       }
       if(inputs.returnBottom) {
        hole = { x: Number(i*actualPitch+holeOffset), y: Number(Number(inputs.holeOffset))}
        panelBlank.holes.push(hole)
       }
   }

}

function buildPolygonFromNet(inputs) {

    let netDetails = getNetDetails(inputs);

    //polygon drawing goes left/down, so this is all upsidedown
    let poly = [
        {x:netDetails.minWidth,y:netDetails.cutoutBottom},  // 1
        {x:netDetails.minWidth,y:netDetails.cutoutTop},     // 2
        {x:netDetails.cutoutLeft,y:netDetails.cutoutTop},   // 3   
        {x:netDetails.cutoutLeft,y:netDetails.maxHeight+0+netDetails.upstand},  // 4
        {x:netDetails.cutoutRight,y:netDetails.maxHeight+0+netDetails.upstand}, // 5 
        {x:netDetails.cutoutRight,y:netDetails.cutoutTop},  // 6
        {x:netDetails.maxWidth,y:netDetails.cutoutTop},     // 7
        {x:netDetails.maxWidth,y:netDetails.cutoutBottom},        // 8
        {x:netDetails.cutoutRight,y:netDetails.cutoutBottom},      // 9
        {x:netDetails.cutoutRight,y:netDetails.minHeight-netDetails.downstand},  // 10
        {x:netDetails.cutoutLeft,y:netDetails.minHeight-netDetails.downstand},      // 11
        {x:netDetails.cutoutLeft,y:netDetails.cutoutBottom},          // 12
    ]

    // If no right return, invert right corners
    if (!inputs.returnRight) {
        var removeValFrom = [6,7];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }
    if (!inputs.returnBottom) {
        var removeValFrom = [9,10];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }
    if (!inputs.returnLeft) {
        var removeValFrom = [0,1];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }
    if (!inputs.returnTop) {
        var removeValFrom = [3,4];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }

    return poly;
}


function getNetDetails(inputs) {

    return {
        minHeight: 0, 
        minWidth: 0, 
        maxHeight: Number(this.panelBlank.height), 
        maxWidth: Number(this.panelBlank.width),
        upstand: inputs.upstand,
        downstand: inputs.downstand,
        cutoutTop: this.panelBlank.height-this.panelBlank.return, 
        cutoutLeft: this.panelBlank.return,
        cutoutRight: this.panelBlank.width-this.panelBlank.return,
        cutoutBottom: this.panelBlank.return
    }
}


function download() {

    // Generate File Name from inputs
    const inputs = getInputs()
    let fileName = inputs.jobNumber + "_" + inputs.faceWidth + "x" + inputs.faceHeight + "-" +inputs.faceReturn + ".dxf"

    // Build DXF File
    let netDetails = getNetDetails(inputs);
    let generatedDxf = fileStart();
    panelBlank.holes.forEach(hole => generatedDxf+=addHole(hole.x+panelBlank.return, hole.y+inputs.upstand, inputs.holeDiameter/2));
    generatedDxf += addPolyLine();
    let poly = buildPolygonFromNet(inputs)
    
    poly.forEach(corner => generatedDxf+=addVertex(corner.x, corner.y))
    generatedDxf += sectionEnd();
    generatedDxf += fileEnd()
    generatedDxf = generatedDxf
        .replaceAll("${MAX_WIDTH}",netDetails.maxWidth)
        .replaceAll("${MAX_HEIGHT}",netDetails.maxHeight+netDetails.upstand)


    // Download file from generated file
    let blob = new Blob([generatedDxf], {type:'text/plain'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

}


function drawPolygon(poly) {
    
    const scale=doSums("450"/this.panelBlank.width)
    const polygon = document.getElementById("polygon")
    let points = poly.flatMap(point => point.x + '-' + point.y).toString().replaceAll(",", " ").replaceAll("-", ",")
    polygon.setAttribute("points", points);
    polygon.setAttribute("style", "fill:white;stroke:black;stroke-width:2;transform:scale("+scale+")")
    
    const svg = document.getElementById("svg")
    svg.setAttribute("width", "500")
    svg.setAttribute("height", "225")

    document.getElementById("previewCard").setAttribute("style","display:block")
    this.previewVisible = true;
}

function fillTechSpec(poly) {
    document.getElementById("techSpecWidth").innerText = panelBlank.width;
    document.getElementById("techSpecHeight").innerText = panelBlank.height;
}

function standsChanged() {
    const upstand = getNumberElement("upstand").toString();
    const downstand = getNumberElement("downstand").toString()
    document.getElementById("upstandBadgeCount").textContent = upstand;
    document.getElementById("downstandBadgeCount").textContent = downstand;
    valueChanged();
}

function returnTypeChange(elem) {
    document.getElementById("sameReturns").hidden = elem.checked;
    document.getElementById("customReturns").hidden = !elem.checked;
    returnChange();
    valueChanged();
}
function returnChange() {
    let faceReturn = getNumberElement("faceReturn");
    let msg = ''
    if (document.getElementById("returnType").checked) {
        if(document.getElementById("customTopOn").checked) msg += 'T'+getNumberElement("topReturn") + ' '
        if(document.getElementById("customBottomOn").checked) msg += 'B'+getNumberElement("bottomReturn") + ' '
        if(document.getElementById("customLeftOn").checked) msg += 'L'+getNumberElement("leftReturn") + ' '
        if(document.getElementById("customRightOn").checked) msg += 'R'+getNumberElement("rightReturn")
    }
    else {
        if(document.getElementById("returnTop").checked) msg += 'T'+faceReturn + ' '
        if(document.getElementById("returnBottom").checked) msg += 'B'+faceReturn + ' '
        if(document.getElementById("returnLeft").checked) msg += 'L'+faceReturn + ' '
        if(document.getElementById("returnRight").checked) msg += 'R'+faceReturn
    }
    if(msg==='')msg='None'
    document.getElementById("returnBadge").textContent = msg; // 'Standard ' + getNumberElement("faceReturn").toString();
    valueChanged();
}
function sheetMetalChanged() {
    document.getElementById("sheetmetalBadge").textContent = 'T: ' + getNumberElement("kFactorThickness").toString();
    valueChanged();
}
function holesChanged() {
    document.getElementById("holesBadge").textContent = getNumberElement("holeDiameter").toString() + " \u2300 | " + getNumberElement("holeOffset").toString();
    valueChanged();
}
function sizeChange() {
    const width = doSums(document.getElementById("faceWidth").value)
    const height = doSums(document.getElementById("faceHeight").value)
    document.getElementById("sizeBadge").textContent = width.toString() + ' x ' + height.toString();

    valueChanged();
}

function valueChanged() {
    if(this.previewVisible) {
        document.getElementById("previewCard").setAttribute("style","display:none")
        M.toast({html: 'Recalculate before download'})
        this.previewVisible = false;
    }
}