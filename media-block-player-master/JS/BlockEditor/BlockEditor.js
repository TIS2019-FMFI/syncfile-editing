class BlockEditor {
    constructor(ScriptFileData, SyncFileData = null) {

        this.blocks = [];
        ScriptFileDataAsArray = ScriptFileData.split("|");

        //
        //Initializing blocks from existing ScriptFile.
        //
        for (var i = 0; i < ScriptFileDataAsArray.length; i++) {
            block = new Block(ScriptFileDataAsArray[i].trim());
            this.blocks.push(block);
        }

        this.currentBlockIndex = 0;
        this.SyncFileData = SyncFileData;

        //
        //Configuring time from existing SyncFileData.  
        //
        if (!SyncFileData == null){
            times = SyncFileData["blocks"].concat(SyncFileData["skips"]);
            for (var i = 0; i < times.length; i++) {
                if (initSkipped(times[i])){
                    insertSkippedBlock(time);
                }
                else{
                    this.blocks[i].setTime(times[i]);
                }
            }        
        }
    }


    //
    //Is skipped in SyncFileData for initialize skipped blocks.
    //
    initSkipped(time){
        if (this.SyncFileData["skips"].includes(time)){
            return true;
        }
        return false;
    }


    //
    //Indexes
    //
    seleftFirstBlock(){
        this.currentBlockIndex = 0;
    }

    selectNextBlock(){
        if (this.currentBlockIndex+1 < this.blocks.length){
        this.currentBlockIndex++;
        }
    }

    selectPreviousBlock(){
        if (this.currentBlockIndex > 0){
        this.currentBlockIndex--;
        }
    }

    getCurrentBlockIndex(){
        return this.currentBlockIndex;
    }
    

    //
    //Time
    //
    setTimeToSelectedBlock(time){
        this.blocks[this.currentBlockIndex].setTime(time);
    }

    getTimeOfSelectedBlock(){
        return this.blocks[this.currentBlockIndex].getTime();
    }

    getTimeOfPreviousBlock(){
        if (this.currentBlockIndex > 0){
            return this.blocks[this.currentBlockIndex-1].getTime();
        }
        else{
            return "0.00"; 
        }
    }


    //
    //Text
    //
    getTextOfSelectedBlock(){
        return this.blocks[this.currentBlockIndex].getText();
    }

    getTextOfAllBlocks() {
        resText = [];
        for (var i = 0; i < this.blocks.length; i++) {
            if (currentBlock.isSkipped()){
                resText.push("<Skipped>")
            }
            else{
                resText.push(this.blocks[i].getText());
            }
        }
        return resText.join(" | ");
    }

    getScriptFileData(){
        scriptFileOutput = [];
        for (var i = 0; i < this.blocks.length; i++) {
            currentBlock = this.blocks[i];
            if (!currentBlock.isSkipped()){
                scriptFileOutput.push(currentBlock);
            }
        }
        return scriptFileOutput.join(" | \n");
    }

    getSyncFileData(){
        blocks = [];
        skips = [];
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].isSkipped()){
                skips.push(this.blocks[i]);
            }
            else{
                blocks.push(this.blocks[i]);
            }
        }
        return {"blocks" : blocks, "skips" : skips};
    }


    //
    //Skipped
    //
    insertSkippedBlock(){
        skiped = new Block();
        this.blocks.splice(this.currentBlockIndex+1, 0, skiped);
    }

    insertSkippedBlock(time){
        skiped = new Block(null,time);
        this.blocks.splice(this.currentBlockIndex+1, 0, skiped);
    }

    removeSkippedBlock(){                                                       //TODO čo ak skipped nie je?
        if (this.block[this.currentBlockIndex].isSkipped()){
            this.blocks.splice(this.currentBlockIndex, 1);        
        }
    }

    isSelectedBlockSkipped(){
        return this.blocks[this.currentBlockIndex].isSkipped();
    }


    //
    //Edit
    //
    splitSelectedBlock(text1, text2){
        this.blocks.splice(this.currentBlockIndex, 1);
        this.blocks.splice(this.currentBlockIndex, 0, new Block(text1));
        this.blocks.splice(this.currentBlockIndex+1, 0, new Block(text2));

    }

        //TODO čo ak je ďalší skipped tiež by bolo možno dobré vyhodiť chybu.

    mergeSelectedBlockWithNextBlock(){
        if (!this.blocks.length >= this.currentBlockIndex){
            text1 = this.blocks[this.currentBlockIndex].getText();
            text2 = this.blocks[this.currentBlockIndex+1].getText();
            newBlock = new Block(text1.concat(" ", text2))

            this.blocks.splice(this.currentBlockIndex, 2);
            this.blocks.splice(this.currentBlockIndex, 0, newBlock);
        } 
        else{
            exception = "Nemáš ďalší block"; //TODO
        }
    }
}
