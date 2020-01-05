class BlockEditor {
    constructor(ScriptFileData, SyncFileData = null) {
        this.ScriptFileData = ScriptFileData;
        this.SyncFileData = SyncFileData;
        this.blocks = [];
        this.currentBlockIndex = 0;
        this.scriptFileEdited = false;
		this.init();
    }

    init(){
        this.initBlocks();
        this.initBlocksTime();
    }

    initBlocks(){
        if ((/\|+\|+/).test(this.ScriptFileData)){
            alert("You have multiple pipelines in text we will replace them with one.");
        }
        var ScriptFileDataAsArray = this.ScriptFileData.replace(/\|+\|+/g, "|").split("|");

        for (var i = 0; i < ScriptFileDataAsArray.length; i++) {
            var block = new Block(ScriptFileDataAsArray[i].trim());
            this.blocks.push(block);
			
        }
    }

    initBlocksTime(){
        if (!(this.SyncFileData == null)){
            var times = this.SyncFileData["blocks"].concat(this.SyncFileData["skips"]);
            times.sort(function(a,b) { return a - b;});

            for (var i = 0; i < times.length; i++) {
                if (this.SyncFileData["skips"].includes(times[i])){
                    this.insertSkippedBlock(i, times[i]);
                }
                else{
                    this.blocks[i].setTime(times[i]);
                }
            }        
        }
    }


    //
    //Indexes
    //
    selectFirstBlock(){
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

    getTimeOfNextBlock(){
        if (this.currentBlockIndex+1 < this.blocks.length){
            return this.blocks[this.currentBlockIndex+1].getTime();
        }
        else{
            return null; 
        }
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

    setTextOfSelectedBlock(txt){
        this.scriptFileEdited = true;
        this.blocks[this.currentBlockIndex].setText(txt);
    }

    getTextOfAllBlocks() {
        var resText = [];
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].isSkipped()){
                resText.push("&lt;Skipped&gt;"); 
            }
            else{
                resText.push(this.blocks[i].getText());
            }
        }
        return resText
    }

    getScriptFileData(){
        var scriptFileOutput = [];
        for (var i = 0; i < this.blocks.length; i++) {
            var currentBlock = this.blocks[i];
            if (!currentBlock.isSkipped()){
                scriptFileOutput.push(currentBlock.getText());
            }
        }
        return scriptFileOutput.join(" | \n");
    }

    getSyncFileData(){
        var blocks = [];
        var skips = [];
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].isSkipped()){
                skips.push(this.blocks[i].getTime());
            }
            else{
                blocks.push(this.blocks[i].getTime());
            }
        }
        return {"blocks" : blocks, "skips" : skips};
    }


    //
    //Skipped Intervals
    //
    insertSkippedBlock(index = this.currentBlockIndex, time = null){
        var skipped = new Block(null,time);
        this.blocks.splice(index, 0, skipped);
    }

    removeSkippedBlock(){
        if (this.blocks[this.currentBlockIndex].isSkipped()){
            this.blocks.splice(this.currentBlockIndex, 1);        
        }
        else{
            throw "This block is not skipped interval.";
        }
    }

    isSelectedBlockSkipped(){
        return this.blocks[this.currentBlockIndex].isSkipped();
    }


    //
    //Merge/Split Block
    //
    splitSelectedBlock(text1, text2){
        this.scriptFileEdited = true;
        this.blocks.splice(this.currentBlockIndex, 1);
        this.blocks.splice(this.currentBlockIndex, 0, new Block(text1));
        this.blocks.splice(this.currentBlockIndex+1, 0, new Block(text2));

    }

    mergeSelectedBlockWithNextBlock(){
        this.scriptFileEdited = true;
        if (!this.blocks.length >= this.currentBlockIndex){
            if(this.isSelectedBlockSkipped()){
                throw "You cannot merge skipped interval.";
            }
            if(this.blocks[this.currentBlockIndex+1].isSkipped()){
                throw "Next block is skipped, you cannot merge block with skipped interval.";
            }
            var text1 = this.blocks[this.currentBlockIndex].getText();
            var text2 = this.blocks[this.currentBlockIndex+1].getText();
            var newBlock = new Block(text1.concat(" ", text2))

            this.blocks.splice(this.currentBlockIndex, this.currentBlockIndex+2);
            this.blocks.splice(this.currentBlockIndex, 0, newBlock);
        } 
        else{
            throw "Next block doesn´t exist.";
        }
    }


    mergeIsPossible(){
        this.scriptFileEdited = true;
        if (!this.blocks.length >= this.currentBlockIndex){
            if(this.isSelectedBlockSkipped()){
                throw "You cannot merge skipped interval.";
            }
            if(this.blocks[this.currentBlockIndex+1].isSkipped()){
                throw "Next block is skipped, you cannot merge block with skipped interval.";
            }
            return this.blocks[this.currentBlockIndex+1].getText();
        } 
        else{
            throw "Next block doesn´t exist.";
        }
    }

    getScriptFileEdited() {	
        return this.scriptFileEdited;	
    } 
}