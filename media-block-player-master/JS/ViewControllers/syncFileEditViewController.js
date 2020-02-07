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
        const htmlView = `
            <section id="SyncFileCreateViewController" class="container">
            <div class = "my" id="block-area">
            <div id="text" style="overflow-y: scroll; border: 1px solid black; padding: 10px; height: 100%">
            </div>
        </div>


				<div class = "my2">
				    <a class="btn m-lr-10" title="Play/Pause to set current block duration" id="play-pause-button"><i id="play-pause-icon" class="material-icons">play_circle_outline</i></a>
                    <a class="btn m-lr-10" id="backward-button" title="Reduce current block duration"><i class="material-icons">remove</i></a>
					<input class="w-45 m-lr-10" id="speed" type="number" min="0.1" max="10" step="0.1" value="0.3">
                    <a class="btn m-lr-10" id="forward-button" title="Increase current block duration"><i class="material-icons">add</i></a>                    
				</div>


				<div class = "my2">
					<a id="accept" class="btn m-lr-10"title="Accept current block and move to next">Accept</a>
                    <a id="replay" title="Replay current block" class="btn"><i class="material-icons center">replay</i></a>    
					<span id="block_duration"></span>
				</div>


				<div class = "my2">
					<a id="skip-block" class="btn m-lr-10" title="Skip this unwanted audio interval">SKIP interval</a>
					<a id="remove-skipped-interval" class="btn m-lr-10" title="Remove skipped interval">Remove Skipped Interval</a>
				</div>


				<div class = "my2">
					<a id="edit-blok" class="btn m-lr-10" title="Edit, split or merge block">Edit Block</a>
					<a id="save-exit" class="btn m-lr-10" title="Save SyncFile and Exit">Save & Exit</a>
				</div>


				<div class="my2">
                    <a id="back" class="btn-small right" href="index.html">Back to my menu</a>
                </div>
				

				<div class = "my3">
					<a id="previous-block-button" title="Move to previous block" class="btn m-lr-10"><-</a>
					<a id="next-block-button" title="Move to next block" class="btn m-lr-10">-></a>
				</div>
				
				
				
				<div class="row">
                    <div class="col s12">
                        <a id="help-button"class="btn-small right modal-trigger" href="#helpmodal">Help</a>
                    </div>
                    <div id="helpmodal" class="modal">
                        <div class="modal-content">
                            <h4>Edit block time-marks</h4>
                            <p>
							This page allows you to create or edit SyncFile with the list of text block time-marks and &ltSkipped&gt interval time-marks. Time-marks indicate the END of the respective interval with precision of 0.01 sec.<br><br>
In the left multiline read-only text field you see the Script file with text blocks separated by '|'.<br>
Blocks that already have set  time-marks are underlined. Current block/time interval is highlighted.<br>
Optionally you can see also the position of the &ltSkipped&gt  intervals with no speech or advertisement. These &ltSkipped&gt  tags are actually NOT part of the located or edited SCRIPT file . Nevertheless their time-marks are saved in SyncFile.<br><br>

[Play/Pause]: Starts to play audio of the current block or &ltSkipped&gt  interval. Hit [Pause] when you hear the end of the current text block. Before [ACCEPT]ing the time-mark you may:<br>
 
  --[REPLAY] the audio interval to check the correctness of block ending <br>
  --reduce [-] or increase [+] the time-mark by preset correction (default 0.30 sec that you may change).<br>

If time-mark is correct then hit [ACCEPT] and do the same for the next block.<br><br>

If audio contains irrelevant intervals (music only, silence or advertisement.) you may hit [SKIP INTERVAL] instead of [ACCEPT] to mark out this unwanted interval. On the other hand: you may also [REMOVE SKIPPED INTERVAL].<br><br>

If you wish to edit the SCRIPT file or split one text block into two or merge two blocks into one then hit [EDIT BLOCK] that moves you to the page "Edit, Split or Merge block".<br><br>

Buttons [<-] and [->] allow you to move to any text block. However be aware that you can set time-mark ONLY if all the previous blocks have time-marks set.<br><br>

[SAVE & EXIT]: moves you to the page "Save SyncFile, ScriptFile"<br>
[BACK TO MENU]: moves you to the MediaBlockPlayer main menu, nothing will be saved.<br>

							</p>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
                        </div>
                    </div>
                </div>

            </section>
        `;
        super.renderHtml(htmlView);
    }

    setupProperties() {
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
		this.helpButton = $('#help-button');
		this.backButton = $('#back');

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
    }

    viewDidLoad() {
        this.check();
		var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
		
		//this.syncFileEditorData.audioFile.on('end', function(){this.checkAudio();}.bind(this));
    }
	
	checkAudio(){
		this.syncFileEditorData.pauseAudio();
		this.playPauseIcon.text('play_circle_outline');
		this.disableButtons();
		this.time2 = this.syncFileEditorData.getDurationOfAllAudio(); 
		this.setBlockDuration();
	}

	highlight(){	
		var textarea = '';
		var blocks = this.syncFileEditorData.getTextOfAllBlocks();
		var blocksWithTime = this.syncFileEditorData.getAllBlocks();

		for (let i = 0; i < blocks.length; i++) {
		    if (this.syncFileEditorData.blocksEditor.getCurrentBlockIndex() == i) {
		        if (blocksWithTime[i].getTime() == undefined) {
		            textarea = textarea.concat("<span id='current-block' style='background-color: yellow;'>" + blocks[i] + "</span>");
		        } else {
		            textarea = textarea.concat("<span id='current-block' style='background-color: yellow;text-decoration: underline;'>" + blocks[i] + "</span>");
		        }
			}
			else{
				if(blocksWithTime[i].getTime() == undefined){
					textarea = textarea.concat(blocks[i]);
				}
				else{
					textarea = textarea.concat("<span style='text-decoration: underline;'>" + blocks[i] + "</span>");
				}
            }
            
            if (i !== blocks.length - 1){
                textarea = textarea.concat(" | ");
            } 

		}
        this.text.html(textarea);
        this.scrollContainer();
		this.unsetBlockDuration();
	}

	setBlockDuration(){
		var duration = this.time2 - this.time1;
		duration = Math.round(duration * 100) / 100
		var blockDuration =$('#block_duration').text("   Current block duration: " + duration.toString() + " s"); 

	}
	
	unsetBlockDuration(){
		var blockDuration = $('#block_duration').text(""); 

	}
	
    scrollContainer() {

        var container = $("#text");
        var currentBlock = $("#current-block");
        if (currentBlock.position().top > container.height()/ 2){
            container.scrollTop(container.scrollTop() + currentBlock.position().top/2);
        }
        else if( currentBlock.position().top < container.height() / 4){
            container.scrollTop(container.scrollTop() -  30);
        }
    }

    presentNextController() {
	const syncFileDownloadViewController = new SyncFileDownloadViewController();
        syncFileDownloadViewController.syncFileEditorData = this.syncFileEditorData;
        this.navigationController.present(syncFileDownloadViewController);
    }

	setTimes(){
		this.time1 =  this.syncFileEditorData.getTimeOfPrevBlock();
        this.time2 = this.syncFileEditorData.getTimeOfBlock();
	}

    // Private Methods

    playPauseButtonClicked() {
		this.syncFileEditorData.audioFile.on('end', function(){this.checkAudio();}.bind(this));
        try{
            if (this.time1 == null){ //blok pred nema cas znacku 
                throw "You need to set time of previous block";     
			}
            if (this.syncFileEditorData.audioIsPlaying()) {
                this.syncFileEditorData.pauseAudio();
                this.playPauseIcon.text('play_circle_outline');
                this.disableButtons();
                if (this.syncFileEditorData.currentTime() < this.syncFileEditorData.getTimeOfNextBlock() || this.syncFileEditorData.getTimeOfNextBlock() == null){  //ak pri prehravani prejde do dalsieho bloku
                    this.time2 = this.syncFileEditorData.currentTime();
			    }else{
				    this.check();
                    throw "You have passed through the next block";     
				}
                this.setBlockDuration();
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
                    if (!this.syncFileEditorData.isSelectedBlockSkipped()){
                       this.accept.removeClass("disabled");
					}
                    this.skipBlock.removeClass("disabled");
					this.setBlockDuration();

			    }else{
				    				this.check();
                    throw "You have passed previous Block";     
			    }
            }
		}catch(error){
            console.error(error);
            alert(error);        
		}
    }

    forwardButtonClicked() {
        try{
            if (this.syncFileEditorData.getTimeOfNextBlock() > this.time2 - (-this.speed.val()) || this.syncFileEditorData.getTimeOfNextBlock() == null){ //ak by presiel do dalsieho bloku
                this.time2 = this.time2 - (-this.speed.val());
                if (!this.syncFileEditorData.isSelectedBlockSkipped()){
                    this.accept.removeClass("disabled");
			    }
                this.skipBlock.removeClass("disabled");
				this.setBlockDuration();

			}else{
				this.check();
                throw "You have passed next Block";
			}
		}catch(error){
            console.error(error);
            alert(error);        
		}
    }

    replayButtonClicked() {
		this.syncFileEditorData.audioFile.off('end');
        this.playPauseIcon.text('play_circle_outline');
        
        if (this.time2 != "0.00"){ //ak chce v procese
            if(this.time1 == null){
                alert("You need to set time of previous block.");
            }
            else{
                this.syncFileEditorData.playInterval(this.time1, this.time2);
            }
		}else{ //nastaveny blok
            this.syncFileEditorData.playSelectedBlock();
		}
        //prehraj aktualny blok, bud uz zadany alebo este v procese
    }


    acceptButtonClicked() {
        try{
            if (this.time2 < this.syncFileEditorData.getTimeOfNextBlock() || this.syncFileEditorData.getTimeOfNextBlock() == null){ //prekrocili sme do dalsieho bloku
                this.syncFileEditorData.setTimeToBlock(this.time2);
                this.syncFileEditorData.selectNextBlock();
                this.check();
            }
            else {
                    throw "Next Block";        
				 }
        }catch(error){
            console.error(error);
            alert(error);        
		}
        //uloz dany blok
    }

    addSkipButtonClicked() {
        if (this.syncFileEditorData.isSelectedBlockSkipped()){
            this.syncFileEditorData.setTimeToBlock(this.time2);
        }else{
            this.syncFileEditorData.insertSkippedBlock(this.syncFileEditorData.currentIndex(), this.time2);
		}
       
        this.syncFileEditorData.selectNextBlock();
        this.check();
    }

    removeSkipButtonClicked() {
        this.syncFileEditorData.removeSkippedBlock();
        this.check();
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
		
		var blocks = this.syncFileEditorData.getAllBlocks();
		var actualIndex = this.syncFileEditorData.currentIndex();
		
		if(!blocks[actualIndex].isSkipped()){
			
			const editBlockViewController = new EditBlockViewController();

			editBlockViewController.syncFileEditorData = this.syncFileEditorData;

			this.navigationController.present(editBlockViewController);
		}
		else{
            alert("You cannot edit skipped block.");
		}

    }
    saveExitButtonClicked() {
        if (this.syncFileEditorData.blocksEditor.isSyncFileValid()) {
            this.presentNextController();
        } else {
            alert("You need continual set of time marks.");
        }
     }
 
     disableButtons(){
             this.skipBlock.removeClass("disabled");
             this.replay.removeClass("disabled");
             this.backwardButton.removeClass("disabled");
             this.forwardButton.removeClass("disabled");
             this.saveExit.removeClass("disabled");
             this.nextBlockButton.removeClass("disabled");
             this.previousBlockButton.removeClass("disabled");
			 this.helpButton.removeClass("disabled");
			 this.backButton.removeClass("disabled");
             if (!this.syncFileEditorData.isSelectedBlockSkipped()){
                this.accept.removeClass("disabled");
                this.editBlock.removeClass("disabled");
             }
             else{
                this.removeInterval.removeClass("disabled");
             }
     }
 
     enableButtons(){
             this.accept.addClass("disabled");
             this.removeInterval.addClass("disabled");
             this.replay.addClass("disabled");
             this.backwardButton.addClass("disabled");
             this.forwardButton.addClass("disabled");
             this.skipBlock.addClass("disabled");
             this.editBlock.addClass("disabled");
             this.saveExit.addClass("disabled");
             this.nextBlockButton.addClass("disabled");
             this.previousBlockButton.addClass("disabled");
			 this.helpButton.addClass("disabled");
			 this.backButton.addClass("disabled");
     }
 

     check() {
         if (this.syncFileEditorData.getTimeOfBlock() == null) {
             this.replay.addClass("disabled");
             this.backwardButton.addClass("disabled");
             this.forwardButton.addClass("disabled");
         }
         else {
             this.replay.removeClass("disabled");
             this.backwardButton.removeClass("disabled");
             this.forwardButton.removeClass("disabled");
         }
         if (!this.syncFileEditorData.isSelectedBlockSkipped()){
            this.editBlock.removeClass("disabled");
            this.removeInterval.addClass("disabled");
            this.skipBlock.removeClass("disabled");
		 }else{
            this.editBlock.addClass("disabled");
            this.removeInterval.removeClass("disabled");
            this.skipBlock.addClass("disabled");
		 }
         this.accept.addClass("disabled");
         this.skipBlock.addClass("disabled");
         this.time1 = this.syncFileEditorData.getTimeOfPrevBlock();
         this.time2 = this.syncFileEditorData.getTimeOfBlock();
         this.highlight();
     }
}
