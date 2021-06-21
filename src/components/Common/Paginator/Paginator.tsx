import React, {useState} from 'react';
import styles from './Paginator.module.css'

type Props = {
    currentPage: number,
    totalItemsCount: number,
    pageSize: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number
}

let Paginator: React.FC<Props> = ({currentPage, totalItemsCount, pageSize, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages:Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    //pages.push(pagesCount - 1);
    return (
        <div className={styles.wrapper}>
            <div className={styles.paginator}>
                {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>Назад</button>}
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return <span className={currentPage === p ? styles.selectedPage : ""}
                                     key={p}
                                     onClick={(e) => {
                                         onPageChanged(p);
                                     }}>{p}</span>
                    })}
                {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>Вперёд</button>}
            </div>
        </div>
    );
}


export default Paginator;
