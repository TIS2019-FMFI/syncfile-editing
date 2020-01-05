class SyncFileEditorData {

    constructor(audioFile, scriptFileData, syncFileData) {
        //subory
        this.audioFile = audioFile;
        this.scriptFileData = scriptFileData;
        this.syncFileData = syncFileData;

        //audio player a blockEditor
        this.audioPlayer = new AudioPlayer(audioFile);
        this.blocksEditor = new BlockEditor(this.scriptFileData, this.syncFileData);

        //nazvy suborov - stringy
        this.audioFileName;
        this.scriptFileName;
        this.syncFileName;
        }

    selectFirstBlock() {
        this.blocksEditor.selectFirstBlock();
    }

    selectNextBlock() {
        this.blocksEditor.selectNextBlock();
    }

    selectPreviousBlock() {
        this.blocksEditor.selectPreviousBlock();
    }

    setTimeToSelectedBlock() {
        this.blocksEditor.setTimeToSelectedBlock(this.audioPlayer.getCurrentTime());
    }

    setTimeToBlock(time){
        this.blocksEditor.setTimeToSelectedBlock(time);
	}

    getTimeOfBlock(){
        return this.blocksEditor.getTimeOfSelectedBlock();
	}

    getTimeOfPrevBlock(){
        return this.blocksEditor.getTimeOfPreviousBlock();
	}

    getTimeOfNextBlock(){
        return this.blocksEditor.getTimeOfNextBlock();
	}



    currentTime(){
        return this.audioPlayer.getCurrentTime();
	}

    currentIndex(){
        return this.blocksEditor.getCurrentBlockIndex();
	}

    playInterval(time1, time2){
        this.audioPlayer.playInterval(time1, time2);
	}

    isSelectedBlockSkipped() {
        return this.blocksEditor.isSelectedBlockSkipped();
    }

    playSelectedBlock() {
        var time1;
		var time2;
		if(!this.blocksEditor.isSelectedBlockSkipped()){
			if(this.blocksEditor.getCurrentBlockIndex() == 0) {
				time1 = "0";
				time2 = this.blocksEditor.getTimeOfSelectedBlock();
			}
			else if (this.blocksEditor.getCurrentBlockIndex() == this.blocksEditor.blocks.length){
				time1 = this.blocksEditor.getTimeOfPreviousBlock();
				time2 = this.blocksEditor.getTimeOfSelectedBlock(); // TO DO aky cas ked je na poslednom bloku
				
			}
			else{
				time1 = this.blocksEditor.getTimeOfPreviousBlock();
				time2 = this.blocksEditor.getTimeOfSelectedBlock();
			}
			console.log(time1, time2);
			this.audioPlayer.playInterval(time1, time2);
		}
    }

    getScriptFileData() {
        return this.blocksEditor.getScriptFileData();
    }

    getSyncFileData() {
        return this.blocksEditor.getSyncFileData();
    }

    getTextOfSelectedBlock() {
        return this.blocksEditor.getTextOfSelectedBlock();
    }
	
	setTextOfSelectedBlock(txt) {
        this.blocksEditor.setTextOfSelectedBlock(txt);
    }


    getTextOfAllBlocks() {
        return this.blocksEditor.getTextOfAllBlocks();
    }

    insertSkippedBlock() {
        this.blocksEditor.insertSkippedBlock();
    }

    removeSkippedBlock() {
        this.blocksEditor.removeSkippedBlock();
    }

    splitSelectedBlock(text1, text2) {
        this.blocksEditor.splitSelectedBlock(text1, text2);
    }

    mergeSelectedBlockWithNextBlock() {
        this.blocksEditor.mergeSelectedBlockWithNextBlock();
    }
	
	mergeIsPossible() {
        return this.blocksEditor.mergeIsPossible();
    }

    playAudio() {
        this.audioPlayer.playAudio();
    }
	
	audioIsPlaying(){
		return  this.audioPlayer.audioIsPlaying();
	}

    stopAudio() {
        this.audioPlayer.stopAudio();
    }

    pauseAudio() {
        this.audioPlayer.pauseAudio();
    }

    rewindAudioToStartOfBlock() {
        var time = this.blocksEditor.getTimeOfSelectedBlock();
        this.audioPlayer.rewindAudioTo(time);
    }

    rewindAudioToTime(time){
        this.audioPlayer.rewindAudioTo(time);
	}

    rewindAudioToStartOfDocument() {
        this.audioPlayer.rewindAudioToZero();
    }

    getScriptFileName() {
        return scriptFileName;
    }

    getSyncFileName() {
        return syncFileName;
    }

    f() {
        console.log("Robk");
    }
}