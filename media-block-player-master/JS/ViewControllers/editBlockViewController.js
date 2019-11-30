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
