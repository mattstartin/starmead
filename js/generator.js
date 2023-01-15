
panelBlank = resetPanel();

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
    // drawCanvas(poly);
}

function getInputs() {
    return {
        kFactor: getNumberElement("kFactor"),
        kFactorThickness: getNumberElement("kFactorThickness"),
        innerRadius: getNumberElement("innerRadius"),
        angle: getNumberElement("angle"),
        faceWidth: doSums(document.getElementById("faceWidth").value),
        faceHeight: getNumberElement("faceHeight"),
        returnRight: document.getElementById("returnRight").checked,
        returnLeft: document.getElementById("returnLeft").checked,
        returnTop: document.getElementById("returnTop").checked,
        returnBottom: document.getElementById("returnBottom").checked,
        faceReturn: getNumberElement("faceReturn"),
        endOffset: getNumberElement("endOffset"),
        approxPitch: getNumberElement("approxPitch"),
        jobNumber: document.getElementById("jobNumber").value,
        upstand: getNumberElement("upstand"),
        downstand: getNumberElement("downstand")
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
    let horizontalReturnCount = [returnLeft,returnRight].filter(x=>x).length;
    let verticalReturnCount = [returnTop,returnBottom].filter(x=>x).length;
    
    let kFactorT = inputs.kFactor * inputs.kFactorThickness;
    let bendMaterial = (inputs.angle * Math.PI / 360) * (2 * (inputs.innerRadius + kFactorT))
    let widthInner = inputs.faceWidth - horizontalReturnCount * (inputs.innerRadius+inputs.kFactorThickness)
    let heightInner = inputs.faceHeight - verticalReturnCount * (inputs.innerRadius+inputs.kFactorThickness)
    let returnsInner = inputs.faceReturn - (inputs.innerRadius+inputs.kFactorThickness)
    
    // Set Panel Values
    panelBlank.width = Number(widthInner + (horizontalReturnCount * returnsInner) + (horizontalReturnCount * bendMaterial)).toFixed(4);
    panelBlank.height = Number(heightInner + (verticalReturnCount * returnsInner) + (verticalReturnCount * bendMaterial)).toFixed(4)
    panelBlank.return = inputs.faceReturn;
    
    // Update View
    setElementValue("totalWidth", this.panelBlank.width);
    setElementValue("totalHeight", this.panelBlank.height);
    setElementValue("totalCutout", (Number(returnsInner) + Number(bendMaterial) - Number(inputs.innerRadius)).toFixed(4) );
    
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
       let hole = { x: Number(i*actualPitch+inputs.endOffset), y: Number(panelBlank.height - Number(15))}
       panelBlank.holes.push(hole)
   }

   // Display Values
   document.getElementById("distanceToFill").innerHTML = Number(distanceToFill).toFixed(4);
   document.getElementById("totalHoles").innerHTML = Number(totalHoles).toFixed(4);
   document.getElementById("actualPitch").innerHTML = Number(actualPitch).toFixed(4);
}

function buildPolygonFromNet(inputs) {

    let netDetails = getNetDetails(inputs);

    //polygon drawing goes left/down, so this is all upsidedown
    let poly = [
        {x:netDetails.minWidth,y:netDetails.cutout},
        {x:netDetails.minWidth,y:netDetails.cutoutTop},
        {x:netDetails.cutout,y:netDetails.cutoutTop},
        {x:netDetails.cutout,y:netDetails.maxHeight},
        {x:netDetails.cutoutSide,y:netDetails.maxHeight},
        {x:netDetails.cutoutSide,y:netDetails.cutoutTop},
        {x:netDetails.maxWidth,y:netDetails.cutoutTop},
        {x:netDetails.maxWidth,y:netDetails.cutout},
        {x:netDetails.cutoutSide,y:netDetails.cutout},
        {x:netDetails.cutoutSide,y:netDetails.minHeight-netDetails.upstand},
        {x:netDetails.cutout,y:netDetails.minHeight-netDetails.upstand},
        {x:netDetails.cutout,y:netDetails.cutout},
    ]

    // If no right return, invert right corners
    if (!inputs.faceReturnRight) {
        var removeValFrom = [6,7];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }
    if (!inputs.faceReturnBottom) {
        var removeValFrom = [9,10];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }
    if (!inputs.faceReturnLeft) {
        var removeValFrom = [0,1];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }
    if (!inputs.faceReturnTop) {
        var removeValFrom = [3,4];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }

    return poly;
}


function getNetDetails(inputs) {
    return {
        minHeight: 0, maxHeight: inputs.faceHeight, 
        minWidth: 0, maxWidth: inputs.faceWidth,
        cutout: inputs.faceReturn, cutoutTop: inputs.faceHeight-inputs.faceReturn, cutoutSide: inputs.faceWidth-inputs.faceReturn,
        upstand: inputs.upstand 
    }
}


function download() {

    // Generate File Name from inputs
    const inputs = getInputs()
    let fileName = inputs.jobNumber + "_" + inputs.faceWidth + "x" + inputs.faceHeight + "-" +inputs.faceReturn + ".dxf"

    // Build DXF File
    let netDetails = getNetDetails(inputs);
    let generatedDxf = fileStart();
    panelBlank.holes.forEach(hole => generatedDxf+=addHole(hole.x+panelBlank.return, hole.y));
    generatedDxf += addPolyLine();
    let poly = buildPolygonFromNet(netDetails)
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



/* CANVAS WORK IS PARKED */
function clearCanvas() {
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCanvas(poly) {

    // TODO: Could be used to draw guidelines?
    // let x_divisions = [0, faceReturn-0, faceWidth-faceReturn, faceWidth-0]
    // let y_divisions = [0, faceReturn-0, faceHeight-faceReturn, faceHeight-0]

    var canvas = document.getElementById("canvas")
    const { width, height } = canvas.getBoundingClientRect();
    
        // Draw Net
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    // ctx.scale(1,1);
    // ctx.scale(0.5,0.5)
    
    //optimal size is 2500x1000, so scale in relation to that
    let faceWidth = document.getElementById("totalWidth").innerHTML - 0;
    let faceHeight = document.getElementById("totalHeight").innerHTML - 0;
    
    ctx.scale(Number(faceWidth)/2500, Number(faceHeight)/1000)
    ctx.beginPath();

    ctx.moveTo(poly[0].x/10+20, poly[0].y/10+20);
    
    for(i=1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x/10+20, poly[i].y/10+20)
    }
    ctx.closePath();


    ctx.fill();


    
    // ctx.fillStyle = '#f00';
    
    
    // ctx.stroke();
    // ctx.textAlign ="center";
    // ctx.fillText("WIDTH",100,100)
    // ctx.textAlign = "left";
    // ctx.fillText("HEIGHT",50,50);

}
