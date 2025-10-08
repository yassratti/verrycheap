import { Button } from "../ui/button";
export default function Footer() {
  return (
    <>
      <div className="min-h-screen px-4  w-full relative">
        <div className="min-h-screen w-full relative">
          {/* Radial Gradient Background from Bottom */}
          <div
            className="absolute inset-0 z-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
            }}
          />

          <div className="z-10 relative max-w-3xl mx-auto pt-20 p-5">
            <div className="w-full flex flex-col gap-5 text-center items-center justify-center">
              <h1 className="text-3xl font-bold">
                Get it today, enjoy it today
              </h1>
              <p className="text-gray-400 text-base">
                get it today and get your account today and enjoy it today
              </p>
            </div>
            <div className="w-full max-w-4xl pt-5 px-4 flex justify-center">
              <Button className="text-base p-5 bg-blue-600 hover:bg-blue-700">
                All subscriptions
              </Button>
            </div>
          </div>
          {/* Your Content/Components */}
        </div>
      </div>
    </>
  );
}
