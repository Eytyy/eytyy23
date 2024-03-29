import { Stack, Card, Text } from '@sanity/ui';
import { CgPen, CgWebsite } from 'react-icons/cg';
import {
  StructureBuilder,
  StructureResolverContext,
} from 'sanity/desk';
import { Link, IntentLink } from 'sanity/router';
import { IoHomeOutline, IoWarningOutline } from 'react-icons/io5';
import { MdWorkspaces } from 'react-icons/md';

type Props = {
  title: string;
  type: string;
  link: string;
  linkTitle: string;
};

const EmptyNotice = ({ title, type, link, linkTitle }: Props) => {
  if (!title || !type || !link || !linkTitle) return null;
  return (
    <Card padding={4}>
      <Card padding={[5]} radius={2} shadow={1} tone="critical">
        <Stack space={[3]}>
          <Text align="center" size={[2]} weight="semibold">
            The {title} has not been set.
          </Text>
          <Text align="center" size={[2]}>
            Set your {title} from the{' '}
            <Link href={link}>{linkTitle}</Link>
          </Text>
        </Stack>
      </Card>

      <Stack padding={3} space={[3]}>
        <Text align="center" muted size={[1]}>
          {`Don't have a ${type} yet?`}
          <IntentLink intent="create" params={{ type }}>
            Create one now
          </IntentLink>
        </Text>
      </Stack>
    </Card>
  );
};

const currentHome = (
  S: StructureBuilder,
  context: StructureResolverContext
) => {
  return S.listItem()
    .title('Home')
    .icon(IoHomeOutline)
    .child(async () => {
      const data = await context
        .getClient({ apiVersion: '2022-01-12' })
        .fetch(` *[_type == "generalSettings"][0]{home->{_id}}`);

      if (!data?.home) {
        return S.component(() => (
          <EmptyNotice
            title="Home Page"
            type="page"
            link="settings;general"
            linkTitle="General Settings"
          />
        )).title('Home Page');
      }

      return S.document()
        .schemaType('page')
        .documentId(data.home._id)
        .views([
          S.view.form(),
        ]);
    });
};
const currentProjects = (
  S: StructureBuilder,
  context: StructureResolverContext
) => {
  return S.listItem()
    .title('Work')
    .icon(MdWorkspaces)
    .child(async () => {
      const data = await context
        .getClient({ apiVersion: '2022-01-12' })
        .fetch(` *[_type == "generalSettings"][0]{work->{_id}}`);

      if (!data?.work) {
        return S.component(() => (
          <EmptyNotice
            title="Work Page"
            type="page"
            link="settings;general"
            linkTitle="General Settings"
          />
        )).title('Work Page');
      }

      return S.document()
        .schemaType('work')
        .documentId(data.work._id)
        .views([
          S.view.form(),
        ]);
    });
};
const currentBlog = (
  S: StructureBuilder,
  context: StructureResolverContext
) => {
  return S.listItem()
    .title('Blog')
    .icon(CgPen)
    .child(async () => {
      const data = await context
        .getClient({ apiVersion: '2022-01-12' })
        .fetch(` *[_type == "generalSettings"][0]{blog->{_id}}`);

      if (!data?.blog) {
        return S.component(() => (
          <EmptyNotice
            title="Blog Page"
            type="page"
            link="settings;general"
            linkTitle="General Settings"
          />
        )).title('Blog Page');
      }

      return S.document()
        .schemaType('page')
        .documentId(data.blog._id)
        .views([
          S.view.form(),
        ]);
    });
};

const current404 = (
  S: StructureBuilder,
  context: StructureResolverContext
) => {
  return S.listItem()
    .title('Error Page')
    .icon(IoWarningOutline)
    .child(async () => {
      const data = await context
        .getClient({ apiVersion: '2022-01-12' })
        .fetch(` *[_type == "generalSettings"][0]{error->{_id}}`);

      if (!data?.error) {
        return S.component(() => (
          <EmptyNotice
            title="Error Page"
            type="page"
            link="settings;general"
            linkTitle="General Settings"
          />
        )).title('Error Page');
      }

      return S.document()
        .schemaType('page')
        .documentId(data.error._id);
    });
};

const otherPages = (S: StructureBuilder) =>
  S.listItem()
    .title('Other Pages')
    .icon(CgWebsite)
    .child(
      S.documentTypeList('page')
        .title('Other Pages')
        .filter(
          `_type == "page" && !(_id in [
            *[_type == "generalSettings"][0].home._ref,
            *[_type == "generalSettings"][0].work._ref,
            *[_type == "generalSettings"][0].blog._ref,
            *[_type == "generalSettings"][0].error._ref,
          ]) && !(_id in path("drafts.**"))`
        )
        .child((documentId) =>
          S.document()
            .documentId(documentId)
            .schemaType('page')
            .views([
              S.view.form(),
            ])
        )
    );

const pages = (
  S: StructureBuilder,
  context: StructureResolverContext
) => {
  return S.listItem()
    .title('Pages')
    .icon(CgWebsite)
    .child(
      S.list()
        .title('Pages')
        .items([
          currentHome(S, context),
          currentProjects(S, context),
          currentBlog(S, context),
          current404(S, context),
          otherPages(S),
        ])
    );
};

export default pages;
