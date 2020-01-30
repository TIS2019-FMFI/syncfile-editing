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
					<h2>Save SyncFile, ScriptFile</h2>
				</div>
				<div class = "myMERGE">
					<h4>AudioFile:</h4>
					<input id = "audio-file" type="text" value="audio">
				</div>
				<div class = "myMERGE">
					<h4>ScriptFile:</h4>
					<input id = "script-file" type="text" value="text">
                    <div class="helper-text grey-text text-darken-1">
                        Enter the name of the ScriptFile. If no changes were made, ScriptFile won't be downloaded.
                    </div>
				</div>
				<div class = "myMERGE">
					<h4>SyncFile:</h4>
					<input id = "sync-file" type="text" value="syncfile">
                    <div class="helper-text grey-text text-darken-1">
                        Enter the name of the SyncFile.
                    </div>
				</div>
				<div class = "myMERGE">
					<a id="save" class="btn m-lr-10">Download</a>
					<a id="unsave" class="btn m-lr-10">Exit</a>
					<a id="back" class="btn m-lr-10">BACK to Edit block time-marks</a>
				</div>
				
				<div class="row">
                    <div class="col s12">
                        <a class="btn-small right modal-trigger" href="#helpmodal">Help</a>
                    </div>
                    <div id="helpmodal" class="modal">
                        <div class="modal-content">
                            <h4>Save SyncFile, ScriptFile</h4>
                            <p>
							If new SyncFile has just been created the default file name is based on the Script file name with suffix .mbpsf.
You may change file names of SyncFile and optionally also of ScriptFile (in case it has been edited).
[DOWNLOAD]: Edited SyncFile and optionally also of ScriptFile will be downloaded into your ‘Downloads’ folder. Use these files in the MediaBlockPlayer.
[EXIT]: moves you to the MediaBlockPlayer main menu
[BACK to Edit block time-marks]: nothing is saved and you may continue editing time-marks
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
		var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
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
        this.showSyncFileDownload();  
        if (this.syncFileEditorData.getScriptFileEdited()) {
            this.showScriptFileDownload();
        } 
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
