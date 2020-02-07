class BlockEditor {
    constructor(ScriptFileData, SyncFileData = null) {
        this.ScriptFileData = ScriptFileData;
        this.SyncFileData = SyncFileData;
        this.blocks = [];
        this.currentBlockIndex = 0;
		this.init();
        this.scriptFileEdited = false;
    }

    init(){
        this.initBlocks();
        this.initBlocksTime();
    }

    initBlocks(){
        var ScriptFileDataAsArray = this.ScriptFileData

        if ((/\|+\s*\|+/).test(ScriptFileDataAsArray)){
            alert("You have multiple pipelines in text we will replace them with one.");
            
            while ((/\|+\s*\|+/).test(ScriptFileDataAsArray)){
                ScriptFileDataAsArray = ScriptFileDataAsArray.replace(/\|+\s*\|+/g, "|");
            }
        }

        ScriptFileDataAsArray = ScriptFileDataAsArray.split("|");
        

        for (var i = 0; i < ScriptFileDataAsArray.length; i++) {
            var block = new Block(ScriptFileDataAsArray[i].trim());
            this.blocks.push(block);
        }
    }

    initBlocksTime(){
        if (!(this.SyncFileData == null)){
            var times = this.SyncFileData["blocks"];

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
	
	getAllBlocks() {
        return this.blocks;
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
            if (this.blocks[i].getTime() != null){
                var time = parseFloat(this.blocks[i].getTime()).toFixed(2);
                if (this.blocks[i].isSkipped()){
                    skips.push(time);
                    blocks.push(time);
                }
                else{
                    blocks.push(time);
                }
            }
        }

        return {"blocks" : blocks.map(Number), "skips" : skips.map(Number)};
    }

    isSyncFileValid(){
        var nullEvidence = false;

        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].getTime() == null && nullEvidence == false){
                nullEvidence = true;
            }
            else if (this.blocks[i].getTime() != null && nullEvidence == true){
                return false;
            }
        }
        return true;
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
        var time2 = this.blocks[this.currentBlockIndex].getTime();
        this.blocks.splice(this.currentBlockIndex, 1);
        this.blocks.splice(this.currentBlockIndex, 0, new Block(text1));
        this.blocks.splice(this.currentBlockIndex+1, 0, new Block(text2, time2));
    }

    mergeSelectedBlockWithNextBlock(){
        this.scriptFileEdited = true;
        var block1 = this.blocks[this.currentBlockIndex];
        var block2 = this.blocks[this.currentBlockIndex+1];
        var text = block1.getText().concat(" ", block2.getText());
        var newBlock = new Block(text, block2.getTime());

        this.blocks.splice(this.currentBlockIndex, 2);
        this.blocks.splice(this.currentBlockIndex, 0, newBlock);
    }


    mergeIsPossible(){
        this.scriptFileEdited = true;
        if (this.blocks.length - 1 > this.currentBlockIndex){
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
