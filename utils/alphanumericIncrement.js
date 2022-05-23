export default function nextUrl(str) {
  const l = str[str.length - 1];
  let c = l.charCodeAt();

  let s = (s) => {
    const newUrl = str.substring(0, str.length - 1) + String.fromCharCode(s);
    return newUrl;
  };

  if (c >= 48 && c <= 57) {
    return c === 57 ? s(65) : s(c + 1);
  } else if (c >= 65 && c <= 90) {
    return c === 90 ? s(97) : s(c + 1);
  } else if (c >= 97 && c < 122) {
    return s(c + 1);
  } else {
    return str + s(48);
  }
}
