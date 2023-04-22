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
        expect(WrappableText.create('').wordWrap(ColumnWidth.create(5))).toEqual({text: ''});
        expect(WrappableText.create(null).wordWrap(ColumnWidth.create(5))).toEqual({text: ''});
        expect(WrappableText.create(undefined).wordWrap(ColumnWidth.create(5))).toEqual({text: ''});
    });
    it("returns the same text when wrapping is not needed", ()=>{
         expect(WrappableText.create('hello').wordWrap(ColumnWidth.create(5))).toEqual({text: 'hello'});
    });
    it("returns a wrapped text when the text length is greater than the column width", ()=>{
        expect(WrappableText.create('longword').wordWrap(ColumnWidth.create(4))).toEqual({text: 'long\nword'});
        expect(WrappableText.create('reallylongword').wordWrap(ColumnWidth.create(4))).toEqual({text: 'real\nlylo\nngwo\nrd'});
    });
    it("returns a wrapped text using spaces for performing the wrapping process", ()=>{
        expect(WrappableText.create('abc def').wordWrap(ColumnWidth.create(4))).toEqual({text: 'abc\ndef'});
        expect(WrappableText.create('abc def ghi').wordWrap(ColumnWidth.create(4))).toEqual({text: 'abc\ndef\nghi'});
        expect(WrappableText.create('     abcdf').wordWrap(ColumnWidth.create(4))).toEqual({text: '\n\n\n\n\nabcd\nf'});
    });
    it("returns an exception when negative width column", ()=>{
        // expect(() => WrappableText.create(text).wordWrap(ColumnWidth.create(columnWidth))('hello', 0)).toThrow('Only numbers greater than zero are allowed');
    });
});

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

/*
Value object pare el primitivo 'text'
*/
class WrappableText{
    private constructor(private readonly text:string){}

    static create(text:string){
        if(text == null || text === undefined){
            return new WrappableText('');
        }
            
        return new WrappableText(text);
    }

    wordWrap(columnWidth: ColumnWidth): WrappableText {
        if(this.fitsIn(columnWidth)){
            return WrappableText.create(this.text);
        }
    
        const wrappedText = this.wrappedText(columnWidth);
        const unwrappedText = this.unwrappedText(columnWidth);
        return wrappedText.concat(WrappableText.create(unwrappedText.text).wordWrap(columnWidth));
    }

    private fitsIn(columnWidth: ColumnWidth):boolean{
        return this.text.length <= columnWidth.value();
    }

    private wrappedText(columnWidth: ColumnWidth){
        return WrappableText.create(this.text.substring(0, this.wrapIndex(columnWidth)).concat('\n'));
    }

    private unwrappedText(columnWidth: ColumnWidth){
        return WrappableText.create(this.text.substring(this.unwrapIndex(columnWidth)));
    }

    private concat(text:WrappableText ){
        return WrappableText.create(this.text.concat(text.text));
    }

    private wrapIndex(columnWidth: ColumnWidth) {
        return this.canWrapByWhiteSpace(columnWidth) ? this.indexOfSpace() 
                                                     : columnWidth.value();
    }

    private unwrapIndex(columnWidth: ColumnWidth) {
        return this.canWrapByWhiteSpace(columnWidth) ? this.indexOfSpace() + 1 
                                                     : columnWidth.value();
    }
    
    private indexOfSpace() {
        return this.text.indexOf(' ');
    }

    private canWrapByWhiteSpace(columnWidth: ColumnWidth) {
        return this.indexOfSpace() > -1 && this.indexOfSpace() < columnWidth.value();
    }
}