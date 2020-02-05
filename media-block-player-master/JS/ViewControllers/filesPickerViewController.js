/// Class for pick audio and script file for needed for creating
/// synchornization file. Then you are able go to creating class
class FilesPickerViewController extends ViewController {

    constructor() {
        // upravit data
        super();
        this.syncFileEditorData;

        this.scriptFile;
        this.audioFile;
        this.syncFile;

        this.scriptFileName;
        this.audioFileName;
        this.syncFileName;
    }

    renderHtml(html) {
        const htmlView = `
            <section id="FilesPickerViewController" class="container">
                <div class="row row-100 m12">
                    <div class="col s12">
                        <h1 class="center">Choose files for creating SyncFile</h1>
                    </div>
                </div>
                <div class="row row-50">
                    <div class="col s6">
                        <form action="#">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span><i class="material-icons right">audiotrack</i>Audio</span>
                                    <input id="audio-file-picker" type="file" accept=".wav, .mp3" />
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col s6">
                        <form action="#">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span><i class="material-icons right">description</i>Original Script</span>
                                    <input id="script-file-picker" type="file" accept=".txt" />
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


				<div class="row row-50">
                    <div class="col s6">
                        <form action="#">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span><i class="material-icons right">description</i>SyncFile</span>
                                    <input id="sync-file-picker" type="file" accept=".mbpsf" />
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                        </form>
                        <div class="helper-text grey-text text-darken-1">
                            If no SyncFile uploaded, new SyncFile will be created.
                        </div>
                    </div>
				</div>
                <div class="row row-50">
                    <div class="col s12 center">
                        <!--<button id="start-creating-button" disabled style="font-size:20px;">Start creating</button>-->
                        <a id="start-creating-button" class="waves-effect waves-light btn-large disabled">Start Creating</a>
                    </div>
                </div>
                <div class="row row-100">
                    <div class="col s11">
                        <a class="btn-small right" href="index.html">Back to my menu</a>
                    </div>
                    <div class="col s1">
                        <a class="btn-small right modal-trigger" href="#helpmodal">Help</a>
                    </div>

                    <div id="helpmodal" class="modal">
                        <div class="modal-content">
                            <h4>Choose files for creating SyncFile</h4>
                            <p>
							Locate existing [AUDIO] file (.mp3 or .wav) and [ORIGINAL SCRIPT] file.<br>
Based on these two files the SyncFile (that synchronises AUDIO and SCRIPT) will be created in the next page.<br>
If you wish to edit already existing SyncFile (e.g. not yet fully completed) locate also the [SYNCFILE].<br>
Hit [START CREATING] to move to the next page ("Edit block time-marks").

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

	viewDidLoad() {
		var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);		
    }
	
    setupProperties() {
        this.audioFilePicker = $('#audio-file-picker');
        this.scriptFilePicker = $('#script-file-picker');
        this.syncFilePicker = $('#sync-file-picker');
        this.startCreatingButton = $('#start-creating-button');
    }

    setupEventListeners() {
        this.audioPickerValueChanged = this.audioPickerValueChanged.bind(this);
        this.scriptFilePickerValueChanged = this.scriptFilePickerValueChanged.bind(this);
        this.syncFilePickerValueChanged = this.syncFilePickerValueChanged.bind(this);
        this.createEditButtonClicked = this.createEditButtonClicked.bind(this);

        this.audioFilePicker.change(this.audioPickerValueChanged);
        this.scriptFilePicker.change(this.scriptFilePickerValueChanged);
        this.syncFilePicker.change(this.syncFilePickerValueChanged);
        this.startCreatingButton.on('click', this.createEditButtonClicked);
    }

    presentNextController() {
        const syncFileEditViewController = new SyncFileEditViewController();
        
        syncFileEditViewController.syncFileEditorData = this.syncFileEditorData;

        this.navigationController.present(syncFileEditViewController);
    }

    // Private Methods

    audioPickerValueChanged() {
        const audioFile = this.audioFilePicker[0].files[0];
        this.audioFileName = audioFile.name.split('.').slice(0, -1).join('.');

        this.getBase64(audioFile).then(data => {
            this.audioFile = new Howl({
                src: data
            });
            this.setupStartCreatingButton();
        });
    }
	

    scriptFilePickerValueChanged() {
        const textFile = this.scriptFilePicker[0].files[0];
        this.scriptFileName = textFile.name.split('.').slice(0, -1).join('.');

        const fileReader = new FileReader();
        fileReader.onload = () => {
            this.scriptFile = fileReader.result;
            this.setupStartCreatingButton();
        };
        fileReader.readAsText(textFile);
    }

    syncFilePickerValueChanged() {
        const syncFile = this.syncFilePicker[0].files[0];
        this.syncFileName = syncFile.name.split('.').slice(0, -1).join('.');

        const fileReader = new FileReader();
        fileReader.onload = () => {
            this.syncFile = fileReader.result;
            this.syncFile = JSON.parse(this.syncFile);
        };
        fileReader.readAsText(syncFile);
    }

    setupStartCreatingButton() {
        const audioPickerHasFile = this.audioFile !== undefined;
        const scriptFilePickerHasFile = this.scriptFile !== undefined;

        const shouldEnableCreatingButton = audioPickerHasFile && scriptFilePickerHasFile;
        if (shouldEnableCreatingButton) {
            this.startCreatingButton.removeClass("disabled");
        } else {
            this.startCreatingButton.addClass("disabled");
        }
    }

    createEditButtonClicked() {
        try {
            this.createSyncFileEditorData()
            this.presentNextController();
        }
        catch (error) {
            alert('Unexpected fault');
        }
    }

    createSyncFileEditorData() {
        this.syncFileEditorData = new SyncFileEditorData(this.audioFile, this.scriptFile, this.syncFile);
        this.syncFileEditorData.audioFileName = this.audioFileName;
        this.syncFileEditorData.scriptFileName = this.scriptFileName;
        if (this.syncFileName == undefined) {
            this.syncFileEditorData.syncFileName = this.scriptFileName;
        } else {
            this.syncFileEditorData.syncFileName = this.syncFileName;
        }
    }

    /// Encode file to base64 encoding
    /// @param file - file you want to encode
    /// @return - base64 string of file
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

}



