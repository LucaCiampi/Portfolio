import Image from 'next/image'
import ExternalLink from './ExternalLink';
import Logo from '@/public/images/mooxy.svg'

import styles from '@/styles/Placeholder.module.scss'
import articleStyles from '@/styles/BlogArticle.module.scss'

interface Props {
    illustration?: string,
}

const Placeholder = ({ illustration }: Props) => {
    return (
        <div className={articleStyles.news__article}>
            <div className={styles.placeholder}>
                <div className={articleStyles.illustrationWrapper}><div className={styles.square + ' ' + styles.image + ' ' + articleStyles.news__article__illustration}></div></div>
                <div className={styles.header}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.paragraph}>
                    <div className={styles.line}></div>
                </div>
                {/* <p className={`fontsize-menu ${styles.news__article__category} ${mini && 'fw-bold'}`}>{category}</p>
                <p className={`lineheight-12 pt-1 ${styles.news__article__title} ${titleClassName} ${mini && 'd-none'}`}>{title}</p>
                <p className={`fontsize-menu ${styles.news__article__excerpt}`}>{children}</p> */}
            </div>
        </div>
    )
}

export default Placeholder