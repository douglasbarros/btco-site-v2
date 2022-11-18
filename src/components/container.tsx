export default function Container(props: any) {
  return (
    <div
      id={props.id}
      className={`container mx-auto xl:px-0 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
}
