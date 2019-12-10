// Class for editing one scriptFile block for syncFile editor.
// Enetered from syncFileEditor and will exit back to syncFileEditor.
class EditBlockViewController extends ViewController {

    constructor() {
        // TODO: upravit
        super();

        this.fileName;
        this.sound;
        this.playbackSound;
        this.blocks;
    }

    renderHtml(html) {
        // TODO: upravit, issue14
        const htmlView = `
            <section id="FilesPickerViewController" class="container">
				<div class = "myMERGE">
					<h2>EDIT, SPLIT or MERGE the Curret Block</h2>
				</div>
				<div class = "myMERGE">
					<textarea id="actual-text" readonly>
					</textarea>
				</div>
				<div class = "myMERGE">
					<h6>Edit text or add "|" to Split into two blocks or<a id="merge" class="btn m-lr-10">Merge with the next block</a></h6>
				</div>
				<div class = "myMERGE">
					<a id="apply" class="btn m-lr-10">Apply edited changes to the Script</a>
					<a id="cancel" class="btn m-lr-10">Cancel</a>
				</div>
            </section>
        `;
        super.renderHtml(htmlView);
    }

    setupProperties() {
        // TODO: po uprave html vytvorit nove properties, 
    }

    setupEventListeners() {
        // TODO: po uprave html vytvorit nove event listeners,
    }

    presentNextController() {
        // TODO: zavolat syncFileEditorViewController a odovzdat mu SyncFileEditorData
        const syncFileEditViewController = new SyncFileEditViewController();
        syncFileCreateViewController.sound = this.sound;
        syncFileCreateViewController.playbackSound = this.playbackSound;
        syncFileCreateViewController.blocks = this.blocks;
        syncFileCreateViewController.fileName = this.fileName;
        this.navigationController.present(syncFileEditViewController);
    }

    // Private Methods

    mergeButtonClicked() {
        // TODO: implementovat
        // zavolat mergeBlocks() a this.presentNextController() ?
    }

    applyButtonClicked() {
        // TODO: implementovat
        // zavolat editBlock() a this.presentNextController() ?
    }

    cancelButtonClicked() {
        // TODO: implementovat
        // pravdepodobne iba this.presentNextController() ?
    }

    mergeBlocks() {
        // TODO: implementovat
    }

    splitBlocks() {
        // TODO: implementovat
    }

    editBlock() {
        // TODO: implementovat
    }
}
