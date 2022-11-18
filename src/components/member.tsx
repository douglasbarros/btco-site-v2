/* eslint-disable @next/next/no-img-element */
import { Card } from "flowbite-react";

export default function Member(props: any) {
  const { image, name, title } = props;

  return (
    <Card>
      <div className="flex flex-col items-center">
        <img
          className="mb-3 h-48 w-48 rounded-full shadow-lg"
          src={image}
          alt={name}
        />
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {title}
          </p>
        </div>
      </div>
    </Card>
  );
}
