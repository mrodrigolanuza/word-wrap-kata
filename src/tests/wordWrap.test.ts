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
    it("returns empty string when wrapping is not possible", ()=>{
        expect(wordWrap('', 5)).toBe('');
        expect(wordWrap(null, 5)).toBe('');
        expect(wordWrap(undefined, 5)).toBe('');
    });
    it("returns the same text when wrapping is not needed", ()=>{
        expect(wordWrap('hello', 5)).toBe('hello');
    });
    it("returns a wrapped text when the text length is greater than the column width", ()=>{
        expect(wordWrap('longword', 4)).toBe('long\nword');
        expect(wordWrap('reallylongword',4)).toBe('real\nlylo\nngwo\nrd');
    });
    it("returns a wrapped text using spaces for performing the wrapping process", ()=>{
        expect(wordWrap('abc def',4)).toBe('abc\ndef');
        expect(wordWrap('abc def ghi',4)).toBe('abc\ndef\nghi');
        expect(wordWrap('     abcdf',4)).toBe('\n\n\n\n\nabcd\nf');
    });
    it("returns an exception when negative width column", ()=>{
        expect(() => wordWrap('hello', 0)).toThrow('Only numbers greater than zero are allowed');
    });
});

//Secuencia de prioridad de transformación: 9 >> Introducir recursión
function wordWrapOld(text: string, columnWidth: number): any {
    if(text === null || text === undefined)
        return '';
    
    if(text.length <= columnWidth)
        return text;
    
    if(columnWidth <= 0)
        throw new Error('Only numbers greater than zero are allowed');

    const wrapIndex = getWrapIndex(text, columnWidth);
    const unwrapIndex = getUnwrapIndex(text, columnWidth);
    const wrappedText = text.substring(0, wrapIndex).concat('\n');
    const unwrappedText = text.substring(unwrapIndex);
    return wrappedText.concat(wordWrapOld(unwrappedText, columnWidth));
}

function wordWrapNoPrimitives(text: string, columnWidth: ColumnWidth): any {
    if(text === null || text === undefined)
        return '';
    
    if(text.length <= columnWidth.value())
        return text;
    
    const wrapIndex = getWrapIndex(text, columnWidth.value());
    const unwrapIndex = getUnwrapIndex(text, columnWidth.value());
    const wrappedText = text.substring(0, wrapIndex).concat('\n');
    const unwrappedText = text.substring(unwrapIndex);
    return wrappedText.concat(wordWrapNoPrimitives(unwrappedText, columnWidth));
}

function wordWrap(text: string, columnWidth: number): any {
    return wordWrapNoPrimitives(text, ColumnWidth.create(columnWidth));
}

function getUnwrapIndex(text: string, columnWidth: number) {
    const indexOfWhiteSpace = text.indexOf(' ');
    const canWrapByWhiteSpace = indexOfWhiteSpace > -1 && indexOfWhiteSpace < columnWidth;
    return canWrapByWhiteSpace ? indexOfWhiteSpace + 1 : columnWidth;
}

function getWrapIndex(text: string, columnWidth: number) {
    const indexOfWhiteSpace = text.indexOf(' ');
    const canWrapByWhiteSpace = indexOfWhiteSpace > -1 && indexOfWhiteSpace < columnWidth;
    return canWrapByWhiteSpace ? indexOfWhiteSpace : columnWidth;
}

/*
Value object para el primitivo 'columnWidth'
- Un value object es un objeto que no es una entidad (no tiene Id) y no se persiste.
- Contiene un primitivo, el cual será inmutable, con lo que no se podrá acceder a él.
*/
class ColumnWidth{
    //Constructor privado
    private constructor(private readonly width: number){}

    //Método factoría
    static create(width:number){
        if(width <= 0){
            throw new Error('Only numbers greater than zero are allowed');
        }
        return new ColumnWidth(width)
    }

    value(){
        return this.width;
    }
}