import { AudioContentEditorState, AudioContentEditorAction } from './type'

export function audioContentReducer(
    state: AudioContentEditorState,
    action: AudioContentEditorAction,
) {
    switch (action.type) {
        /* audio state */
        case 'ADD_NEW_PART': {
            state.addNewTranscriptionPart = true
            break
        }
        default: {
            throw new Error('Unknown action: ' + action.type)
        }
    }
}
