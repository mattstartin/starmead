
function calculate() {
    kfactor();
    calculateHoles();
    let poly = buildPolygonFromNet()
    drawCanvas(poly);
}

function kfactor() {
    // Get Inputs
    let kFactor = document.getElementById("kFactor").value - 0;
    let kFactorThickness = document.getElementById("kFactorThickness").value - 0;
    let innerRadius = document.getElementById("innerRadius").value -0 ;
    let angle = document.getElementById("angle").value -0;
    let faceWidth = document.getElementById("faceWidth").value - 0;
    let faceHeight = document.getElementById("faceHeight").value - 0;
    let faceReturn = document.getElementById("faceReturn").value -0 ;
    
    // Calculate
    let returnRight = document.getElementById("returnRight").checked;
    let returnLeft = document.getElementById("returnLeft").checked;
    let horizontalReturnCount = [returnLeft,returnRight].filter(x=>x).length;
    let returnTop = document.getElementById("returnTop").checked;
    let returnBottom = document.getElementById("returnBottom").checked;
    let verticalReturnCount = [returnTop,returnBottom].filter(x=>x).length;

    let kFactorT = kFactor * kFactorThickness;
    let bendMaterial = (angle * Math.PI / 360) * (2 * (innerRadius + kFactorT))
    let widthInner = faceWidth - horizontalReturnCount * (innerRadius+kFactorThickness)
    let heightInner = faceHeight - verticalReturnCount * (innerRadius+kFactorThickness)
    let returnsInner = faceReturn - (innerRadius+kFactorThickness)

    // Set Values and Show Table
    // document.getElementById("kfactorValues").hidden = false;
    // document.getElementById("kfactorT").innerHTML = kFactorT;
    // document.getElementById("bendMaterial").innerHTML = bendMaterial.toFixed(4);
    // document.getElementById("halfB").innerHTML = (bendMaterial/2).toFixed(4);
    // document.getElementById("widthInner").innerHTML = widthInner;
    // document.getElementById("heightInner").innerHTML = heightInner;
    document.getElementById("totalWidth").innerHTML = Number(widthInner + (horizontalReturnCount * returnsInner) + (horizontalReturnCount * bendMaterial)).toFixed(4);
    document.getElementById("totalHeight").innerHTML = Number(heightInner + (verticalReturnCount * returnsInner) + (verticalReturnCount * bendMaterial)).toFixed(4)
    document.getElementById("totalCutout").innerHTML = (Number(returnsInner) + Number(bendMaterial) - Number(innerRadius)).toFixed(4);
    
    let horizontalFold = horizontalReturnCount > 0 ? Number(widthInner) + Number(bendMaterial.toFixed(4)) : ''
    // document.getElementById("widthFoldLine").innerHTML = horizontalFold;
    
    let verticalFold = verticalReturnCount > 0 ? Number(heightInner) + Number(bendMaterial.toFixed(4)) : ''
    // document.getElementById("heightFoldLine").innerHTML = verticalFold;
    
    // if (Number(horizontalReturnCount) + Number(verticalReturnCount) > 0) {
    //     document.getElementById("returnInner").innerHTML =  returnsInner;
    //     document.getElementById("returnFoldLine").innerHTML = (Number(returnsInner) + Number(bendMaterial/2)).toFixed(4);
    //     document.getElementById("totalCutout").innerHTML = (Number(returnsInner) + Number(bendMaterial) - Number(innerRadius)).toFixed(4);
    // } else {
    //     document.getElementById("returnInner").innerHTML = '';
    //     document.getElementById("returnFoldLine").innerHTML = '';
    //     document.getElementById("totalCutout").innerHTML = '';
    // }
}

function calculateHoles() {
   let totalWidth = document.getElementById("totalWidth").innerHTML
   let faceWidth = document.getElementById("faceWidth").value;
  
   // Get Inputs
   let endOffset = document.getElementById("endOffset").value - 0;
   let approxPitch = document.getElementById("approxPitch").value - 0;
   
   //Calculate
   let distanceToFill = faceWidth - 2*endOffset;
   let guessedPitch = distanceToFill/approxPitch;
   let pitch = guessedPitch < 0.5 ? 1 : Math.round(distanceToFill/approxPitch);
   let totalHoles = pitch+1;
   let actualPitch = distanceToFill / pitch;

   document.getElementById("distanceToFill").innerHTML = Number(distanceToFill).toFixed(4);
   document.getElementById("totalHoles").innerHTML = Number(totalHoles).toFixed(4);
   document.getElementById("actualPitch").innerHTML = Number(actualPitch).toFixed(4);


}

function buildPolygonFromNet() {

    let netDetails = getNetDetails();
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

    let returnRight = document.getElementById("returnRight").checked;
    let returnBottom = document.getElementById("returnBottom").checked;
    let returnLeft = document.getElementById("returnLeft").checked;
    let returnTop = document.getElementById("returnTop").checked;
    // If no right return, invert right corners
    if (!returnRight) {
        var removeValFrom = [6,7];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }
    if (!returnBottom) {
        var removeValFrom = [9,10];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }
    if (!returnLeft) {
        var removeValFrom = [0,1];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }
    if (!returnTop) {
        var removeValFrom = [3,4];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }

    return poly;
}


function getNetDetails() {
    let faceWidth = document.getElementById("totalWidth").innerHTML - 0;
    let faceHeight = document.getElementById("totalHeight").innerHTML - 0;
    let faceReturn = document.getElementById("totalCutout").innerHTML -0 ;
    let upstand = document.getElementById("upstand").value -0;
    return {
        minHeight: 0, maxHeight: faceHeight, 
        minWidth: 0, maxWidth: faceWidth,
        cutout: faceReturn, cutoutTop: faceHeight-faceReturn, cutoutSide: faceWidth-faceReturn,
        upstand: upstand 
    }
}


function download() {

    // Generate File Name
    var jobNumber = document.getElementById("jobNumber").value;
    let faceWidth = document.getElementById("faceWidth").value - 0;
    let faceHeight = document.getElementById("faceHeight").value - 0;
    let faceReturn = document.getElementById("faceReturn").value - 0;
    let fileName = jobNumber + "_" + faceWidth + "x" + faceHeight + "-" +faceReturn + ".dxf"

    // Build DXF File
    let netDetails = getNetDetails();
    let attemptTwo = fileStart();
    let poly = buildPolygonFromNet(netDetails)
    poly.forEach(corner => attemptTwo+=addVertex(corner.x, corner.y))
    attemptTwo += fileEnd()
    attemptTwo = attemptTwo
        .replaceAll("${MAX_WIDTH}",netDetails.maxWidth)
        .replaceAll("${MAX_HEIGHT}",netDetails.maxHeight+netDetails.upstand)


    // Download file from generated file
    let blob = new Blob([attemptTwo], {type:'text/plain'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

}

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
