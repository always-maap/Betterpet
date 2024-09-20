type Title = {
  key: "title";
  value: string;
};

type Content = {
  key: "content";
  value: string;
};

type Props = {
  fields: (Title | Content)[];
};

export function PostRenderer(props: Props) {
  function render(field: Title | Content) {
    switch (field.key) {
      case "title":
        return <TitleRenderer value={field.value} />;
      case "content":
        return <ContentRenderer value={field.value} />;
    }
  }

  return (
    <div>
      {props.fields?.map((field) => (
        <div key={field.key}>{render(field)}</div>
      ))}
    </div>
  );
}

function TitleRenderer(props: { value: string }) {
  const v = props.value.replace(/^"|"$/g, "");

  return <h1 className="text-2xl mb-2">{v}</h1>;
}

function ContentRenderer(props: { value: string }) {
  const v = props.value.replace(/\\/g, "").replace(/^"|"$/g, "");

  return <div className="prose" dangerouslySetInnerHTML={{ __html: v }} />;
}
