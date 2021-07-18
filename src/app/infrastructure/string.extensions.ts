function replaceChar(value): string {
    let val = value.trim().toLowerCase();
    val = val.replace(/[àáã]/, "a");
    val = val.replace(/[éê]/, "e");
    val = val.replace(/[í]/, "i");
    val = val.replace(/[óô]/, "o");
    val = val.replace(/[ú]/, "u");
    val = val.replace(/[ç]/, "c");
    return val;
}

interface String {
    contains(value: string): boolean;
}

String.prototype.contains = function (value: string): boolean {

    return replaceChar(this).indexOf(replaceChar(value)) != -1;
};