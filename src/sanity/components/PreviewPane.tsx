import { apiVersion, previewSecretId } from '@/lib/sanity.api';
import { Card, Flex, Spinner, Text } from '@sanity/ui';
import { getSecret } from '@/plugins/productionUrl/utils';
import React, {
  memo,
  startTransition,
  Suspense,
  useEffect,
  useState,
} from 'react';
import { useClient } from 'sanity';
import { suspend } from 'suspend-react';

type Props = {
  document: any;
};

export default function PreviewPane({ document }: Props) {
  return (
    <Pane
      _type={document.displayed._type}
      slug={document.displayed.slug?.current}
      apiVersion={apiVersion}
      previewSecretId={previewSecretId}
    />
  );
}

type PaneProps = {
  slug?: string;
  _type: string;
  previewSecretId: `${string}.${string}`;
  apiVersion: string;
};

function Pane(props: PaneProps) {
  const { previewSecretId, apiVersion } = props;
  // Whenever the slug changes, wait 3 seconds for GROQ to reach eventual consistency.
  // This helps to prevent displaying "Invalid slug" or returning 404 errors while editing the slug manually.
  const [slug, setSlug] = useState(props.slug);
  useEffect(() => {
    const timeout = setTimeout(
      () => startTransition(() => setSlug(props.slug)),
      3000
    );
    return () => clearTimeout(timeout);
  }, [props.slug]);

  // if the document has no slug for the preview iframe
  if (!slug) {
    return (
      <Card tone="primary" margin={5} padding={6}>
        <Text align="center">
          Please add a slug to the post to see the preview!
        </Text>
      </Card>
    );
  }

  return (
    <Card
      scheme="light"
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <Suspense fallback={null}>
        <Iframe
          apiVersion={apiVersion}
          previewSecretId={previewSecretId}
          slug={slug}
          _type={props._type}
        />
      </Suspense>
      <Flex
        as={Card}
        justify="center"
        align="center"
        height="fill"
        direction="column"
        gap={4}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Text muted>Loading…</Text>
        <Spinner muted />
      </Flex>
    </Card>
  );
}

// Used as a cache key that doesn't risk collision or getting affected by other components that might be using `suspend-react`
const fetchSecret = Symbol('preview.secret');
const Iframe = memo(function Iframe(
  props: Omit<PaneProps, 'slug' | '_type'> &
    Required<Pick<PaneProps, 'slug' | '_type'>>
) {
  const { apiVersion, previewSecretId, slug, _type } = props;
  const client = useClient({ apiVersion });

  const secret = suspend(
    () => getSecret(client, previewSecretId, true),
    ['getSecret', previewSecretId, fetchSecret],
    // The secret fetch has a TTL of 1 minute, just to check if it's necessary to recreate the secret which has a TTL of 60 minutes
    { lifespan: 60000 }
  );

  const url = new URL('/api/preview', location.origin);
  url.searchParams.set('slug', slug);
  url.searchParams.set('type', _type);
  if (secret) {
    url.searchParams.set('secret', secret);
  }

  return (
    <iframe
      title="preview"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 1,
      }}
      src={url.toString()}
    />
  );
});
