/// Class for download created synchronization file
class SyncFileDownloadViewController extends ViewController {

    constructor() {
        super();

        this.syncFileEditorData;
    }

    renderHtml(html) {
        const htmlView = `
            <section id="FilesPickerViewController" class="container">
				<div class = "myMERGE">
					<h4>AudioFile:</h4>
					<input id = "audio-file" type="text" value="audio">
				</div>
				<div class = "myMERGE">
					<h4>ScriptFile:</h4>
					<input id = "script-file" type="text" value="text">
				</div>
				<div class = "myMERGE">
					<h4>SyncFile:</h4>
					<input id = "sync-file" type="text" value="syncfile">
				</div>
				<div class = "myMERGE">
					<a id="save" class="btn m-lr-10">Save&Exit</a>
					<a id="unsave" class="btn m-lr-10">Exit without saving</a>
					<a id="back" class="btn m-lr-10">Back to setting time</a>
				</div>

            </section>
        `;
        super.renderHtml(htmlView);
    }

    setupProperties() {
        this.audioFileNameLabel = $('#audio-file');
        this.scriptFileNameLabel = $('script-file');
        this.syncFileNameLabel = $('#sync-file');
        this.saveButton = $('#save');
        this.unsaveButton = $('#unsave');
        this.backButton = $('#back');
    }

    setupEventListeners() {
        this.audioFileNameChanged = this.audioFileNameChanged.bind(this);
        this.scriptFileNameChanged = this.scriptFileNameChanged.bind(this);
        this.syncFileNameChanged = this.syncFileNameChanged.bind(this);
        this.saveButtonClicked = this.saveButtonClicked.bind(this);
        this.unsaveButtonClicked = this.unsaveButtonClicked.bind(this);
        this.backButtonClicked = this.backButtonClicked.bind(this);

        this.audioFileNameLabel.change(this.audioPickerValueChanged);
        this.scriptFileNameLabel.change(this.scriptPickerValueChanged);
        this.syncFileNameLabel.change(this.syncPickerValueChanged);
        this.saveButton.on('click', this.saveButtonClicked);
        this.unsaveButton.on('click', this.unsaveButtonClicked);
        this.backButton.on('click', this.backButtonClicked);
    }

    viewDidLoad() {
        // TODO: kedy sa metoda vola?
        this.showSyncFileDownload();
    }

    presentNextController() {
        const syncFileEditViewController = new SyncFileEditViewController();

        syncFileEditViewController.syncFileEditorData = this.syncFileEditorData;

        this.navigationController.present(syncFileEditViewController);
    }

    // Private Methods
    
    saveButtonClicked(){
        // TODO: implementovat
        showScriptFileDownload();
        showSyncFileDownload();
        window.locatin.href = 'index.html';
    }

    unsaveButtonClicked() {
        window.locatin.href = 'index.html';
    }
    
    backButtonClicked() {
        syncFileEditorData.selectFirstBlock();
        presentNextController();
    }

    audioFileNameChanged() {
        // TODO: implementovat
        // mozno tuto metodu netreba

    }

    scriptFileNameChanged() {
        // TODO: implementovat
        // potreba zistit ci sa script file zmenil

    }

    syncFileNameChanged() {
        // TODO: implementovat

    }

    /// This method create json object from blocks end times array and
    /// skip blocks array. Then it will create html download link with
    /// {filename}.mbpsf file
    showSyncFileDownload() {
        // TODO: zmenit podla SyncFileEditorData triedy
        const syncFileName = `${this.fileName}.mbpsf`;
        const syncFileObject = new Object();
        syncFileObject.blocks = this.blocksEndTimes;
        syncFileObject.skips = this.skipBlock;
        const syncFileJSON = JSON.stringify(syncFileObject);

        this.fileNameLabel.text(syncFileName);
        this.fileLinkDownload.attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(syncFileJSON));
        this.fileLinkDownload.attr('download', syncFileName);
        this.fileLinkDownload.html('DOWNLOAD');
    }

    showScriptFileDownload(){
        // TODO: implementovat podla SyncFileEditorData triedy
    }

}
