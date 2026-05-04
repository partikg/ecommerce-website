import Link from "next/link";

export default function Hero() {
    return (
        <div className="relative">
            <video
                className="h-[500px] w-full object-cover"
                muted
                loop
                autoPlay
                src="https://cdn.shopify.com/videos/c/o/v/c6710b4309ca491f8f1351fdb8936d01.mp4"
            />

            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white">
                <div className="text-8xl">The Fall Sale</div>
                <div className="text-7xl">25% off everything*</div>

                <div className="flex gap-8 mt-5">
                    <Link href="/sales?gender=women" className="px-8 py-3 rounded-full border-2 border-white text-black font-medium">Women</Link>
                    <Link href="/sales?gender=men" className="px-8 py-3 rounded-full border-2 border-white text-black font-medium">Men</Link>
                </div>
            </div>
        </div>
    );
}