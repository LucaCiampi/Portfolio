import Background from 'public/images/italy.svg'
import BackgroundNight from 'public/images/italy-night.svg'

import '@/styles/interactiveBackground.scss'

interface Props {
    night?: boolean
}

export default function InteractiveBackground({ night }: Props) {

    return (
        <div>
            <div className="italy-background">
                <Background />
            </div>
            <div className="italy-background italy-background--night">
                <BackgroundNight />
            </div>
        </div>
    )
}