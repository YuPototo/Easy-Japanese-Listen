import { AudioContentEditorState, AudioContentEditorAction } from './type'
// import { current } from 'immer'

export function audioContentReducer(
    state: AudioContentEditorState,
    action: AudioContentEditorAction,
) {
    switch (action.type) {
        case 'ADD_NEW_PART': {
            state.addNewTranscriptionPart = true
            break
        }

        // section title
        case 'START_UPDATE_SECTION_TITLE': {
            state.updateSectionTitleIndex = action.payload
            break
        }

        case 'CANCEL_UPDATE_SECTION_TITLE': {
            state.updateSectionTitleIndex = -1
            break
        }

        case 'UPDATE_SECTION_TITLE': {
            const { sectionIndex, title } = action.payload
            if (title === '') {
                delete state.audio.sections[sectionIndex].title
            } else {
                state.audio.sections[sectionIndex].title = title
            }
            state.updateSectionTitleIndex = -1
            break
        }

        case 'DELETE_SECTION_TITLE': {
            /**
             * Why the logic is so complicated?
             * Because when there is no section start from 0,
             * We automatically add a section start from 0 to the content tree
             *
             * This temporary section is not in the audio.sections array
             * We must not delete it.
             */
            // has a section start from 0 or not?
            const hasSectionStartFromZero = state.audio.sections.some(
                (section) => section.startIndex === 0,
            )

            if (hasSectionStartFromZero) {
                state.audio.sections.splice(action.payload, 1)
            } else {
                const realIndex = action.payload - 1
                state.audio.sections.splice(realIndex, 1)
            }

            state.updateSectionTitleIndex = -1
            break
        }

        default: {
            // @ts-expect-error
            throw new Error('Unknown action: ' + action.type)
        }
    }
}
