const convert = (val) => {
     let set = val.split(",");
     let charsets = {
          latin: { halfRE: /[!-~]/g, fullRE: /[！-～]/g, delta: 0xFEE0 },
          hangul1: { halfRE: /[ﾡ-ﾾ]/g, fullRE: /[ᆨ-ᇂ]/g, delta: -0xEDF9 },
          hangul2: { halfRE: /[ￂ-ￜ]/g, fullRE: /[ᅡ-ᅵ]/g, delta: -0xEE61 },
          kana: {
               delta: 0,
               half: "｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ",
               full: "。「」、・ヲァィゥェォャュョッーアイウエオカキクケコサシ" +
                    "スセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜"
          },
          extras: {
               delta: 0,
               half: "¢£¬¯¦¥₩\u0020|←↑→↓■°",
               full: "￠￡￢￣￤￥￦\u3000￨￩￪￫￬￭￮"
          }
     };
     let toFull = set => c => set.delta ?
          String.fromCharCode(c.charCodeAt(0) + set.delta) :
          [...set.full][[...set.half].indexOf(c)];
     let toHalf = set => c => set.delta ?
          String.fromCharCode(c.charCodeAt(0) - set.delta) :
          [...set.half][[...set.full].indexOf(c)];
     let re = (set, way) => set[way + "RE"] || new RegExp("[" + set[way] + "]", "g");
     let sets = Object.keys(charsets).map(i => charsets[i]);
     const toFullWidth = str0 => {
          return sets.reduce((str, set) => {
               return str.replace(re(set, "half"), toFull(set))
          }, str0);
     }
     const toHalfWidth = str0 => {
          console.log('toHalfWidt', str0);
          return sets.reduce((str, set) => {
               return str.replace(re(set, "full"), toHalf(set))
          }, str0);
     }
     const mapSpecialCharacter = (character) => {
          let FulltoHalf = {
               'ガ': 'ｶﾞ',
               'ギ': 'ｷﾞ',
               'グ': 'ｸﾞ',
               'ゲ': 'ｹﾞ',
               'ゴ': 'ｺﾞ',
               'ザ': 'ｻﾞ',
               'ジ': 'ｼﾞ',
               'ズ': 'ｽﾞ',
               'ゼ': 'ｾﾞ',
               'ゾ': 'ｿﾞ',
               'ダ': 'ﾀﾞ',
               'ヂ': 'ﾁﾞ',
               'ッ': 'ｯ',
               'ヅ': 'ﾂﾞ',
               'デ': 'ﾃﾞ',
               'ド': 'ﾄﾞ',
               'バ': 'ﾊﾞ',
               'パ': 'ﾊﾟ',
               'ビ': 'ﾋﾞ',
               'ピ': 'ﾋﾟ',
               'ブ': 'ﾌﾞ',
               'プ': 'ﾌﾟ',
               'ベ': 'ﾍﾞ',
               'ペ': 'ﾍﾟ',
               'ボ': 'ﾎﾞ',
               'ポ': 'ﾎﾟ',
               'ヴ': 'ｳﾞ',
          };
          if (typeof FulltoHalf[character] === 'undefined') {
               return character;
          } else {
               return FulltoHalf[character];
          }
     }
     const convertToSpecialHalfWidth = (string) => {
          let characters = string.split("");
          let halfWidthString = ''
          characters.forEach(character => {
               halfWidthString += mapSpecialCharacter(character);
          });
          return halfWidthString;
     }
     return {
          fullWidth: set.map(toFullWidth)[0],
          halfWidth: convertToSpecialHalfWidth(set.map(toFullWidth).map(toHalfWidth)[0]),
          // halfWidth:set.map(toFullWidth).map(toHalfWidth)[0]
     }
}




document.getElementById('btnConvert').addEventListener('click', () => {
     let inputVal = document.getElementById('inpTxt').value;

     const { fullWidth, halfWidth } = convert(inputVal);
     // let halfWidth =  convertToHalfWidth(inputVal);
     // let  fullWidth=convertToFullWidth(inputVal);
     console.log(` value = ${inputVal}   =>  fullwidth: ${fullWidth}  =>  halfwidth=${halfWidth}`);
     // let halfWidth =  convertToHalfWidth(inputVal);
     // let  fullWidth=convertToFullWidth(inputVal);
     // console.log('convertToHalfWidth(inputVal)',convertToHalfWidth(inputVal));
     // console.log('convertToFullWidth(inputVal)',convertToFullWidth(inputVal));
})