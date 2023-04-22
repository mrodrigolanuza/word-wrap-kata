/*
Value object para el primitivo 'columnWidth'
- Un value object es un objeto que no es una entidad (no tiene Id) y no se persiste.
- Contiene un primitivo, el cual será inmutable, con lo que no se podrá acceder a él.
*/
export class ColumnWidth{
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
export class WrappableText{
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