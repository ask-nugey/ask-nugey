"use client";

import React, { FC, useRef, useState } from "react";
import {
  createCache,
  extractStyle,
  StyleProvider,
  StyleProviderProps,
} from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";

type AntdRegistryProps = Omit<StyleProviderProps, "cache">;

const AntdRegistry: FC<AntdRegistryProps> = (props) => {
  const [cache] = useState(() => createCache());
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    const styleText = extractStyle(cache, { plain: true });

    if (inserted.current) {
      return null;
    }
    inserted.current = true;

    return (
      <style
        id="antd-cssinjs"
        // to make sure this style is inserted before Ant Design's style generated by client
        data-rc-order="prepend"
        data-rc-priority="-1000"
        dangerouslySetInnerHTML={{ __html: `@layer antd { ${styleText} }` }}
      />
    );
  });

  return <StyleProvider {...props} cache={cache} />;
};

export default AntdRegistry;
