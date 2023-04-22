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
    });
});

//Secuencia de prioridad de transformación: 4 >> De un valor literal a una variable
function wordWrap(text: string, columnWidth: number): any {
    if(text.length <= columnWidth)
        return text;

    const wrappedText = text.substring(0, columnWidth) + '\n';
    const unwrappedText = text.substring(columnWidth);
    return wrappedText + unwrappedText;
}

