import MainOperator from './MainOperator'
import AllTranscription from './AllTranscription'
import OnePassOperator from './OnePassOperator'

export default function OnePassMode() {
    return (
        <div className="mb-64 flex flex-grow flex-col items-center">
            <AllTranscription />
            <div className="fixed bottom-0 flex w-full flex-col gap-4 bg-background px-3 pt-2">
                <OnePassOperator />
                <MainOperator />
            </div>
        </div>
    )
}
