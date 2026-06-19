import { Helmet } from 'react-helmet-async';

const baseTitle = 'Beit Hesed Bakery';

export default function Seo({ title, description, canonical }) {
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta
        name="description"
        content={
          description ??
          'Pasteleria artesanal con tortas, postres y pedidos especiales para celebraciones.'
        }
      />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
