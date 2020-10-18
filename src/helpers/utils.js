
export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export function snakeToTitle(str) {
    const strSpaced = str.split("_").join(" ")
    return toTitleCase(strSpaced);
}