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
    });
});

//Secuencia de prioridad de transformación: 2 >> De nulo a devolver un literal
function wordWrap(text: string, columnWidth: number): any {
    return 'hello';
}

