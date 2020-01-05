/// Class for creating synchornization file
class SyncFileEditViewController extends ViewController {

    constructor() {
        super();
        
        this.syncFileEditorData;
        this.accepted = false;
        this.time1 = "0.00";
        this.time2 = "0.00";
    }

    renderHtml(html) {
        // TODO: upravit, issue14
        const htmlView = `
            <section id="SyncFileCreateViewController" class="container">
				<div class = "my" id="block-area">
                    <div id="text" style="overflow-y: scroll; border: 1px solid black; padding: 10px; height: 100%">
					</div>
				</div>


				<div class = "my2">
				    <a class="btn m-lr-10" id="play-pause-button"><i id="play-pause-icon" class="material-icons">play_circle_outline</i></a>
                    <a class="btn m-lr-10" id="backward-button"><i class="material-icons">fast_rewind</i></a>
					<input class="w-45 m-lr-10" id="speed" type="number" min="0.1" max="10" step="0.1" value="0.3">
                    <a class="btn m-lr-10" id="forward-button"><i class="material-icons">fast_forward</i></a>                    
				</div>


				<div class = "my2">
					<a id="accept" class="btn m-lr-10">Accept</a>
                    <a id="replay" class="btn"><i class="material-icons center">replay</i></a>              
				</div>


				<div class = "my2">
					<a id="skip-block" class="btn m-lr-10">SKIP interval</a>
					<a id="remove-skipped-interval" class="btn m-lr-10">Remove Skipped Interval</a>
				</div>


				<div class = "my2">
					<a id="edit-blok" class="btn m-lr-10">Edit Block</a>
					<a id="save-exit" class="btn m-lr-10">Save & Exit</a>
				</div>


				<div class="my2">
                    <a class="btn-small right" href="index.html">Back to my menu</a>
                </div>


				<div class = "my3">
					<a id="previous-block-button" class="btn m-lr-10"><-</a>
					<a id="next-block-button" class="btn m-lr-10">-></a>
				</div>

            </section>

        `;
        super.renderHtml(htmlView);
    }

    setupProperties() {
        // TODO: po uprave html vytvorit nove properties
        
        // Labels
        this.audioFileNameInput = $('#audio-file');	       
        this.scriptFileNameInput = $('script-file');	        
        this.fileNameLabel = $('#file-name-label');
        this.syncFileNameInput = $('#sync-file');	        
        this.fileLinkDownload = $('#file-download');
        this.saveButton = $('#save');	
        this.unsaveButton = $('#unsave');	
        this.backButton = $('#back');
        this.text = $('#text');
        this.playPauseIcon = $('#play-pause-icon');

        // Inputs
        this.speed = $('#speed');

        // Actions
        this.playPauseButton = $('#play-pause-button');
        this.backwardButton = $('#backward-button');
        this.forwardButton = $('#forward-button');
        this.accept = $('#accept');
        this.replay = $('#replay')
        this.skipBlock = $('#skip-block');
        this.removeInterval = $('#remove-skipped-interval');
        this.editBlock = $('#edit-blok');
        this.saveExit = $('#save-exit');
        this.nextBlockButton = $('#next-block-button');
        this.previousBlockButton = $('#previous-block-button');
    }

