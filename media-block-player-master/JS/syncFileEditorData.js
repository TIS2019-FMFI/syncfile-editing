class syncFileEditorData {

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
        this.syncFileData;
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

    isSelectedBlockSkipped() {
        return this.blocksEditor.isSelectedBlockSkipped();
    }

    playSelectedBlock() {
        //to do ako sa mysli toto
        time1 = this.blocksEditor.getTimeOfPreviousBlock();
        time2 = this.blocksEditor.getTimeOfSelectedBlock();
        this.audioPlayer.playInterval(time1, time2);
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

    playAudio() {
        this.audioPlayer.playAudio();
    }

    stopAudio() {
        this.audioPlayer.stopAudio();
    }

    pauseAudio() {
        this.audioPlayer.pauseAudio();
    }

    rewindAudioToStartOfBlock() {
        time = this.blocksEditor.getTimeOfSelectedBlock();
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