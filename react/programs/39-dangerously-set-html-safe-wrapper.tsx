import DOMPurify from 'dompurify';

export function SafeHtml({html}: {html: string}) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
    />
  );
}

