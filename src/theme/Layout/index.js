import React from 'react';
import Layout from '@theme-original/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

const BrowserModules = () => {
  const Snowflakes = require('@theme/Effect/Snowflakes').default;

  return (
    <>
      <Snowflakes />
    </>
  );
};

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <BrowserOnly>{() => <BrowserModules />}</BrowserOnly>
    </>
  );
}
