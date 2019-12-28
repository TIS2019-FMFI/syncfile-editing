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
        this.audioFileNameInput = $('#audio-file');
        this.scriptFileNameInput = $('script-file');
        this.syncFileNameInput = $('#sync-file');

        this.saveButton = $('#save');
        this.unsaveButton = $('#unsave');
        this.backButton = $('#back');
    }

    setupEventListeners() {
        //this.audioFileNameChanged = this.audioFileNameChanged.bind(this);
        //this.scriptFileNameChanged = this.scriptFileNameChanged.bind(this);
        //this.syncFileNameChanged = this.syncFileNameChanged.bind(this);
        this.saveButtonClicked = this.saveButtonClicked.bind(this);
        this.unsaveButtonClicked = this.unsaveButtonClicked.bind(this);
        this.backButtonClicked = this.backButtonClicked.bind(this);

        //this.audioFileNameInput.change(this.audioPickerValueChanged);
        //this.scriptFileNameInput.change(this.scriptPickerValueChanged);
        //this.syncFileNameInput.change(this.syncPickerValueChanged);
        this.saveButton.on('click', this.saveButtonClicked);
        this.unsaveButton.on('click', this.unsaveButtonClicked);
        this.backButton.on('click', this.backButtonClicked);
    }

    presentNextController() {
        const syncFileEditViewController = new SyncFileEditViewController();

        syncFileEditViewController.syncFileEditorData = this.syncFileEditorData;

        this.navigationController.present(syncFileEditViewController);
    }

    // Private Methods
    
    saveButtonClicked(){
        if (this.syncFileEditorData.getScriptFileEdited()) {
            showScriptFileDownload();
        } 
        showSyncFileDownload();  
        window.locatin.href = 'index.html'; // chceme skutocne exit?
    }

    unsaveButtonClicked() {
        window.locatin.href = 'index.html';
    }
    
    backButtonClicked() {
        syncFileEditorData.selectFirstBlock();
        presentNextController();
    }

    showSyncFileDownload() {
        // TODO: pridat validator mena, cez JS alebo HTML5
        const syncFileName = `${this.syncFileNameInput.value}.mbpsf`;
        const syncFileData = syncFileEditorData.getSyncFileData();

        this.fileDownload(syncFileName, syncFileText);
    }

    showScriptFileDownload(){
        // TODO: pridat validator mena, cez JS alebo HTML5
        const scriptFileName = `${this.scriptFileNameInput.value}.txt`;
        const scriptFileData = syncFileEditorData.getScriptFileData();

        this.fileDownload(scriptFileName, scriptFileText);
    }

    fileDownload(fileName, fileText) {
        // https://stackoverflow.com/a/18197341
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileText));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

}
