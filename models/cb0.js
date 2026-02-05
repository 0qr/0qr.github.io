fn__cb0Primary();

let currentHours = new Date().getHours();

if (currentHours > 9 && currentHours < 16) {
    fn__cbMorningShift();
}
if (currentHours <= 8) {
    fn__cbNightShift();
}

let currentMilliseconds = new Date().getMilliseconds();
if ((currentMilliseconds % 2) == 0 && (cbLevelNext > 0)) {
    fn__cb0Misc();
}
