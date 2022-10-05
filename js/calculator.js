function doSums(textCalc) {
    return new Function('return ' + textCalc)();
}