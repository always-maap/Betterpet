type Props = {
  title: string;
  description: string;
  slug: string;
};

export function PostCard(props: Props) {
  const { title, description, slug } = props;

  return (
    <div className="border rounded overflow-hidden flex flex-col cursor-pointer justify-start stretch bg-muted">
      <img
        src="https://tribe-s3-production.imgix.net/s5JXWzs9SoI3aVsNJ9hwr?fit=max&w=1000&auto=compress,format"
        alt=""
      />
      <div className="flex-1 px-4 py-5 flex flex-col gap-4">
        <div className="grow-0 shrink-0">
          <div className="flex flex-wrap items-center gap-4">
            <a
              className="cursor-pointer rounded-base focus:outline-none focus-visible:ring basis-full break-words min-w-0 inline-block"
              href="/getstarted/post/notifications-snWmdNf1acVH1k5"
            >
              <h2 className="font-medium line-clamp-3">{title}</h2>
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
