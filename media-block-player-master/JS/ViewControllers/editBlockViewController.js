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
