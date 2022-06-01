interface IScope {
  // The unicode start code
  start: number;
  // The unicode end code
  end: number;
}

export class incrementAlphanumeric {
  private static scopes: IScope[] = [
    {
      //0-9
      start: 48,
      end: 57,
    },
    {
      //A-Z
      start: 65,
      end: 90,
    },
    {
      //a-z
      start: 97,
      end: 122,
    },
  ];

  public static nextChar = (char: string): string => {
    //Convert char to unicode decimal code
    const c: number = char.charCodeAt(char.length - 1);

    const s = (charCode: number) => {
      return char.substring(0, char.length - 1) + String.fromCharCode(charCode);
    };

    let nextChar: string;

    for (let i = 0; i <= this.scopes.length - 1; i++) {
      const condition =
        c >= this.scopes[i].start &&
        (i === this.scopes.length - 1
          ? c < this.scopes[i].end
          : c <= this.scopes[i].end);

      if (condition) {
        if (c === this.scopes[i].end) {
          nextChar = s(this.scopes[i + 1].start);
          break;
        } else {
          nextChar = s(c + 1);
          break;
        }
      } else if (i === this.scopes.length - 1) {
        nextChar = s(this.scopes[0].start);
        break;
      }
    }

    return nextChar;
  };

  //Function to increment a string like a decimal system
  public static incrementSystem = (str: string): string => {
    //Convert string to array with chars unicode decimal code
    const arrStr = str.split("").map((e: string) => e.charCodeAt(0));

    //Verifica se o último caractere vai ser incrementado para seguir a cadeia de verificação
    if (arrStr[arrStr.length - 1] === this.scopes[this.scopes.length - 1].end) {
      //Aonde armazena se o último dado foi incrementado, para jogar para a casa atual
      let nextIncrement: boolean = false;

      for (let i = arrStr.length - 1; i >= 0; i--) {
        //Valida a casa atual se é igual a última casa do limite definido.
        if (arrStr[i] === this.scopes[this.scopes.length - 1].end) {
          //Valida se se é a cadeia de caracteres acabou, para então adicionar uma casa nela.
          if (i === 0) {
            arrStr[0] = this.nextChar(
              String.fromCharCode(arrStr[0])
            ).charCodeAt(0);
            arrStr.push(this.scopes[0].start);
          } else {
            arrStr[i] = this.scopes[0].start;
            nextIncrement = true;
          }
        } else if (nextIncrement) {
          arrStr[i] = this.nextChar(String.fromCharCode(arrStr[i])).charCodeAt(
            0
          );
          nextIncrement = false;
        } else {
          break;
        }
      }
    } else if (
      arrStr[arrStr.length - 1] < this.scopes[this.scopes.length - 1].end
    ) {
      arrStr[arrStr.length - 1] = this.nextChar(
        String.fromCharCode(arrStr[arrStr.length - 1])
      ).charCodeAt(0);
    }

    return arrStr.map((e) => String.fromCharCode(e)).join("");
  };
}
