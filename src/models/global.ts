// 全局共享数据示例
const DEFAULT_NAME = 'Umi Max';
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  return {
    name,
    setName,
  };
};

export default useUser;
