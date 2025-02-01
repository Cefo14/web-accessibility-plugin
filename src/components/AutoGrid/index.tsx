import { type CSSProperties, memo, useMemo } from 'react';
import clsx from 'clsx';

import { type ElementProps } from '@/types/ElementProps';

import classNames from './AutoGrid.module.css';

interface AutoGridProps extends ElementProps {
  $gap?: string | number;
  $columnWidth?: string | number;
  $rowWidth?: string | number;
  $rows?: number;
  $placeContent?: string | number;
}

const AutoGrid = ({
  $gap,
  $columnWidth,
  $rowWidth,
  $rows,
  $placeContent,
  children,
  className,
  ...props
}: AutoGridProps) => {
  const styles = useMemo<CSSProperties>(() => ({
    gap: $gap,
    gridTemplateColumns: `repeat(auto-fill, minmax(${$columnWidth}, 1fr))`,
    gridTemplateRows: $rows ? `repeat(${$rows}, ${$rowWidth})` : 'auto',
    $placeContent,
  }), [$gap, $columnWidth, $rows, $rowWidth, $placeContent]);

  return (
    <div
      {...props}
      className={clsx(classNames.root, className)}
      style={styles}
    >
      { children }
    </div>
  );
};

export default memo(AutoGrid);
