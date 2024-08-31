import { type CSSProperties, memo, useMemo } from 'react';
import clsx from 'clsx';

import { type DivProps } from '@/types/DivProps';

import classNames from './AutoGrid.module.css';

interface AutoGridProps extends DivProps {
  $gap?: CSSProperties['gap'];
  $columnWidth?: CSSProperties['width'];
  $placeContent?: CSSProperties['placeContent'];
}

const AutoGrid = ({
  $gap,
  $columnWidth,
  $placeContent,
  children,
  className,
  ...props
}: AutoGridProps) => {
  const styles = useMemo<CSSProperties>(() => ({
    gap: $gap,
    gridTemplateColumns: `repeat(auto-fill, minmax(${$columnWidth}, 1fr))`,
    $placeContent: $placeContent,
  }), [$gap, $columnWidth, $placeContent]);

  return (
    <section
      {...props}
      className={clsx(classNames.root, className)}
      style={styles}
    >
      { children }
    </section>
  );
};

export default memo(AutoGrid);