    setupEventListeners() {
        // TODO: po uprave html vytvorit nove listeners
        this.playPauseButtonClicked = this.playPauseButtonClicked.bind(this);
        this.backwardButtonClicked = this.backwardButtonClicked.bind(this);
        this.forwardButtonClicked = this.forwardButtonClicked.bind(this);
        this.acceptButtonClicked = this.acceptButtonClicked.bind(this);
        this.replayButtonClicked = this.replayButtonClicked.bind(this);
        this.addSkipButtonClicked = this.addSkipButtonClicked.bind(this);
        this.removeSkipButtonClicked = this.removeSkipButtonClicked.bind(this);
        this.editBlockButtonClicked = this.editBlockButtonClicked.bind(this);
        this.saveExitButtonClicked = this.saveExitButtonClicked.bind(this);
        this.nextBlockButtonClicked = this.nextBlockButtonClicked.bind(this);
        this.previousBlockButtonClicked = this.previousBlockButtonClicked.bind(this);
        this.saveButtonClicked = this.saveButtonClicked.bind(this);	
        this.unsaveButtonClicked = this.unsaveButtonClicked.bind(this);	
        this.backButtonClicked = this.backButtonClicked.bind(this);

        this.playPauseButton.on('click', this.playPauseButtonClicked);
        this.backwardButton.on('click', this.backwardButtonClicked);
        this.forwardButton.on('click', this.forwardButtonClicked);
        this.accept.on('click', this.acceptButtonClicked);
        this.replay.on('click', this.replayButtonClicked);
        this.skipBlock.on('click', this.addSkipButtonClicked);
        this.removeInterval.on('click', this.removeSkipButtonClicked);
        this.editBlock.on('click', this.editBlockButtonClicked);
        this.saveExit.on('click', this.saveExitButtonClicked);
        this.nextBlockButton.on('click', this.nextBlockButtonClicked);
        this.previousBlockButton.on('click', this.previousBlockButtonClicked);
        this.saveButton.on('click', this.saveButtonClicked);	
        this.unsaveButton.on('click', this.unsaveButtonClicked);	
        this.backButton.on('click', this.backButtonClicked);
    }

    viewDidLoad() {
        // TODO: skontrolovat ako a kde sa funckia vola a ci je ju treba upravit
        //this.actualBlockText.text( this.blocks[this.textBlockIndex] );
		this.highlight();
    }

	highlight(){	
		var textarea = '';
		var blocks = this.syncFileEditorData.getTextOfAllBlocks();
		for (let i = 0; i < blocks.length; i++) {
			if (this.syncFileEditorData.blocksEditor.getCurrentBlockIndex() == i){
                textarea = textarea.concat("<span id='current-block' style='background-color: yellow;'>" + blocks[i] + "</span>");
			}
			else{
                textarea = textarea.concat(blocks[i]);
            }
            
            if (i !== blocks.length - 1){
                textarea = textarea.concat(" | ");
            } 

		}
        this.text.html(textarea);
        this.scrollContainer()
    }
    
    scrollContainer() {

        var container = $("#text");
        var currentBlock = $("#current-block");
        if (currentBlock.position().top > container.height()/ 2){
            container.scrollTop(container.scrollTop() + currentBlock.position().top/2);
        }
        else if( currentBlock.position().top < container.height()/ 5){
            container.scrollTop(container.scrollTop() -  50);
        }
    }

    presentNextController() {
        // TODO: upravit predavanie dat cez SyncFileEditorData triedy
        const syncFileDownloadViewController = new SyncFileDownloadViewController();
        syncFileDownloadViewController.syncFileEditorData = this.syncFileEditorData;
        this.navigationController.present(syncFileDownloadViewController);
    }

    // Private Methods

    playPauseButtonClicked() {
        try{
            if (this.time1 == null){ //blok pred nema cas znacku 
                throw "Cant play";     
			}
            if (this.syncFileEditorData.audioIsPlaying()) {
                this.syncFileEditorData.pauseAudio();
                this.playPauseIcon.text('play_circle_outline');
                this.disableButtons();
                if (this.syncFileEditorData.currentTime() < this.syncFileEditorData.getTimeOfNextBlock() || this.syncFileEditorData.getTimeOfNextBlock() == null){  //ak pri prehravani prejde do dalsieho bloku
                    this.time2 = this.syncFileEditorData.currentTime();
			    }else{
                    throw "Next Block";     
				}
                
                
            } else {
                this.syncFileEditorData.rewindAudioToTime(this.time1);
                this.syncFileEditorData.playAudio();
                this.playPauseIcon.text('pause_circle_outline');
                this.enableButtons();

            }
        }catch(error){
            console.error(error);
            alert(error);
		}
    }

    backwardButtonClicked() {
        
        try{
            if (this.time2 == "0.00"){ //ak stlaci pred nastavenim bloku
                throw "Not time set";  
		    }else{
                if (this.syncFileEditorData.getTimeOfPrevBlock() < this.time2 - this.speed.val()){ //ak by presiel do dalsieho bloku
                    this.time2 = this.time2 - this.speed.val();
			    }else{
                    throw "Previous Block";     
			    }
            }
		}catch(error){
            console.error(error);
            alert(error);        
		}
    }

