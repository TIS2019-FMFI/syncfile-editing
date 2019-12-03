class Block {
    constructor(text = null, time = null) {
        this.text = text;
        this.time = time;
        //console.log(this.text,this.time);
    }


    setTime(time) {
        this.time = time;
    }

    getTime() {
        return this.time;
    }

    setText(text) {
        this.text = text;
    }

    getText(){
        return this.text;
    }

    isSkipped(){
        if (text == null){
            return true;
        }
        else{
            return false;
        }
    }


}
