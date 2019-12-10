/// Class for download created synchronization file
class SyncFileDownloadViewController extends ViewController {

    constructor() {
        super();

        this.fileName;
        this.blocksEndTimes;
        this.skipBlock;
    }

    renderHtml(html) {
        // TODO: upravit, issue14
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
        // TODO: po uprave html vytvorit propertier
        this.fileNameLabel = $('#file-name-label');
        this.fileLinkDownload = $('#file-download');
    }

    setupEventListeners() {
        // TODO: po uprave html vytvorit event listeners
    }

    viewDidLoad() {
        // TODO: kedy sa metoda vola?
        this.showSyncFileDownload();
    }

    presentNextController() {
        // TODO: vratit sa do editora
    }

    // Private Methods

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
