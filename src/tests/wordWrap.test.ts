/*
Lista de ejemplos a testear:
- wordWrap('',5) ⇒ ''
- wordWrap('hello',5) ⇒ 'hello'
- wordWrap('longword',4) ⇒ 'long\nword'
- wordWrap('reallylongword',4) ⇒ 'real\nlylo\nngwo\nrd'
- wordWrap('abc def',4) ⇒ 'abc\ndef' 
- wordWrap('abc def ghi',4) ⇒ 'abc\ndef\nghi'
- wordWrap(' abcdf',4) ⇒ '\nabcd\nf'
- wordWrap(null,5) ⇒ ''
- wordWrap('hello',-5) ⇒ throw exception
 */
describe("The WordWrap function", ()=>{
    it("returns a text where every single line fits within maximun range allowed", ()=>{
        expect(wordWrap('hello', 5)).toBe('hello');
        expect(wordWrap('longword', 4)).toBe('long\nword');
        expect(wordWrap('reallylongword',4)).toBe('real\nlylo\nngwo\nrd');
        expect(wordWrap('abc def',4)).toBe('abc\ndef');
        expect(wordWrap('abc def ghi',4)).toBe('abc\ndef\nghi');
        expect(wordWrap(' abcdf',4)).toBe('\nabcd\nf');
    });
});

//Secuencia de prioridad de transformación: 9 >> Introducir recursión
function wordWrap(text: string, columnWidth: number): any {
    if(text.length <= columnWidth)
        return text;

        let wrappedText;
        let unwrappedText;
        if (text.indexOf(' ') > -1 && text.indexOf(' ') < columnWidth) {
          wrappedText = text.substring(0, text.indexOf(' ')).concat('\n');
          unwrappedText = text.substring(text.indexOf(' ') + 1);
        } else {
          wrappedText = text.substring(0, columnWidth).concat('\n');
          unwrappedText = text.substring(columnWidth);
        }
        return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}

