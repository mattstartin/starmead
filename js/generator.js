
function calculate() {

    //THIS IS AN EXAMPLE FOR 2000x500
    // let poly = [
    //     {x:0,y:50},
    //     {x:0,y:450},
    //     {x:50,y:450},
    //     {x:50,y:500},
    //     {x:1950,y:500},
    //     {x:1950,y:450},
    //     {x:2000,y:450},
    //     {x:2000,y:50},
    //     {x:1950,y:50},
    //     {x:1950,y:0},
    //     {x:50,y:0},
    //     {x:50,y:50},
    // ]
    let netDetails = getNetDetails();
    let poly = buildPolygonFromNet(netDetails)
    drawCanvas(poly);
    // document.getElementById("download").removeAttribute("disabled");

}

function getNetDetails() {
    let faceWidth = document.getElementById("faceWidth").value - 0;
    let faceHeight = document.getElementById("faceHeight").value - 0;
    let faceReturn = document.getElementById("faceReturn").value -0 ;
    let upstand = document.getElementById("upstand").value -0;
    //TODO: IS MIN REQUIRED?
    
    return {
        minHeight: 0, maxHeight: faceHeight, 
        minWidth: 0, maxWidth: faceWidth,
        cutout: faceReturn, cutoutTop: faceHeight-faceReturn, cutoutSide: faceWidth-faceReturn,
        upstand: upstand 
    }
}

function buildPolygonFromNet(netDetails) {
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
    // If no right return, invert right corners
    if (!returnRight) {
        var removeValFrom = [5,6,7,8];
        poly = poly.filter(function(value, index) {
             return removeValFrom.indexOf(index) == -1;
        })
    }


    return poly;
}

function download() {

    var jobNumber = document.getElementById("jobNumber").value;

    let netDetails = getNetDetails();

    let text = basicTemplate();
    text = text
            .replaceAll("${MAX_WIDTH}",netDetails.maxWidth)
            .replaceAll("${MAX_HEIGHT}",netDetails.maxHeight+netDetails.upstand)
            .replaceAll("${CUTOUT}",netDetails.cutout)
            .replaceAll("${CUTOUT_TOP}",netDetails.cutoutTop)
            .replaceAll("${CUTOUT_SIDE}",netDetails.cutoutSide)

    let fileName = jobNumber + "_" + netDetails.maxWidth + "x" + netDetails.maxHeight + "-" +netDetails.cutout + ".dxf"

    let blob = new Blob([text], {type:'text/plain'});

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
    
    // Draw some grey verticals at 2%, 12%, 88% and 98% width
    // let verticalLines = [width*0.02, width*0.12, width*0.48, width*0.58]
    
    // verticalLines.forEach(line => {
        //     console.log(line)
        //     ctx.setLineDash([1, 1]);
        //     ctx.beginPath();
        //     ctx.moveTo(line,0);
        //     ctx.lineTo(line, height);
        //     ctx.stroke();
        //     ctx.closePath();
        //     ctx.moveTo(0,0)
        // })
        
        
        
        // Draw Net
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(poly[0].x/10+50, poly[0].y/10+50);
    
    for(i=1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x/10+50, poly[i].y/10+50)
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
