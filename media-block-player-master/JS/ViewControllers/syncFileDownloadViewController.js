/// Class for download created synchronization file
class SyncFileDownloadViewController extends ViewController {

    constructor() {
        super();

        this.fileName;
        this.blocksEndTimes;
        this.skipBlock;
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
        this.fileNameLabel = $('#file-name-label');
        this.fileLinkDownload = $('#file-download');

        this.audioFileNameInput = document.getElementById('audio-file');
        this.scriptFileNameInput = document.getElementById('script-file');
        this.syncFileNameInput = document.getElementById('sync-file');

        this.audioFileNameInput.value = this.syncFileEditorData.audioFileName + '.mp3';
        this.scriptFileNameInput.value = this.syncFileEditorData.scriptFileName + '.txt';
        this.syncFileNameInput.value = this.syncFileEditorData.syncFileName + '.mbpsf';

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

    viewDidLoad() {
    }

    presentNextController() {
        const syncFileEditViewController = new SyncFileEditViewController();

        syncFileEditViewController.syncFileEditorData = this.syncFileEditorData;

        this.navigationController.present(syncFileEditViewController);
    }

    // Private Methods
    
    saveButtonClicked(){
        try {
            this.validateInputs();
        }
        catch (error) {
            console.log(error);
            alert(error);
            return;
        }
        if (this.syncFileEditorData.getScriptFileEdited()) {
            showScriptFileDownload();
        } 
        this.showSyncFileDownload();  
        //window.location.href = 'index.html'; // chceme skutocne exit?
    }

    unsaveButtonClicked() {
        window.location.href = 'index.html';
    }
    
    backButtonClicked() {
        this.syncFileEditorData.selectFirstBlock();
        this.presentNextController();
    }

    showSyncFileDownload() {
        const syncFileName = this.syncFileNameInput.value;
        const syncFileText = JSON.stringify(this.syncFileEditorData.getSyncFileData());

        this.fileDownload(syncFileName, syncFileText);
    }

    showScriptFileDownload(){
        const scriptFileName = this.scriptFileNameInput.value;
        const scriptFileText = this.syncFileEditorData.getScriptFileData();

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

    validateInputs(){
        if (this.syncFileNameInput.value == ''){
            throw 'SyncFile name can not have empty value';
        }
        if (this.scriptFileNameInput.value == ''){
            throw 'ScriptFile name can not have empty value';
        }
    }

}
