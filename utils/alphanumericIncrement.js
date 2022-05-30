function nextUrl(str) {
  const l = str[str.length - 1];
  let c = l.charCodeAt();

  let s = (s) => {
    const newUrl = str.substring(0, str.length - 1) + String.fromCharCode(s);
    return newUrl;
  };

  //São os escopos representando partes dos caracteres unicode
  const scopes = [
    {
      start: 48,
      end: 57,
    },
    {
      start: 65,
      end: 90,
    },
    {
      start: 97,
      end: 122,
    },
  ];

  let nextChar;

  for (let i = 0; i <= scopes.length - 1; i++) {
    const condition =
      c >= scopes[i].start &&
      (i === scopes.length - 1 ? c < scopes[i].end : c <= scopes[i].end);

    if (condition) {
      if (c === scopes[i].end) {
        nextChar = s(scopes[i + 1].start);
        break;
      } else {
        nextChar = s(c + 1);
        break;
      }
    } else if (i === scopes.length - 1) {
      nextChar = s(scopes[0].start);
      break;
    } else {
      return undefined;
    }
  }

  return nextChar;
}
