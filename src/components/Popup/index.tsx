import { mergeClassNames } from '@/utils/utils';
import { Popover, PopoverProps } from 'antd';
import {
  cloneElement,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from 'react';

export function Popup({
  content,
  overlayClassName,
  onVisibleChange,
  ...rest
}: PopoverProps) {
  const [visible, setVisible] = useState(false);

  const visibleChange = useCallback(
    (v) => {
      setVisible(v);
      onVisibleChange && onVisibleChange(v);
    },
    [onVisibleChange],
  );

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  // const injectedContent = useMemo(
  //   () =>
  //     isValidElement(content) ? cloneElement(content, { onClose }) : content,
  //   [content, onClose],
  // );
  const injectedContent = useMemo(() => {
    if (isValidElement(content)) {
      const { onClose, ...restProps } = content.props;
      return cloneElement(content, { ...restProps, onClose });
    }
    return content;
  }, [content, onClose]);

  const className = mergeClassNames(overlayClassName, 'datart-popup');
  return (
    <Popover
      {...rest}
      overlayClassName={className}
      content={injectedContent}
      visible={visible}
      onVisibleChange={visibleChange}
    />
  );
}

export { MenuListItem } from './MenuListItem';
export { MenuWrapper } from './MenuWrapper';
