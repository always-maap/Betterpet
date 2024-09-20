import { Link } from "react-router-dom";

type Thumbnail = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type Props = {
  id: string;
  title: string;
  description: string;
  thumbnail: Thumbnail | null;
};

export function PostCard(props: Props) {
  const { id, title, description, thumbnail } = props;

  return (
    <Link
      to={`/post/${id}`}
      className="border rounded overflow-hidden flex flex-col cursor-pointer justify-start stretch bg-muted"
    >
      <img
        src={
          thumbnail?.url ??
          "https://tribe-s3-production.imgix.net/s5JXWzs9SoI3aVsNJ9hwr?fit=max&w=1000&auto=compress,format"
        }
        width={thumbnail?.width}
        height={thumbnail?.height}
        className="aspect-video object-cover w-full"
      />
      <div className="flex-1 px-4 py-5 flex flex-col gap-2">
        <div className="grow-0 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-medium line-clamp-3">{title}</h2>
            <div className="empty:hidden min-w-0 basis-full">
              <article className="break-words line-clamp-5">{description}</article>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
