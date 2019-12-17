class syncFileEditorData{
	
	//to do konsruktory co dat do files ak nezadal sync/ script
	constructor(audioFile){
		//subory
		this.audioFile = audioFile;
		this.scriptFileData;
		this.syncFileData;
		
		//audio player a blockEditor
		this.audioPlayer = new AudioPlayer(audioFile);
		this.blocksEditor = new BlocksEditor();
		
		//nazvy suborov - stringy
		this.scriptFileName = '';
		this.syncFileName = '';
	}
	
	constructor(audioFile, scriptFileData){
		//subory
		this.audioFile = audioFile;
		this.scriptFileData = scriptFileData;
		this.syncFileData;
		
		//audio player a blockEditor
		this.audioPlayer = new AudioPlayer(audioFile);
		this.blocksEditor = new BlocksEditor(this.scriptFileData);
		
		//nazvy suborov - stringy
		this.scriptFileName = scriptFileData.name.split('.').slice(0, -1).join('.');
		this.syncFileName = '';
	}
	
	constructor(audioFile, scriptFileData, syncFileData){
		//subory
		this.audioFile = audioFile;
		this.scriptFileData = scriptFileData;
		this.syncFileData = syncFileData;
		
		//audio player a blockEditor
		this.audioPlayer = new AudioPlayer(audioFile);
		this.blocksEditor = new BlocksEditor(this.scriptFileData, this.syncFileData);
		
		//nazvy suborov - stringy
		this.scriptFileName = scriptFileData.name.split('.').slice(0, -1).join('.');
		this.syncFileName = syncFileData.name.split('.').slice(0, -1).join('.');	
	}
	
	function selectFirstBlock(){
		this.blocksEditor.selectFirstBlock();
	}
	
	function selectNextBlock(){
		this.blocksEditor.selectNextBlock();
	}
	
	function selectPreviousBlock(){
		this.blocksEditor.selectPreviousBlock();
	}
	
	function setTimeToSelectedBlock(){
		this.blocksEditor.setTimeToSelectedBlock(this.audioPlayer.getCurrentTime());
	}
	
	function isSelectedBlockSkipped(){
		return this.blocksEditor.isSelectedBlockSkipped();
	}
	
	function playSelectedBlock(){
		//to do ako sa mysli toto
		time1 = this.blocksEditor.getTimeOfPreviousBlock();
		time2 = this.blocksEditor.getTimeOfSelectedBlock();
		this.audioPlayer.playInterval(time1, time2);
	}
	
	function getScriptFileData(){
		return this.blocksEditor.getScriptFileData();
	}
	
	function getSyncFileData(){
		return this.blocksEditor.getSyncFileData();
	}
	
	function getTextOfSelectedBlock(){
		return this.blocksEditor.getTextOfSelectedBlock();
	}
	
	function getTextOfAllBlocks(){
		return this.blocksEditor.getTextOfAllBlocks();
	}
	
	function insertSkippedBlock(){
		this.blocksEditor.insertSkippedBlock();
	}
	
	function removeSkippedBlock(){
		this.blocksEditor.removeSkippedBlock();
	}
	
	function splitSelectedBlock(text1, text2){
		this.blocksEditor.splitSelectedBlock(text1, text2);
	}
	
	function mergeSelectedBlockWithNextBlock(){
		this.blocksEditor.mergeSelectedBlockWithNextBlock();
	}
	
	function playAudio(){
		this.audioPlayer.playAudio();
	}
	
	function stopAudio(){
		this.audioPlayer.stopAudio();
	}
	
	function pauseAudio(){
		this.audioPlayer.pauseAudio();
	}
	
	function rewindAudioToStartOfBlock(){
		time = this.blocksEditor.getTimeOfSelectedBlock();
		this.audioPlayer.rewindAudioTo(time);
	}
	
	function rewindAudioToStartOfDocument(){
		this.audioPlayer.rewindAudioToZero();
	}
	
	function getScriptFileName(){
		return scriptFileName;
	}
	
	function getSyncFileName(){
		return syncFileName;
	}
}