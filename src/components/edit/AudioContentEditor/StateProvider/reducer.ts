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

        case 'ADD_NEW_SECTION': {
            const { payload: sentenceIndex } = action
            const newSection = {
                startIndex: sentenceIndex,
            }
            state.audio.sections.push(newSection)
            // sort sections by startIndex
            state.audio.sections.sort((a, b) => a.startIndex - b.startIndex)
            break
        }

        case 'START_UPDATE_TRANSCRIPTION_PART': {
            const { payload: transcriptionPartIndex } = action
            state.updateTranscriptionPartIndex = transcriptionPartIndex
            state.addNewTranscriptionPart = false
            break
        }

        case 'CANCEL_UPDATE_TRANSCRIPTION_PART': {
            state.updateTranscriptionPartIndex = -1
            break
        }

        case 'DELETE_TRANSCRIPTION_PART': {
            const { payload: transcriptionPartIndex } = action
            state.audio.transcription.splice(transcriptionPartIndex, 1)
            state.updateTranscriptionPartIndex = -1

            //  move section start index
            const sections = state.audio.sections
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i]
                if (section.startIndex > transcriptionPartIndex) {
                    section.startIndex -= 1
                }
            }

            break
        }

        case 'UPDATE_TRANSCRIPTION_PART': {
            const { index, transcriptionPart } = action.payload
            state.audio.transcription[index] = transcriptionPart
            state.updateTranscriptionPartIndex = -1
            break
        }

        case 'CANCEL_ADD_TRANSCRIPTION_PART': {
            state.addNewTranscriptionPart = false
            break
        }

        case 'ADD_TRANSCRIPTION_PART': {
            const { payload: transcriptionPart } = action
            state.audio.transcription.push(transcriptionPart)
            state.addNewTranscriptionPart = false
            break
        }

        case 'UPDATE_CURRENT_TIME': {
            const { payload: currentTime } = action
            state.currentTime = currentTime
            break
        }

        default: {
            // action.type should be exhaustive, as a result,
            // TS will complain that type is never, which is right
            // When there is no error, then we have unhandled action
            //  @ts-expect-error
            throw new Error('Unknown action: ' + action.type)
        }
    }
}
