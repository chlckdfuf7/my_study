import React, { useState } from "react";
import styles from "../../styles/MultiListBoxComponent.module.scss";
import classNames from "classnames";

interface ListBoxProps {
    items: string[];
    width?: number;
    maxHeight?: number;
    onSelect: (selectedItems: string[]) => void;
};

const MultiSelectListBoxComponent: React.FC<ListBoxProps> = ({ items, width, maxHeight, onSelect }) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        setSelectedIndexes((prev) => 
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
        onSelect(selectedIndexes.map((i) => items[i]));
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
        if (e.key === 'ArrowDown') {
          setFocusedIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, items.length - 1)));
        } else if (e.key === 'ArrowUp') {
          setFocusedIndex((prev) => (prev === null ? items.length - 1 : Math.max(prev - 1, 0)));
        } else if (e.key === 'Enter' && focusedIndex !== null) {
          handleItemClick(focusedIndex);
        }
    };

    return (
        <ul
          role="listbox"
          tabIndex={0}
          className={styles.listbox}
          style={{
            width: `${width ? width : 250}px`,
            maxHeight: `${maxHeight ? maxHeight : 200}px`
          }}
          onKeyDown={handleKeyDown}
        >
          {items.map((item, index) => (
            <li
              key={index}
              role="option"
              aria-selected={selectedIndexes.includes(index)}
              className={classNames(styles.listbox_item, {
                [styles.selected]: selectedIndexes.includes(index),
                [styles.focused]: focusedIndex === index,
              })}
              onClick={() => handleItemClick(index)}
              onMouseEnter={() => setFocusedIndex(index)}
            >
              {item}
            </li>
          ))}
        </ul>
    );

    // return (
    //     <div
    //       role="listbox"
    //       tabIndex={0}
    //       className="listbox"
    //       onKeyDown={handleKeyDown}
    //     >
    //       {items.map((item, index) => (
    //         <div
    //           key={index}
    //           role="option"
    //           aria-selected={selectedIndexes.includes(index)}
    //           className={`listbox-item ${
    //             selectedIndexes.includes(index) ? 'selected' : ''
    //           } ${focusedIndex === index ? 'focused' : ''}`}
    //           onClick={() => handleItemClick(index)}
    //           onMouseEnter={() => setFocusedIndex(index)}
    //         >
    //           {item}
    //         </div>
    //       ))}
    //     </div>
    // );
};

export default MultiSelectListBoxComponent;