    forwardButtonClicked() {
        try{
            if (this.time2 == "0.00"){ //ak stlaci pred nastavenim bloku
                throw "Not time set";  
		    }else{
                if (this.syncFileEditorData.getTimeOfNextBlock() > this.time2 - (-this.speed.val()) || this.syncFileEditorData.getTimeOfNextBlock() == null){ //ak by presiel do dalsieho bloku
                    this.time2 = this.time2 - (-this.speed.val());
			    }else{
                    throw "Next Block";     
			    }
            }    
		}catch(error){
            console.error(error);
            alert(error);        
		}
    }

    replayButtonClicked() {
        this.playPauseIcon.text('play_circle_outline');
        
        if (this.time2 != "0.00"){ //ak chce v procese
            this.syncFileEditorData.playInterval(this.time1, this.time2);
		}else{ //nastaveny blok
            this.syncFileEditorData.playSelectedBlock();
		}
        //prehraj aktualny blok, bud uz zadany alebo este v procese
        console.log(this.time1, this.time2);
    }


    acceptButtonClicked() {
        try{
            if (this.time2 == "0.00"){
                throw "Not time set";  
		    }else{
                if (this.time2 < this.syncFileEditorData.getTimeOfNextBlock() || this.syncFileEditorData.getTimeOfNextBlock() == null){ //prekrocili sme do dalsieho bloku
                this.syncFileEditorData.setTimeToBlock(this.time2);
                this.syncFileEditorData.selectNextBlock();
                this.check();
                }else{
                    throw "Next Block";        
				}
            }
        }catch(error){
            console.error(error);
            alert(error);        
		}
        //uloz dany blok
    }

    addSkipButtonClicked() {
        this.syncFileEditorData.insertSkippedBlock();
        this.highlight();
    }

    removeSkipButtonClicked() {
        this.syncFileEditorData.removeSkippedBlock();
        this.highlight();
    }

    previousBlockButtonClicked() {
        
        this.syncFileEditorData.selectPreviousBlock();
        this.check();
    }

    nextBlockButtonClicked() {
        
        this.syncFileEditorData.selectNextBlock();
        this.check();
        
    }

    editBlockButtonClicked() {
		const editBlockViewController = new EditBlockViewController();
        editBlockViewController.syncFileEditorData = this.syncFileEditorData;
        this.navigationController.present(editBlockViewController);
    }

    saveExitButtonClicked() {
       this.presentNextController();
    }

    disableButtons(){
            this.accept.removeClass("disabled");
            this.replay.removeClass("disabled");
            this.backwardButton.removeClass("disabled");
            this.forwardButton.removeClass("disabled");
            this.skipBlock.removeClass("disabled");
            this.removeInterval.removeClass("disabled");
            this.editBlock.removeClass("disabled");
            this.saveExit.removeClass("disabled");
            this.nextBlockButton.removeClass("disabled");
            this.previousBlockButton.removeClass("disabled");
	}

    enableButtons(){
            this.accept.addClass("disabled");
            this.replay.addClass("disabled");
            this.backwardButton.addClass("disabled");
            this.forwardButton.addClass("disabled");
            this.skipBlock.addClass("disabled");
            this.removeInterval.addClass("disabled");
            this.editBlock.addClass("disabled");
            this.saveExit.addClass("disabled");
            this.nextBlockButton.addClass("disabled");
            this.previousBlockButton.addClass("disabled");
	}

    check(){
		if (this.syncFileEditorData.getTimeOfBlock() == null){
            this.replay.addClass("disabled");
            this.backwardButton.addClass("disabled");
            this.forwardButton.addClass("disabled");
            this.accept.addClass("disabled");
            this.time1 = this.syncFileEditorData.getTimeOfPrevBlock();
            this.time2 = "0.00";
        }else{
            this.replay.removeClass("disabled");
            this.backwardButton.removeClass("disabled");
            this.forwardButton.removeClass("disabled");
            this.accept.removeClass("disabled");
            this.time1 = this.syncFileEditorData.getTimeOfPrevBlock();
            this.time2 = this.syncFileEditorData.getTimeOfBlock();
		}
        this.highlight();
	}
}