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

function nextUrl(str) {
  const l = str[str.length - 1];
  let c = l.charCodeAt();

  const s = (s) => {
    const newUrl = str.substring(0, str.length - 1) + String.fromCharCode(s);
    return newUrl;
  };

  //São os escopos representando partes dos caracteres unicode

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
    }
  }

  return nextChar;
}

function incrementSystem(str) {
  /*
  9 - 10
  z - 00

  119 - 120
  11z - 110

  99 - 100
  zz - 000
  */

  const arrStr = str.split("").map((e) => e.charCodeAt());

  //Verifica se o último caractere vai ser incrementado para seguir a cadeia de verificação
  if (arrStr[arrStr.length - 1] === scopes[scopes.length - 1].end) {
    //Aonde armazena se o último dado foi incrementado, para jogar para a casa atual
    let nextIncrement = false;
    for (let i = arrStr.length - 1; i >= 0; i--) {
      //Valida a casa atual se é igual a última casa do limite definido.
      if (arrStr[i] === scopes[scopes.length - 1].end) {
        //Valida se se é a cadeia de caracteres acabou, para então adicionar uma casa nela.
        if (i === 0) {
          arrStr[0] = nextUrl(String.fromCharCode(arrStr[0])).charCodeAt();
          arrStr.push(scopes[0].start);
        } else {
          arrStr[i] = scopes[0].start;
          nextIncrement = true;
        }
      } else if (nextIncrement) {
        arrStr[i] = nextUrl(String.fromCharCode(arrStr[i])).charCodeAt();
        nextIncrement = false;
      } else {
        break;
      }
    }
  } else if (arrStr[arrStr.length - 1] < scopes[scopes.length - 1].end) {
    arrStr[arrStr.length - 1] = nextUrl(
      String.fromCharCode(arrStr[arrStr.length - 1])
    ).charCodeAt();
  }

  return arrStr.map((e) => String.fromCharCode(e)).join("");
}
