import Image from "next/image";
import React from "react";
import hero from "../../../public/hero.png";
import heroBg from "../../../public/hero-bg.jpg";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex flex-col relative items-end">
      <Image
        src={heroBg}
        alt=""
        className="w-full h-[100%] object-cover -z-10 absolute"
      />
      <Image src={hero} alt="" className="h-[75%] w-[75%] bottom-0" />
    </div>
  );
};

export default Hero;
