type Props = {
  title: string;
  description: string;
  slug: string;
};

export function PostCard(props: Props) {
  const { title, description, slug } = props;

  return (
    <div className="border border-card flex flex-col text-content-subdued bg-surface shadow-card sm:rounded-card cursor-pointer hover:shadow-card-hovered transition-all ease-in-out duration-200 justify-start stretch">
      <div className="flex-1 px-4 py-5 sm:p-6 flex flex-col gap-4">
        <div className="grow-0 shrink-0">
          <div className="flex flex-wrap items-center gap-4">
            <a
              className="cursor-pointer rounded-base transition duration-200 focus:outline-none focus-visible:ring basis-full break-words min-w-0 inline-block"
              href="/getstarted/post/notifications-snWmdNf1acVH1k5"
            >
              <h2 className="font-medium text-heading-sm text-content line-clamp-3">{title}</h2>
            </a>
            <div className="empty:hidden min-w-0 basis-full">
              <article className="prose break-words line-clamp-5">{description}</article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
