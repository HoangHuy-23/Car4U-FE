import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Car } from "@/types/car.type";
import { useEffect, useState } from "react";

type Props = {
  data: Car | null;
  isLoading: boolean;
  isError: boolean;
};

export default function CarImage({ data, isLoading, isError }: Props) {
  const [listImage, setListImage] = useState<string[]>([]);
  const [image, setImage] = useState<string | undefined>(listImage?.[0]);

  useEffect(() => {
    if (data?.images?.length) {
      setListImage(data.images);
      setImage(data.images[0]);
    }
  }, [data]);

  const handleChangeImage = (index: number) => {
    if (listImage && index < listImage.length && index >= 0) {
      const updatedListImage = [...listImage];
      [updatedListImage[0], updatedListImage[index]] = [
        updatedListImage[index],
        updatedListImage[0],
      ];
      setListImage(updatedListImage);
      setImage(updatedListImage[0]);
    }
  };
  return (
    <div className="grid md:grid-cols-[4fr_2fr] gap-4">
      <AspectRatio ratio={10 / 6} className="">
        <img
          src={listImage?.at(0)}
          alt=""
          className="rounded-md w-full h-full object-cover"
          onClick={() => handleChangeImage(0)}
        />
      </AspectRatio>
      <div className="md:grid grid-cols-1 gap-4 hidden">
        <AspectRatio ratio={12 / 5} className="">
          <img
            src={listImage?.at(1)}
            alt=""
            className="rounded-md w-full h-full object-cover"
            onClick={() => handleChangeImage(1)}
          />
        </AspectRatio>
        <AspectRatio ratio={12 / 5} className="">
          <img
            src={listImage?.at(2)}
            alt=""
            className="rounded-md w-full h-full object-cover"
            onClick={() => handleChangeImage(2)}
          />
        </AspectRatio>
        <AspectRatio ratio={12 / 5} className="">
          <img
            src={listImage?.at(3)}
            alt=""
            className="rounded-md w-full h-full object-cover"
            onClick={() => handleChangeImage(3)}
          />
        </AspectRatio>
      </div>
    </div>
  );
}
