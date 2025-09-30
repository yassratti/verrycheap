import ScrollStack, { ScrollStackItem } from "../ScrollStack";
import Image from "next/image";
import { Button } from "../ui/button";
function Carousel() {
  return (
    <>
      <div className="w-screen h-screen relative z-50  px-10">
        <div className="w-full h-full  ">
          <ScrollStack className="w-full  ">
            <ScrollStackItem itemClassName="w-full bg-white w-full h-auto my-8 p-3 border border-gray-200">
              <div className="relative">
                <div className="absolute top-2 left-2 bg-white px-3 py-1 font-bold border text-black rounded-lg z-10">
                  80% OFF
                </div>
                <Image
                  src="/youtube-banner.png"
                  alt="Carousel 1"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mt-2">YouTube Premium</h2>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xl font-medium ">$35/yearly</p>
                <p className="text-xl font-medium text-[#737373] line-through">
                  $168/year
                </p>
              </div>
              <div className="flex flex-col mt-5 gap-1">
                <Button className="text-lg p-5  bg-blue-600 hover:bg-blue-700">
                  Purchase
                </Button>
                <Button className="text-lg p-5">How it works?</Button>
              </div>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="w-full bg-white w-full h-auto my-8 p-3 border border-gray-200">
              <div className="relative">
                <div className="absolute top-2 left-2 bg-white px-3 py-1 font-bold border text-black rounded-lg z-10">
                  80% OFF
                </div>
                <Image
                  src="/youtube-banner.png"
                  alt="Carousel 1"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mt-2">YouTube Premium</h2>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xl font-medium ">$35/yearly</p>
                <p className="text-xl font-medium text-[#737373] line-through">
                  $168/year
                </p>
              </div>
              <div className="flex flex-col mt-5 gap-1">
                <Button className="text-lg p-5  bg-blue-600 hover:bg-blue-700">
                  Purchase
                </Button>
                <Button className="text-lg p-5">How it works?</Button>
              </div>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="w-full bg-white w-full h-auto my-8 p-3 border border-gray-200">
              <div className="relative">
                <div className="absolute top-2 left-2 bg-white px-3 py-1 font-bold border text-black rounded-lg z-10">
                  80% OFF
                </div>
                <Image
                  src="/youtube-banner.png"
                  alt="Carousel 1"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mt-2">YouTube Premium</h2>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xl font-medium ">$35/yearly</p>
                <p className="text-xl font-medium text-[#737373] line-through">
                  $168/year
                </p>
              </div>
              <div className="flex flex-col mt-5 gap-1">
                <Button className="text-lg p-5  bg-blue-600 hover:bg-blue-700">
                  Purchase
                </Button>
                <Button className="text-lg p-5">How it works?</Button>
              </div>
            </ScrollStackItem>
            <ScrollStackItem itemClassName="w-full bg-white w-full h-auto my-8 p-3 border border-gray-200">
              <div className="relative">
                <div className="absolute top-2 left-2 bg-white px-3 py-1 font-bold border text-black rounded-lg z-10">
                  80% OFF
                </div>
                <Image
                  src="/youtube-banner.png"
                  alt="Carousel 1"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mt-2">YouTube Premium</h2>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xl font-medium ">$35/yearly</p>
                <p className="text-xl font-medium text-[#737373] line-through">
                  $168/year
                </p>
              </div>
              <div className="flex flex-col mt-5 gap-1">
                <Button className="text-lg p-5  bg-blue-600 hover:bg-blue-700">
                  Purchase
                </Button>
                <Button className="text-lg p-5">How it works?</Button>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </div>
    </>
  );
}
export default Carousel;
