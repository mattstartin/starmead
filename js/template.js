function basicTemplate() {
return "0" + "\n" +
"SECTION" + "\n" +
"2" + "\n" +
"HEADER" + "\n" +
"9" + "\n" +
"$EXTMIN" + "\n" +
"10" + "\n" +
"0.000000" + "\n" +
"20" + "\n" +
"0.000000" + "\n" +
"9" + "\n" +
"$EXTMAX" + "\n" +
"10" + "\n" +
"${MAX_WIDTH}.000000" + "\n" +
"20" + "\n" +
"${MAX_HEIGHT}.000000" + "\n" +
"0" + "\n" +
"ENDSEC" + "\n" +
"0" + "\n" +
"SECTION" + "\n" +
"2" + "\n" +
"TABLES" + "\n" +
"0" + "\n" +
"ENDSEC" + "\n" +
"0" + "\n" +
"SECTION" + "\n" +
"2" + "\n" +
"ENTITIES" + "\n" +
"0" + "\n" +
"POLYLINE" + "\n" +
"8" + "\n" +
"2" + "\n" +
"66" + "\n" +
"1" + "\n" +
"70" + "\n" +
"1" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"0.000000" + "\n" +
"20" + "\n" +
"${CUTOUT}.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"0.000000" + "\n" +
"20" + "\n" +
"${CUTOUT_TOP}.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${CUTOUT}.000000" + "\n" +
"20" + "\n" +
"${CUTOUT_TOP}.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${CUTOUT}.000000" + "\n" +
"20" + "\n" +
"${MAX_HEIGHT}.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${CUTOUT_SIDE}.000000" + "\n" +
"20" + "\n" +
"${MAX_HEIGHT}.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${CUTOUT_SIDE}.000000" + "\n" +
"20" + "\n" +
"${CUTOUT_TOP}.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${MAX_WIDTH}.000000" + "\n" +
"20" + "\n" +
"${CUTOUT_TOP}.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${MAX_WIDTH}.000000" + "\n" +
"20" + "\n" +
"${CUTOUT}.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${CUTOUT_SIDE}.000000" + "\n" +
"20" + "\n" +
"${CUTOUT}.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${CUTOUT_SIDE}.000000" + "\n" +
"20" + "\n" +
"0.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${CUTOUT}.000000" + "\n" +
"20" + "\n" +
"0.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${CUTOUT}.000000" + "\n" +
"20" + "\n" +
"${CUTOUT}.000000" + "\n" +
"0" + "\n" +
"SEQEND" + "\n" +
"0" + "\n" +
"ENDSEC" + "\n" +
"0" + "\n" +
"000" + "\n" +
"20" + "\n" +
"0.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${CUTOUT}.000000" + "\n" +
"20" + "\n" +
"0.000000" + "\n" +
"0" + "\n" +
"VERTEX" + "\n" +
"8" + "\n" +
"2" + "\n" +
"10" + "\n" +
"${CUTOUT}.000000" + "\n" +
"20" + "\n" +
"${CUTOUT}.000000" + "\n" +
"0" + "\n" +
"SEQEND" + "\n" +
"0" + "\n" +
"ENDSEC" + "\n" +
"0" + "\n" +
"EOF" + "\n" +
"" + "\n" 
}

function noRight() {
    return "0" + "\n" +
    "SECTION" + "\n" +
    "2" + "\n" +
    "HEADER" + "\n" +
    "9" + "\n" +
    "$EXTMIN" + "\n" +
    "10" + "\n" +
    "0.000000" + "\n" +
    "20" + "\n" +
    "0.000000" + "\n" +
    "9" + "\n" +
    "$EXTMAX" + "\n" +
    "10" + "\n" +
    "${MAX_WIDTH}.000000" + "\n" +
    "20" + "\n" +
    "${MAX_HEIGHT}.000000" + "\n" +
    "0" + "\n" +
    "ENDSEC" + "\n" +
    "0" + "\n" +
    "SECTION" + "\n" +
    "2" + "\n" +
    "TABLES" + "\n" +
    "0" + "\n" +
    "ENDSEC" + "\n" +
    "0" + "\n" +
    "SECTION" + "\n" +
    "2" + "\n" +
    "ENTITIES" + "\n" +
    "0" + "\n" +
    "POLYLINE" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "66" + "\n" +
    "1" + "\n" +
    "70" + "\n" +
    "1" + "\n" +
    "0" + "\n" +
    "VERTEX" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "10" + "\n" +
    "0.000000" + "\n" +
    "20" + "\n" +
    "${CUTOUT}.000000" + "\n" +
    "0" + "\n" +
    "VERTEX" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "10" + "\n" +
    "0.000000" + "\n" +
    "20" + "\n" +
    "${CUTOUT_TOP}.000000" + "\n" +
    "0" + "\n" +
    "VERTEX" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "10" + "\n" +
    "${CUTOUT}.000000" + "\n" +
    "20" + "\n" +
    "${CUTOUT_TOP}.000000" + "\n" +
    "0" + "\n" +
    "VERTEX" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "10" + "\n" +
    "${CUTOUT}.000000" + "\n" +
    "20" + "\n" +
    "${MAX_HEIGHT}.000000" + "\n" +
    "0" + "\n" +
    "VERTEX" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "10" + "\n" +
    "${MAX_WIDTH}.000000" + "\n" +
    "20" + "\n" +
    "${MAX_HEIGHT}.000000" + "\n" +
    "0" + "\n" +
    "VERTEX" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "10" + "\n" +
    "${MAX_WIDTH}.000000" + "\n" +
    "20" + "\n" +
    "0.000000" + "\n" +
    "0" + "\n" +
    "VERTEX" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "10" + "\n" +
    "${CUTOUT}.000000" + "\n" +
    "20" + "\n" +
    "0.000000" + "\n" +
    "0" + "\n" +
    "VERTEX" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "10" + "\n" +
    "${CUTOUT}.000000" + "\n" +
    "20" + "\n" +
    "0.000000" + "\n" +
    "0" + "\n" +
    "VERTEX" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "10" + "\n" +
    "${CUTOUT}.000000" + "\n" +
    "20" + "\n" +
    "${CUTOUT}.000000" + "\n" +
    "0" + "\n" +
    "SEQEND" + "\n" +
    "0" + "\n" +
    "ENDSEC" + "\n" +
    "0" + "\n" +
    "000" + "\n" +
    "20" + "\n" +
    "0.000000" + "\n" +
    "0" + "\n" +
    "VERTEX" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "10" + "\n" +
    "${CUTOUT}.000000" + "\n" +
    "20" + "\n" +
    "0.000000" + "\n" +
    "0" + "\n" +
    "VERTEX" + "\n" +
    "8" + "\n" +
    "2" + "\n" +
    "10" + "\n" +
    "${CUTOUT}.000000" + "\n" +
    "20" + "\n" +
    "${CUTOUT}.000000" + "\n" +
    "0" + "\n" +
    "SEQEND" + "\n" +
    "0" + "\n" +
    "ENDSEC" + "\n" +
    "0" + "\n" +
    "EOF" + "\n" +
    "" + "\n" 
}