import { ColumnWidth, WrappableText } from "../core/wordWrap";

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
        expect(() => WrappableText.create('hello').wordWrap(ColumnWidth.create(0))).toThrow('Only numbers greater than zero are allowed');
    });
});

