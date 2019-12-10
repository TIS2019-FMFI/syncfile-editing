/// Class for creating synchornization file
class SyncFileEditViewController extends ViewController {

    constructor() {
        super();

        this.fileName;
        this.sound;
        this.playbackSound;
        this.blocks;

        this.blocksEndTimes = [] // End time of each block
        this.skipBlock = [] // End times of blocks marked as skipped
        this.textBlockIndex = 0; // Starting blocks array index
        this.actualSeek = 0; // Actual seek of audio
        this.creatingDone = false; // Last block was created
    }

    renderHtml(html) {
        // TODO: upravit, issue14
        const htmlView = `
            <section id="SyncFileCreateViewController" class="container">
				<div class = "my">
					<textarea id="actual-text" readonly>
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
					<a id="next-block-button" class="btn m-lr-10"><-</a>
					<a id="previous-block-button" class="btn m-lr-10">-></a>
				</div>
            </section>
        `;
        super.renderHtml(htmlView);
    }

    setupProperties() {
        // TODO: po uprave html vytvorit nove properties
        
        // Labels
        this.actualBlockText = $('#actual-text');
        this.playPauseIcon = $('#play-pause-icon');

        // Inputs
        this.backwardSpeedInput = $('#backward-speed');
        this.forwardSpeedInput = $('#forward-speed');

        // Actions
        this.playPauseButton = $('#play-pause-button');
        this.backwardButton = $('#backward-button');
        this.forwardButton = $('#forward-button');
        this.playActualBlockButton = $('#play-actual-block-button');
        this.skipBlockButton = $('#skip-block-button');
        this.nextBlockButton = $('#next-block-button');
    }

    setupEventListeners() {
        // TODO: po uprave html vytvorit nove listeners

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

        const jKey = 106;
        const kKey = 107;
        const lKey = 108;
        const mKey = 109;
        const nKey = 110;
        const sKey = 115;
        const self = this;

        $(window).keypress(function(event) {
            switch (event.which) {
                case jKey:
                    self.backwardButtonClicked();
                    break;
                case kKey:
                    self.playPauseButtonClicked();
                    break;
                case lKey:
                    self.forwardButtonClicked();
                    break;
                case mKey:
                    self.playActualButtonClicked();
                    break;
                case nKey:
                    self.nextBlockButtonClicked();
                    break;
                case sKey:
                    self.skipBlockButtonClicked();
                    break;
                default:
                    break;
            }
        });
    }

    viewDidLoad() {
        // TODO: skontrolovat ako a kde sa funckia vola a ci je ju treba upravit
        this.actualBlockText.text( this.blocks[this.textBlockIndex] );
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
    }

    backwardButtonClicked() {
        // TODO: implementovat
    }

    forwardButtonClicked() {
        // TODO: implementovat
    }

    replayButtonClicked() {
        // TODO: implementovat
    }

    okNextButtonClicked() {
        // TODO: implementovat
    }

    addSkipButtonClicked() {
        // TODO: implementovat
    }

    removeSkipButtonClicked() {
        // TODO: implementovat
    }

    previousBlockButtonClicked() {
        // TODO: implementovat
    }

    nextBlockButtonClicked() {
        // TODO: implementovat
    }

    editBlockButtonClicked() {
        // TODO: implementovat
    }

    saveExitButtonClicked() {
        // TODO: implementovat
    }
}
