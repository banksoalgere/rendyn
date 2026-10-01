"use client";

import NextHead from 'next/head';
import * as React from 'react';
import type { AdConfig } from '@/components/rendyn-libraries/mui/upstream/src/Ad/index';
import { CodeCopyProvider } from '@/components/rendyn-libraries/mui/upstream/src/CodeCopy/index';
import type { DemoContextValue } from '@/components/rendyn-libraries/mui/upstream/src/DemoContext/index';
import DemoContext from '@/components/rendyn-libraries/mui/upstream/src/DemoContext/index';
import type { DocsConfig, VersionEntry } from '@/components/rendyn-libraries/mui/upstream/src/DocsProvider/index';
import { DEFAULT_DOCS_CONFIG, DocsProvider } from '@/components/rendyn-libraries/mui/upstream/src/DocsProvider/index';
import type { MuiPageContext } from '@/components/rendyn-libraries/mui/upstream/src/PageContext/index';
import PageContext from '@/components/rendyn-libraries/mui/upstream/src/PageContext/index';
import { ThemeProvider } from '@/components/rendyn-libraries/mui/upstream/src/ThemeContext/index';
import { CodeStylingProvider } from '@/components/rendyn-libraries/mui/upstream/src/codeStyling/index';
import { CodeVariantProvider } from '@/components/rendyn-libraries/mui/upstream/src/codeVariant/index';
import type { Translations } from '@/components/rendyn-libraries/mui/upstream/src/i18n/index';
import { AnalyticsProvider } from '@/components/rendyn-libraries/mui/upstream/src/DocsApp/AnalyticsProvider';
import GoogleAnalytics from '@/components/rendyn-libraries/mui/upstream/src/DocsApp/GoogleAnalytics';
import DocsStyledEngineProvider from '@/components/rendyn-libraries/mui/upstream/src/DocsApp/StyledEngineProvider';
import createEmotionCache from '@/components/rendyn-libraries/mui/upstream/src/DocsApp/createEmotionCache';
import { loadDependencies } from '@/components/rendyn-libraries/mui/upstream/src/DocsApp/loadDependencies';
import VersionsContext from '@/components/rendyn-libraries/mui/upstream/src/DocsApp/VersionsContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface DocsAppProps {
  /**
   * The Next.js page component.
   */
  Component: React.ComponentType<any> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
  /**
   * The Emotion cache for CSS-in-JS. Falls back to a client-side cache.
   */
  emotionCache?: ReturnType<typeof createEmotionCache>;
  /**
   * Page props from Next.js, including userLanguage and translations.
   */
  pageProps: {
    userLanguage: string;
    translations: Translations;
    versions: VersionEntry[];
    [key: string]: unknown;
  };
  /**
   * Docs configuration object (from docs/config.ts)
   */
  docsConfig?: DocsConfig;
  /**
   * The currently active page object
   */
  activePage: MuiPageContext['activePage'];
  /**
   * The parent pages of the active page
   */
  activePageParents: MuiPageContext['activePageParents'];
  /**
   * List of all pages for the product
   */
  pageList: MuiPageContext['pages'];
  /**
   * Product metadata and branding info
   */
  productIdentifier: MuiPageContext['productIdentifier'];
  /**
   * Product identifier string (e.g. 'material-ui')
   */
  productId: MuiPageContext['productId'];
  /**
   * Product category identifier string (e.g. 'core')
   */
  productCategoryId: MuiPageContext['productCategoryId'];
  /**
   * Display name for the product (e.g. 'Material UI')
   */
  demoDisplayName: DemoContextValue['productDisplayName'];
  /**
   * CodeSandbox configuration for demos
   */
  csbConfig: DemoContextValue['csb'];
  /**
   * Optional ad configuration
   */
  adConfig?: Partial<AdConfig>;
  /**
   * Optional wrapper component for theming
   */
  ThemeWrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

function DocsApp(props: DocsAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    docsConfig = DEFAULT_DOCS_CONFIG,
    activePage,
    activePageParents,
    pageList,
    productIdentifier,
    productId,
    productCategoryId,
    demoDisplayName,
    csbConfig,
    adConfig,
    ThemeWrapper = ThemeProvider,
  } = props;

  const pageContextValue: MuiPageContext = React.useMemo(
    () => ({
      activePage,
      activePageParents,
      pages: pageList,
      productIdentifier,
      productId,
      productCategoryId,
    }),
    [activePage, activePageParents, pageList, productIdentifier, productId, productCategoryId],
  );

  const demoContextValue: DemoContextValue = React.useMemo(
    () => ({
      productDisplayName: demoDisplayName,
      csb: csbConfig,
    }),
    [demoDisplayName, csbConfig],
  );

  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  React.useEffect(() => {
    loadDependencies();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <NextHead>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="mui:productId" content={productId} />
        <meta name="mui:productCategoryId" content={productCategoryId} />
      </NextHead>
      <DocsProvider
        config={docsConfig}
        adConfig={adConfig}
        defaultUserLanguage={pageProps.userLanguage}
        translations={pageProps.translations}
      >
        <VersionsContext.Provider value={pageProps.versions}>
          <CodeCopyProvider>
            <CodeStylingProvider>
              <CodeVariantProvider>
                <PageContext.Provider value={pageContextValue}>
                  <DemoContext.Provider value={demoContextValue}>
                    <ThemeWrapper>
                      <DocsStyledEngineProvider cacheLtr={emotionCache}>
                        <AnalyticsProvider>
                          {getLayout(<Component {...pageProps} />)}
                          <GoogleAnalytics />
                        </AnalyticsProvider>
                      </DocsStyledEngineProvider>
                    </ThemeWrapper>
                  </DemoContext.Provider>
                </PageContext.Provider>
              </CodeVariantProvider>
            </CodeStylingProvider>
          </CodeCopyProvider>
        </VersionsContext.Provider>
      </DocsProvider>
    </React.Fragment>
  );
}

export { DocsApp };
