/// Class for creating synchornization file
class SyncFileEditViewController extends ViewController {

    constructor() {
        super();
        
        this.syncFileEditorData;

    }

    renderHtml(html) {
        // TODO: upravit, issue14
        const htmlView = `
            <section id="SyncFileCreateViewController" class="container">
				<div class = "my" id="div">
                    <textarea id="text" readonly>
					</textarea>
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
        //this.actualBlockText = $('#actual-text');
        this.text = $('#text');
        this.playPauseIcon = $('#play-pause-icon');

        // Inputs
        //this.backwardSpeedInput = $('#backward-speed');
        //this.forwardSpeedInput = $('#forward-speed');
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
		console.log(this.nextBlockButton);


        //this.playActualBlockButton = $('#play-actual-block-button');
        //this.skipBlockButton = $('#skip-block-button');
        //this.nextBlockButton = $('#next-block-button');
    }

    setupEventListeners() {
        // TODO: po uprave html vytvorit nove listeners
        /*
        this.playPauseButtonClicked = this.playPauseButtonClicked.bind(this);
        this.backwardButtonClicked = this.backwardButtonClicked.bind(this);
        this.forwardButtonClicked = this.forwardButtonClicked.bind(this);
        this.playActualButtonClicked = this.playActualButtonClicked.bind(this);
        this.skipBlockButtonClicked = this.skipBlockButtonClicked.bind(this);
        this.nextBlockButtonClicked = this.nextBlockButtonClicked.bind(this);
        this.audioReachedEnd = this.audioReachedEnd.bind(this);

        this.playPauseButton.on('click', this.playPauseButtonClicked);
        this.backwardButton.on('click', this.backwardButtonClicked);
        this.forwardButton.on('click', this.forwardButtonClicked);
        this.playActualBlockButton.on('click', this.playActualButtonClicked);
        this.skipBlockButton.on('click', this.skipBlockButtonClicked);
        this.nextBlockButton.on('click', this.nextBlockButtonClicked);
        this.sound.on('end', this.audioReachedEnd);
        */

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
        //this.sound.on('end', this.audioReachedEnd);

    }

    viewDidLoad() {
        // TODO: skontrolovat ako a kde sa funckia vola a ci je ju treba upravit
        //this.actualBlockText.text( this.blocks[this.textBlockIndex] );

        //this.text.val(this.syncFileEditorData.getTextOfAllBlocks().join(" | ")); 
		this.highlight();
    }

	highlight(){	
		var textarea = '';
		var result = '';
		var actual = '';
		var blocks = this.syncFileEditorData.getTextOfAllBlocks();
		for (let i = 0; i < blocks.length; i++) {
			if (this.syncFileEditorData.blocksEditor.getCurrentBlockIndex() == i){
				actual =  blocks[i]
				textarea = textarea.concat(actual.fontcolor("green"));
				//textarea += '<span style="background-color: #ffcc99">' + blocks[i] + '</span>';
				
			}
			else{
				textarea = textarea.concat(blocks[i]);
			}
		}
		
		this.text.val(textarea);
	}

    presentNextController() {
        // TODO: upravit predavanie dat cez SyncFileEditorData triedy
		
        const syncFileDownloadViewController = new SyncFileDownloadViewController();
        syncFileDownloadViewController.fileName = this.fileName;
        syncFileDownloadViewController.blocksEndTimes = this.blocksEndTimes;
        syncFileDownloadViewController.skipBlock = this.skipBlock;
        this.navigationController.present(syncFileDownloadViewController);
		
	
    }

    // Private Methods

    playPauseButtonClicked() {
        // TODO: implementovat
        if (this.syncFileEditorData.audioIsPlaying()) {
            this.syncFileEditorData.pauseAudio();
            this.playPauseIcon.text('play_circle_outline');
        } else {
            this.syncFileEditorData.playAudio();
            this.playPauseIcon.text('pause_circle_outline');
        }
    }

    backwardButtonClicked() {
        // TODO: implementovat
    }

    forwardButtonClicked() {
        // TODO: implementovat
    }

    replayButtonClicked() {
        this.syncFileEditorData.playSelectedBlock();
    }

    acceptButtonClicked() {
        // TODO: implementovat
    }

    addSkipButtonClicked() {
        // TODO: implementovat
    }

    removeSkipButtonClicked() {
        // TODO: implementovat
    }

    previousBlockButtonClicked() {
        this.syncFileEditorData.selectPreviousBlock();
		this.highlight();
    }

    nextBlockButtonClicked() {
        this.syncFileEditorData.selectNextBlock();
		this.highlight();
    }

    editBlockButtonClicked() {
		
		const editBlockViewController = new EditBlockViewController();

        editBlockViewController.syncFileEditorData = this.syncFileEditorData;

        this.navigationController.present(editBlockViewController);


    }

    saveExitButtonClicked() {
        // TODO: implementovat
    }
}